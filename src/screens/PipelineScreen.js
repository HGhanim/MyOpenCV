import React, { useContext, useState, useCallback, useEffect }  from 'react';
import {ActivityIndicator, Pressable,Alert, Text, StyleSheet, View, Button, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Image, Platform, ImageBackground} from 'react-native';
import Card from '../components/Card';
import FirstCard from '../components/FirstCard';
import Box from '../components/Box';
import CustomProgressBar from '../components/CustomProgressBar';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Context as PipelineContext} from '../context/PipelineContext';
import { Context as OriginalContext} from '../context/OriginalContext';
import { Context as UserContext} from '../context/UserContext';
import DraggableFlatList, {RenderItemParams} from 'react-native-draggable-flatlist';
import { MaterialIcons, AntDesign, FontAwesome5, Entypo, FontAwesome  } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { RNS3 } from 'react-native-aws3';
import * as ImagePicker from 'expo-image-picker';
import * as WebBrowser from 'expo-web-browser';


const PipelineScreen = ({navigation}) => {
  const download = async(uri) =>{
    await WebBrowser.openBrowserAsync(uri);
  }
  const {state:signinState, signin, signout, signup } = useContext(UserContext);
  const { state:pipeline, addTechnique, deleteTechnique, editTechnique, showTechnique, updateTechniques, deleteAll, setTechniques } = useContext(PipelineContext);
  const {state:original, editOriginal } = useContext(OriginalContext);
  const {containerStyle, text1Style, text2Style, dragStyle} = styles;
  const [isModalVisible, setModalVisible] = useState(false);
  const [pressedIcon, setPressedIcon] = useState("view");
  const [algorithm_item1, setAlgorithm_item1] = useState({});
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [image, setImage] = useState('default');
  var axios = require('axios');
  const [red_uri, setRed_uri] = useState("");
  const [green_uri, setGreen_uri] = useState("");
  const [blue_uri, setBlue_uri] = useState("");
  const [histogram_uri, setHistogram_uri] = useState("");
  const [view_uri, setView_uri] = useState("");
  const [stats, setStats] = useState({});
  const [techniques, setTechniques2] = useState({});
  const [progress, setProgress] = useState(false);
//console.log(original);
//console.log(signinState);
 //console.log("PIPELINE");
 //console.log(pipeline);
 function financial(x) {
   return Number.parseFloat(x).toFixed(2);
 }
 const updateOnDrag = async(data) =>{
   updateTechniques(data);
   setProgress(true);
   var new_pipeline = data;
   var i;
   for(i = 0; i < new_pipeline.length; i++){
     new_pipeline[i].position = i + 1;
     if(i == 0){
       new_pipeline[i].old_img = 'begin.jpg'
     }
     else{
       new_pipeline[i].old_img = new_pipeline[i - 1].imgName + ".jpg";
     }
     //console.log(new_pipeline[i].old_img);
     //console.log(new_pipeline[i].parameters);
   }
   console.log("NEWWWWWWWWWWWWW")
   console.log(new_pipeline);

   i = 0;
   for(i=0; i < new_pipeline.length ; i++){
   var config = {
     method: 'get',
     url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/'+new_pipeline[i].technique+'?username='+new_pipeline[i].email+'&old_img='+new_pipeline[i].old_img+'&new_img='
     +new_pipeline[i].imgName+'.jpg&'+new_pipeline[i].parameters,
     headers: {
       'Content-Type': 'application/json'
     }
   };
   let response = await axios(config).then((res)=>{
     //console.log("done");
     axios.put("http://192.168.1.24:9000/api/PipeLine/"+new_pipeline[i].id+"/",{
       "email": new_pipeline[i].email,
       "parameters": new_pipeline[i].parameters,
       "techniqueName":new_pipeline[i].techniqueName,
       "technique": new_pipeline[i].technique,
       "satgeName": new_pipeline[i].imgName,
       "imageURL": new_pipeline[i].uri,
       "position": new_pipeline[i].position
     }).then((resp)=>{
       //console.log("RESPPPPPPPPPPPP")
       //console.log(resp.data);
       //setTechniques(resp.data, signinState[0].userInfo.email);
     }).catch((e)=>{
       console.log(e);
     })
   }).catch((error) => {
     console.log(error);
     //alert("A problem occured. Please, try again.");
   });

 }

 console.log("GET NOWWWWW")
   //console.log(new_pipeline)
   getPipeline1();
   setProgress(false);

 }

 // function handleOnDragEnd(result) {
 //   if (!result.destination) return;
 //   const items = Array.from(characters);
 //   const [reorderedItem] = items.splice(result.source.index, 1);
 //   items.splice(result.destination.index, 0, reorderedItem);
 //   updateCharacters(items);
 //   var ttt=items;
 //   localStorage.setItem("last_image",ttt[ttt.length-1].satgeName+".jpg")
 //   var posi=1;
 //   axios.get('http://127.0.0.1:8000/api/UserProfile/'+localStorage.getItem('id')+'/').then((res)=>{
 //
 //     ttt.map((item)=>{
 //       if(res.data.email==item.email && item.satgeName!="begin"){
 //         posi++;
 //         axios.put('http://127.0.0.1:8000/api/PipeLine/'+item.id+'/', {
 //                 "email": item.email,
 //                 "parameters": item.parameters,
 //                 "techniqueName":item.techniqueName,
 //                 "technique": item.technique,
 //                 "satgeName": item.satgeName,
 //                 "imageURL": item.imageURL,
 //                 "position": posi
 //         }).then((response) => {
 //         }).catch((error) => {
 //         });
 //       }
 //     })
 //     var old_image="begin.jpg"
 //     async function fon(){
 //       for(let i=1;i<pipeline.length;i++){
 //       var config = {
 //         method: 'get',
 //         url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/'+ttt[i].technique+'?username='+ttt[i].email+'&old_img='+old_image+'&new_img='
 //         +ttt[i].satgeName+'.jpg&'+ttt[i].parameters,
 //         headers: {
 //           'Content-Type': 'application/json'
 //         }
 //       };
 //       let response = await axios(config);
 //       old_image=ttt[i].satgeName+".jpg";
 //       localStorage.setItem("last_image",old_image);
 //     }
 //     window.location.reload()}
 //     fon()
 //   })
 //   };

const removeAll = () => {
  deleteAll();

  editOriginal({
    uri: "default",
    id: "0",
  });
  var config1 = {
    method: 'get',
    url: 'http://192.168.1.24:9000/api/PipeLine/',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  //var techniques;
  axios(config1)
  .then(function (response) {
    setTechniques2(response.data);

    var i;
    for(i = 0; i < techniques.length; i++){

      if(techniques[i].email == signinState[0].userInfo.email){
        //console.log("YESSS");
        deleteTechnique(techniques[i].id);
      }

    }
  })
  .catch(function (error) {
    console.log(error);
  });


}
  useEffect(() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  })();
}, []);

