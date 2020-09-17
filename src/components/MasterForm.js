import React, { Fragment, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {Container, Slider, TextField, Button, IconButton, Typography, Grid, 
Card, CardHeader, CardActions, CardContent, MenuItem, FormControl, InputLabel, Select} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EuroSymbolTwoToneIcon from '@material-ui/icons/EuroSymbolTwoTone';
import StarRateTwoToneIcon from '@material-ui/icons/StarRateTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

export class MasterForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentStep: 1,
        title: "",
        content: "",
        boo: false,
        price:0,
        rating:0,
        fields:{
            price: 0,
            rating: 0,
            productimage: ""
          },
       
        file:'',
        fileUploaded: false,
        loading: false,
        imageLoading: false,
        urlPreview:'',
        categoryState: '',
        selectOptions: [
            {
              id: 1,
              type: 'Beers'
            },
            {
              id: 2,
              type: 'Non-Alcoholics'
            }
            ]
        
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.renderSelectOptions=this.renderSelectOptions.bind(this);
   
    }
    componentWillReceiveProps(props) { 
        let fileUploaded  = props.fileUploaded
        let loading = props.loading
        let imageLoading = props.imageLoading
        this.setState({fileUploaded});
        this.setState({loading});
        this.setState({imageLoading});
       }
    renderSelectOptions() {
        return this.state.selectOptions.map((so, i) => {
          return (
            <MenuItem
              key={i}
              value={so.type}>
              {so.type}
            </MenuItem>
          );
        });
      }
      handleChangeCategory(event){
        this.setState({ categoryState: event.target.value });
        this.props.updateData('urlEnd', event.target.value);
      }
   
    
    handleChange = (target, value) => {
        this.setState({ [target]: value });
        
    };
   
    _next = () => {
       
      let currentStep = this.state.currentStep
      currentStep = currentStep >= 2? 3: currentStep + 1
      this.setState({
        currentStep: currentStep
      })
    }
      
    _prev = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({
        currentStep: currentStep
      })
    }
  
  previousButton() {
    const { title, content, categoryState, fileUploaded/* , price, rating */ } = this.state;
  
   
    const enabled =
          title.length > 0 &&
          fileUploaded === true &&
          content.length > 0 &&
          categoryState.length > 0;
          /* price.value > 0 &&
          rating.value > 0; */
    let currentStep = this.state.currentStep;
    if(currentStep !==1){
      return (
          <Fragment>
        <Button variant="outlined" color="primary" onClick={this._prev}>Back</Button>
       
        
        <Button disabled={!enabled} type="file" name="productimage" variant="outlined" color="primary" 
        onClick={this.props.handleImageSubmit}>Publish</Button>
        </Fragment>
      )
    }
    return null;
  }
  
  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <2){
      return (
        <Button variant="outlined" color="primary" onClick={this._next}>Next</Button>
       
      )
    }
    return null;
  }
    
    render() {    
        
      return (
        <Fragment>
            <Container style={{
					  backgroundImage: 'url("https://images.unsplash.com/photo-1504502350688-00f5d59bbdeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80")',
					  backgroundSize:'cover', backgroundRepeat:'no-repeat',backgroundPositionX:'right'}} maxWidth="xl">
            <Grid style={{ minHeight: '100vh'}}
					  		container
							direction="column"
							justify="space-evenly"
							alignItems="center">
            	<Container maxWidth="xs">
            
            <Card className="formCard" style={{
									
									margin: 'auto',
									padding: '20px'
									
								}}>
        <form onSubmit={this.props.handleFormSubmit}>
        <CardHeader style={{textAlign: 'center'}}title="Add New Beer" 
        subheader={"Step "+this.state.currentStep+"/2"} 
        action={
            <Link to='/'>
        <IconButton aria-label="close">
            <CloseIcon />
        </IconButton>
        </Link>
        }>
            
        </CardHeader>
      <CardContent >
     
     
          <Step1 
         
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            updateData={this.props.updateData}
            title={this.state.title}
            fileUploaded={this.props.fileUploaded}
            price={this.state.price}
            rating={this.state.rating}
            selectOptions={this.state.selectOptions}
            categoryState={this.state.categoryState}
            handleChangeCategory={this.handleChangeCategory}
            renderSelectOptions={this.renderSelectOptions}
            file={this.state.file}
            handleImageChange={this.props.handleImageChange}
            handleImageSubmit={this.props.handleImageSubmit}
            showImgPreview={this.props.showImgPreview}
            imgPreview={this.props.imgPreview}
          />
        
       
          <Step2 
            currentStep={this.state.currentStep} 
            updateData={this.props.updateData}
            handleChange={this.handleChange}
            handleImageSubmit={this.props.handleImageSubmit}
            content={this.state.content}
            price={this.state.price}
            rating={this.state.rating}
            loading={this.state.loading}
            imageLoading={this.state.imageLoading}
          />
       
          </CardContent>
           <CardActions style={{ justifyContent:'center'  }}>
          {this.previousButton()}
          {this.nextButton()}
          
         
          </CardActions>
        </form>
        </Card>
        </Container>
        </Grid>
        </Container>
        </Fragment>
      );
    }
  }
  
  function Step1(props) {
    const ImgPreview = ()=> {
        return (
            <div>
                {props.imgPreview}
            </div>
        )
    };
    const classes = useStyles();
    if (props.currentStep !== 1) {
      return null
    } 
    return(
    <Fragment>
    <Grid container wrap="wrap" justify="center" direction="column" alignItems="flex-start" >
        <Grid item style = {{marginBottom:'30px',width:'100%'}}>
       
            <TextField  value={props.title} style = {{width:'100%'}} required id="title-input" label="Title" 
            type="text" name="title" onChange={(e) => { props.updateData('title', e.target.value); props.handleChange('title', e.target.value);}}/>
        </Grid>
        <Grid style = {{width:'100%',marginBottom:'40px'}} item>
            <FormControl required style = {{width:'100%'}}>
                <InputLabel htmlFor="category-required">Category</InputLabel>
                <Select value={props.categoryState} onChange={props.handleChangeCategory}>
                        {props.renderSelectOptions()}
                </Select>
              
            </FormControl>
        </Grid>
    
    <Grid className="imgUploadContainer" wrap={'wrap-reverse'}style={{ height:"180px",textAlign:"center"}}container justify="center" direction="row" alignItems="center" spacing={1}>
        <Grid item md={6} xs={12}>
         <input accept="image/*" className={classes.input} id="outlined-button-file" multiple 
        type="file" onChange={ props.handleImageChange }/>
      
            <label htmlFor="outlined-button-file">
                <Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                    Upload Image
                </Button>
            </label>
        </Grid>
            <Grid md={6} xs={12} className="imgPreviewContainer" item><ImgPreview /></Grid>
            </Grid>
    </Grid>
          </Fragment>
        
    );
  }
  
  function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
        <Fragment>
             <Grid container wrap="wrap" justify="center" direction="column" alignItems="flex-start" spacing={3}>
             <Grid item style = {{marginBottom:'30px',width:'100%', border:'1px solid rgba(255,255,255,0.2)'}}>
            
            <TextField value={props.content} fullWidth type="text" required style = {{width:'100%'}} id="review-input" label="Review" placeholder="" multiline rows={7} rowsMax={7}
           
             onChange={(e) => { props.updateData('content', e.target.value); props.handleChange('content', e.target.value);}}/>
             </Grid>
          
             <Grid container direction="row" style = {{marginTop:'15px', marginBottom:'40px'}}>
                 <Grid item  style = {{width:'30%'}}> 
              <Typography >
              <EuroSymbolTwoToneIcon/>&nbsp; <span style = {{verticalAlign: 'top'}}>Price:</span>
            </Typography>
            </Grid>
            <Grid item style = {{width:'70%'}}>
           <Slider 
                max={15}
                value={props.price}
                defaultValue={0}
                aria-labelledby="discrete-slider-always"
                step={0.1}
                valueLabelDisplay="on"
              
                onChange={(event, value) => { props.updateData('price', value); props.handleChange('price', value);}}
                />
                </Grid>
                  </Grid>

                  <Grid container direction="row" style = {{marginBottom:'20px'}}>
                 <Grid item  style = {{width:'30%'}}> 
          <Typography>
           <StarRateTwoToneIcon/>&nbsp; <span style = {{verticalAlign: 'top'}}>Rating:</span>
            </Typography>
            </Grid>
            <Grid item style = {{width:'70%'}}>
           <Slider
                max={10}
                value={props.rating}
                defaultValue={0}
                aria-labelledby="discrete-slider-always"
                step={0.5}
                valueLabelDisplay="on"
                
                onChange={(event, value) => { props.updateData('rating', value); props.handleChange('rating', value);}}
                />
                 </Grid>
                  </Grid>
                  { props.imageLoading &&
							<Grid container alignItems="center"
							justify="center"
							>
							  <Grid item>
                              <Typography>
                                    Uploading Media..
                              </Typography>
                                  <CircularProgress />

                                  </Grid>
							</Grid>}
                  { props.loading &&
							<Grid container alignItems="center"
							justify="center"
							>
							  <Grid item>
                              <Typography>
                                    Creating Post..
                              </Typography>
                                  <CircularProgress />
                                  </Grid>
							</Grid>}
                    </Grid>
        </Fragment>
        
    );
  }
  
 
  export default MasterForm