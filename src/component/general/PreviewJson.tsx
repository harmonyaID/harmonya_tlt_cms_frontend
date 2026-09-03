import ReactJson from '@microlink/react-json-view'

const PreviewJson = ({ value, isDark = false }) => {
    return (
        <>
            <ReactJson
                src={value}
                name={false}
                theme={isDark ? 'monokai' : 'rjv-default'}
                collapsed={1}
                displayDataTypes={false}
                enableClipboard={false}
                style={{
                    fontSize: '12px',
                    fontFamily: 'Menlo, monospace',
                    padding: '16px',
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#2A2A2A' : '#F0F0F5',
                }}
            />
        </>
    )
}

export default PreviewJson