const getPipeline = async () =>{
  try{
    const response = await  axios(config1)
      .then(function (response) {
        var i;
        for(i = 0; i < response.data.length; i++){
          if(response.data[i].email == signinState[0].userInfo.email && response.data[i].satgeName == "begin"){
            editOriginal({
              uri: response.data[i].imageURL,
              id: response.data[i].id.toString(10)
            });
            break;
          }
        }

        setTechniques(response.data, signinState[0].userInfo.email);

      })
      .catch(function (error) {
        console.log(error);
      });
}
catch(e){
  console.log(e);
}
};


const getPipeline1 = async () =>{
  try{
    const response = await  axios(config1)
      .then(function (response) {
        setTechniques(response.data, signinState[0].userInfo.email);

      })
      .catch(function (error) {
        console.log("ERROR");
        console.log(error);
      });
}
catch(e){
  console.log(e);
}
};
var config1 = {
  method: 'get',
  url: 'http://192.168.1.24:9000/api/PipeLine/',
  headers: {
    'Content-Type': 'application/json'
  }
};

useEffect(() => {
getPipeline();
//console.log("GET PIPELINE");
}, []);


const uploadImage = imageUri => {

  const file = {
    // `uri` can also be a file system path (i.e. file://)
    uri: imageUri,
    name: "begin.jpg",
    type: "image/jpg"
  }

  const options = {
    keyPrefix: signinState[0].userInfo.email+"/",
    bucket: "gp-1-hiba-raghad",
    region: "us-east-2",
    accessKey: "AKIAUYEWTEH6DE44Q3P7",
    secretKey: "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",
    successActionStatus: 201
  }

  RNS3.put(file, options).then(response => {
    //console.log(response.body.postResponse.location);
    axios.post('http://192.168.1.24:9000/api/PipeLine/', {
      "email": signinState[0].userInfo.email,
      "parameters": "nothing",
      "techniqueName": "Upload",
      "technique": "upload",
      "satgeName": "begin",
      "imageURL": response.body.postResponse.location,
      "position": 1
    }).then((response1) => {
      const img = {uri: response.body.postResponse.location, id: response1.data.id }
      editOriginal(img);
      //console.log(original);
    }).catch((error) => {
      console.log(error);
      alert("A problem occured. Please, try again.");
    });

  });
}

