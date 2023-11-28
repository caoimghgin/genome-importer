import { Matrix } from "../../genome/modules/SwatchMatrix";
import { styleName } from "../utilities/styleName";

const swatchWidth = 140;
const swatchHeight = 44;
const paintStyles: PaintStyle[] = figma.getLocalPaintStyles()

export const renderPalette = (matrix: Matrix.Grid, type: string) => {

    const nodes: BaseNode[] = [];
    let offsetX = swatchWidth / 2;
    let offsetY = 0;

    matrix.columns.map((column, colIndex, colArray) => {
        nodes.push(createSemanticLabel(column, offsetX));
        column.rows.map((swatch, rowIndex) => {
            if (colIndex === 0) nodes.push(createWeightLabel(swatch, offsetY));
            const name = styleName(swatch);
            const paintStyle = getPaintStyle(name)[0];
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
    frame.resize(1600, 800);
    frame.x = -32
    frame.y = -90
    figma.group(nodes, frame)

    // @ts-ignore
    // figma.currentPage.selection = nodes;
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
    figma.currentPage.appendChild(result);
    return result;
}

const createSwatchLabel = (swatch: Matrix.Swatch) => {
    const result = figma.createText();
    let label = swatch.hex.toUpperCase();
    if (swatch.isUserDefined) label = '⭐️ ' + label;
    if (swatch.isPinned) label = '📍 ' + label;
    result.characters = label;
    result.name = result.characters + ' (L*' + swatch.lightness + ')';
    result.fills =
        swatch.WCAG2_W_45 || swatch.WCAG2_W_30
            ? [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
            : [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
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
    return result;
}

const createSwatchFrame = (swatch: Matrix.Swatch, style: PaintStyle, x: number, y: number) => {
    const result = figma.createFrame();
    result.name = createFrameName(swatch);
    result.fillStyleId = style.id;
    result.layoutMode = 'HORIZONTAL';
    result.primaryAxisAlignItems = 'CENTER';
    result.counterAxisAlignItems = 'CENTER';
    result.resize(swatchWidth, swatchHeight);
    result.appendChild(createSwatchLabel(swatch));
    result.x = x;
    result.y = y;
    return result;
}


const createFrameName = (swatch: Matrix.Swatch) => {
    return swatch.semantic + swatch.weight!.toString();
}

const getPaintStyle = (name: string) => {
    return paintStyles.filter((paintStyle) => {
        return paintStyle.name === name;
    });
}