import { Matrix } from "../../genome/modules/SwatchMatrix";
import { createColorVariable } from "../utilities/createColorVariable";
import { createAlphaVariables } from "../utilities/createAlphaVariables";
import { updatePaletteVariables } from "../utilities/updateColorVariable";
import { blackSwatch, whiteSwatch, paletteCollectionName, isGenomeOptimization } from "../constants";

export const createPaletteVariables = async (grid: Matrix.Grid, update:boolean) => {
    if (update) {
        refreshPaletteVariables(grid)
    } else {
        makePaletteVariables(grid) 
    }
}

const refreshPaletteVariables = (grid: Matrix.Grid) => {
    const localVariables = figma.variables.getLocalVariables("COLOR")
    updatePaletteVariables(grid, localVariables)
}

const makePaletteVariables = (grid: Matrix.Grid) => {

    const collection = figma.variables.createVariableCollection(paletteCollectionName);
    collection.renameMode(collection.modes[0].modeId, "Value")
    const matrix = JSON.parse(JSON.stringify(grid)) as Matrix.Grid

    insertBlackWhiteSwatchesGenome(matrix)
    matrix.columns.map(column => {
        column.rows.map(swatch => {
            createColorVariable(collection, swatch)
        })
    })
    insertAlphaSwatchesGenome(collection, matrix)
}

const insertBlackWhiteSwatchesGenome = (matrix: Matrix.Grid) => {
    // If the optimization is Genome, insert white and black in the neutral column
    if (isGenomeOptimization(matrix)) {
        matrix.columns[matrix.columns.length - 1].rows.unshift(whiteSwatch)
        matrix.columns[matrix.columns.length - 1].rows.push(blackSwatch)
    }
}

const insertAlphaSwatchesGenome = (collection: VariableCollection, matrix: Matrix.Grid) => {
    // If optimization is 'Genome', insert alpha variables...
    if (isGenomeOptimization(matrix)) createAlphaVariables(collection)
}