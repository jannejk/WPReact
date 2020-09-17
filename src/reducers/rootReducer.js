const initState ={
   urlEnd: "beers/",
   activeTab: "beers"
}

const rootReducer = (state=initState, action) => {
   
    if(action.type=== 'UPDATE_URL_STATE'){
        
       
        return {
            ...state,
            urlEnd: action.urlEnd+"/",
            activeTab: action.activeTab
          };
      
    }
    
    return state;
}

export default rootReducer;