// QuillEditor.tsx
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ 'color': [] }, { 'background': [] }], // 글자 색상과 배경 색상 옵션 추가
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
    />
  );
};

export default QuillEditor;
