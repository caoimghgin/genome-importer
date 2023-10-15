
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Button, Container, Inline, Stack, Text, Muted, Textbox, VerticalSpace, Dropdown, DropdownOption, TabsOption, Tabs, FileUploadDropzone, render } from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { CreateSwatchesEvent, SwatchesCreatedEvent, ClosePluginEvent } from './events/handlers'
import { SuccessModal } from './views/SuccessModal'
import { Options } from './genome/constants/weightedTargets'
import { Mapper } from './genome/mapper'
import { Matrix } from './genome/modules/SwatchMatrix'
import { LoadingView } from './views/LoadingView'

function App() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showCompletedModal, setShowCompletedModal] = useState<boolean>(false)
    const [optimizationOptions, setOptimizationOptions] = useState(Array<DropdownOption>({ value: 'Genome' }))
    const [optimizationValue, setOptimizationValue] = useState<string>('Genome');
    const [swatches, setSwatches] = useState<Matrix.Grid>();

    useEffect(() => {
        setOptimizationOptions(Options.map(item => { return { value: item.label } }))
        // on<SwatchesCreatedEvent>

        on<SwatchesCreatedEvent>('SWATCHES_CREATED', () => {
            console.log("I can stop the LoadingView because everything is done...")
            setIsLoading(false)
        })

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

    const handleImportFile = async () => {
        const grid = Mapper.optimizeSwatches(swatches!, optimizationValue)
        console.log("I should present LoadingView...")
        await setIsLoading(true)
        // await new Promise(timer => setTimeout(timer, 100))

        emit<CreateSwatchesEvent>('CREATE_SWATCHES', grid)
    }

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
                {isLoading ? LoadingView() : null}
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