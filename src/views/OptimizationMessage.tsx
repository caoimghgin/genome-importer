import { h } from 'preact'
import { Inline, Text, Container, VerticalSpace, Link } from '@create-figma-plugin/ui'
import { Matrix } from '../genome/modules/SwatchMatrix'
import { Mapper } from '../genome/mapper'
import { Options } from '../genome/constants/weightedTargets'

export const OptimizationMessage = (optimization: string) => {

    const opt = Options.find(item => item.label === optimization)?.value
    const index = opt ? parseInt(opt) : 0

    switch (index) {
        case WeightedTargetsOptions.Base:
            return (
                <div>
                    <VerticalSpace space="large" />
                    <Text align="left">The <b>Base Optimization</b> divided into L*5 steps. All optimizations are derived from these values.</Text>
                </div>
            )
        case WeightedTargetsOptions.Genome:
            return (
                <div>
                    <VerticalSpace space="large" />
                    <Text align="left">The <b>Genome Optimization</b> is a meaningfully weighted, semantically named Color System designed for prototypical white-label and dark-mode support. The numeric weights are inspired by typography where 400 is normal.</Text>
                    <VerticalSpace space="large" />
                    <Text align="left">The base weight is <b>400</b> (L*45) and passes for 4.5:1 ratio on weights <b>000</b>, <b>015</b>, <b>025</b>. Weight <b>300</b> (L*50) passes 4.5:1 on <b>000</b> and <b>950</b>.</Text>
                    <VerticalSpace space="large" />
                    <Text align="left">Weight <b>200</b> passes for 3:1 ratio on weights <b>000</b>, <b>015</b>, <b>025</b> and weight <b>100</b> passes 3:1 on <b>000</b> only.</Text>
                </div>
            )

        case WeightedTargetsOptions.Genome2:
            return (
                <div>
                    <VerticalSpace space="large" />
                    <Text align="left">The <b>Genome Optimization</b> is a meaningfully weighted, semantically named Color System designed for prototypical white-label and dark-mode support. The numeric weights are inspired by typography where 400 is normal.</Text>
                    <VerticalSpace space="large" />
                    <Text align="left">The base weight is <b>400</b> (L*45) and passes for 4.5:1 ratio on weights <b>000</b>, <b>015</b>, <b>025</b>. Weight <b>300</b> (L*50) passes 4.5:1 on <b>000</b> and <b>950</b>.</Text>
                    <VerticalSpace space="large" />
                    <Text align="left">Weight <b>200</b> passes for 3:1 ratio on weights <b>000</b>, <b>015</b>, <b>025</b> and weight <b>100</b> passes 3:1 on <b>000</b> only.</Text>
                </div>
            )
        case WeightedTargetsOptions.Carbon:
            return (
                <div>
                    <VerticalSpace space="large" />
                    <Text align="left">The <b>Carbon Optimization</b> base weight is <b>60</b> (L*45) which passes for 4.5:1 ratio on white and weight <b>10</b>. Weight <b>50</b> passes for 3:1 on white.</Text>
                </div>
            )
        case WeightedTargetsOptions.Lightning:
            return (
                <div>
                    <VerticalSpace space="large" />
                    <Text align="left"><b>NOTE:</b> Genome optimizations align with Lightning more than any other color system. All results are an approximation.</Text>
                    <VerticalSpace space="large" />
                    <Text align="left">"<i>Color solutions for accessibility are built into our color system. Each color’s tones are given a value that ranges from 0 through 100. In this color system, 100 points (points) is white and 0 points is black"</i> - <Link href="https://www.lightningdesignsystem.com/guidelines/color/our-color-system/" target="_blank">Lightning Design System</Link></Text>
                    <VerticalSpace space="extraSmall" />
                    <ul>
                        <li><Link href="https://www.lightningdesignsystem.com/guidelines/color/our-color-system/" target="_blank">Lightning Design Colors</Link></li>
                        <li><Link href="https://medium.com/salesforce-ux/the-salesforce-color-system-c7c6b5b9c577" target="_blank">Introducing the Salesforce Color System</Link></li>

                        
                    </ul>
                </div>
            )
        case WeightedTargetsOptions.AdobeSpectrum:
            return (
                <div>
                    <VerticalSpace space="large" />
                    <Text align="left"><b>NOTE:</b> Spectrum progress all hues from 100 to 1300 but the darkest neutral shade only goes to 900. Genome spreads the neutrals to match the numerics of hues. Results are an approximation.</Text>
                    <VerticalSpace space="large" />
                    <Text align="left">"<i>Spectrum uses 13 colors per color theme with a set of 14 tints and shades per color."</i> - <Link href="https://spectrum.adobe.com/page/color-system/" target="_blank">Spectrum Design System</Link></Text>
                    <VerticalSpace space="extraSmall" />
                    <ul>
                        <li><Link href=" https://spectrum.adobe.com/page/color-system/" target="_blank">Spectrum Colors</Link></li>
                    </ul>
                </div>
            )
        case WeightedTargetsOptions.Ant:
            return (
                <div>
                    <VerticalSpace space="large" />
                    <Text align="left"><b>NOTE:</b> Because Ant does not use LAB or LCH color models, numeric densities may not be reliable for WCAG contrast. However, Genome normalizes Ant in OKLab so results are a approximation to the original. </Text>
                    <VerticalSpace space="large" />
                    <Text align="left">"<i>Ant Design's base color palette totals 120 colors, including 12 primary colors and their derivative colors. Ant Design's design team preferred to design with the HSB color model."</i> - <Link href=" https://ant.design/docs/spec/colors" target="_blank">Ant Design System</Link></Text>
                    <VerticalSpace space="extraSmall" />
                    <ul>
                        <li><Link href=" https://ant.design/docs/spec/colors" target="_blank">Ant Colors</Link></li>
                    </ul>
                </div>
            )
        case WeightedTargetsOptions.Material:
            return (
                <div>
                    <VerticalSpace space="large" />
                    <Text align="left">Material Design offers the <Link href="https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors" target="_blank">Material palette generator</Link>. Genome results are only an approximation.</Text>
                </div>

            )
        case WeightedTargetsOptions.AccessiblePalette:
            return (
                <div>
                    <VerticalSpace space="large" />
                    <Text align="left"><b>NOTE:</b> Genome does not offer fine control over hue and saturation as AccessiblePalette does. Results are only an approximation.</Text>
                    <VerticalSpace space="large" />
                    <Text align="left">"<i><b>Accessible Palette</b> is an app for building color systems with consistent lightness and predictable contrast ratios across color levels."</i> - <Link href="https://wildbit.com/blog/author/eugene" target="_blank">Eugene Fedorenko</Link></Text>
                    <VerticalSpace space="extraSmall" />
                    <ul>
                        <li><Link href="https://accessiblepalette.com/" target="_blank">Accessible Palette</Link></li>
                        <VerticalSpace space="extraSmall" />
                        <li><Link href="https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems" target="_blank">Accessible Palette: stop using HSL for color systems</Link></li>
                    </ul>
                </div>
            )
        case WeightedTargetsOptions.ColorBox:
            return (
                <div>
                    <VerticalSpace space="large" />
                    <Text align="left"><b>NOTE:</b> Genome does not offer fine control over hue and saturation as ColorBox does. Results are only an approximation.</Text>
                    <VerticalSpace space="large" />
                    <Text align="left"><i>"Way back then, I wrote <b>ColorBox</b> because I was frustrated with existing color systems and color tools."</i> - <Link href="https://twitter.com/kvyn_" target="_blank">Kevyn Arnott</Link></Text>
                    <VerticalSpace space="extraSmall" />
                    <ul>
                        <li><Link href="https://colorbox.io/" target="_blank">ColorBox</Link></li>
                        <VerticalSpace space="extraSmall" />
                        <li><Link href="https://kvyn.medium.com/introducing-the-new-colorbox-e0109c021729" target="_blank">Introducing the new ColorBox</Link></li>
                        <VerticalSpace space="extraSmall" />
                        <li><Link href="https://design.lyft.com/re-approaching-color-9e604ba22c88" target="_blank">Re-approaching Color</Link></li>
                    </ul>
                </div>
            )
    }

}

// A Meaningfully Weighted, Semantically Named Color System designed for white-label and dark-mode support.

enum WeightedTargetsOptions {
    Base = 0,
    Genome,
    Genome2,
    Carbon,
    Lightning,
    AdobeSpectrum,
    Ant,
    Material,
    AccessiblePalette,
    ColorBox,
}