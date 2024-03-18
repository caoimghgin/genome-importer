import { Matrix } from "../../genome/modules/SwatchMatrix"
import { whiteSwatch, blackSwatch } from "../constants"

export const insertBlackWhiteSwatches = (matrix: Matrix.Grid) => {
    if (matrix.optimization === "Univers") blackSwatch.weight = "999"
    matrix.columns[matrix.columns.length - 1].rows.unshift(whiteSwatch)
    matrix.columns[matrix.columns.length - 1].rows.push(blackSwatch)
}