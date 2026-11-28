import PublicTextFileEditor from '@/page/systemGeneralSetting/component/PublicTextFileEditor.tsx'

const TabRobots = () => (
    <PublicTextFileEditor
        fileName="robots.txt"
        apiPath="/api/internal/robots"
        inputId="input-robots-file"
    />
)

export default TabRobots
