import { Matrix } from "../../genome/modules/SwatchMatrix";
import { createColorVariable } from "../utilities/createColorVariable";
import { createAlphaVariables } from "../utilities/createAlphaVariables";
import { updatePaletteVariables } from "../utilities/updateColorVariable";
import { paletteCollectionName, isGenomeOptimization } from "../constants";
import { insertBlackWhiteSwatches } from "../utilities/insertBlackWhiteSwatches";

export const paletteVariables = (grid: Matrix.Grid, update: boolean) => {
    const collectionExists = paletteCollectionExists(paletteCollectionName)
    if (!update && !collectionExists) {
        console.log("(!update && !collectionExists) -> VERY SAFE")
        createPaletteVariables(grid)
    } else if (!update && collectionExists) {
        console.log("(!update && collectionExists) -> MAYBE SAFE, but we should ask...")
        createPaletteVariables(grid)
    } else if (update && collectionExists) {
        console.log("(update && collectionExists)) -> PRETTY SAFE, but not 100% sure")
        updatePaletteVariables(grid)
    } else if (update && !collectionExists) {
        console.log("(update && !collectionExists)) -> WILL NOT DO ANYTHING, but we can tell user.")
        updatePaletteVariables(grid)
    }
}

const createPaletteVariables = (grid: Matrix.Grid) => {
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

//
// What are things that could go wrong?
// 1) PaletteCollection Exists (don't want [palette, palette, palette])
// 2) User requests to update instead, but the update is for a different optimization
//
const paletteCollectionExists = (name: string) => {
    const localVariableCollections = figma.variables.getLocalVariableCollections()
    const localVariableCollectionsNames = localVariableCollections.map(item => item.name)
    if (localVariableCollectionsNames.includes(name)) {
        console.log("I SEE WE HAVE SOMETHING, LETS ASK USER SOMETHING...")
    } else {
        console.log("ALL GOOD...")
    }
    return localVariableCollectionsNames.includes(name)
}