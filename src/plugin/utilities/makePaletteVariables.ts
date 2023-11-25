
import { Matrix } from "../../genome/modules/SwatchMatrix";
import chroma from "chroma-js";

const collectionName = 'palette'
const blackHexValue = "#FFFFFF"
const whiteHexValue = "#000000"
const alphas = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]

export const makePaletteVariables = async (grid: Matrix.Grid, update:boolean) => {
    if (update) return
    createPaletteVariables(grid) 
}

function createPaletteVariables(grid: Matrix.Grid) {

    //
    // Check if variableCollection name exists...
    //

    const collection = figma.variables.createVariableCollection(collectionName);
    collection.renameMode(collection.modes[0].modeId, "Value")

    let matrix = JSON.parse(JSON.stringify(grid)) as Matrix.Grid

    // If the optimization is Genome, insert white and black in the neutral column
    if (matrix.optimization.startsWith("Genome")) {
        matrix.columns[matrix.columns.length - 1].rows.unshift(whiteSwatch)
        matrix.columns[matrix.columns.length - 1].rows.push(blackSwatch)
    }

    matrix.columns.map(column => {
        column.rows.map(swatch => {
            createColorVariable(collection, swatch)
        })
    })

    // If optimization is 'Genome', insert alpha variables...
    if (matrix.optimization.startsWith("Genome")) {
        createAlphaVariables(collection)
    }

}

const createColorVariable = async (collection: VariableCollection, swatch: Matrix.Swatch) => {
    const result = figma.variables.createVariable(colorVariableName(swatch), collection.id, 'COLOR')
    result.setValueForMode(collection.defaultModeId, hexToRgb(swatch.hex))
    result.description = createPaintStyleDescription(swatch)
    return result
}

const createAlphaVariables = (collection: VariableCollection) => {

    createTints([blackHexValue, whiteHexValue], alphas)
    createTransparent()

    function createTints(solids: string[], alphas: number[]) {
        solids.map(solid => {
            alphas.map(alpha => {
                const name = `alpha/${(solid === "#FFFFFF" ? "lighten" : "darken")}/${alpha * 100}a`
                const rgba = chroma(solid).alpha(alpha).rgba()
                const value = {r:rgba[0]/255, g:rgba[1]/255, b:rgba[2]/255, a:rgba[3]}
                const result = figma.variables.createVariable(name, collection.id, 'COLOR')
                result.setValueForMode(collection.defaultModeId, value)
            })
        })
    }

    function createTransparent() {
        const name = `alpha/transparent/~`
        const rgba = chroma(whiteHexValue).alpha(0).rgba()
        const value = {r:rgba[0]/255, g:rgba[1]/255, b:rgba[2]/255, a:rgba[3]}
        const result = figma.variables.createVariable(name, collection.id, 'COLOR')
        result.setValueForMode(collection.defaultModeId, value)
    }

}

const colorVariableName = (swatch: Matrix.Swatch) => {
    let result = [];
    result.push(swatch.semantic);
    result.push(swatch.weight!.toString());
    return result.join('/');
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

const createPaintStyleDescription = (swatch: Matrix.Swatch) => {
    const result = [];
    result.push(`$${collectionName}-${swatch.semantic}-${swatch.weight}` + "\n")
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