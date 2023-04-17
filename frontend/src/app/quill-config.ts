import { QuillConfig } from 'ngx-quill';

const fontSizes = [true];

const quillConfig: QuillConfig = {
  modules: {
    syntax: false,
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, true] }],
      [{ font: [] }],

      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      // [{ size: fontSizes }], // custom dropdown

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [],
      ['link', 'image', 'video'], // link and image, video
    ],
  },
  customOptions: [
    {
      import: 'formats/font',
      whitelist: ['arial'],
    },
    // {
    //   import: 'attributors/style/size',
    //   whitelist: fontSizes,
    // },
  ],
  placeholder: 'Write proposal here ...',
  bounds: 'app-editor',
};

/** Configuration for the quill library as specified by npm/ngx-quill */
export default quillConfig;
