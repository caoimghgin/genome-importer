import { Matrix } from "../../genome/modules/SwatchMatrix";

export const swatchDescription = (swatch: Matrix.Swatch) => {
    const result = [];
    result.push(`$${`palette`}-${swatch.semantic}-${swatch.weight}` + "\n")
    result.push('\n');
    result.push('hex: : ' + swatch.hex.toUpperCase() + '\n');
    result.push('L*: ' + swatch.lightness + ' (' + swatch.l_target + ')' + '\n');
    result.push('\n');
    result.push('#FFFFFF-4.5:1: ' + swatch.WCAG2_W_45 + '\n');
    result.push('#FFFFFF-3.0:1: ' + swatch.WCAG2_W_30 + '\n');
    result.push('#000000-4.5:1: ' + swatch.WCAG2_K_45 + '\n');
    result.push('#000000-3.0:1: ' + swatch.WCAG2_K_30 + '\n');
    return result.join('');
}