import React from 'react'
import {AppBar, Toolbar, Grid} from '@material-ui/core'
import SearchBar from './searchbar';

class Navbar extends React.Component {

  handleParentTermChange=(term)=>{
    this.props.handleTermChange(term);
  };
  constructor(){
  
    super();
    this.state={'items':[],
     
      options: [
      
        {
          name: 'Beers',
          value: 'beers',
        },
        {
          name: 'Energy Drinks',
          value: 'energy-drinks',
        },
        
      ],
      sortOptions: [
      
        {
          name: 'Name',
          value: 'name',
        },
        {
          name: 'Price',
          value: 'price',
        },
        {
          name: 'Rating',
          value: 'preferability',
        },
      ],
     // url: 'http://localhost:3001/beers',
     
      url: 'https://my-json-server.typicode.com/jannejk/myjsonapi/beers',
      imgUrl: 'beers/thumb/',
      searchString: '',
      selectedValue: "",
      activeTab: 'beers',
     
     
      
    }
  }


  render() {
    const { options, value } = this.state;
    const { sortOptions, sortValue } = this.state;
    return (
      <AppBar position="sticky" >
     
        <Toolbar >
              <Grid className="menurow"container spacing={0}>
                  <Grid item xs={12}md={6}sm={12}>
                    {/* <Tabs value={value} onChange={this.handleChange}centered >
                      {options.map(item => (
                    <Tab key={item.value} label={item.name}value={item.value}/>
                    ))}
                    </Tabs> */}
                  </Grid>
                  
                        {/* <Grid className='menuitem' item xs={6}sm={6}md={3}>
                       
                              <Select displayEmpty id="sortBy" onChange={this.selectChange} value={this.state.selectedValue}>
                                 
                                        <MenuItem value="" disabled>
                                              <div className="myem">SORT BY</div>
                                        </MenuItem>
                                    {sortOptions.map(item => (
                                      <MenuItem value={item.value}primaryText={item.name}key={item.value}>
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                 
                        </Grid> */}
                    
                      
                    <Grid className='menuitem' item xs={6}sm={6}md={3}>
                   
                        <SearchBar onTermChange={term=>this.handleParentTermChange(term)}/>
                      
                    </Grid>
                   
             </Grid>
        
        </Toolbar>
       
      </AppBar>
    )
  }
}

export default Navbar;