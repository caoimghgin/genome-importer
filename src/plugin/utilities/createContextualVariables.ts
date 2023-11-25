let localVariables: Variable[] = []

export const createContextualVariables = () => {
    localVariables = figma.variables.getLocalVariables("COLOR")
    const collection = createContextualVariableCollection();

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
    createContextualVariable(collection, "paint/~/transparent", ["alpha/transparent/~", "alpha/transparent/~"])

    createContextualVariable(collection, "stamp/~/white", ["neutral/000", "neutral/000"])
    createContextualVariable(collection, "stamp/~/black", ["neutral/950", "neutral/950"])

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
    return figma.variables.createVariable(name, collection.id, "COLOR")
}

const createContextualVariableCollection = () => {
    const result = figma.variables.createVariableCollection("contextual");
    result.renameMode(result.modes[0].modeId, "Light")
    result.addMode("Dark")
    return result
}

const bindPaletteToVariableAlias = (collection: VariableCollection, variable: Variable, light: string, dark: string ) => {
    const lightMode = localVariables.filter(item => item.name === light)[0]
    const darkMode = localVariables.filter(item => item.name === dark)[0]
    variable.setValueForMode(collection.modes[0].modeId, figma.variables.createVariableAlias(lightMode))
    variable.setValueForMode(collection.modes[1].modeId, figma.variables.createVariableAlias(darkMode))
}