
import { Matrix } from "../../genome/modules/SwatchMatrix";

const rootName = 'palette' as String;
const swatchWidth = 140;
const swatchHeight = 44;

export const createSwatches = async (grid: Matrix.Grid) => {

    loadFonts().then(() => {
        populateFigmaColorStyles(grid)
    })

}

function populateFigmaColorStyles(grid: Matrix.Grid) {
    const nodes: BaseNode[] = [];

    let offsetX = swatchWidth / 2;
    let offsetY = 0;

    grid.columns.forEach(function (column, colIndex, colArray) {

        nodes.push(createSemanticLabel(column, offsetX));

        column.rows.forEach(function (swatch, rowIndex) {
            if (colIndex === 0) {
                nodes.push(createWeightLabel(swatch, offsetY));
            }
            nodes.push(createSwatchFrame(swatch, createPaintStyle(swatch), offsetX, offsetY));
            if (colIndex + 1 === colArray.length) {
                nodes.push(createTargetLabel(grid.columns[0].rows[rowIndex], offsetX, offsetY));
            }
            offsetY = offsetY + swatchHeight;
        });

        offsetX = offsetX + swatchWidth;
        offsetY = 0;
    });

    // @ts-ignore
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
}

function createSemanticLabel(column: Matrix.Column, offsetX: number) {
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

function createWeightLabel(swatch: Matrix.Swatch, offsetY: number) {
    const r = figma.createText();
    r.name = 'weight' + '-' + swatch.weight!.toString();
    r.characters = swatch.weight!.toString();
    r.textAlignHorizontal = 'CENTER';
    r.textAlignVertical = 'CENTER';
    r.fontName = { family: 'Inter', style: 'Bold' };
    r.fontSize = 16;
    r.resize(swatchWidth / 2, swatchHeight);
    r.x = -16;
    r.y = offsetY;
    figma.currentPage.appendChild(r);
    return r;
}

function createSwatchFrame(swatch: Matrix.Swatch, style: PaintStyle, x: number, y: number) {
    const r = figma.createFrame();
    r.name = createFrameName(swatch);
    r.fillStyleId = style.id;
    r.layoutMode = 'HORIZONTAL';
    r.primaryAxisAlignItems = 'CENTER';
    r.counterAxisAlignItems = 'CENTER';
    r.resize(swatchWidth, swatchHeight);
    r.appendChild(createSwatchLabel(swatch));
    r.x = x;
    r.y = y;
    return r;
}

function createTargetLabel(swatch: Matrix.Swatch, offsetX: number, offsetY: number) {
    const r = figma.createText();
    r.name = 'target-' + swatch.l_target.toString();
    r.characters = 'L*' + swatch.l_target.toString();
    r.textAlignHorizontal = 'LEFT';
    r.textAlignVertical = 'CENTER';
    r.fontSize = 14;
    r.resize(swatchWidth / 2, swatchHeight);
    r.x = offsetX + swatchWidth + 24;
    r.y = offsetY;
    return r;
}

function createSwatchLabel(swatch: Matrix.Swatch) {
    const r = figma.createText();
    let label = swatch.hex.toUpperCase();
    if (swatch.isUserDefined) label = '⭐️ ' + label;
    if (swatch.isPinned) label = '📍 ' + label;
    r.characters = label;
    r.name = r.characters + ' (L*' + swatch.lightness + ')';
    r.fills =
        swatch.WCAG2_W_45 || swatch.WCAG2_W_30
            ? [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
            : [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    r.fontName =
        swatch.WCAG2_W_30 && !swatch.WCAG2_W_45
            ? { family: 'Inter', style: 'Bold' }
            : { family: 'Inter', style: 'Regular' };
    r.fontSize = 16;
    r.textAlignHorizontal = 'CENTER';
    r.textAlignVertical = 'CENTER';
    return r;
}

function createPaintStyle(swatch: Matrix.Swatch) {
    const r = figma.createPaintStyle();
    r.name = createPaintStyleName(swatch);
    r.description = createPaintStyleDescription(swatch);
    r.paints = [{ type: 'SOLID', color: hexToRgb(swatch.hex) }];
    return r;
}

function createPaintStyleName(swatch: Matrix.Swatch) {
    let n = [rootName];
    n.push(swatch.semantic);
    // n.push(swatch.semantic + swatch.weight!.toString());
    n.push(swatch.weight!.toString());
    return n.join('/');
}

function createPaintStyleDescription(swatch: Matrix.Swatch) {
    const result = [];
    result.push(`$${rootName}-${swatch.semantic}-${swatch.weight}` + "\n")
    // r.push('$' + rootName + '-' + swatch.semantic + '-' + swatch.weight + '\n');
    result.push('\n');
    result.push('hex: : ' + swatch.hex.toUpperCase() + '\n');
    result.push('L*: ' + swatch.lightness + ' (' + swatch.l_target + ')' + '\n');
    result.push('\n');
    result.push('#FFFFFF-4.5:1: ' + swatch.WCAG2_W_45 + '\n');
    result.push('#FFFFFF-3.0:1: ' + swatch.WCAG2_W_30 + '\n');
    result.push('#000000-4.5:1: ' + swatch.WCAG2_K_45 + '\n');
    result.push('#000000-3.0:1: ' + swatch.WCAG2_K_30 + '\n');
    return result.join('');
}

function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255,
        }
        : {
            r: parseInt("0", 16) / 255,
            g: parseInt("0", 16) / 255,
            b: parseInt("0", 16) / 255,
        }
}

function createFrameName(swatch: Matrix.Swatch) {
    return swatch.semantic + swatch.weight!.toString();
}

const loadFonts = async () => {
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
};