const pickImage = () => {
  ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
  }).then(res => {
    //console.log(res);
    uploadImage(res.uri);
  });
};

const code1 = `#The code will be generated here`;
var code2 = '';
const[codee, setCodee] = useState(code1);
var em;
function GenerateCode(){
  axios.get('http://192.168.1.24:9000/api/UserProfile/'+signinState[0].userInfo.id+'/').then((result)=>{
    em = signinState[0].userInfo.email;
  axios.get("http://192.168.1.24:9000/api/PipeLine/").then((res)=>{
    var tt=[];
    var algorithm_techniques = [];
    var algorithm_parameters = [];
    var algorithm_item={};
    res.data.map((item)=>{
      if(item.email==em){
        if(item.techniqueName != 'Upload'){
        tt.push(item)

        if(Object.keys(algorithm_item).length === 0){
          algorithm_item.techniques = item.technique + ",";
          algorithm_item.parametres = item.technique + ":" + item.parameters +  ";"
        }
        else{
          algorithm_item.techniques= algorithm_item.techniques  + item.technique + ","
          algorithm_item.parametres = algorithm_item.parametres  + item.technique + ":" + item.parameters +  ";"
        }
}
      //console.log("item");
      //console.log(item);
      }
      })
      //console.log("ALGORITHM_ITEM");
      //console.log(algorithm_item);
      setAlgorithm_item1(algorithm_item);
      tt.sort((a, b) => (a.position > b.position) ? 1 : -1)
      //console.log(tt);
      axios.get('http://192.168.1.24:9000/api/SourceCode').then((res)=>{
        code2=res.data[0].code;
        code2+=`\r\n`;
        //console.log(tt);
        tt.map((item)=>{

          //console.log(item);
          let obj = res.data.find(o => o.technique === item.technique);

          let code=obj.code;
          let values=item.parameters.split('&');
          for(let i=0;i<values.length;i++){
             let va=values[i].split('=')
             if(item.technique=="zoom" && va[0]=="arrow"){
                code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="histogram-equalization" && va[0]=="band"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="laplacian" && va[0]=="pre_filter"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="morphological" && va[0]=="elementt"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="morphological" && va[0]=="morphoo"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
            else if(item.technique=="prewitt" && va[0]=="pre_filter"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="roberts" && va[0]=="pre_filter"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="sobel" && va[0]=="pre_filter"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="color-space" && va[0]=="img_format"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="arith-add"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="arith-subtract"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="arith-multiply"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="arith-divide"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="logic-and"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="logic-or"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="logic-xor"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else if(item.technique=="logic-not"){
              code=code.replace(/va[0]/g,'"'+va[1]+'"')
             }
             else{
              code=code.replace(/va[0]/g,va[1])
             }
          }
          code2+=`#`+item.techniqueName+`\r\n`;
          code2+=code;
          code2+=`\r\n`;
      })
      setCodee(code2);
      navigation.navigate("Code", {source_code: code2, view: 'new', algorithm_item: algorithm_item})
      })
    });
    })
}
  const renderItem = useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
      const user = signinState[0].userInfo;
      return (
        <>
        <TouchableOpacity onLongPress={drag}>
        <View style={dragStyle}><MaterialIcons name="drag-indicator" size={40} color="white"/></View>
        </TouchableOpacity>
        <Card
        img={item}
        onViewPressed={() => {
          setPressedIcon("view");
          setView_uri(item.uri);
          toggleModal();
        }}
        onRedPressed={() => {
          setPressedIcon("red");
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/red-band?username='+user.email+'&old_img='+item.imgName+'.jpg&new_img=red.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              //console.log(response.data.url)
              setRed_uri(response.data.url);
              toggleModal();
            }).catch((error)=> {
              console.log(error);
              alert("A problem occured. Please, try again.");
            })

        }}
        onGreenPressed={() => {
          setPressedIcon("green");
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/green-band?username='+user.email+'&old_img='+item.imgName+'.jpg&new_img=green.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              //console.log(response.data.url)
              setGreen_uri(response.data.url);
              toggleModal();
            }).catch((error)=> {
              console.log(error);
              alert("A problem occured. Please, try again.");
            })

        }}
        onBluePressed={() => {
          setPressedIcon("blue");

          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/blue-band?username='+user.email+'&old_img='+item.imgName+'.jpg&new_img=blue.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              //console.log(response.data.url)
              setBlue_uri(response.data.url);

              toggleModal();
            }).catch((error)=> {
              console.log(error);
              alert("A problem occured. Please, try again.");
            })

        }}
        onHistogramPressed={() => {
          setPressedIcon("histogram");
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/show-histogram?username='+user.email+'&old_img='+item.imgName+'.jpg&new_img=histogram.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              //console.log(response.data.url)
              setHistogram_uri(response.data.url);

              var config1 = {
                method: 'get',
                url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/stats?username='+user.email+'&old_img='+item.imgName+'.jpg',
                headers: {
                  'Content-Type': 'application/json'
                }
              };

                axios(config1).then((response)=> {
                  //console.log(response.data.url)
                  //setHistogram_uri(response.data.url);
                  //console.log("STATS");
                  //console.log(response.data.entropy0);
                  setStats(response.data);
                  toggleModal();
                }).catch((error)=> {
                  console.log(error);
                  alert("A problem occured. Please, try again.");
                })
              //toggleModal();
            }).catch((error)=> {
              console.log(error);
              alert("A problem occured. Please, try again.");
            })
        }}

        onDeletePressed={async()=>{
          console.log("hello");
          setProgress(true);
          deleteTechnique(item.id);
          var new_pipeline = pipeline.filter(technique => technique.id !== item.id);

          var i;
          for(i = 0; i < new_pipeline.length; i++){
            new_pipeline[i].position = i + 1;
            if(i == 0){
              new_pipeline[i].old_img = 'begin.jpg'
            }
            else{
              new_pipeline[i].old_img = new_pipeline[i - 1].imgName + ".jpg";
            }
          }
          i = 0;
          for(i=0; i < new_pipeline.length ; i++){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/'+new_pipeline[i].technique+'?username='+new_pipeline[i].email+'&old_img='+new_pipeline[i].old_img+'&new_img='
            +new_pipeline[i].imgName+'.jpg&'+new_pipeline[i].parameters,
            headers: {
              'Content-Type': 'application/json'
            }
          };
          let response = await axios(config).then((res)=>{
            axios.put("http://192.168.1.24:9000/api/PipeLine/"+new_pipeline[i].id+"/",{
              "email": new_pipeline[i].email,
              "parameters": new_pipeline[i].parameters,
              "techniqueName":new_pipeline[i].techniqueName,
              "technique": new_pipeline[i].technique,
              "satgeName": new_pipeline[i].imgName,
              "imageURL": new_pipeline[i].uri,
              "position": new_pipeline[i].position
            }).then((resp)=>{
            }).catch((e)=>{
              console.log(e);
            })
          }).catch((error) => {
            console.log(error);
          });

        }
          getPipeline1();
          setProgress(false);
        }}
         />
        </>
      );
    },
    []
  );
  const renderHeader = () => {
    const user = signinState[0].userInfo;
     return (
       <View>
       {progress?(
         <CustomProgressBar/>
       ):
     null}
       <Text style={text1Style}>Modify your image by applying new techniques!</Text>
       <Text style={text2Style}>Your Image Pipeline</Text>
       <FirstCard
       imgURI={original.uri}
       onViewPressed={() => {
         setPressedIcon("view");
         setView_uri(original.uri);
         toggleModal();
       }}
       onRedPressed={() => {
         setPressedIcon("red");

         var config = {
           method: 'get',
           url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/red-band?username='+user.email+'&old_img=begin.jpg&new_img=red.jpg',
           headers: {
             'Content-Type': 'application/json'
           }
         };

           axios(config).then((response)=> {
             //console.log(response.data.url)
             setRed_uri(response.data.url);

             toggleModal();
           }).catch((error)=> {
             console.log(error);
             alert("A problem occured. Please, try again.");
           })

       }}
       onGreenPressed={() => {
         setPressedIcon("green");

         var config = {
           method: 'get',
           url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/green-band?username='+user.email+'&old_img=begin.jpg&new_img=green.jpg',
           headers: {
             'Content-Type': 'application/json'
           }
         };

           axios(config).then((response)=> {
             //console.log(response.data.url)
             setGreen_uri(response.data.url);

             toggleModal();
           }).catch((error)=> {
             console.log(error);
             alert("A problem occured. Please, try again.");
           })

       }}
       onBluePressed={() => {
         setPressedIcon("blue");

         var config = {
           method: 'get',
           url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/blue-band?username='+user.email+'&old_img=begin.jpg&new_img=blue.jpg',
           headers: {
             'Content-Type': 'application/json'
           }
         };

           axios(config).then((response)=> {
             //console.log(response.data.url)
             setBlue_uri(response.data.url);

             toggleModal();
           }).catch((error)=> {
             console.log(error);
             alert("A problem occured. Please, try again.");
           })

       }}

       onHistogramPressed={() => {
         setPressedIcon("histogram");
         var config = {
           method: 'get',
           url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/show-histogram?username='+user.email+'&old_img=begin.jpg&new_img=histogram.jpg',
           headers: {
             'Content-Type': 'application/json'
           }
         };

           axios(config).then((response)=> {
             //console.log(response.data.url)
             setHistogram_uri(response.data.url);

             var config1 = {
               method: 'get',
               url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/stats?username='+user.email+'&old_img=begin.jpg',
               headers: {
                 'Content-Type': 'application/json'
               }
             };

               axios(config1).then((response)=> {
                 //console.log(response.data.url)
                 //setHistogram_uri(response.data.url);
                 //console.log("STATS");
                 //console.log(response.data.entropy0);
                 setStats(response.data);
                 toggleModal();
               }).catch((error)=> {
                 console.log(error);
                 alert("A problem occured. Please, try again.");
               })
             //toggleModal();
           }).catch((error)=> {
             console.log(error);
             alert("A problem occured. Please, try again.");
           })
       }}
       onCameraPressed={() => {
         setPressedIcon("camera");
         navigation.navigate("Camera");
       }}
       onUploadPressed={() => {
         setPressedIcon("upload");
         pickImage();
       }}
       onDownloadPressed={() => {
         setPressedIcon("download");
         //console.log("download");
         download(original.uri);
       }}
       />
       </View>
     );
   };

