import { Matrix } from "../../genome/modules/SwatchMatrix";
import { variableName } from "../utilities/variableName";

const swatchWidth = 140;
const swatchHeight = 44;
var localVariables: Variable[] = []

export const renderPaletteVariables = (matrix: Matrix.Grid, type: string) => {

    localVariables = figma.variables.getLocalVariables()
    const nodes: BaseNode[] = [];
    let offsetX = swatchWidth / 2;
    let offsetY = 0;

    matrix.columns.map((column, colIndex, colArray) => {
        nodes.push(createSemanticLabel(column, offsetX));
        column.rows.map((swatch, rowIndex) => {
            if (colIndex === 0) nodes.push(createWeightLabel(swatch, offsetY));
            const name = variableName(swatch);
            const paintStyle = getVariable(name)[0];
            nodes.push(createSwatchFrame(swatch, paintStyle, offsetX, offsetY));
            if (colIndex + 1 === colArray.length) {
                nodes.push(createTargetLabel(matrix.columns[0].rows[rowIndex], offsetX, offsetY));
            }
            offsetY = offsetY + swatchHeight;
        });
        offsetX = offsetX + swatchWidth;
        offsetY = 0;
    })

    const frame = figma.createFrame()
    frame.name = "palette"
    bindVariableToNode(getVariable("paper/~/~")[0], frame)
    frame.resize(1600, 800);
    frame.x = -32
    frame.y = -90
    figma.group(nodes, frame)
    figma.viewport.scrollAndZoomIntoView(nodes);
}

const createSemanticLabel = (column: Matrix.Column, offsetX: number) => {
    const result = figma.createText();
    result.name = ('semantic' + '-' + column.semantic) as string;
    result.characters = column.semantic as string;
    result.textAlignHorizontal = 'CENTER';
    result.textAlignVertical = 'CENTER';
    result.fontName = { family: 'Inter', style: 'Medium' };
    result.fontSize = 16;
    result.resize(swatchWidth, swatchHeight);
    result.x = offsetX;
    result.y = 0 - swatchHeight * 1.5;
    bindVariableToNode(getVariable("ink/~/ff")[0], result)
    figma.currentPage.appendChild(result);
    return result;
}

const createWeightLabel = (swatch: Matrix.Swatch, offsetY: number) => {
    const result = figma.createText();
    result.name = 'weight' + '-' + swatch.weight!.toString();
    result.characters = swatch.weight!.toString();
    result.textAlignHorizontal = 'CENTER';
    result.textAlignVertical = 'CENTER';
    result.fontName = { family: 'Inter', style: 'Bold' };
    result.fontSize = 16;
    result.resize(swatchWidth / 2, swatchHeight);
    result.x = -16;
    result.y = offsetY;
    bindVariableToNode(getVariable("ink/~/ff")[0], result)
    figma.currentPage.appendChild(result);
    return result;
}

const createSwatchLabel = (swatch: Matrix.Swatch) => {
    const result = figma.createText();
    const whiteStamp = getVariable("stamp/~/white")[0]
    const blackStamp = getVariable("stamp/~/black")[0]
    let label = swatch.hex.toUpperCase();
    if (swatch.isUserDefined) label = '⭐️ ' + label;
    if (swatch.isPinned) label = '📍 ' + label;
    result.characters = label;
    result.name = result.characters + ' (L*' + swatch.lightness + ')';
    (swatch.WCAG2_W_45 || swatch.WCAG2_W_30)
        ? bindVariableToNode(whiteStamp, result)
        : bindVariableToNode(blackStamp, result)
    result.fontName =
        swatch.WCAG2_W_30 && !swatch.WCAG2_W_45
            ? { family: 'Inter', style: 'Bold' }
            : { family: 'Inter', style: 'Regular' };
    result.fontSize = 14;
    result.textAlignHorizontal = 'CENTER';
    result.textAlignVertical = 'CENTER';
    return result;
}

const createTargetLabel = (swatch: Matrix.Swatch, offsetX: number, offsetY: number) => {
    const result = figma.createText();
    result.name = 'target-' + swatch.l_target.toString();
    result.characters = 'L*' + swatch.l_target.toString();
    result.textAlignHorizontal = 'LEFT';
    result.textAlignVertical = 'CENTER';
    result.fontSize = 14;
    result.resize(swatchWidth / 2, swatchHeight);
    result.x = offsetX + swatchWidth + 24;
    result.y = offsetY;
    bindVariableToNode(getVariable("ink/~/ff")[0], result)
    return result;
}

const createSwatchFrame = (swatch: Matrix.Swatch, variable: Variable, x: number, y: number) => {

    const node = figma.createFrame();
    node.name = createFrameName(swatch);
    bindVariableToNode(variable, node)
    node.layoutMode = 'HORIZONTAL';
    node.primaryAxisAlignItems = 'CENTER';
    node.counterAxisAlignItems = 'CENTER';
    node.resize(swatchWidth, swatchHeight);
    node.appendChild(createSwatchLabel(swatch));
    node.x = x;
    node.y = y;
    return node;
}

const bindVariableToNode = (variable: Variable, node: FrameNode | TextNode) => {
    // @ts-ignore
    const fillsCopy = JSON.parse(JSON.stringify(node.fills));
    fillsCopy[0] = figma.variables.setBoundVariableForPaint(fillsCopy[0], 'color', variable)
    node.fills = fillsCopy
}

const createFrameName = (swatch: Matrix.Swatch) => {
    return swatch.semantic + swatch.weight!.toString();
}

const getVariable = (name: string) => {

    //    bindVariableToNode(getVariable("ink/~/ff")[0], result)

    return localVariables.filter((paintStyle) => {
        return paintStyle.name === name;
    });
}