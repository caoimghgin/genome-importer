import { Matrix } from "../../genome/modules/SwatchMatrix";

export const paletteCollectionName = 'palette'
export const contextualCollectionName = 'contextual'
export const dimensionCollectionName = 'dimension'

export const blackHexValue = "#FFFFFF"
export const whiteHexValue = "#000000"
export const alphas = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]

export const isGenomeOptimization = (matrix: Matrix.Grid) => {
    return (matrix.optimization.startsWith("Genome"))
}

export const whiteSwatch = {
    HSV: { H: 0, S: 0, V: 100 },
    LAB: { L: 100, a: 0, b: 0 },
    LCH: { L: 100, C: 0, H: 297 },
    WCAG2: 1,
    WCAG2_K_30: true,
    WCAG2_K_45: true,
    WCAG2_W_30: false,
    WCAG2_W_45: false,
    WCAG3: 0,
    colorChecker: { name: 'WHITE-05', dE: 1.74 },
    column: "J",
    hex: "#FFFFFF",
    id: "J0",
    isNeutral: true,
    isPinned: false,
    isUserDefined: false,
    l_target: 100,
    lightness: 100,
    row: 0,
    semantic: "neutral",
    weight: "000"
} as Matrix.Swatch

export const blackSwatch = {
    HSV: { H: 0, S: 0, V: 0 },
    LAB: { L: 0, a: 0, b: 0 },
    LCH: { L: 0, C: 0, H: 0 },
    id: "J21",
    column: "J",
    row: 21,
    hex: "#000000",
    semantic: "neutral",
    weight: "950",
    lightness: 0,
    colorChecker: { name: 'BLACK-15', dE: 12.57 },
    isUserDefined: false,
    isPinned: false,
    isNeutral: true,
    l_target: 0,
    WCAG2: 21,
    WCAG3: 108,
    WCAG2_W_30: true,
    WCAG2_W_45: true,
    WCAG2_K_30: false,
    WCAG2_K_45: false
} as Matrix.Swatch