
import { blackHexValue, whiteHexValue, alphas } from "../constants"
import { hexToRgb } from "./hexToRgb"

export const createAlphaStyles = () => {

    createTints([blackHexValue, whiteHexValue], alphas)
    createTransparent()

    function createTints(solids: string[], alphas: number[]) {
        solids.map(solid => {
            alphas.map(alpha => {
                const name = `${`palette`}/alpha/${(solid === whiteHexValue ? "lighten" : "darken")}/${alpha * 100}a`
                const result = figma.createPaintStyle()
                result.name = name
                result.paints = [{ type: 'SOLID', opacity: alpha, color: hexToRgb(whiteHexValue) }]
            })
        })
    }

    function createTransparent() {
        const name = `${`palette`}/transparent/~`
        const result = figma.createPaintStyle()
        result.name = name
        result.paints = [{ type: 'SOLID', opacity: 0, color: hexToRgb(whiteHexValue) }]
    }

}