import React, { Component } from 'react';

//Componente para la carga de imágenes
class FileUpload extends Component {
  render() {
    const { onChange, form } = this.props;
    return (
      <div>
        <progress value={form.uploadValue} style={{ width: '100%' }}>
          {form.uploadValue} %
        </progress>
        <br />
        <input
          type="file"
          onChange={onChange.bind(this)}
          style={{ width: '100%' }}
        />
        <br />
        <img width="90" alt="" src={form.photoURL} />
      </div>
    );
  }
}

export default FileUpload;
