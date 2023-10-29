
import { Matrix } from "../../genome/modules/SwatchMatrix";
import { emit } from "@create-figma-plugin/utilities";
import { SwatchesCreatedEvent } from "../../events/handlers";

let rootName = 'palette'
const swatchWidth = 140;
const swatchHeight = 44;
const render = "CREATE"

export const createSwatches = async (grid: Matrix.Grid) => {

    loadFonts().then(() => {


        //
        // User scenarios
        //
        // 1) Create a new palette in new document (EASY)
        // 2) Update an existing palette
        //      a) Update colorStyles with new data
        //      b) If not drawn in page, draw palette
        //      c) Update labels if palette drawn on page
        //

        if (render === "CREATE") {
            createPalette(grid)
        }
        // createRootName()
        // createFigmaColorStyles(grid)
        // createPaletteSwatches(grid)

        // if (!paintStyleExists(grid)) {
        //     populateFigmaColorStyles(grid)
        // } else {
        //     updateFigmaColorStyles(grid);
        // }

        figma.closePlugin()

    })
}

const createPalette = (grid: Matrix.Grid) => {
    createRootName()
    createFigmaColorStyles(grid)
    createPaletteSwatches(grid)
}

const createPaletteSwatches = (matrix: Matrix.Grid) => {

    const nodes: BaseNode[] = [];
    let offsetX = swatchWidth / 2;
    let offsetY = 0;

    matrix.columns.map((column, colIndex, colArray) => {
        nodes.push(createSemanticLabel(column, offsetX));
        column.rows.map((swatch, rowIndex) => {
            if (colIndex === 0) nodes.push(createWeightLabel(swatch, offsetY));
            const name = paintStyleName(swatch);
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
    
    // @ts-ignore
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
}

function createFigmaColorStyles(grid: Matrix.Grid) {

    let matrix = JSON.parse(JSON.stringify(grid)) as Matrix.Grid

    // If the optimization is Genome, insert white and black in the neutral column
    if (matrix.optimization.startsWith("Genome")) {
        matrix.columns[matrix.columns.length - 1].rows.unshift(whiteSwatch)
        matrix.columns[matrix.columns.length - 1].rows.push(blackSwatch)
    }

    matrix.columns.map(column => {
        column.rows.map(swatch => {
            createPaintStyle(swatch)
        })
    })
}

const updateFigmaColorStyles = (grid: Matrix.Grid) => {
    grid.columns.forEach(function (column) {
        column.rows.forEach(function (swatch) {
            let name = paintStyleName(swatch);
            let paintStyle = getPaintStyle(name)[0];
            updatePaintStyle(swatch, paintStyle);
            updateSwatchLabel(swatch);
        });
    });
}

function paintStyleExists(grid: Matrix.Grid) {
    let swatch = grid.columns[0].rows[0];
    let painStyleName = paintStyleName(swatch);
    return localPaintStyleNames().includes(painStyleName) ? true : false;
}

function updateSwatchLabel(swatch: Matrix.Swatch) {
    let name = createFrameName(swatch);
    let frameNode = figma.currentPage.findOne((n) => n.name === name) as FrameNode;
    let r = frameNode.children[0] as TextNode;

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
    return r;
}

const getPaintStyle = (name: string) => {
    return figma.getLocalPaintStyles().filter((paintStyle) => {
        return paintStyle.name === name;
    });
}

const updatePaintStyle = (swatch: Matrix.Swatch, style: PaintStyle) => {
    const result = style;
    result.description = createPaintStyleDescription(swatch);
    result.paints = [{ type: 'SOLID', color: hexToRgb(swatch.hex) }];
    return result;
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
    result.fontSize = 16;
    result.textAlignHorizontal = 'CENTER';
    result.textAlignVertical = 'CENTER';
    return result;
}

const createPaintStyle = (swatch: Matrix.Swatch) => {

    //
    // Maybe check to see if the painStyle exists before 
    // creating it. If exists, simply update and return.
    //

    const result = figma.createPaintStyle()
    result.name = paintStyleName(swatch)
    result.description = createPaintStyleDescription(swatch)
    result.paints = [{ type: 'SOLID', color: hexToRgb(swatch.hex) }]
    return result
}

const paintStyleName = (swatch: Matrix.Swatch) => {
    let result = [rootName];
    result.push(swatch.semantic);
    // result.push(swatch.semantic + swatch.weight!.toString());
    result.push(swatch.weight!.toString());
    return result.join('/');
}

const createPaintStyleDescription = (swatch: Matrix.Swatch) => {
    const result = [];
    result.push(`$${rootName}-${swatch.semantic}-${swatch.weight}` + "\n")
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

const hexToRgb = (hex: string) => {
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

const createFrameName = (swatch: Matrix.Swatch) => {
    return swatch.semantic + swatch.weight!.toString();
}

const loadFonts = async () => {
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
};

const localPaintStyleNames = () => {
    return figma.getLocalPaintStyles().map((style) => style.name);
}

const localPaintStyleRootNames = () => {
    const rootNames = figma.getLocalPaintStyles().map(style => style.name.split("/")[0])
    return [...new Set(rootNames)]
}

const createRootName = () => {

    // If we don't want to override existing paint styles...

    const localRootNames = localPaintStyleRootNames()
    console.log(localRootNames)

    if (localRootNames.includes(rootName)) {
        let unique = 0
        while (true) {
            unique = unique + 1
            if (!localRootNames.includes(`${rootName}_${unique}`)) {
                rootName = `${rootName}_${unique}`
                break;
            }
        }
    }
}

const whiteSwatch = {
    HSV: { H: 0, S: 0, V: 100 },
    LAB: { L: 100, a: 0, b: 0 },
    LCH: { L: 100, C: 0, H: 297 },
    WCAG2: 1,
    WCAG2_K_30: true,
    WCAG2_K_45: true,
    WCAG2_W_30: false,
    WCAG2_W_45: false,
    WCAG3: 0,
    colorChecker: { name: 'WHITE-05', dE: 1.74 },
    column: "J",
    hex: "#FFFFFF",
    id: "J0",
    isNeutral: true,
    isPinned: false,
    isUserDefined: false,
    l_target: 100,
    lightness: 100,
    row: 0,
    semantic: "neutral",
    weight: "000"
} as Matrix.Swatch

const blackSwatch = {
    HSV: { H: 0, S: 0, V: 0 },
    LAB: { L: 0, a: 0, b: 0 },
    LCH: { L: 0, C: 0, H: 0 },
    id: "J21",
    column: "J",
    row: 21,
    hex: "#000000",
    semantic: "neutral",
    weight: "950",
    lightness: 0,
    colorChecker: { name: 'BLACK-15', dE: 12.57 },
    isUserDefined: false,
    isPinned: false,
    isNeutral: true,
    l_target: 0,
    WCAG2: 21,
    WCAG3: 108,
    WCAG2_W_30: true,
    WCAG2_W_45: true,
    WCAG2_K_30: false,
    WCAG2_K_45: false
} as Matrix.Swatch