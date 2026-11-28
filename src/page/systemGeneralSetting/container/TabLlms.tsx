import PublicTextFileEditor from '@/page/systemGeneralSetting/component/PublicTextFileEditor.tsx'

const TabLlms = () => (
    <PublicTextFileEditor
        fileName="llms.txt"
        apiPath="/api/internal/llms"
        inputId="input-llms-file"
    />
)

export default TabLlms
