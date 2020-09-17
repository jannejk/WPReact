import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const beerTheme = createMuiTheme({
  
    typography: {
     "fontFamily": "\"Rajdhani\", \"Helvetica\", \"Arial\", sans-serif",
    
     "fontSize": 14,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500,
     
     
     h1: {
      "fontWeight":  "fontWeightRegular",
      fontFamily: "Lobster Two",
      "fontSize": '2em'
     
    },
     h2: {
      "fontWeight":  900,
      fontFamily: "Lobster Two",
      "fontSize": '1.5em',
    },
    h3: {
      "fontWeight":  500,
      fontFamily: "Lobster Two",
      "fontSize": '1.17em',
    },
    
    },
    multilineColor:{
      color:'red'
  },
    overrides: {
      MuiInput: {
        "root": {
          
          "&$focused": {
            "color": "rgba(255,255,255,0.8)"
          },
          indicator: {
            '&:after': {
              backgroundColor: '#ffa000',
            },
          },
        }
        
      },
      MuiSlider: {
        
        "root":{
          
       
      },
      rail:{
        backgroundColor:'#9B8449',
      },
      track:{
        backgroundColor:'#9B8449',
      },
      valueLabel: {
       
        '& *': {
          background: '#9B8449',
          color: '#000',
          "fontWeight": 900
        },
      },
      
     
    },
     
      MuiSelect: {
        
          'root': {                        
                  color: '#9B8449',
          
          },
          icon: {
            fill: '#9B8449',
           
         },
         
      },
      MuiTabs: {
        indicator: {
          backgroundColor: "#9B8449",
          
        },
        
      },
      MuiTab: {
        
        "root":{
        "&$selected": {
        backgroundColor: "rgba(255,255,255,0.03)",
        fontWeight: 600
        }
      }
      },
      MuiTextField: {
        
        "root": {
          focused: {
           
              borderColor: "yellow"
            
          }
          }
        }, 
      MuiButton:{
        "root":{
         
        },
        outlinedPrimary:{
          color:'rgba(255,255,255,0.8)',
          border: "2px solid #9B8449"
        },
        outlinedSecondary:{
          color:'#9e1818',
          border: "#9e1818"
        },
        
      }
    
  }
    
  });

  export default beerTheme