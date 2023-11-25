import chroma from "chroma-js";
import { blackHexValue, whiteHexValue, alphas } from "../constants"

export const createAlphaVariables = (collection: VariableCollection) => {

    createTints([blackHexValue, whiteHexValue], alphas)
    createTransparent()

    function createTints(solids: string[], alphas: number[]) {
        solids.map(solid => {
            alphas.map(alpha => {
                const name = `alpha/${(solid === "#FFFFFF" ? "lighten" : "darken")}/${alpha * 100}a`
                const rgba = chroma(solid).alpha(alpha).rgba()
                const value = {r:rgba[0]/255, g:rgba[1]/255, b:rgba[2]/255, a:rgba[3]}
                const result = figma.variables.createVariable(name, collection.id, 'COLOR')
                result.setValueForMode(collection.defaultModeId, value)
            })
        })
    }

    function createTransparent() {
        const name = `alpha/transparent/~`
        const rgba = chroma(whiteHexValue).alpha(0).rgba()
        const value = {r:rgba[0]/255, g:rgba[1]/255, b:rgba[2]/255, a:rgba[3]}
        const result = figma.variables.createVariable(name, collection.id, 'COLOR')
        result.setValueForMode(collection.defaultModeId, value)
    }

}