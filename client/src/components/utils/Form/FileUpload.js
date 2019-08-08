import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';



class FileUpload extends Component {
  // constructor() {
  //   super();
  //   this.onDrop = (files) => {
  //     this.setState({ files })
  //   };
  //   this.state = {
  //     files: [],
  //     uploading: false
  //   };
  // }
  state = {
    uploadedFiles: [],
    uploading: false
  }

  onDrop = (files) => {
    this.setState({
      uploading: true,
    });
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };
    formData.append("file", files[0]);
    axios.post('/api/users/uploadimage', formData, config).then(response => {
      console.log('response data')
      console.log(response.data)
      this.setState({
        uploading: false,
        uploadedFiles: [
          ...this.state.uploadedFiles,
          response.data
        ]
      }, () => {
        this.props.handleImages(this.state.uploadedFiles);
      });
    });
  }

  handleRemoveImage = () => {

  }

  showUploadedImages = () => (
    this.state.uploadedFiles.map(file => (
      <div
        key={file.public_id}
        onClick={() => this.handleRemoveImage(file.public_id)}
        className="dropzone_box"
      >
        <div
          className="wrap"
          style={{ background: `url(${file.url}) no-repeat` }}
        >
        </div>
      </div>
    ))
  )

  render() {

    return (
      <Dropzone onDrop={(event) => this.onDrop(event)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
            {this.showUploadedImages()}
            {
              this.state.uploading ?
                <div className="dropzone_box" style={{ textAlign: 'center', paddingTop: '60px' }}>
                  <CircularProgress
                    style={{ color: '#00BCD4' }}
                    thickness={7}
                  />
                </div>
                : null
            }
          </section>
        )}
      </Dropzone>
    );
  }
}

export default FileUpload;