import { createContextualVariablesPopism } from "./contextualVariablesPopism"
let localVariables: Variable[] = []
// let localVariableCollectionNames: String[]
const dataType = "COLOR"
const collectionTitle = "Mode"
const darkModeTitle = "Dark"
const lightModeTitle = "Light"

export const createContextualVariables = (optimization: string | null) => {

    if (optimization === "Popism") {
        createContextualVariablesPopism()
        return
    }

    // localVariableCollectionNames = figma.variables.getLocalVariableCollections().map(item => item.name)
    // const variables = figma.variables.getLocalVariables()
    // const inkFf = getLocalVariableXXX("ink/ff", variables)
    // const collectionNames = figma.variables.getLocalVariableCollections().map(item => item.name)
    // if (collectionNames.includes("contextual")) console.log("Contextual collection exists...") // Don't create it...
    // if (inkFf) console.log("ink/ff exists...") // don't create it...

    localVariables = figma.variables.getLocalVariables(dataType)
    const collection = createContextualVariableCollection()
    createThemeCollection("~", collection)
    createThemeCollection("Magazine", collection)
    createThemeCollection("Live Coverage", collection)

}

const createThemeCollection = (theme: string, collection:VariableCollection) => {

    createContextualVariable(collection, `${theme}/canvas/~/pp`, ["neutral/050", "neutral/900"])
    createContextualVariable(collection, `${theme}/canvas/~/p`, ["neutral/025", "neutral/900"])
    createContextualVariable(collection, `${theme}/canvas/~/~`, ["neutral/000", "neutral/950"])
    createContextualVariable(collection, `${theme}/canvas/~/f`, ["neutral/000", "neutral/950"])

    createContextualVariable(collection, `${theme}/paper/~/pp`, ["neutral/050", "neutral/800"])
    createContextualVariable(collection, `${theme}/paper/~/p`, ["neutral/025", "neutral/800"])
    createContextualVariable(collection, `${theme}/paper/~/~`, ["neutral/000", "neutral/900"])

    createContextualVariable(collection, `${theme}/positive/~`, ["positive/050", "positive/700"])
    createContextualVariable(collection, `${theme}/negative/~`, ["negative/050", "negative/700"])
    createContextualVariable(collection, `${theme}/warning/~`, ["highlight/050", "highlight/700"])
    createContextualVariable(collection, `${theme}/info/~`, ["info/050", "info/700"])

    createContextualVariable(collection, `${theme}/ink/~/ppp`, ["neutral/100", "neutral/350"])
    createContextualVariable(collection, `${theme}/ink/~/pp`, ["neutral/200", "neutral/350"])
    createContextualVariable(collection, `${theme}/ink/~/p`, ["neutral/550", "neutral/050"])
    createContextualVariable(collection, `${theme}/ink/~/~`, ["neutral/800", "neutral/050"])
    createContextualVariable(collection, `${theme}/ink/~/f`, ["neutral/950", "neutral/000"])
    createContextualVariable(collection, `${theme}/ink/~/ff`, ["neutral/950", "neutral/000"])

    createContextualVariable(collection, `${theme}/stamp/white/pp`, ["neutral/350", "neutral/350"])
    createContextualVariable(collection, `${theme}/stamp/white/p`, ["neutral/050", "neutral/050"])
    createContextualVariable(collection, `${theme}/stamp/white/~`, ["neutral/000", "neutral/000"])
    createContextualVariable(collection, `${theme}/stamp/black/pp`, ["neutral/800", "neutral/800"])
    createContextualVariable(collection, `${theme}/stamp/black/p`, ["neutral/900", "neutral/900"])
    createContextualVariable(collection, `${theme}/stamp/black/~`, ["neutral/950", "neutral/950"])
    createContextualVariable(collection, `${theme}/stamp/system/~`, ["system/100", "system/100"])

    // createContextualVariable(collection, "ink/primary/p", ["primary/550", "primary/100"])
    // createContextualVariable(collection, "ink/primary/~", ["primary/550", "primary/100"])

    // createContextualVariable(collection, "ink/positive/p", ["positive/550", "positive/100"])
    // createContextualVariable(collection, "ink/positive/~", ["positive/550", "positive/100"])

    // createContextualVariable(collection, "ink/negative/p", ["negative/550", "negative/100"])
    // createContextualVariable(collection, "ink/negative/~", ["negative/550", "negative/100"])

    // createContextualVariable(collection, "ink/warning/p", ["highlight/550", "highlight/100"])
    // createContextualVariable(collection, "ink/warning/~", ["highlight/550", "highlight/100"])

    // createContextualVariable(collection, "ink/info/p", ["info/550", "info/100"])
    // createContextualVariable(collection, "ink/info/~", ["info/550", "info/100"])

    // createContextualVariable(collection, "ink/system/p", ["system/550", "system/100"])
    // createContextualVariable(collection, "ink/system/~", ["system/550", "system/100"])

    // createContextualVariable(collection, "thread/~/p", ["neutral/050", "neutral/550"])
    // createContextualVariable(collection, "thread/~/~", ["neutral/050", "neutral/550"])
    // createContextualVariable(collection, "thread/~/f", ["neutral/350", "neutral/500"])
    // createContextualVariable(collection, "thread/~/ff", ["neutral/100", "neutral/600"])

    // createContextualVariable(collection, "paint/primary/~", ["primary/550", "primary/500"])
    // createContextualVariable(collection, "paint/primary/f", ["primary/600", "primary/600"])
    // createContextualVariable(collection, "paint/primary/ff", ["primary/950", "primary/950"])

    // createContextualVariable(collection, "paint/secondary/~", ["secondary/550", "secondary/500"])
    // createContextualVariable(collection, "paint/secondary/f", ["secondary/600", "secondary/600"])
    // createContextualVariable(collection, "paint/secondary/ff", ["secondary/950", "secondary/950"])

    // createContextualVariable(collection, "paint/positive/~", ["positive/550", "positive/500"])
    // createContextualVariable(collection, "paint/positive/f", ["positive/600", "positive/600"])
    // createContextualVariable(collection, "paint/positive/ff", ["positive/950", "positive/950"])

    // createContextualVariable(collection, "paint/negative/~", ["negative/550", "negative/500"])
    // createContextualVariable(collection, "paint/negative/f", ["negative/600", "negative/600"])
    // createContextualVariable(collection, "paint/negative/ff", ["negative/950", "negative/950"])

    // createContextualVariable(collection, "paint/warning/~", ["highlight/550", "highlight/500"])
    // createContextualVariable(collection, "paint/warning/f", ["highlight/600", "highlight/600"])
    // createContextualVariable(collection, "paint/warning/ff", ["highlight/950", "highlight/950"])

    // createContextualVariable(collection, "paint/info/~", ["info/550", "info/500"])
    // createContextualVariable(collection, "paint/info/f", ["info/600", "info/600"])
    // createContextualVariable(collection, "paint/info/ff", ["info/950", "info/950"])

    // createContextualVariable(collection, "paint/system/~", ["system/550", "system/500"])
    // createContextualVariable(collection, "paint/system/f", ["system/600", "system/600"])
    // createContextualVariable(collection, "paint/system/ff", ["system/950", "system/950"])

    // createContextualVariable(collection, "paint/neutral/~", ["neutral/550", "neutral/500"])
    // createContextualVariable(collection, "paint/neutral/f", ["neutral/600", "neutral/600"])
    // createContextualVariable(collection, "paint/neutral/ff", ["neutral/950", "neutral/950"])


    // createContextualVariable(collection, "chromatic/p/pp", ["alpha/lighten/50a", "alpha/lighten/50a"])
    // createContextualVariable(collection, "chromatic/p/p", ["alpha/lighten/20a", "alpha/lighten/20a"])
    // createContextualVariable(collection, "chromatic/p/f", ["alpha/darken/20a", "alpha/darken/20a"])
    // createContextualVariable(collection, "chromatic/p/ff", ["alpha/darken/50a", "alpha/darken/50a"])

    // createContextualVariable(collection, "chromatic/~/pp", ["alpha/lighten/50a", "alpha/lighten/50a"])
    // createContextualVariable(collection, "chromatic/~/p", ["alpha/lighten/20a", "alpha/lighten/20a"])
    // createContextualVariable(collection, "chromatic/~/~", ["alpha/lighten/20a", "alpha/lighten/20a"])
    // createContextualVariable(collection, "chromatic/~/f", ["alpha/darken/20a", "alpha/darken/20a"])
    // createContextualVariable(collection, "chromatic/~/ff", ["alpha/darken/50a", "alpha/darken/50a"])

    // createContextualVariable(collection, "chromatic/f/pp", ["alpha/lighten/50a", "alpha/lighten/50a"])
    // createContextualVariable(collection, "chromatic/f/p", ["alpha/lighten/20a", "alpha/lighten/20a"])
    // createContextualVariable(collection, "chromatic/f/f", ["alpha/darken/20a", "alpha/darken/20a"])
    // createContextualVariable(collection, "chromatic/f/ff", ["alpha/darken/50a", "alpha/darken/50a"])
}

