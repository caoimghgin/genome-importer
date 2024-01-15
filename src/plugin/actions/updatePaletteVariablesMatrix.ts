import { Matrix } from "../../genome/modules/SwatchMatrix";


export const updatePaletteVariablesMatrix = (matrix: Matrix.Grid) => {
    matrix.columns.map((column, colIndex, colArray) => {
        column.rows.map((swatch, rowIndex) => {
            updateSwatchLabel(swatch)
        });
    })
}

function updateSwatchLabel(swatch: Matrix.Swatch) {
    const name = createFrameName(swatch);
    const frameNode = figma.currentPage.findOne((n) => n.name === name) as FrameNode;
    const textNode = frameNode.children[0] as TextNode;
    let label = swatch.hex.toUpperCase();
    if (swatch.isUserDefined) label = '⭐️ ' + label;
    if (swatch.isPinned) label = '📍 ' + label;
    textNode.characters = label;
    textNode.fills =
        swatch.WCAG2_W_45 || swatch.WCAG2_W_30
            ? [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
            : [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    textNode.fontName =
        swatch.WCAG2_W_30 && !swatch.WCAG2_W_45
            ? {family: 'Inter', style: 'Bold'}
            : {family: 'Inter', style: 'Regular'};
}

const createFrameName = (swatch: Matrix.Swatch) => {
    return swatch.semantic + swatch.weight!.toString();
}