import { Matrix } from "../../genome/modules/SwatchMatrix";

export const styleName = (swatch: Matrix.Swatch) => {
    return ['palette', swatch.semantic, swatch.weight!.toString()].join('/');
}