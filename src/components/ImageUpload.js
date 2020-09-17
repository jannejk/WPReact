import React, { Component } from 'react';
import axios from 'axios';


class ImageUpload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: ''
      };
      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      const authToken = localStorage.getItem( 'token' );

                var config = {
                    method: 'post',
                    url: 'http://localhost:8000/wp-json/wp/v2/media',
                    headers: { 
                        
                        'Content-Type': 'image/png',
                        'Authorization': `Bearer ${ authToken }`,    
                        'Content-Disposition': 'attachment;filename=image_1.png'
                    },
                data : this.state.file
                };
                
                axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
                
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      }
  
      return (
        <div>
            
          <form onSubmit={this._handleSubmit}>
            <input type="file" onChange={this._handleImageChange} />
            <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
          </form>
          {$imagePreview}
        </div>
      )
    }
  
  }
export default ImageUpload;