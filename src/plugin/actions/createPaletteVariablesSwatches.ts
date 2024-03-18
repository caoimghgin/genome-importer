import { Matrix } from "../../genome/modules/SwatchMatrix";
import { variableName } from "../utilities/variableName";

const swatchWidth = 140;
const swatchHeight = 44;
var localVariables: Variable[] = []

export const createPaletteVariablesSwatches = (matrix: Matrix.Grid, type: string) => {

    localVariables = figma.variables.getLocalVariables()
    const nodes: BaseNode[] = [];
    let offsetX = swatchWidth / 2;
    let offsetY = 0;
    let frameHeight = 0

    matrix.columns.map((column, colIndex, colArray) => {
        nodes.push(createSemanticLabel(column, offsetX));
        column.rows.map((swatch, rowIndex) => {
            if (colIndex === 0) nodes.push(createWeightLabel(swatch, offsetY));
            const name = variableName(swatch);
            const paintStyle = getVariable(name);
            nodes.push(createSwatchFrame(swatch, paintStyle, offsetX, offsetY));
            if (colIndex + 1 === colArray.length) {
                nodes.push(createTargetLabel(matrix.columns[0].rows[rowIndex], offsetX, offsetY));
            }
            offsetY = offsetY + swatchHeight;
            frameHeight = offsetY
        });
        offsetX = offsetX + swatchWidth;
        offsetY = 0;
    })

    const frame = figma.createFrame()
    frame.name = "palette"
    bindVariableToNode(getVariable("paper"), frame)
    frame.resize(1600, frameHeight+144);
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
    bindVariableToNode(getVariable("~/ink/ff"), result)
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
    bindVariableToNode(getVariable("~/ink/ff"), result)
    figma.currentPage.appendChild(result);
    return result;
}

const createSwatchLabel = (swatch: Matrix.Swatch) => {
    const result = figma.createText();
    const whiteStamp = getVariable("~/stamp/white/~")
    const blackStamp = getVariable("~/stamp/black/~")
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
    bindVariableToNode(getVariable("~/ink/ff"), result)
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

    const result = localVariables.filter((variable) => {
        return nameScrubber(variable.name) === nameScrubber(name)
    });
    
    console.log("RESUTLT: ", name)

    if (result.length === 1) return result[0]
    throw new Error(`getVariable(${name}) returned ${result.length}`);

    function nameScrubber(name: string) {
        return name.split('/').filter(item => item !== "~").join("/")
    }
}