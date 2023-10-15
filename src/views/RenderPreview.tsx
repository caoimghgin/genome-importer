import { h } from 'preact'
import { Inline } from '@create-figma-plugin/ui'
import { Matrix } from '../genome/modules/SwatchMatrix'
import { Mapper } from '../genome/mapper'

export const RenderPreview = (swatches: Matrix.Grid, optimization: string) => {

    if (!swatches) return
    const grid = Mapper.optimizeSwatches(swatches, optimization)

    grid.columns.map(col => {
        console.log(col)
        col.rows.map(row => {
            console.log(row.hex)
        })
    })

    return (
        <div>
            <Inline>
                {grid.columns.map(col => {
                    return (
                        <div style={{ display: "block" }}>
                            {col.rows.map(row => {
                                return <div style={{ backgroundColor: row.hex, height: 10, width: 30 }} />
                            })}
                        </div>
                    )
                })}
            </Inline>
        </div>

    )

}