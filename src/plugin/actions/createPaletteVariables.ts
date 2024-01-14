import { Matrix } from "../../genome/modules/SwatchMatrix";
import { createColorVariable } from "../utilities/createColorVariable";
import { createAlphaVariables } from "../utilities/createAlphaVariables";
import { updatePaletteVariables } from "../utilities/updatePaletteVariables";
import { paletteCollectionName, isGenomeOptimization } from "../constants";
import { insertBlackWhiteSwatches } from "../utilities/insertBlackWhiteSwatches";

// export const paletteVariables = (grid: Matrix.Grid, update: boolean) => {
//     const collectionExists = paletteCollectionExists(paletteCollectionName)
//     if (!update && !collectionExists) {
//         console.log("(!update && !collectionExists) -> VERY SAFE")
//         createPaletteVariables(grid)
//     } else if (!update && collectionExists) {
//         console.log("(!update && collectionExists) -> MAYBE SAFE, but we should ask...")
//         createPaletteVariables(grid)
//     } else if (update && collectionExists) {
//         console.log("(update && collectionExists)) -> PRETTY SAFE, but not 100% sure")
//         updatePaletteVariables(grid)
//     } else if (update && !collectionExists) {
//         console.log("(update && !collectionExists)) -> WILL NOT DO ANYTHING, but we can tell user.")
//         updatePaletteVariables(grid)
//     }
// }

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
