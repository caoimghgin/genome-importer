let localVariables: Variable[] = []
let localVariableCollectionNames: String[]
const dataType = "COLOR"
const collectionTitle = "contextual"
const darkModeTitle = "dark"
const lightModeTitle = "light"

export const createContextualVariables = () => {

    localVariableCollectionNames = figma.variables.getLocalVariableCollections().map(item => item.name)

    const variables = figma.variables.getLocalVariables()
    const inkFf = getLocalVariableXXX("ink/ff", variables)

    const collectionNames = figma.variables.getLocalVariableCollections().map(item => item.name)
    if (collectionNames.includes("contextual")) console.log("Contextual collection exists...") // Don't create it...
    if (inkFf) console.log("ink/ff exists...") // don't create it...


    localVariables = figma.variables.getLocalVariables(dataType)
    const collection = createContextualVariableCollection()

    createContextualVariable(collection, "canvas/~/pp", ["neutral/025", "neutral/900"])
    createContextualVariable(collection, "canvas/~/p", ["neutral/015", "neutral/900"])
    createContextualVariable(collection, "canvas/~/~", ["neutral/000", "neutral/950"])
    createContextualVariable(collection, "canvas/~/f", ["neutral/000", "neutral/950"])

    createContextualVariable(collection, "paper/~/pp", ["neutral/025", "neutral/800"])
    createContextualVariable(collection, "paper/~/p", ["neutral/015", "neutral/800"])
    createContextualVariable(collection, "paper/~/~", ["neutral/000", "neutral/900"])

    createContextualVariable(collection, "paper/positive/~", ["positive/025", "positive/700"])
    createContextualVariable(collection, "paper/negative/~", ["negative/025", "negative/700"])
    createContextualVariable(collection, "paper/warning/~", ["highlight/025", "highlight/700"])
    createContextualVariable(collection, "paper/info/~", ["info/025", "info/700"])

    createContextualVariable(collection, "ink/~/ppp", ["neutral/100", "neutral/075"])
    createContextualVariable(collection, "ink/~/pp", ["neutral/200", "neutral/075"])
    createContextualVariable(collection, "ink/~/p", ["neutral/400", "neutral/050"])
    createContextualVariable(collection, "ink/~/~", ["neutral/800", "neutral/025"])
    createContextualVariable(collection, "ink/~/f", ["neutral/925", "neutral/000"])
    createContextualVariable(collection, "ink/~/ff", ["neutral/950", "neutral/000"])

    createContextualVariable(collection, "ink/primary/p", ["primary/400", "primary/085"])
    createContextualVariable(collection, "ink/primary/~", ["primary/400", "primary/075"])

    createContextualVariable(collection, "ink/positive/p", ["positive/400", "positive/085"])
    createContextualVariable(collection, "ink/positive/~", ["positive/400", "positive/075"])

    createContextualVariable(collection, "ink/negative/p", ["negative/400", "negative/085"])
    createContextualVariable(collection, "ink/negative/~", ["negative/400", "negative/075"])

    createContextualVariable(collection, "ink/warning/p", ["highlight/400", "highlight/085"])
    createContextualVariable(collection, "ink/warning/~", ["highlight/400", "highlight/075"])

    createContextualVariable(collection, "ink/info/p", ["info/400", "info/085"])
    createContextualVariable(collection, "ink/info/~", ["info/400", "info/075"])

    createContextualVariable(collection, "ink/system/p", ["system/400", "system/085"])
    createContextualVariable(collection, "ink/system/~", ["system/400", "system/075"])

    createContextualVariable(collection, "thread/~/p", ["neutral/025", "neutral/400"])
    createContextualVariable(collection, "thread/~/~", ["neutral/050", "neutral/400"])
    createContextualVariable(collection, "thread/~/f", ["neutral/075", "neutral/500"])
    createContextualVariable(collection, "thread/~/ff", ["neutral/085", "neutral/600"])

    createContextualVariable(collection, "paint/primary/~", ["primary/400", "primary/300"])
    createContextualVariable(collection, "paint/primary/f", ["primary/600", "primary/600"])
    createContextualVariable(collection, "paint/primary/ff", ["primary/925", "primary/925"])

    createContextualVariable(collection, "paint/secondary/~", ["secondary/400", "secondary/300"])
    createContextualVariable(collection, "paint/secondary/f", ["secondary/600", "secondary/600"])
    createContextualVariable(collection, "paint/secondary/ff", ["secondary/925", "secondary/925"])

    createContextualVariable(collection, "paint/positive/~", ["positive/400", "positive/300"])
    createContextualVariable(collection, "paint/positive/f", ["positive/600", "positive/600"])
    createContextualVariable(collection, "paint/positive/ff", ["positive/925", "positive/925"])

    createContextualVariable(collection, "paint/negative/~", ["negative/400", "negative/300"])
    createContextualVariable(collection, "paint/negative/f", ["negative/600", "negative/600"])
    createContextualVariable(collection, "paint/negative/ff", ["negative/925", "negative/925"])

    createContextualVariable(collection, "paint/warning/~", ["highlight/400", "highlight/300"])
    createContextualVariable(collection, "paint/warning/f", ["highlight/600", "highlight/600"])
    createContextualVariable(collection, "paint/warning/ff", ["highlight/925", "highlight/925"])

    createContextualVariable(collection, "paint/info/~", ["info/400", "info/300"])
    createContextualVariable(collection, "paint/info/f", ["info/600", "info/600"])
    createContextualVariable(collection, "paint/info/ff", ["info/925", "info/925"])

    createContextualVariable(collection, "paint/system/~", ["system/400", "system/300"])
    createContextualVariable(collection, "paint/system/f", ["system/600", "system/600"])
    createContextualVariable(collection, "paint/system/ff", ["system/925", "system/925"])

    createContextualVariable(collection, "paint/neutral/~", ["neutral/400", "neutral/300"])
    createContextualVariable(collection, "paint/neutral/f", ["neutral/600", "neutral/600"])
    createContextualVariable(collection, "paint/neutral/ff", ["neutral/925", "neutral/925"])

    createContextualVariable(collection, "stamp/white/pp", ["neutral/075", "neutral/075"])
    createContextualVariable(collection, "stamp/white/p", ["neutral/025", "neutral/025"])
    createContextualVariable(collection, "stamp/white/~", ["neutral/000", "neutral/000"])
    createContextualVariable(collection, "stamp/black/pp", ["neutral/800", "neutral/800"])
    createContextualVariable(collection, "stamp/black/p", ["neutral/900", "neutral/900"])
    createContextualVariable(collection, "stamp/black/~", ["neutral/950", "neutral/950"])
    createContextualVariable(collection, "stamp/system/~", ["system/075", "system/075"])

    createContextualVariable(collection, "chromatic/p/pp", ["alpha/lighten/50a", "alpha/lighten/50a"])
    createContextualVariable(collection, "chromatic/p/p", ["alpha/lighten/20a", "alpha/lighten/20a"])
    createContextualVariable(collection, "chromatic/p/f", ["alpha/darken/20a", "alpha/darken/20a"])
    createContextualVariable(collection, "chromatic/p/ff", ["alpha/darken/50a", "alpha/darken/50a"])

    createContextualVariable(collection, "chromatic/~/pp", ["alpha/lighten/50a", "alpha/lighten/50a"])
    createContextualVariable(collection, "chromatic/~/p", ["alpha/lighten/20a", "alpha/lighten/20a"])
    createContextualVariable(collection, "chromatic/~/~", ["alpha/lighten/20a", "alpha/lighten/20a"])
    createContextualVariable(collection, "chromatic/~/f", ["alpha/darken/20a", "alpha/darken/20a"])
    createContextualVariable(collection, "chromatic/~/ff", ["alpha/darken/50a", "alpha/darken/50a"])

    createContextualVariable(collection, "chromatic/f/pp", ["alpha/lighten/50a", "alpha/lighten/50a"])
    createContextualVariable(collection, "chromatic/f/p", ["alpha/lighten/20a", "alpha/lighten/20a"])
    createContextualVariable(collection, "chromatic/f/f", ["alpha/darken/20a", "alpha/darken/20a"])
    createContextualVariable(collection, "chromatic/f/ff", ["alpha/darken/50a", "alpha/darken/50a"])
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
