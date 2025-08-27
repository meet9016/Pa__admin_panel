'use client' // ✅ important for Next.js App Router

import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

type Props = {
  value: string
  onChange: (data: string) => void
}

const MyCKEditor: React.FC<Props> = ({ value, onChange }) => {
  console.log("value", value);

  const [editorData, setEditorData] = useState(value);
  return (
    <CKEditor
      // editor={ClassicEditor as any}
      // data={value}
      editor={ClassicEditor as any}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        setEditorData(data);
        console.log("CKEditor Data:", data);
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
          // 🚫 Removed: 'imageUpload', 'insertImage', 'mediaEmbed'
        ],
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
        }
        // removePlugins: ['Image', 'ImageToolbar', 'ImageCaption', 'ImageUpload', 'MediaEmbed']
      }}
    // onReady={editor => {
    //   // Set fixed height
    //   const editable = editor.ui.getEditableElement()
    //   if (editable) {
    //     editable.style.height = '400px'
    //     // editable.style.borderRadius = '8px'
    //   }
    // }}
    // onChange={(_, editor) => {
    //   const data = editor.getData()
    //   onChange(data)
    // }}
    />
  )
}

export default MyCKEditor