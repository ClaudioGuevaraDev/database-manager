import { Card, CardBody } from '@heroui/react'
import { useTheme } from '@heroui/use-theme'
import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { JSX, useRef, useState } from 'react'

const LINE_HEIGHT_DEFAULT = 24
const MAX_HEIGHT = 200
const PADDING_EXTRA = 20

function PlaygroundEditor(): JSX.Element {
  const [height, setHeight] = useState(LINE_HEIGHT_DEFAULT + PADDING_EXTRA)

  const { theme } = useTheme()
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor): void => {
    editorRef.current = editorInstance

    editorInstance.onDidChangeModelContent(() => {
      const lineCount = editorInstance.getModel()?.getLineCount() ?? 1
      const lineHeight = editorInstance.getOption(editor.EditorOption.lineHeight)
      const newHeight = Math.min(lineCount * lineHeight + PADDING_EXTRA, MAX_HEIGHT)

      setHeight(newHeight)
    })
  }

  return (
    <div>
      <Card className="min-h-20" shadow="md">
        <CardBody>
          <Editor
            language="sql"
            theme={theme === 'dark' ? 'vs-dark' : 'vs'}
            options={{
              fontSize: 24,
              minimap: {
                enabled: false
              },
              lineNumbers: 'relative',
              wordWrap: 'on',
              wrappingIndent: 'indent',
              scrollBeyondLastLine: false
            }}
            height={height}
            onMount={handleEditorDidMount}
          />
        </CardBody>
      </Card>
    </div>
  )
}

export default PlaygroundEditor