const createContextualVariable = (collection: VariableCollection, contextual: string, mode: Array<string> ) => {
    
    const variable = createVariable(contextual, collection)
    bindPaletteToVariableAlias(collection, variable, mode[0], mode[1])

    // function getVariable(name: string) {
    //     const variable = localVariables.filter(item => item.name === name)
    //     return (variable ? variable[0] : null)
    // }
}

const createVariable = (name: string, collection: VariableCollection) => {
    const result = localVariables.filter(item => item.name === name)[0]
    return result ? result : figma.variables.createVariable(name, collection.id, dataType)
}

const createContextualVariableCollection = () => {
    let result = figma.variables.getLocalVariableCollections().filter(item => item.name === collectionTitle)[0]
    if (result) return result
    result = figma.variables.createVariableCollection(collectionTitle);
    result.renameMode(result.modes[0].modeId, lightModeTitle)
    // Free Figma accounts are limited to one mode. Continue as best as possible.
    try { result.addMode(darkModeTitle) } catch (error) { console.error(error) }
    return result
}

const bindPaletteToVariableAlias = (collection: VariableCollection, variable: Variable, light: string, dark: string ) => {
    const lightMode = localVariables.filter(item => item.name === light)[0]
    variable.setValueForMode(collection.modes[0].modeId, figma.variables.createVariableAlias(lightMode))
    if (collection.modes.length > 1) {
        const darkMode = localVariables.filter(item => item.name === dark)[0]
        variable.setValueForMode(collection.modes[1].modeId, figma.variables.createVariableAlias(darkMode))
    }
}

const getLocalVariableXXX = (name: string, variables: Variable[]) => {
    const result = findVariable(name, variables)
    return result.length === 1 ? result[0] : null
}

function findVariable(name: string, variables: Variable[]) {
    return variables.filter((variable) => {
        return nameScrubber(variable.name) === nameScrubber(name)
    })
    function nameScrubber(name: string) {
        return name.split('/').filter(item => item !== "~").join("/")
    }
}
