import { Matrix } from "../../genome/modules/SwatchMatrix";
import { swatchDescription } from "./swatchDescription";
import { hexToRgb } from "./hexToRgb";
import { styleName } from "./styleName";

export const createColorStyle = (swatch: Matrix.Swatch) => {
    const result = figma.createPaintStyle()
    result.name = styleName(swatch)
    result.description = swatchDescription(swatch)
    result.paints = [{ type: 'SOLID', color: hexToRgb(swatch.hex) }]
    return result
}
