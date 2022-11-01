import createDataContext from './createDataContext';
var axios = require('axios');
const imagesetReducer = (state, action) => {
  switch (action.type) {
    case 'add_imageset':
    const length = state.length;
    //console.log(length);
    return [
      ...state,
        {
          id: action.id.toString(10),
          imagesetName: action.name,
          count: action.count.toString(10),
          uri: "https://gp-1-hiba-raghad.s3.us-east-2.amazonaws.com/"+action.email+"/"+action.name+"/",
          email: action.email
        }
      ];

    case 'delete_imageset':
    return state.filter(imageset => imageset.id !== action.payload);

    case 'view_imageset':
    return state;


    case 'delete_all_imageset':
    return [];

    case 'set_imagesets':
    var count = 0;
    var sets = action.imagesets.map((item)=>{
      if(item.email == action.email){
        count++;
        return item;
      }
    })
    if(count == 0){
      console.log("empty");
      return [];
    }
    else{
      sets = sets.filter(function( element ) {
        return element !== undefined;
      });

      var sets2 = sets.map((item)=>{
        return {
          id: item.id.toString(10),
          imagesetName: item.ImagesetName,
          count: item.ImagesCount.toString(10),
          uri: item.ImagesetURL
        }
      })
      //console.log(techniques2);
      return sets2;
    }
    default:
      return state;
  }
};

const addImageset = dispatch => {
  return (email, count, imageset_name, id) => {
    console.log(imageset_name);
    console.log('add');
    dispatch({ type: 'add_imageset', email: email, count: count, name: imageset_name, id: id});
  };
};
const deleteImageset = dispatch => {
  return id => {
    console.log('delete');
    axios.delete("http://192.168.1.24:9000/api/ImageSets/"+id+"/").then((res)=>{
      console.log("deleteee");
      console.log(id);
      dispatch({ type: 'delete_imageset', payload: id });
    })

  };
};

const viewImageset = dispatch => {
  return id => {
    console.log('view');
    dispatch({ type: 'view_imageset' });
  };
};

const deleteAllImageset = dispatch => {
  return () => {
    console.log('delete all');
    dispatch({ type: 'delete_all_imageset'});
  };
};

const setImagesets = dispatch => {
  return (imagesets, email, id) => {
    console.log('set imagesets');
    dispatch({ type: 'set_imagesets', imagesets: imagesets, email: email});
  };
};

export const { Context, Provider } = createDataContext(
  imagesetReducer, //Reducer
  {addImageset, deleteImageset, viewImageset, deleteAllImageset, setImagesets}, //Functions
  //[{id: "0", imagesetName: "imgset0", count: "100"},
  //{id: "1", imagesetName: "imgset1", count: "300"}] //Initial state
  []

// {id: "0", imgName: "img0", techniqueName: "tech0"},
// {id: "1", imgName: "img1", techniqueName: "tech1"},
// {id: "2", imgName: "img2", techniqueName: "tech2"},
// {id: "3", imgName: "img3", techniqueName: "tech3"},
// {id: "4", imgName: "img4", techniqueName: "tech4"},
// {id: "5", imgName: "img5", techniqueName: "tech5"}
);
