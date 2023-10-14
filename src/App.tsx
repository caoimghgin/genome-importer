
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Button, Container, Inline, Stack, Text, Muted, Textbox, VerticalSpace, Dropdown, DropdownOption, TabsOption, Tabs, FileUploadDropzone, render } from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { CreateSwatchesEvent, RectanglesCreatedEvent, ClosePluginEvent } from './events/handlers'
import { SuccessModal } from './views/SuccessModal'
import { Options } from './genome/constants/weightedTargets'
import { Mapper } from './genome/mapper'
import { Matrix } from './genome/modules/SwatchMatrix'
import { WeightedTargets } from './genome/constants/weightedTargets'
import { SwatchMapModel } from './genome/models/SwatchMapModel'

function App() {

    const [count, setCount] = useState<string>("5")
    const [showCompletedModal, setShowCompletedModal] = useState<boolean>(false)
    const [optimizationOptions, setOptimizationOptions] = useState(Array<DropdownOption>({ value: 'Genome' }))
    const [optimizationValue, setOptimizationValue] = useState<string>('Genome');
    const [swatches, setSwatches] = useState<Matrix.Grid>();
    const [foo, setFoo] = useState<Matrix.Grid>();

    useEffect(() => {
        setOptimizationOptions(Options.map(item => { return { value: item.label } }))
    }, [])

    useEffect(() => {
        console.log("Swatches have been set ->", swatches)
    }, [swatches])

    const handleShowCompletedModel = () => {
        setShowCompletedModal(!showCompletedModal)
    }

    const handleClosePlugin = () => {
        emit<ClosePluginEvent>("CLOSE_PLUGIN")
    }

    const handleImportFile = () => {
        createModel()
        // //
        // // This is doing too much. 
        // //
        // const optimization = Options.find(item => item.label === optimizationValue)?.value
        // const index = optimization ? parseInt(optimization) : 0
        // const mapModel = new SwatchMapModel(WeightedTargets(index))
        // if (swatches && mapModel) {
        //     let grid = Mapper.mapSwatchesToTarget(swatches, mapModel)
        //     grid = Mapper.removeUndefinedWeightSwatches(grid)
        //     console.log(grid)
        //     // emit<CreateSwatchesEvent>('CREATE_SWATCHES', grid)
        // }
    }

    const createModel = () => {

        console.log("SWATCHES", swatches!)
        console.log("ONCE SWATCHES ARE SET, THE SHOULD NEVER CHANGE....")




        const optimization = Options.find(item => item.label === optimizationValue)?.value
        const index = optimization ? parseInt(optimization) : 0
        const mapModel = new SwatchMapModel(WeightedTargets(index))
        console.log("mapModel", mapModel!)
        const kdkdk = Mapper.mapSwatchesToTarget(swatches!, mapModel)
        let grid = {...kdkdk}
        console.log("grid (1)", grid)
        // grid = Mapper.removeUndefinedWeightSwatches({...grid})
        // // I'd like to set this to a setState variable, I think....
        // console.log("grid (2)", grid)

        const foo = grid.columns.map(col => {
            return col.rows.map(row => row).filter(swatch => Boolean(swatch.weight))
        })

        console.log("MIGhtY FOOoo!", foo)

    }


    // export const removeUndefinedWeightSwatches = (grid: Matrix.Grid) => {
    //     const result = {...grid}
    //     result.columns.forEach(function (column, index) {
    //         let weightOptimizedSwatches = column.rows.filter((swatch) => {
    //             return swatch.weight !== undefined;
    //         });
    //         result.columns[index].rows = weightOptimizedSwatches;
    //     });
    
    //     return result;
    // };

    const handleSelectedFiles = (files: Array<File>) => {
        const fileReader = new FileReader()
        fileReader.readAsText(files[0], 'UTF-8')
        fileReader.onload = (event) => {
            if (event && event.target) {
                // @ts-ignore
                setSwatches(JSON.parse(event.target.result) as Matrix.Grid)
            }
        }
    }

    const handleOptimizationChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        console.log(newValue);
        setOptimizationValue(newValue);
    }

    const ImportView = () => {
        return (
            <Container space="medium">
                <VerticalSpace space="extraLarge" />
                <Dropdown onChange={handleOptimizationChange} options={optimizationOptions} value={optimizationValue} variant="border" />
                <VerticalSpace space="extraLarge" />
                <FileUploadDropzone onSelectedFiles={handleSelectedFiles}>
                    <Text align="center">
                        <VerticalSpace space="extraLarge" />
                        <VerticalSpace space="extraLarge" />
                        <VerticalSpace space="extraLarge" />
                        <Muted>Text</Muted>
                        <VerticalSpace space="extraLarge" />
                        <VerticalSpace space="extraLarge" />
                        <VerticalSpace space="extraLarge" />
                    </Text>
                </FileUploadDropzone>
                <VerticalSpace space="extraLarge" />
                <Stack space="medium">
                    <Inline space="small">
                        { swatches ? <Button onClick={handleImportFile}>Create</Button> : <Button disabled onClick={handleImportFile}>Create</Button>} 
                        <Button onClick={handleClosePlugin} secondary>Cancel</Button>
                    </Inline>
                </Stack>
                <SuccessModal message={count} show={showCompletedModal} toggle={handleShowCompletedModel} complete={handleClosePlugin} />
            </Container>
        )
    }

    const OptionsView = () => {
        return (
            <Container space="medium">
                <VerticalSpace space="extraLarge" />
                Show options...
            </Container>
        )
    }

    const MainView = () => {

        const [tabOption, setTabOption] = useState<string>('Import');

        const tabOptions: Array<TabsOption> = [
            { children: ImportView(), value: 'Import' },
            { children: OptionsView(), value: 'Options' },
        ]

        return <Tabs onValueChange={handleValueChange} options={tabOptions} value={tabOption} />

        function handleValueChange(newValue: string) {
            console.log(newValue);
            setTabOption(newValue);
        }

    }

    // Return rendered view
    return MainView()


}

export default render(App)