import { Matrix } from "../../genome/modules/SwatchMatrix";
import { createColorVariable } from "../utilities/createColorVariable";
import { createAlphaVariables } from "../utilities/createAlphaVariables";
import { dimensionCollectionName, isGenomeOptimization } from "../constants";
import { insertBlackWhiteSwatches } from "../utilities/insertBlackWhiteSwatches";
import { createDimensionVariable } from "../utilities/createDimensionVariable";

export const createDimensionVariables = () => {
    const collection = figma.variables.createVariableCollection(dimensionCollectionName);
    collection.renameMode(collection.modes[0].modeId, "Value")
    
    createDimensionVariable(collection, "space/00", 0)
    createDimensionVariable(collection, "space/01", 2)
    createDimensionVariable(collection, "space/02", 4)
    createDimensionVariable(collection, "space/03", 8)
    createDimensionVariable(collection, "space/04", 12)
    createDimensionVariable(collection, "space/05", 16)
    createDimensionVariable(collection, "space/06", 24)
    createDimensionVariable(collection, "space/07", 32)
    createDimensionVariable(collection, "space/08", 40)
    createDimensionVariable(collection, "space/09", 48)
    createDimensionVariable(collection, "space/10", 64)

    createDimensionVariable(collection, "radii/fff", 0)
    createDimensionVariable(collection, "radii/ff", 2)
    createDimensionVariable(collection, "radii/f", 4)
    createDimensionVariable(collection, "radii/~", 8)
    createDimensionVariable(collection, "radii/p", 12)
    createDimensionVariable(collection, "radii/pp", 24)
    createDimensionVariable(collection, "radii/ppp", 1000)

    createDimensionVariable(collection, "breakpoint/16col", 1280)
    createDimensionVariable(collection, "breakpoint/12col", 1024)
    createDimensionVariable(collection, "breakpoint/8col", 768)
    createDimensionVariable(collection, "breakpoint/4col", 393)


    // const matrix = JSON.parse(JSON.stringify(grid)) as Matrix.Grid
    // if (isGenomeOptimization(matrix)) insertBlackWhiteSwatches(matrix)
    // createColorVariables(matrix, collection)
    // if (isGenomeOptimization(matrix)) createAlphaVariables(collection)
}

const createColorVariables = (matrix: Matrix.Grid, collection: VariableCollection) => {
    matrix.columns.map(column => {
        column.rows.map(swatch => {
            createColorVariable(collection, swatch)
        })
    })
}
