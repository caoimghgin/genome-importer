import { Matrix } from "../../genome/modules/SwatchMatrix"
import { whiteSwatch, blackSwatch } from "../constants"

export const insertBlackWhiteSwatches = (matrix: Matrix.Grid) => {
    matrix.columns[matrix.columns.length - 1].rows.unshift(whiteSwatch)
    matrix.columns[matrix.columns.length - 1].rows.push(blackSwatch)
}