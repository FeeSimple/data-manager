import React, { useMemo, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const baseStyle = {
  height: '160px',
  borderWidth: 2,
  borderColor: '#ccd6e1',
  borderStyle: 'dashed',
  borderRadius: 6,
  lineHeight: '160px',
  textAlign: 'center',
}

const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
}

const acceptStyle = {
  borderStyle: 'solid',
  borderColor: '#00e676'
}

const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#ff1744'
}

export function StyledDropzone (props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'image/*' })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  )

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

/// ///////////////////////////

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
  backgroundColor: '#f9f9f9'
}

const thumb = {
  display: 'inline-block',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  margin: 5,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
}

const thumbInner = {
  display: 'block',
  minWidth: 0,
  overflow: 'hidden',
  height: 90
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
}

export function StyledPreview (props) {
  const { handleUploadedImg } = props
  const [files, setFiles] = useState([])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )

      handleUploadedImg(acceptedFiles)
    }
  })

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  )

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <span className='user-detail-label-small'>
          Drag 'n' drop or click to select images
        </span>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  )
}
