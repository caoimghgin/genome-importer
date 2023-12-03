let localVariables: Variable[] = []

const dataType = "COLOR"
const collectionTitle = "contextual"
const darkModeTitle = "dark"
const lightModeTitle = "light"

export const contextualVariables = (update: Boolean) => {

    if (update) {
        console.log("TBD! I don't have an update routine for contextual variables")
        return
    }

    localVariables = figma.variables.getLocalVariables(dataType)
    const collection = createContextualVariableCollection()

    createContextualVariable(collection, "paper/~/pp", ["neutral/025", "neutral/900"])
    createContextualVariable(collection, "paper/~/p", ["neutral/015", "neutral/925"])
    createContextualVariable(collection, "paper/~/~", ["neutral/000", "neutral/950"])
    createContextualVariable(collection, "paper/~/f", ["neutral/000", "neutral/950"])

    createContextualVariable(collection, "ink/~/pp", ["neutral/200", "neutral/075"])
    createContextualVariable(collection, "ink/~/p", ["neutral/400", "neutral/050"])
    createContextualVariable(collection, "ink/~/~", ["neutral/800", "neutral/025"])
    createContextualVariable(collection, "ink/~/f", ["neutral/925", "neutral/000"])
    createContextualVariable(collection, "ink/~/ff", ["neutral/950", "neutral/000"])
    createContextualVariable(collection, "ink/brand/~", ["primary/400", "primary/075"])
    createContextualVariable(collection, "ink/system/~", ["system/400", "system/085"])

    createContextualVariable(collection, "thread/~/p", ["neutral/025", "neutral/600"])
    createContextualVariable(collection, "thread/~/~", ["neutral/050", "neutral/400"])
    createContextualVariable(collection, "thread/~/f", ["neutral/075", "neutral/200"])
    createContextualVariable(collection, "thread/~/ff", ["neutral/085", "neutral/100"])

    createContextualVariable(collection, "paint/~/primary", ["primary/400", "primary/300"])
    createContextualVariable(collection, "paint/~/secondary", ["neutral/400", "neutral/300"])
    createContextualVariable(collection, "paint/~/info", ["info/400", "info/300"])
    createContextualVariable(collection, "paint/~/highlight", ["highlight/075", "highlight/075"])

    createContextualVariable(collection, "chromatic/primary/active", ["primary/600", "primary/500"])
    createContextualVariable(collection, "chromatic/primary/hover", ["primary/300", "primary/200"])
    createContextualVariable(collection, "chromatic/primary/disabled", ["primary/085", "primary/800"])

    createContextualVariable(collection, "chromatic/secondary/active", ["neutral/050", "neutral/900"])
    createContextualVariable(collection, "chromatic/secondary/hover", ["neutral/025", "neutral/800"])
    createContextualVariable(collection, "chromatic/secondary/disabled", ["neutral/400", "neutral/400"])

    createContextualVariable(collection, "chromatic/positive/active", ["positive/600", "positive/500"])
    createContextualVariable(collection, "chromatic/positive/hover", ["positive/300", "positive/200"])
    createContextualVariable(collection, "chromatic/positive/disabled", ["positive/085", "positive/800"])

    createContextualVariable(collection, "chromatic/negative/active", ["negative/600", "negative/500"])
    createContextualVariable(collection, "chromatic/negative/hover", ["negative/300", "negative/200"])
    createContextualVariable(collection, "chromatic/negative/disabled", ["negative/085", "negative/800"])

    createContextualVariable(collection, "stamp/~/white", ["neutral/000", "neutral/000"])
    createContextualVariable(collection, "stamp/~/black", ["neutral/950", "neutral/950"])
    createContextualVariable(collection, "stamp/~/transparent", ["alpha/transparent/~", "alpha/transparent/~"])

}

const createContextualVariable = (collection: VariableCollection, contextual: string, mode: Array<string> ) => {
    
    let variable = getVariable(contextual)
    if (!variable) variable = createVariable(contextual, collection)
    bindPaletteToVariableAlias(collection, variable, mode[0], mode[1])

    function getVariable(name: string) {
        const variable = localVariables.filter(item => item.name === name)
        return (variable ? variable[0] : null)
    }
}

const createVariable = (name: string, collection: VariableCollection) => {
    return figma.variables.createVariable(name, collection.id, dataType)
}

const createContextualVariableCollection = () => {
    const result = figma.variables.createVariableCollection(collectionTitle);
    result.renameMode(result.modes[0].modeId, lightModeTitle)
    result.addMode(darkModeTitle)
    return result
}

const bindPaletteToVariableAlias = (collection: VariableCollection, variable: Variable, light: string, dark: string ) => {
    const lightMode = localVariables.filter(item => item.name === light)[0]
    const darkMode = localVariables.filter(item => item.name === dark)[0]
    variable.setValueForMode(collection.modes[0].modeId, figma.variables.createVariableAlias(lightMode))
    variable.setValueForMode(collection.modes[1].modeId, figma.variables.createVariableAlias(darkMode))
}