import createDataContext from './createDataContext';
var axios = require('axios');
const originalReducer = (state, action) => {
  switch (action.type) {
    case 'edit_stats':
    var statsArray = [];
    var i;
    for(i = 0; i < action.count; i++){
      var item = {};
      item.name = "Result" + i.toString(10);
      item.uri = "https://gp-1-hiba-raghad.s3.us-east-2.amazonaws.com/"+action.email+"/"+action.imageset +"/histogram" + i.toString(10) + ".jpg";
      item.stats = action.stats[i];

      statsArray[i] = item;
    }
    return statsArray;

    default:
      return state;
  }
};


const editStats = dispatch => {
    //  dispatch({ type: 'edit_original', payload: uri });

  return (stats, email, imageset, count)=> {
    console.log('edit stats');
    dispatch({ type: 'edit_stats', stats: stats, email: email, imageset: imageset, count: count});
  };
};


export const { Context, Provider } = createDataContext(
  originalReducer, //Reducer
  {editStats}, //Functions
  [] //Initial state

);
