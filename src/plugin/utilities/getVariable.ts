export const getLocalVariable = (name: string, variables: Variable[]) => {
    const result = findVariable(name, variables)
    return result.length === 1 ? result[0] : null
}

export const getLocalVariables = (dataType: VariableResolvedDataType | null) => {
    return dataType ? figma.variables.getLocalVariables(dataType) : figma.variables.getLocalVariables()
}

function findVariable(name: string, variables: Variable[]) {
    return variables.filter((variable) => {
        return nameScrubber(variable.name) === nameScrubber(name)
    })
    function nameScrubber(name: string) {
        return name.split('/').filter(item => item !== "~").join("/")
    }
}

