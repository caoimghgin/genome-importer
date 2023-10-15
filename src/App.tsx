
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
        const acceptedFileTypes = ['application/json'];
        return (
            <Container space="medium">
                {isLoading ? LoadingView() : null}
                <VerticalSpace space="extraLarge" />
                <Dropdown onChange={handleOptimizationChange} options={optimizationOptions} value={optimizationValue} variant="border" />
                <VerticalSpace space="extraLarge" />
                <FileUploadDropzone acceptedFileTypes={acceptedFileTypes} onSelectedFiles={handleSelectedFiles}>
                    <Text align="center">
                        <VerticalSpace space="extraLarge" />
                        <VerticalSpace space="extraLarge" />
                        <VerticalSpace space="extraLarge" />
                        <Muted>Drag a gcm file or select to import</Muted>
                        <VerticalSpace space="extraLarge" />
                        <VerticalSpace space="extraLarge" />
                        <VerticalSpace space="extraLarge" />
                    </Text>
                </FileUploadDropzone>
                {isLoading ? null : Footer()}
            </Container>
        )

        function Footer() {
            return (
                <div style={{ position: "fixed", left: "0", bottom: "0", width: "100%", height: "56px" }}>
                    <hr style={{ color: '#E2E2E2', backgroundColor: '#E2E2E2', borderColor: '#E2E2E2', height: 0.5 }} />
                    <div style={{ padding: "11px 16px 5px 16px" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Inline space="small">
                                <Button onClick={handleClosePlugin} secondary>Cancel</Button>
                                {swatches ? <Button onClick={handleImportFile}>Import</Button> : <Button disabled onClick={handleImportFile}>Import</Button>}
                            </Inline>
                        </div>
                    </div>
                </div>
            )
        }
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