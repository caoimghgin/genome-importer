import { Matrix } from "../../genome/modules/SwatchMatrix";
import { variableName } from "./variableName";
import { hexToRgb } from "./hexToRgb";
import { swatchDescription } from "./swatchDescription";

export const createColorVariable = async (collection: VariableCollection, swatch: Matrix.Swatch) => {
    const result = figma.variables.createVariable(variableName(swatch), collection.id, 'COLOR')
    result.setValueForMode(collection.defaultModeId, hexToRgb(swatch.hex))
    result.description = swatchDescription(swatch)
    return result
}