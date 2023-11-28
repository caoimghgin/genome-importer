import { Matrix } from "../../genome/modules/SwatchMatrix"
import { variableName } from "./variableName"
import { hexToRgb } from "./hexToRgb";
import { swatchDescription } from "./swatchDescription"

export const updatePaletteVariables = (grid: Matrix.Grid) => {
    const localVariables = figma.variables.getLocalVariables("COLOR")
    grid.columns.forEach(function (column) {
        column.rows.forEach(function (swatch) {
            const name = variableName(swatch)
            const variable = localVariables.filter(item => item.name === name)
            if (variable.length) {
                const result = variable[0]
                const collection = figma.variables.getVariableCollectionById(result.variableCollectionId)
                if (collection) {
                    result.setValueForMode(collection.defaultModeId, hexToRgb(swatch.hex))
                    result.description = swatchDescription(swatch)
                }
            }
        })
    })
}
