import createDataContext from './createDataContext';
var axios = require('axios');
const algorithmReducer = (state, action) => {
  switch (action.type) {
    case 'add_algorithm':
    const length = state.length;
    //console.log(length);
    return [
      ...state,
        {
          id: action.id.toString(10),
          algorithmName: action.name,
          code: action.code,
          email: action.email,
          parametres: action.parametres,
          techniques: action.techniques
        }
      ];

    case 'delete_algorithm':
    return state.filter(algorithm => algorithm.id !== action.payload);

    case 'view_code':
    return state;

    case 'set_algorithms':
    var count = 0;
    var sets = action.algorithms.map((item)=>{
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
          algorithmName: item.AlgorithmName,
          code: item.Code,
          parametres: item.parametres,
          techniques: item.techniques
        }
      })
      //console.log(techniques2);
      return sets2;
    }

    case 'delete_all_algorithm':
    return [];
    default:
      return state;
  }
};

const addAlgorithm = dispatch => {
  return (email, algorithm_name, id, code, parametres, techniques) => {
    console.log('add');
    console.log(parametres)
    console.log(techniques)
    dispatch({ type: 'add_algorithm', email: email, name: algorithm_name, id: id, code: code, parametres: parametres, techniques: techniques});
  };
};
const deleteAlgorithm = dispatch => {
  return id => {
    console.log('delete');
    axios.delete("http://192.168.1.24:9000/api/Algorithms/"+id+"/").then((res)=>{
      console.log("deleteee");
      console.log(id);
      dispatch({ type: 'delete_algorithm', payload: id });
    })

  };
};

const viewCode = dispatch => {
  return id => {
    console.log('view');
    dispatch({ type: 'view_code' });
  };
};

const deleteAllAlgorithm = dispatch => {
  return () => {
    console.log('delete all');
    dispatch({ type: 'delete_all_algorithm'});
  };
};

const setAlgorithms = dispatch => {
  return (algorithms, email) => {
    console.log('set algorithms');
    dispatch({ type: 'set_algorithms', algorithms: algorithms, email: email});
  };
};

export const { Context, Provider } = createDataContext(
  algorithmReducer, //Reducer
  {addAlgorithm, deleteAlgorithm, viewCode, deleteAllAlgorithm, setAlgorithms}, //Functions
  [] //Initial state


// {id: "0", imgName: "img0", techniqueName: "tech0"},
// {id: "1", imgName: "img1", techniqueName: "tech1"},
// {id: "2", imgName: "img2", techniqueName: "tech2"},
// {id: "3", imgName: "img3", techniqueName: "tech3"},
// {id: "4", imgName: "img4", techniqueName: "tech4"},
// {id: "5", imgName: "img5", techniqueName: "tech5"}
);
