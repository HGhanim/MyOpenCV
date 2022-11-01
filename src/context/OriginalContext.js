import createDataContext from './createDataContext';
var axios = require('axios');
const originalReducer = (state, action) => {
  switch (action.type) {
    case 'edit_original':
    return {
      id: action.payload.id.toString(10),
      imgName: "begin",
      uri: action.payload.uri
    }

    default:
      return state;
  }
};


const editOriginal = dispatch => {
    //  dispatch({ type: 'edit_original', payload: uri });

  return img => {
    console.log('edit original');
    console.log(img.uri);
    console.log(img.id);
    dispatch({ type: 'edit_original', payload: img});
    // var config1 = {
    //   method: 'get',
    //   url: 'http://192.168.1.24:9000/api/PipeLine/',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };
    //
    // axios(config1)
    // .then(function (response) {
    //   //setUsers(response.data);
    //   //console.log(found);
    //   var i;
    //   for(i = 0; i < response.data.length; i++){
    //     if(response.data[i].satgeName=="begin" && response.data[i].id!=img.id){
    //       axios.delete("http://192.168.1.24:9000/api/PipeLine/"+response.data[i].id+"/").then((res)=>{
    //         console.log("deleteee");
    //       })
    //     }
    //   }
    //
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });


  };
};


export const { Context, Provider } = createDataContext(
  originalReducer, //Reducer
  {editOriginal}, //Functions
  {id: "0", imgName: "begin", uri: "default"} //Initial state

);
