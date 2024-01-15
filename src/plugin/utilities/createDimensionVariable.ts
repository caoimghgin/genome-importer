import { Matrix } from "../../genome/modules/SwatchMatrix";
import { variableName } from "./variableName";
import { hexToRgb } from "./hexToRgb";
import { swatchDescription } from "./swatchDescription";

export const createDimensionVariable = async (collection: VariableCollection, name: string, value: number) => {
    const result = figma.variables.createVariable(name, collection.id, 'FLOAT')
    result.setValueForMode(collection.defaultModeId,value)
    // result.description = swatchDescription(swatch)
    // return result
}