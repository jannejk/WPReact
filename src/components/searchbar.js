import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";


class SearchBar extends Component{

    constructor(props){
        super(props);
        this.state={term:''};
    }
    onInputChange(term) {
        this.setState({term});
        this.props.onTermChange(term);
    }

    render(){
 
        return (
                 
          <TextField className="navInput" InputProps={{endAdornment: (<InputAdornment>  <SearchIcon />  </InputAdornment> ) }}placeholder="SEARCH"
          onChange={event=>this.onInputChange(event.target.value)}/>                              
         
            );
          }
    
}
export default SearchBar;