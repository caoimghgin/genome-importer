 export const variableCollectionExists = (name: string) => {
    const localVariableCollections = figma.variables.getLocalVariableCollections()
    const localVariableCollectionsNames = localVariableCollections.map(item => item.name)
    return localVariableCollectionsNames.includes(name)
}