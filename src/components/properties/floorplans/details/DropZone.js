import React, {useMemo, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import ipfs from './ipfs'

const baseStyle = {
  width: 100,
  height: 100,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
};

const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};

const acceptStyle = {
  borderStyle: 'solid',
  borderColor: '#00e676'
};

const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#ff1744'
};

export function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*'});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

  return (
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}

//////////////////////////////


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


export function StyledPreview(props) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps, getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      acceptedFiles.map(file => {
        console.log('file:', file);
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          let fileBuf = Buffer(reader.result)
          console.log('file buffer', fileBuf)

          ipfs.files.add(fileBuf, (error, result) => {
            if(error) {
              console.error(error)
              return
            }
            console.log('ipfs.files.add - res: ', result);
            // this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
            //   return this.setState({ ipfsHash: result[0].hash })
            //   console.log('ifpsHash', this.state.ipfsHash)
            // })
      
            // this.setState({ ipfsHash: result[0].hash })
      
            ipfs.files.cat(result[0].hash, (error, res) => {
              if(error) {
                console.error(error)
                return
              }
              
              // Convert the image buffer to base64-encoded string so that it can be displayed with HTML "img" tag
              // this.setState({ buffer: "data:image/png;base64," + Buffer(res).toString('base64') })
      
              console.log('ipfs.files.cat - res: ', Buffer(res).toString('base64'));
            })
          })

        }
      })
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

  return (
    <section>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <span className='user-detail-label-small'>Drag 'n' drop or click to select images</span>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}
