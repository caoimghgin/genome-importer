import { accessiblePaletteOptimization } from "../optimizations/accessiblePalette";
import { antOptimization } from "../optimizations/ant";
import { carbonOptimization } from "../optimizations/carbon";
import { colorBoxOptimization } from "../optimizations/colorBox";
import { genomeOptimization } from "../optimizations/genome";
import { genomeOptimization_v2 } from "../optimizations/genome_v2";
import { lightningOptimization } from "../optimizations/lightning";
import { materialOptimization } from "../optimizations/material";
import { newsKitOptimization } from "../optimizations/newsKit";
import { spectrumOptimization } from "../optimizations/spectrum";
import { baseOptimization } from "../optimizations/base";
import { popismOptimization } from "../optimizations/popism";
import { universOptimization } from "../optimizations/univers";

export type weightedTargetsRow = {
    target: number;
    weight: string | undefined;
};

export type weightedTargetsColumn = {
    rows: weightedTargetsRow[];
    neutrals: weightedTargetsRow[];
};

export const Options = [
    { value: '0', label: 'Non-optimized', message: '' },
    { value: '1', label: 'Univers', message: '' },
    { value: '2', label: 'Genome', message: '' },
    { value: '3', label: 'Genome v2', message: '' },
    { value: '4', label: 'Popism', message: '' },
    { value: '5', label: 'IBM Carbon', message: '' },
    { value: '6', label: 'SalesForce Lightning', message: '' },
    { value: '7', label: 'Adobe Spectrum', message: '' },
    { value: '8', label: 'Ant', message: '' },
    { value: '9', label: 'Material', message: '' },
    { value: '10', label: 'Accessible Palette', message: '' },
    { value: '11', label: 'ColorBox', message: '' },
];

enum WeightedTargetsOptions {
    Base = 0,
    Univers,
    Genome,
    Genome2,
    Popism,
    Carbon,
    Lightning,
    AdobeSpectrum,
    Ant,
    Material,
    AccessiblePalette,
    ColorBox,
}

export const WeightedTargets = (index: WeightedTargetsOptions): weightedTargetsColumn => {
    switch (index) {
        case WeightedTargetsOptions.Base:
            return baseOptimization;
        case WeightedTargetsOptions.Carbon:
            return carbonOptimization;
        case WeightedTargetsOptions.Lightning:
            return lightningOptimization;
        case WeightedTargetsOptions.AdobeSpectrum:
            return spectrumOptimization;
        case WeightedTargetsOptions.Ant:
            return antOptimization;
        case WeightedTargetsOptions.AccessiblePalette:
            return accessiblePaletteOptimization;
        case WeightedTargetsOptions.ColorBox:
            return colorBoxOptimization;
        case WeightedTargetsOptions.Genome:
            return genomeOptimization;
        case WeightedTargetsOptions.Genome2:
            return genomeOptimization_v2;
        case WeightedTargetsOptions.Material:
            return materialOptimization;
        case WeightedTargetsOptions.Univers:
            return universOptimization;
        case WeightedTargetsOptions.Popism:
            return popismOptimization;
        default:
            return genomeOptimization;
    }
};