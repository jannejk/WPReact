import React, { Component, Fragment} from 'react';
import WPAPI from '../wpClient';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
//import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Container, Button, IconButton, Typography, Grid, Card, 
CardMedia, CardHeader, CardActions, CardContent} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       maxWidth: 345,
//     },
//     media: {
//       height: 0,
//       paddingTop: '56.25%',
//     },
//     expand: {
//       transform: 'rotate(0deg)',
//       marginLeft: 'auto',
//       transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//       }),
//     },
//     expandOpen: {
//       transform: 'rotate(180deg)',
//     },
//     avatar: {
//       backgroundColor: 'white',
//     },
//   }));


export class BeerPage extends Component {
    
    state = {
        beer: {},
        url: WPAPI.url,
        urlEnd:"",
        isLoaded: false,
        isDeleted: false
       
    }
    redirectMe=(props)=>{
        this.props.history.push('/')
        
        };
    deletePost(){
        const authToken = localStorage.getItem( 'token' );

        var config = {
            method: 'delete',
            url: `${this.state.url}${this.props.urlEnd}${this.props.match.params.id}`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${ authToken }`
            },
         
          };
          
          axios(config)
         
            .then((response)=> {
            console.log(JSON.stringify(response.data));
            this.setState( {
                isDeleted: true
            })
            setTimeout(
                () => this.redirectMe(), 
                1000
              );
          
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }
    
    componentDidMount(){
       
     axios.get(`${this.state.url}${this.props.urlEnd}${this.props.match.params.id}`)
        .then(res =>  this.setState({
           
            beer: res.data,
            isLoaded: true
        }))
        
        .catch(err => console.log(err));
        
    }
    render() {
        const {beer, isLoaded} = this.state;
       
        if(isLoaded){
           
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
                                <Container maxWidth="sm">
                                <Card className="formCard">
                                    <CardHeader
                                        
                                        action={
                                            <Link to='/'>
                                        <IconButton aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                        </Link>
                                        }
                                        
                                        title= {<Typography style={{textAlign:'center'}} variant="h1" >{beer.title.rendered}</Typography>}
                                        subheader={"By: "+this.props.match.params.author}
                                    />
                                    <CardMedia
                                         style={{height: 50, paddingTop: '56.25%'}}
                                         image={beer.acf.productimage.sizes.large}
                                         title={beer.title.rendered}
                                    />
                                    <CardContent>
                                    <Typography style={{textAlign:'left'}} variant="h6" ><b>💶 Price: {beer.acf.price}€</b></Typography>
                                    <Typography style={{textAlign:'left'}} variant="h6" ><b>🍺 Rating: {beer.acf.rating}</b></Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        <span dangerouslySetInnerHTML={{ __html: beer.content.rendered}}/>
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing style={{justifyContent: "flex-end"}}>
                                    <Button style={{color: '#9e1818', border: "2px solid #9e1818"}} onClick={() =>  {this.deletePost()}}
                                        variant="outlined"
                                        color="secondary"
                                       
                                        startIcon={<DeleteIcon style={{color: '#9e1818'}}/>}
                                    >
                                        Delete
                                    </Button>
                                        
                                        { this.state.isDeleted &&
                                            <Grid container alignItems="center"
                                            justify="center"
                                            >
                                            <Grid item>
                                            <Typography>
                                                    Deleting Post..
                                            </Typography>
                                                <CircularProgress />
                                                </Grid>
                                            </Grid>
                                        }
                                    </CardActions>
                                    
                                    </Card>
                                </Container>

                            </Grid>
                    </Container>
                   
                </Fragment>
            )
        }
        return  (
            <Grid container alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}>
              <Grid item><CircularProgress /></Grid>
               
            </Grid>
            );
    }
}
const mapStateToProps = (state, ownProps) => {
    return{
      urlEnd: state.urlEnd,
      activeTab: state.activeTab
    }
  }
export default connect(mapStateToProps)(BeerPage)