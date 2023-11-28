
import { Matrix } from "../../genome/modules/SwatchMatrix";
import { swatchDescription } from "../utilities/swatchDescription";
import { hexToRgb } from "../utilities/hexToRgb";
import { styleName } from "../utilities/styleName";
import { isGenomeOptimization } from "../constants";
import { createAlphaStyles } from "../utilities/createAlphaStyles";
import { insertBlackWhiteSwatches } from "../utilities/insertBlackWhiteSwatches";

const paintStyles = figma.getLocalPaintStyles()

export const createPaletteStyles = (grid: Matrix.Grid, update:boolean) => {
    let matrix = JSON.parse(JSON.stringify(grid)) as Matrix.Grid
    if (isGenomeOptimization(matrix)) insertBlackWhiteSwatches(matrix)
    createColorStyles(matrix)
    if (isGenomeOptimization(matrix)) createAlphaStyles()
}

const createColorStyles = (matrix: Matrix.Grid) => {
    matrix.columns.map(column => {
        column.rows.map(swatch => {
            createColorStyle(swatch)
        })
    })
}

const createColorStyle = (swatch: Matrix.Swatch) => {
    const name = styleName(swatch)
    let result = getPaintStyle(name)
    result = result ? result : figma.createPaintStyle()
    result.description = swatchDescription(swatch)
    result.paints = [{ type: 'SOLID', color: hexToRgb(swatch.hex) }]
    result.name = name
    return result
}

const getPaintStyle = (name: string) => {
    const result = paintStyles.filter((paintStyle) => {
        return paintStyle.name === name;
    });
    return result ? result[0] : null
}