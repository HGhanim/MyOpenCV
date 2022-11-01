import createDataContext from './createDataContext';
var axios = require('axios');
const pipelineReducer = (state, action) => {
  switch (action.type) {
    case 'add_technique':
    const length = state.length + 1;
    //console.log(length);
    console.log(action.payload);
    return [
      ...state,
        {
          id: action.payload.id.toString(10),
          imgName: action.payload.imgName,
          techniqueName: action.payload.techniqueName,
          position: length.toString(10),
          uri: action.payload.uri,
          email: action.payload.email,
          parameters: action.payload.parameters,
          technique: action.payload.techniqueName,
        }
      ];

    case 'delete_technique':
    return state.filter(technique => technique.id !== action.payload);

    case 'edit_technique':
      return state;

    case 'show_technique':
      return state;

    case 'update_techniques':
    var i;
    for(i = 0; i < action.payload.length; i++){
      action.payload[i].position = i + 1;
    }
    console.log(action.payload)
      return action.payload;


    case 'delete_all':
      return [];

    case 'set_techniques':
    var count = 0;
    var techniques = action.techniques.map((item)=>{
      if(item.email == action.email){
        //console.log(count);
        count++;
        return item;
      }
    })


    if(count == 1 || count == 0){
      console.log("empty");
      return [];
    }
    else{
      techniques.shift();
      console.log(techniques);
      techniques = techniques.filter(function( element ) {
        return element !== undefined;
      });
      console.log(techniques);

      var techniques2 = techniques.map((item)=>{
        return {
          id: item.id.toString(10),
          imgName: item.satgeName,
          techniqueName: item.techniqueName,
          position: item.position.toString(10),
          uri: item.imageURL,
          email: item.email,
          technique: item.technique,
          parameters: item.parameters
        }
      })
      //console.log(techniques2);
      techniques2.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))
      return techniques2;
    }


    default:
      return state;
  }
};

const addTechnique = dispatch => {
  return img => {
    console.log('add');
    //console.log(img);
    dispatch({ type: 'add_technique', payload: img });
  };
};
const deleteTechnique = dispatch => {
  return id => {
    console.log('delete');
    axios.delete("http://192.168.1.24:9000/api/PipeLine/"+id+"/").then((res)=>{
      console.log("deleteee");
      console.log(id);
      dispatch({ type: 'delete_technique', payload: id });
    })

  };
};
const editTechnique = dispatch => {
  return () => {
    console.log('edit');
    dispatch({ type: 'edit_technique' });
  };
};
const showTechnique = dispatch => {
  return () => {
    console.log('show');
    dispatch({ type: 'show_technique' });
  };
};
const updateTechniques = dispatch => {
  return data => {
    console.log('update');
    dispatch({ type: 'update_techniques', payload: data });
  };
};
const deleteAll = dispatch => {
  return () => {
    console.log('delete all');
    dispatch({ type: 'delete_all'});
    /*
    var i;
    for(i = 0; i < pipeline.length; i++){
      if(pipeline[i].email==email){
        console.log(pipeline[i].email);
        axios.delete("http://localhost:8000/api/PipeLine/"+pipeline[i].id+"/").then((res)=>{
          dispatch({ type: 'delete_all'});
        })}
    }
    */


    // pipeline.map((item)=>{
    //   console.log(item.email);
    //   if(item.email==email){
    //     console.log(item.email);
    //     axios.delete("http://localhost:8000/api/PipeLine/"+item.id+"/").then((res)=>{
    //       dispatch({ type: 'delete_all'});
    //     })}}
    //   );
  };
};

const setTechniques = dispatch => {
  return (techniques, email) => {
    console.log('set techniques');
    dispatch({ type: 'set_techniques', techniques: techniques, email: email});
  };
};

export const { Context, Provider } = createDataContext(
  pipelineReducer, //Reducer
  { addTechnique, deleteTechnique, editTechnique, showTechnique, updateTechniques, deleteAll, setTechniques}, //Functions
  [] //Initial state


// {id: "0", imgName: "img0", techniqueName: "tech0", position: 1},
// {id: "1", imgName: "img1", techniqueName: "tech1", position: 2},
// {id: "2", imgName: "img2", techniqueName: "tech2", position: 3},
// {id: "3", imgName: "img3", techniqueName: "tech3"},
// {id: "4", imgName: "img4", techniqueName: "tech4"},
// {id: "5", imgName: "img5", techniqueName: "tech5"}
);
