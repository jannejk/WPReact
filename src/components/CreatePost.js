import React, { Fragment } from 'react';
import axios from 'axios';
import MasterForm from './MasterForm';
import WPAPI from '../wpClient';
import Avatar from '@material-ui/core/Avatar';


const avatarImageStyle = {
    width: 110,
    height: 110,
  };
class CreatePost extends React.Component {

	constructor( props ) {
		super( props );
        
		this.state = {
			title: '',
            content: '',
			postCreated: false,
            loading: false,
            imageLoading: false,
            fileUploaded: false,
            message: '',
            productimg: '',
            myimage:'',
            productimage: '',
            imagePreviewUrl: '',
            file: '',
            fields:{
                price: 0,
                rating: 0,
                productimage:""
              },
              imgID:"",
             price:'',
             rating:'',
             url: WPAPI.url,
             mediaUrl: WPAPI.mediaUrl,
             urlEnd: 'beers'
        }
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     //   this.handleData = this.handleData.bind(this);
    }
    updateData = (target, value) => {
        this.setState({ [target]: value });
      //  console.log("ladattiinko"+this.state.fileUploaded);
    };
    // handleData(data) {
    //     this.setState({title: data}, function () {
            
    //     });
       
    //   }
    redirectMe=(props)=>{
        this.props.history.push('/')
        
        };
	createMarkup = ( data ) => ({
		__html: data
	});

	handleFormSubmit = ( event ) => {
		//event.preventDefault(event);
     
		this.setState( { loading: true } );
      
		const formData = {
			title: this.state.title,
            content: this.state.content,
            fields:{
                price: this.state.price,
                rating: this.state.rating,
                productimage: this.state.imgID
              },
			status: 'publish'
		};
       
		const wordPressSiteUrl = this.state.url+this.state.urlEnd;
		const authToken = localStorage.getItem( 'token' );

		
        axios.post( `${ wordPressSiteUrl }`, formData, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ authToken }`
			}
		} )
			.then( res => {
				console.warn( 'res', res );
				this.setState( {
					loading: false,
					postCreated: !! res.data.id,
					message: res.data.id ? 'New post created' : ''
				},() => this.redirectMe() )
			} )
			.catch( err => {{
				console.warn( 'errr', err.response.data );
				this.setState( { loading: false, message: err.response.data.message } )
			}} )
	};

	handleInputChange = ( event ) => {

		this.setState( { [ event.target.name ]: event.target.value } );
      
    };
    
    handleSubmit(e) {
        e.preventDefault();
        this.setState( { imageLoading: true } );
       
        const authToken = localStorage.getItem( 'token' );
       
                  var config = {
                      method: 'post',
                      url: this.state.mediaUrl,
                      headers: { 
                          
                          'Content-Type': 'image/png',
                          'Authorization': `Bearer ${ authToken }`,    
                          'Content-Disposition': 'attachment;filename=image_1.png'
                      },
                  data : this.state.file
                  };
                  
                  axios(config)
                 
                  .then( res => {
                   
                    this.setState( {
                        imgID: res.data.id, 
                        imageLoading: false
                    } )
                    this.handleFormSubmit();
                } )
                .catch( err => {{
                    console.warn( 'errr', err.response.data );
                    
                }} )
               
          }

    handleImageChange(e) {
        e.preventDefault();
        
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result,
              fileUploaded: true
            });
          }
          
        reader.readAsDataURL(file)
      }
   
      render() {
        let {imagePreviewUrl} = this.state;
        
        let $imagePreview = null;
        if (imagePreviewUrl) {
        
          $imagePreview = (<Avatar style={Object.assign({}, avatarImageStyle)} src={imagePreviewUrl} alt=""/>);
        }
		const { loading, imageLoading, message, postCreated, acf } = this.state;
		console.warn( 'state', this.state );
        
		return(
            <Fragment>
            <MasterForm 
            handleInputChange = {this.handleInputChange}
            handleImageChange = {this.handleImageChange}
            handleImageSubmit = {this.handleSubmit}
            handleFormSubmit = {this.handleFormSubmit}
           // handlerFromParant={this.handleData}
            updateData={this.updateData}
           
            fileUploaded={this.state.fileUploaded}
            loading={this.state.loading}
            imageLoading={this.state.imageLoading}
            showImgPreview={this.showImgPreview}
          
            imgPreview={ (<div className="imgPreviewDiv">{$imagePreview}</div>)}
           
            />
            
			
            </Fragment>
		)
	}
}
export default CreatePost;