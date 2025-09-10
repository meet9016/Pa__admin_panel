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

      onReady={editor => {
        // Set fixed height to the DOM editable element
        const editableDom = editor.ui.getEditableElement();
        if (editableDom) {
          editableDom.style.minHeight = '260px';
          editableDom.style.height = '260px';
          editableDom.style.maxHeight = '260px';
          editableDom.style.overflowY = 'auto';
        }

        // Set styles on the internal CKEditor view (for consistency)
        editor.editing.view.change((writer) => {
          const editableView = editor.editing.view.document.getRoot();
          if (editableView) {
            writer.setStyle('min-height', '260px', editableView);
            writer.setStyle('height', '260px', editableView);
            writer.setStyle('max-height', '260px', editableView);
            writer.setStyle('overflow-y', 'auto', editableView);
          }
        });
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
