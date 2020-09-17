import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import BeerItem from './BeerItem';
import WPAPI from '../wpClient';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import '../App.scss';
import {AppBar, Container, Toolbar, Grid, Tabs, Tab, MenuItem, Select, Button} from '@material-ui/core'
import SearchBar from './searchbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';

export class Beers extends Component {
    constructor(){
   
        super();
        this.state={
        'beers':{
            title: '',
            acf:{
                price: 0,
                rating: 0
            }

        },
        isLoaded: false,
        
          tabOptions: [
          
            {
              name: 'Beers',
              value: 'beers',
            },
            {
              name: 'Non-Alcoholic',
              value: 'non-alcoholics',
            },
            
          ],
          sortOptions: [
          
            {
                          name: 'Name',
                          value: 'title',
                        },
                        {
                          name: 'Price',
                          value: 'price',
                        },
                        {
                          name: 'Rating',
                          value: 'rating',
                        },
                        {
                          name: 'Latest',
                          value: 'id',
                        }
          ],
        
          url: WPAPI.url,
          urlEnd: 'beers',
          searchString: '',
          selectedValue: "",
          activeTab: ''
        }
      }
   
    componentDidMount(){
      
       this.setState({ url: this.state.url+this.props.activeTab }, ()=>{
        
        this.getProducts();

       });
       
    }
    refreshUrl(){
     
      this.setState({ url: WPAPI.url+this.state.activeTab }, () => {
       
        this.getProducts();
      });
    }
    getProducts(){
      
        axios.get(this.state.url+'/?per_page=100')
        
        .then(res => this.setState(
            {
            beers: res.data,
            isLoaded: true
            }
        ))
        .catch(err => console.log(err));
        
    }
    
    
    handleTabChange = (event, activeTab) => {
      this.setState( (state) => ({activeTab}), function () {
       
        
        this.props.actionurlEnd(this.state.activeTab,this.state.activeTab);
        this.refreshUrl();
      
    });

    };
    
    handleTermChange(term) {
       
        let filteredList = this.state.beers.filter((word) => {
          return word.title.rendered.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        });
        if(term===''){
          this.getProducts();
        }
      
        this.setState({beers: filteredList});
      }
     
      selectChange = (event) => {
        this.setState({ selectedValue: event.target.value })
        var arraySort = require('array-sort');
        var sortByVal = event.target.value;
        var sortedList;
        
        if(sortByVal==='title'){
            sortedList=arraySort(this.state.beers, 'slug');
        }
        else if(sortByVal==='price'){
           sortedList=arraySort(this.state.beers,('acf.price'));
        }
        else if(sortByVal==='rating'){
            sortedList=arraySort(this.state.beers, 'acf.rating', {reverse: true});
        }
        else if(sortByVal==='id'){
            sortedList=arraySort(this.state.beers, 'id', {reverse: true});
        }
         this.setState({beers: sortedList});
        
      }
    render() {
     
        const { beers, isLoaded, sortOptions, tabOptions} = this.state;
        const{activeTab}=this.props;
       
        if(isLoaded){
            return(
              
               <Fragment>
              
              <AppBar position="sticky" >
     
              <Toolbar >
           <Grid className="menurow"container>
               <Grid item xs={12}md={6}sm={12}>
               <Tabs value={activeTab} onChange={this.handleTabChange} centered >
                      {tabOptions.map(item => (
                    <Tab key={item.value} label={item.name}value={item.value} />
                    ))}
                    </Tabs>
               </Grid>
               
                     <Grid className='menuitem' item xs={6}sm={6}md={3}>
                    
                           <Select displayEmpty id="sortBy" onChange={this.selectChange} 
                           value={this.state.selectedValue}>
                              
                                     <MenuItem value="" disabled>
                                           <div className="myem">SORT BY</div>
                                     </MenuItem>
                                 {sortOptions.map(item => (
                                   <MenuItem value={item.value} key={item.value}>
                                     {item.name}
                                   </MenuItem>
                                 ))}
                               </Select>
                              
                     </Grid>
                 
                   
                 <Grid className='menuitem' item xs={6}sm={6}md={3}>
                
                     <SearchBar className='navInput' onTermChange={term=>this.handleTermChange(term)}/>
                   
                 </Grid>
                 <Grid style={{justifyContent:'flex-end'}} container direction="row" alignItems="flex-end">
                 <Grid className='menuitem' item xs={6}sm={6}md={3}>
                
                 <Link to="/create-post">
                 <Button  style={{marginRight:'-65px'}}variant="outlined" color="primary" startIcon={<AddIcon style={{color: 'primary'}}/>}>
                      Add New
                  </Button>
                </Link>
                
                </Grid>
            </Grid>
                
          </Grid>
     
     </Toolbar>
    
   </AppBar>
   
                <Container style={{minHeight:'100vh',backgroundColor:'#212121',
					  backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/02/29/15/10/bottle-caps-4890369_1280.jpg")',
					  backgroundSize:'cover', backgroundAttachment:'fixed',backgroundRepeat:'no-repeat',backgroundPositionX:'right'}} maxWidth="xl">
                <Grid className='containerGrid' container justify={'center'} align={'center'}>
                    { beers.map(beer =>(
                        
                         <Grid className='myCard' item xs={12} sm={6} md={4} key={beer.id} >
                            
                                 <BeerItem key={beer.id} beer={beer} />
                               
                            
                        </Grid>
                    ))}
                </Grid>
                </Container>
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

const mapStateToProps = (state) => {
  return {
    urlEnd: state.urlEnd,
    activeTab: state.activeTab
  };
  
};
const mapDispatchToProps=(dispatch) =>{  
  return {
    actionurlEnd: (urlEnd, activeTab) => dispatch({ 
        type: 'UPDATE_URL_STATE',
        urlEnd: urlEnd,
        activeTab: activeTab
       })
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Beers));
