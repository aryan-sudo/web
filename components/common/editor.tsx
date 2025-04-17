'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({ content }: { content: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false, // Make it read-only since it's just for display
    parseOptions: {
      preserveWhitespace: 'full',
    },
  })

  return <EditorContent editor={editor} />
}

export default Tiptap