return(
        <View style={containerStyle}>
          <DraggableFlatList
            data={pipeline}
            renderItem={renderItem}
            keyExtractor={technique => technique.id.toString(10)}
            onDragEnd={({ data }) => {
              //console.log("DATAAA");
              //console.log(data);

              //console.log("HIIIIIIIII")
              //console.log(pipeline)
              updateOnDrag(data);
            }}
            ListHeaderComponent = {renderHeader}
          />

          <ActionButton buttonColor="#f6a823" >
                    <ActionButton.Item buttonColor='#000' title="Add Technique" onPress={() => {
                      //addTechnique();
                      navigation.navigate("Techniques")
                    }}>
                      <AntDesign name="pluscircle" size={20} color="white"/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#7ca7c4' title="Generate Code" onPress={() => {
                      GenerateCode();
                      //setTimeout(()=>navigation.navigate("Code", {source_code: codee, view: 'new', algorithm_item: algorithm_item1}), 2000);
                      //addTechnique();

                    }}>
                      <FontAwesome5 name="feather" size={24} color="white" />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#6e3c3c' title="Remove All" onPress={() => {removeAll()}}>
                      <MaterialIcons name="delete" size={25} color="white" />
                    </ActionButton.Item>

          </ActionButton>

          {pressedIcon == "histogram" ?
          <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" animationOutTiming={500} animationInTiming={500}>
          <View style={{flex: 1}}>
          <View style={styles.modalStyle}>
          <View>
            <Image
              style={{ width:'100%' , height: 250}}
              source={{uri: histogram_uri+"?time=" + (new Date()).getTime(), headers: {Pragma: 'no-cache' }}}
              resizeMode="contain"
            />
            </View>
            <View style={{marginTop: 40, marginBottom: 70}}>
            <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: "gray", paddingVertical: 8}}>
            <Text style={{fontSize: 12, marginRight: 30}}>Band</Text>
            <Text style={{fontSize: 12, marginRight: 30}}>Mean</Text>
            <Text style={{fontSize: 12, marginRight: 30}}>STD</Text>
            <Text style={{fontSize: 12, marginRight: 30}}>Skew</Text>
            <Text style={{fontSize: 12}}>Entropy</Text>
            </View>
            <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: "gray", paddingVertical: 8}}>
            <Text style={{color: "blue", fontSize: 12, marginRight: 30}}>Blue  </Text>
            <Text style={{color: "blue", fontSize: 12, marginRight: 37}}>{financial(stats.mean0)}</Text>
            <Text style={{color: "blue", fontSize: 12, marginRight: 30}}>{financial(stats.std0)}</Text>
            <Text style={{color: "blue", fontSize: 12, marginRight: 30}}>{financial(stats.skew0)}</Text>
            <Text style={{color: "blue", fontSize: 12}}>{financial(stats.entropy0)}</Text>
            </View>
            <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: "gray", paddingVertical: 8}}>
            <Text style={{color: "green", fontSize: 12, marginRight: 28}}>Green</Text>
            <Text style={{color: "green", fontSize: 12, marginRight: 30}}>{financial(stats.mean1)}</Text>
            <Text style={{color: "green", fontSize: 12, marginRight: 30}}>{financial(stats.std1)}</Text>
            <Text style={{color: "green", fontSize: 12, marginRight: 30}}>{financial(stats.skew1)}</Text>
            <Text style={{color: "green", fontSize: 12, marginRight: 30}}>{financial(stats.entropy1)}</Text>
            </View>
            <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: "gray", paddingVertical: 8}}>
            <Text style={{color: "red", fontSize: 12, marginRight: 40}}>Red</Text>
            <Text style={{color: "red", fontSize: 12, marginRight: 30}}>{financial(stats.mean2)}</Text>
            <Text style={{color: "red", fontSize: 12, marginRight: 30}}>{financial(stats.std2)}</Text>
            <Text style={{color: "red", fontSize: 12, marginRight: 30}}>{financial(stats.skew2)}</Text>
            <Text style={{color: "red", fontSize: 12}}>{financial(stats.entropy2)}</Text>
            </View>
            </View>
            <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10}} onPress={toggleModal}>
            <Text style={{color: "gray"}}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', bottom: 10, left: 10}} onPress={()=>download(histogram_uri)}>
            <Text style={{color: "gray"}}>Save Image</Text>
            </TouchableOpacity>
          </View>
          </View>
          </Modal>
          :
          null
        }

        {pressedIcon == "red" ?
        <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" animationOutTiming={500} animationInTiming={500}>
        <View style={{flex: 1}}>
        <View style={styles.modalStyle}>
        <View>
          <Image
            style={{ width:'100%' , height: 250, marginBottom: 40}}
            source={{ uri: red_uri+"?time=" + (new Date()).getTime(), headers: {Pragma: 'no-cache' }}}
            resizeMode="contain"
          />
          </View>
          <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10}} onPress={toggleModal}>
          <Text style={{color: "gray"}}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', bottom: 10, left: 10}}
          onPress={()=>download(red_uri)}>
          <Text style={{color: "gray"}}>Save Image</Text>
          </TouchableOpacity>
        </View>
        </View>
        </Modal>
        :
        null
      }

      {pressedIcon == "green" ?
      <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" animationOutTiming={500} animationInTiming={500}>
      <View style={{flex: 1}}>
      <View style={styles.modalStyle}>
      <View>
      <Image
        style={{ width:'100%' , height: 250, marginBottom: 40}}
        source={{ uri: green_uri+"?time=" + (new Date()).getTime(), headers: {Pragma: 'no-cache' }}}
        resizeMode="contain"
      />
        </View>
        <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10}} onPress={toggleModal}>
        <Text style={{color: "gray"}}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'absolute', bottom: 10, left: 10}}
        onPress={()=>download(green_uri)}>
        <Text style={{color: "gray"}}>Save Image</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
      :
      null
    }

    {pressedIcon == "blue" ?
    <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" animationOutTiming={500} animationInTiming={500}>
    <View style={{flex: 1}}>
    <View style={styles.modalStyle}>
    <View>
    <Image
      style={{ width:'100%' , height: 250, marginBottom: 40}}
      source={{ uri: blue_uri+"?time=" + (new Date()).getTime(), headers: {Pragma: 'no-cache' }}}
      resizeMode="contain"
    />
      </View>
      <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10}} onPress={toggleModal}>
      <Text style={{color: "gray"}}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{position: 'absolute', bottom: 10, left: 10}}
      onPress={()=>download(blue_uri)}>
      <Text style={{color: "gray"}}>Save Image</Text>
      </TouchableOpacity>
    </View>
    </View>
    </Modal>
    :
    null
  }

  {pressedIcon == "view" ?
  <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" animationOutTiming={500} animationInTiming={500}>
  <View style={{flex: 1}}>
  <View style={styles.modalStyle}>
  <View>
    <Image
      style={{ width:'100%' , height: 250, marginBottom: 40}}
      source={{ uri: view_uri+"?time=" + (new Date()).getTime(), headers: {Pragma: 'no-cache' }}}
      resizeMode="contain"
    />
    </View>
    <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10}} onPress={toggleModal}>
    <Text style={{color: "gray"}}>Close</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{position: 'absolute', bottom: 10, left: 10}}
    onPress={()=>download(view_uri)}>
    <Text style={{color: "gray"}}>Save Image</Text>
    </TouchableOpacity>
  </View>
  </View>
  </Modal>
  :
  null
}

        </View>
);
}


const styles = StyleSheet.create({
  containerStyle:{
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  text1Style:{
    fontSize: 10,
    color: '#1F1F1F',
    marginTop: 5,
    marginLeft: 7
  },
  text2Style:{
    fontSize: 20,
    color: '#234143',
    marginBottom: 20,
    marginLeft: 7,
    fontWeight: 'bold'
  },
  dragStyle:{
    backgroundColor: "#006080",
    marginHorizontal: 7,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#3C6E71',
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalStyle:{
    borderRadius: 10,
    backgroundColor: "white",
    padding: 5,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: "white",
  }
});


export default PipelineScreen;
