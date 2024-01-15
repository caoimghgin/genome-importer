import { showUI, on, emit } from '@create-figma-plugin/utilities'
import { ClosePluginEvent, CreateSwatchesEvent, GetEnvironmentEvent, EnvironmentEvent } from '../events/handlers'
import { createPaletteVariables } from './actions/createPaletteVariables'
import { createContextualVariables } from './utilities/contextualVariables'
import { createPaletteStyles } from './actions/createPaletteStyles'
import { renderPalette } from './actions/renderPalette'
import { createPaletteVariablesMatrix } from './actions/createPaletteVariablesMatrix'
import { variableCollectionExists } from './utilities/variableCollectionExists'
import { paletteCollectionName, contextualCollectionName } from "./constants";
import { updatePaletteVariables } from './utilities/updatePaletteVariables'
import { updatePaletteVariablesMatrix } from './actions/updatePaletteVariablesMatrix'
import { createDimensionVariables } from './actions/createDimensionVariables'

export default function () {

    showUI({ height: 660, width: 500 })

    on<GetEnvironmentEvent>('GET_ENVIRONMENT', async () => {
        console.log("Oh, you want the ENVIRONMENT huh?")
        const foo = variableCollectionExists(paletteCollectionName)
        const bar = variableCollectionExists(contextualCollectionName)
        emit<EnvironmentEvent>('ENVIRONMENT', {paletteCollectionExists: foo, contextualCollectionExists: bar})
    })

    on<CreateSwatchesEvent>('CREATE_SWATCHES', async ({grid, props}) => {
        await loadFonts()
        if (isType(props, "VARIABLES")) {

            if (props.update) {
                if (isAction(props, "PALETTE")) updatePaletteVariables(grid)
                if (isAction(props, "DRAW")) updatePaletteVariablesMatrix(grid)

            } else {
                if (isAction(props, "PALETTE")) createPaletteVariables(grid)
                if (isAction(props, "CONTEXTUAL")) createContextualVariables()
                if (isAction(props, "DRAW")) createPaletteVariablesMatrix(grid, props.type)
                createDimensionVariables()
            }

        } else if (isType(props, "STYLES")) {
            if (isAction(props, "PALETTE")) createPaletteStyles(grid, props.update)
            if (isAction(props, "DRAW")) renderPalette(grid, props.type)
        }
        figma.closePlugin()
    })

    on<ClosePluginEvent>('CLOSE_PLUGIN', () => {
        figma.closePlugin()
    })
}

const isType = (props: any, action: string) => {
    return props.type === action
}

const isAction = (props: any, action: string) => {
    return props.categories.includes(action)
}

const loadFonts = async () => {
    return Promise.all([
        figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
        figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
        figma.loadFontAsync({ family: 'Inter', style: 'Bold' })
    ])
};