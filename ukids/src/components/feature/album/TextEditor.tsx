import React, { useMemo } from 'react';
import ReactQuill from 'react-quill'; // Ensure you have @types/react-quill for TypeScript support
import 'react-quill/dist/quill.snow.css'; // Import styles as needed
import { CustomToolbar } from './CustomToolbar'; // Import the custom toolbar component

const TextEditor: React.FC = () => {
  const modules = useMemo(() => ({
    toolbar: {
      container: "#toolbar",
    },
  }), []);

  return (
    <div>
      <CustomToolbar />
      <ReactQuill theme="snow" modules={modules} />
    </div>
  );
};

export default TextEditor;
