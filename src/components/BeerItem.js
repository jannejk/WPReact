import React, { Fragment, Component } from 'react';
import WPAPI from '../wpClient';
import {Link} from 'react-router-dom';
import '../App.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Grid, Avatar, Typography} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const avatarImageStyle = {
    width: 140,
    height: 140,
    border: '2px solid white'
  };

export class BeerItem extends Component {
    state = {
        
        imgUrl: '',
        author: '',
        acf: [],
        urlEnd: '',
        isLoaded: false
    };
    static propTypes={
        beer: PropTypes.object.isRequired
    };

    componentDidMount(){

       
        const {urlEnd, author} = this.props.beer;
        
        const getAuthor = axios.get(WPAPI.users+`${author}`);

        Promise.all([getAuthor]).then(res => {
       
            this.setState({
              
                author: res[0].data.name,
             
                isLoaded: true
            });
        });
    }
    render() {
        const {id, title, excerpt, acf, urlEnd} = this.props.beer;
        const {author, imgUrl, isLoaded} = this.state;
        if(isLoaded){
        return (
           <Fragment>
               
               
                <Grid className="itemscontainer formCard" container direction='column' >
               
                 <Link to={`/beer/${id} ,${this.state.author}`} >
                 <Grid item className="child">
                    <Avatar style={Object.assign({}, avatarImageStyle)} src={acf.productimage.sizes.medium} alt={title.rendered}/>
                </Grid>
                    
                <Grid item className="childp">
                    <Typography  style={{marginTop:'15px'}} variant="h1" >{title.rendered}</Typography>
                </Grid>
     
                </Link>
                <Grid item className="childp">
                    <Typography style={{maxHeight:'110px', overflow: 'hidden', marginBottom:'15px'}} component="p" dangerouslySetInnerHTML={{ __html: excerpt.rendered}}></Typography>
                </Grid>
                <Grid item className="child">
                <Grid className='boxcontent'container direction="row">
                        <Grid item>
                       
                        </Grid>
                        <Grid item>
                        <Typography  fontWeight="fontWeightBold" component="p"><b>💶 Price: {acf.price}€</b></Typography>
                        </Grid>
                        <Grid className='boxcontent' container direction="row" >
                        <Grid item>
                        
                        </Grid>
                        <Grid item>
                        <Typography  fontWeight="fontWeightBold" component="p"><b>🍺 Rating: {acf.rating}</b></Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                    </Grid>
                   
                </Grid>
               
                </Fragment>
            
        );
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

export default BeerItem
