import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

/* firebase.initializeApp({
  apiKey: 'AIzaSyDmtraQk6rXhD6_yoWbuCgPNg_ruCRaWc0',
  authDomain: 'peliculas-294019.firebaseapp.com',
  databaseURL: 'https://peliculas-294019.firebaseio.com',
  projectId: 'peliculas-294019',
  storageBucket: 'peliculas-294019.appspot.com',
  messagingSenderId: '617239861404',
  appId: '1:617239861404:web:51bfc0f548e4a239cbf559',
}); */

class FileUpload extends Component {
  /* handleOnChange(event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`pictures/${file.name}`);
    const task = storageRef.put(file);

    task.on(
      'state_changed',
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          uploadValue: percentage,
        });
      },
      (error) => {
        console.error(error.message);
      },
      () => {
        firebase
          .storage()
          .ref('pictures')
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({
              picture: url,
            });
          });
      },
    );
  } */

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
        <img width="90" src={form.photoURL} />
      </div>
    );
  }
}

export default FileUpload;
