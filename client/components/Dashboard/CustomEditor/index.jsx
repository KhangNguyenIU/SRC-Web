import dynamic from 'next/dynamic';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

/**
 * @author
 * @function Editor
 **/

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const Editor = ({content, setContent}) => {
//   useEffect(()=>{
//     console.log({content})
//   })
  return (
    <React.Fragment>
      <div>Editor</div>
      <Quill modules={modules} value={content} onChange={setContent} />
    </React.Fragment>
  );
};
export default Editor;
