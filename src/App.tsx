
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Button, Container, Inline, Text, Muted, VerticalSpace, Dropdown, DropdownOption, TabsOption, Tabs, FileUploadDropzone, Columns, IconPlus32, render } from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { CreateSwatchesEvent, SwatchesCreatedEvent, ClosePluginEvent, GetEnvironmentEvent, EnvironmentEvent } from './events/handlers'
import { Options } from './genome/constants/weightedTargets'
import { Mapper } from './genome/mapper'
import { Matrix } from './genome/modules/SwatchMatrix'
import { LoadingView } from './views/LoadingView'
import { RenderPreview } from './views/RenderPreview'
import { OptimizationMessage } from './views/OptimizationMessage'

function App() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [optimizationOptions, setOptimizationOptions] = useState(Array<DropdownOption>({ value: 'Popism' }))
    const [optimizationValue, setOptimizationValue] = useState<string>('Popism');
    const [gridModel, setGridModel] = useState<Matrix.Grid>();
    const [showCompletedModal, setShowCompletedModal] = useState<boolean>(false)
    const [props, setProps] = useState<any>( { type: "VARIABLES", categories: ["PALETTE", "CONTEXTUAL", "DRAW"], update: false })

    useEffect(() => {

        emit<GetEnvironmentEvent>("GET_ENVIRONMENT")

        on<EnvironmentEvent>('ENVIRONMENT', (data) => {
            if (data.paletteCollectionExists ) {
                setProps({ type: "VARIABLES", categories: ["PALETTE", "CONTEXTUAL", "DRAW"], update: true })
            }
        })

        on<SwatchesCreatedEvent>('SWATCHES_CREATED', () => {
            setIsLoading(false)
        })

        setOptimizationOptions(Options.map(item => { 
            return { value: item.label } 
        }))

    }, [])

    useEffect(() => {
        console.log(gridModel)
    }, [gridModel])

    const handleClosePlugin = () => {
        emit<ClosePluginEvent>("CLOSE_PLUGIN")
    }

    const handleImportFile = async () => {
        const grid = Mapper.optimizeSwatches(gridModel!, optimizationValue)
        await setIsLoading(true)
        emit<CreateSwatchesEvent>('CREATE_SWATCHES', {grid:grid, props:props})
    }

    const handleSelectedFiles = (files: Array<File>) => {
        const fileReader = new FileReader()
        fileReader.readAsText(files[0], 'UTF-8')
        fileReader.onload = (event) => {
            if (event && event.target) {
                // @ts-ignore
                setGridModel(JSON.parse(event.target.result) as Matrix.Grid)
            }
        }
    }

    const handleOptimizationChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
        setOptimizationValue(event.currentTarget.value);
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
                    {FileUploadDropzoneContent()}
                </FileUploadDropzone>
                {gridModel ? OptimizationMessage(optimizationValue) : null}
                {isLoading ? null : Footer()}
            </Container>
        )

        function FileUploadDropzoneContent() {
            if (gridModel) return RenderPreview(gridModel, optimizationValue)
            return (
                <Text align="center">
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <Muted>xxxDrag a gcm.json file or select to import</Muted>
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                    <VerticalSpace space="extraLarge" />
                </Text>
            )
        }

        function Footer() {
            return (
                <div style={{ position: "fixed", left: "0", bottom: "0", width: "100%", height: "56px" }}>
                    <hr style={{ color: '#E2E2E2', backgroundColor: '#E2E2E2', borderColor: '#E2E2E2', height: 0.5 }} />
                    <div style={{ padding: "11px 16px 5px 16px" }}>
                        <Columns>
                            <a href='https://www.genomecolor.space/' target='_blank' rel='noopener noreferrer'><IconPlus32 /></a>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Inline space="small">
                                    <Button onClick={handleClosePlugin} secondary>Cancel</Button>
                                    {gridModel ? <Button onClick={handleImportFile}>Import</Button> : <Button disabled onClick={handleImportFile}>Import</Button>}
                                </Inline>
                            </div>
                        </Columns>
                    </div>
                </div>
            )
        }
    }

    const OptionsView = () => {
        return (
            <Container space="medium">
                <VerticalSpace space="extraLarge" />
                Show all options...
            </Container>
        )
    }

    const handleShowCompletedModel = () => {
        setShowCompletedModal(!showCompletedModal)
    }

    const MainView = () => {

        const [tabOption, setTabOption] = useState<string>('Import');

        const tabOptions: Array<TabsOption> = [
            { children: ImportView(), value: 'Import' },
            { children: OptionsView(), value: 'Options' },
        ]

        return (
            <div>
                <Tabs onValueChange={handleValueChange} options={tabOptions} value={tabOption} />
            </div>
        )

        function handleValueChange(newValue: string) {
            console.log(newValue);
            setTabOption(newValue);
        }

    }

    return MainView()

}

export default render(App)