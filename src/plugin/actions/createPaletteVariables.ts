import { Matrix } from "../../genome/modules/SwatchMatrix";
import { createColorVariable } from "../utilities/createColorVariable";
import { createAlphaVariables } from "../utilities/createAlphaVariables";
import { paletteCollectionName, isGenomeOptimization } from "../constants";
import { insertBlackWhiteSwatches } from "../utilities/insertBlackWhiteSwatches";

export const createPaletteVariables = (grid: Matrix.Grid) => {
    const collection = figma.variables.createVariableCollection(paletteCollectionName);
    collection.renameMode(collection.modes[0].modeId, "Value")
    const matrix = JSON.parse(JSON.stringify(grid)) as Matrix.Grid
    if (isGenomeOptimization(matrix)) insertBlackWhiteSwatches(matrix)
    createColorVariables(matrix, collection)
    if (isGenomeOptimization(matrix)) createAlphaVariables(collection)
}

const createColorVariables = (matrix: Matrix.Grid, collection: VariableCollection) => {
    matrix.columns.map(column => {
        column.rows.map(swatch => {
            createColorVariable(collection, swatch)
        })
    })
}
