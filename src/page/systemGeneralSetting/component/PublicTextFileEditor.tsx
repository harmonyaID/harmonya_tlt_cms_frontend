import { useEffect, useState } from 'react'

// Ganti sesuai domain web public kalian
const DOMAIN_PUBLIC = String(import.meta.env.VITE_DOMAIN_PUBLIC)

// Token statis untuk demo (harus sama persis dengan yang di route.ts Next.js)
const TOKEN = 'demoglobal2026'

type Status = 'idle' | 'loading' | 'saving' | 'saved' | 'error'

type PublicTextFileEditorProps = {
    // Public file name, e.g "llms.txt" or "robots.txt"
    fileName: string
    // Internal API path on the public website, e.g "/api/internal/llms"
    apiPath: string
    inputId: string
}

// Editor for a plain text file served by the public website (llms.txt, robots.txt)
const PublicTextFileEditor = ({
    fileName,
    apiPath,
    inputId,
}: PublicTextFileEditorProps) => {
    const API_URL: string = DOMAIN_PUBLIC + apiPath

    const [content, setContent] = useState('')
    const [originalContent, setOriginalContent] = useState('')
    const [status, setStatus] = useState<Status>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        loadContent()
    }, [])

    async function loadContent() {
        setStatus('loading')
        setErrorMessage('')
        try {
            const res = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })

            if (!res.ok) {
                throw new Error(`Failed to load (status ${res.status})`)
            }

            const data = await res.json()
            setContent(data.content ?? '')
            setOriginalContent(data.content ?? '')
            setStatus('idle')
        } catch (err) {
            console.error(err)
            setStatus('error')
            setErrorMessage(
                `Failed to retrieve the contents of ${fileName} from the server.`,
            )
        }
    }

    async function handleSave() {
        setStatus('saving')
        setErrorMessage('')
        try {
            const res = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify({ content }),
            })

            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(
                    data.error ?? `Failed to save (status ${res.status})`,
                )
            }

            setOriginalContent(content)
            setStatus('saved')
            setTimeout(() => setStatus('idle'), 2000)
        } catch (err) {
            console.error(err)
            setStatus('error')
            setErrorMessage(
                err instanceof Error ? err.message : 'Failed to save.',
            )
        }
    }

    const hasChanges = content !== originalContent

    return (
        <div>
            <h5 className="fs-18 fw-500 mb-0">Edit {fileName}</h5>
            <p className="fs-14 text-neutral-300">
                File public{' '}
                <code>
                    {DOMAIN_PUBLIC}/{fileName}
                </code>
            </p>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                disabled={status === 'loading' || status === 'saving'}
                id={inputId}
                className="form-control"
                placeholder={`Isi ${fileName}...`}
            />

            <div className="hstack gap-3 pt-3">
                <button
                    onClick={handleSave}
                    disabled={
                        !hasChanges ||
                        status === 'saving' ||
                        status === 'loading'
                    }
                    className="btn btn-primary">
                    {status === 'saving' ? 'Menyimpan...' : 'Save'}
                </button>

                <button
                    onClick={loadContent}
                    disabled={status === 'loading' || status === 'saving'}
                    className="btn btn-outline-primary">
                    Reload
                </button>

                {status === 'loading' && (
                    <span style={{ color: '#666' }}>Loading...</span>
                )}
                {status === 'saved' && (
                    <span style={{ color: 'green' }}>Success Save ✓</span>
                )}
                {status === 'error' && (
                    <span style={{ color: 'crimson' }}>{errorMessage}</span>
                )}
            </div>
        </div>
    )
}

export default PublicTextFileEditor
