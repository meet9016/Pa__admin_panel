'use client'

import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

type Props = {
  value: string
  onChange: (data: string) => void
}

const MyCKEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor as any}
      data={value}
      onChange={(_event, editor) => {
        const data = editor.getData()
        onChange(data) // call parent handler
        console.log("CKEditor Data:", data)
      }}
      config={{
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
          '|',
          'insertTable',
          '|',
          'undo',
          'redo'
        ],
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties'
          ]
        }
      }}
    />
  )
}

export default MyCKEditor
