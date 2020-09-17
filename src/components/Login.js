import React from 'react';
import axios from 'axios';
import WPAPI from '../wpClient';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect, Route } from 'react-router-dom'
import {Container,TextField, Button, Typography, Grid, Card, CardHeader, CardActions, CardContent} from '@material-ui/core';
class Login extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			username: '',
			password: '',
			userNiceName: '',
			userEmail: '',
			loggedIn: false,
			loading: false,
			error: '',
			authUrl: WPAPI.tokenUrl
			
		}
	}

	createMarkup = ( data ) => ({
		__html: data
	});

	onFormSubmit = (event) => {
		 event.preventDefault();

		// const siteUrl = clientConfig.siteUrl;

		const loginData = {
			username: this.state.username,
			password: this.state.password,
		};

		this.setState( { loading: true }, () => {
		
		axios.post( this.state.authUrl, loginData )
				.then( res => {

					if ( undefined === res.data.token ) {
						this.setState( { error: res.data.message, loading: false } );
						return;
					}

					const { token, user_nicename, user_email } = res.data;

					localStorage.setItem( 'token', token );
					localStorage.setItem( 'userName', user_nicename );

					this.setState( {
						loading: false,
						token: token,
						userNiceName: user_nicename,
						userEmail: user_email,
						loggedIn: true
					} )
				} )
				.catch( err => {
					this.setState( { error: err.response.data.message, loading: false } );
				} )
		} )
	};

	handleOnChange = ( event ) => {
		this.setState( { [event.target.name]: event.target.value } );
	};
	redirectMe=(props)=>{
	//this.props.history.push('/')
	console.log('logged in');
	return(	<Redirect to={{ pathname: '/'}} noThrow />)
	//<Redirect to={{ pathname: '/', state: { from: props.location } }} />
	};
	render() {
		
		const { username, password, userNiceName, loggedIn, error, loading } = this.state;

		const user = ( userNiceName ) ? userNiceName : localStorage.getItem( 'userName' );

		if ( loggedIn || localStorage.getItem( 'token' ) ) {
		//return(	<Redirect to={{ pathname: '/'}} noThrow />)
			
			return(<div>{this.redirectMe()}</div>)
		} else {
			return (
				<React.Fragment>
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
					 <form onSubmit={ this.onFormSubmit }>
					 <CardHeader style={{textAlign: 'center'}}title="Login" ></CardHeader>
					
						<CardContent>
							
						<Grid style={{height:'300px'}}container justify="center" direction="column" alignItems="center" spacing={3}>
						
						<Grid item>
						
						<TextField required id="username-input" label="Username" type="text" name="username" onChange={ this.handleOnChange }/>
						</Grid>
						<Grid item>
						<TextField required id="password-input" label="Password" type="text" name="password" onChange={ this.handleOnChange }/>
						</Grid>
						
						<Grid item align="center">
							{ loading && 
							<Grid container alignItems="center"
							justify="center"
							>
							  <Grid item><CircularProgress /></Grid>
							</Grid>}
						
							{ error && 
							
							<Typography><span className="errorMsg" dangerouslySetInnerHTML={ this.createMarkup( error ) }/> </Typography> 
							}
							
							</Grid>
							</Grid>
							</CardContent>

							<CardActions style={{justifyContent:'center'  }}>
							
					
							<Button type="submit" variant="outlined" color="primary" >
								Login
							</Button>
							
          					</CardActions>
							  </form>
					</Card>
					</Container>
					</Grid>	
					</Container>
				</React.Fragment>
			)
		}

	}
}


export default Login;