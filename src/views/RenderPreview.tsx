import { h } from 'preact'
import { Inline, Text } from '@create-figma-plugin/ui'
import { Matrix } from '../genome/modules/SwatchMatrix'
import { Mapper } from '../genome/mapper'

export const RenderPreview = (swatches: Matrix.Grid, optimization: string) => {

    if (!swatches) return

    const grid = Mapper.optimizeSwatches(swatches, optimization)

    return (
        <div>
            <Inline>
                {grid.columns.map(col => {
                    return (
                        <div style={{ display: "block" }}>
                            {col.rows.map(swatch => {
                                return renderSwatch(swatch)
                            })}
                        </div>
                    )
                })}
            </Inline>
        </div>
    )

}

const renderSwatch = (swatch: Matrix.Swatch) => {
    const color = swatch.WCAG2_W_45 || swatch.WCAG2_W_30 ? '#FFF' : '#000'
    let symbol = "-"
    if (swatch.isUserDefined) symbol = "⭐️"
    if (swatch.isPinned) symbol = "📍"
    const containerStyle = {display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: swatch.hex, color: color, height: 16, width: 42}
    const contentStyle = {verticalAlign: "middle", textAlign: "center",  fontSize : 10, color: color}
    return (
        <div style={containerStyle}>
            <Text style={contentStyle}>{symbol}</Text>
        </div>
    )
}