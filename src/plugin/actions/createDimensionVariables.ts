import { Matrix } from "../../genome/modules/SwatchMatrix";
import { createColorVariable } from "../utilities/createColorVariable";
import { createAlphaVariables } from "../utilities/createAlphaVariables";
import { dimensionCollectionName, isGenomeOptimization } from "../constants";
import { insertBlackWhiteSwatches } from "../utilities/insertBlackWhiteSwatches";
import { createDimensionVariable } from "../utilities/createDimensionVariable";

export const createDimensionVariables = () => {
    const collection = figma.variables.createVariableCollection(dimensionCollectionName);
    collection.renameMode(collection.modes[0].modeId, "Value")

    createDimensionVariable(collection, "space/000", 0)
    createDimensionVariable(collection, "space/010", 2)
    createDimensionVariable(collection, "space/020", 4)
    createDimensionVariable(collection, "space/030", 8)
    createDimensionVariable(collection, "space/040", 12)
    createDimensionVariable(collection, "space/050", 16)
    createDimensionVariable(collection, "space/060", 24)
    createDimensionVariable(collection, "space/070", 32)
    createDimensionVariable(collection, "space/080", 40)
    createDimensionVariable(collection, "space/090", 48)
    createDimensionVariable(collection, "space/100", 64)

    createDimensionVariable(collection, "radii/pppp", 1000)
    createDimensionVariable(collection, "radii/ppp", 24)
    createDimensionVariable(collection, "radii/pp", 16)
    createDimensionVariable(collection, "radii/p", 12)
    createDimensionVariable(collection, "radii/~", 8)
    createDimensionVariable(collection, "radii/f", 6)
    createDimensionVariable(collection, "radii/ff", 4)
    createDimensionVariable(collection, "radii/fff", 2)
    createDimensionVariable(collection, "radii/ffff", 0)

    createDimensionVariable(collection, "size/ppp", 16)
    createDimensionVariable(collection, "size/pp", 24)
    createDimensionVariable(collection, "size/p", 36)
    createDimensionVariable(collection, "size/~", 44)
    createDimensionVariable(collection, "size/f", 60)
    createDimensionVariable(collection, "size/ff", 76)

    createDimensionVariable(collection, "column/16", 1280)
    createDimensionVariable(collection, "column/12", 1024)
    createDimensionVariable(collection, "column/08", 768)
    createDimensionVariable(collection, "column/04", 393)
    createDimensionVariable(collection, "column/02", 393)

}