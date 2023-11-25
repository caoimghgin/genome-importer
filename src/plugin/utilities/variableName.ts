import { Matrix } from "../../genome/modules/SwatchMatrix";

export const variableName = (swatch: Matrix.Swatch) => {
    return [swatch.semantic, swatch.weight!.toString()].join('/')
}