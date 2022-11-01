import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView,ImageBackground} from 'react-native';
import { Button } from 'react-native-paper';
import { Context as UserContext} from '../context/UserContext';
import { FontAwesome5, FontAwesome} from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Context as ImagesetContext} from '../context/ImagesetContext';
import { Context as AlgorithmContext} from '../context/AlgorithmContext';
import { Context as StatsContext} from '../context/StatsContext';
import axios from 'axios'

const ApplyScreen = ({navigation}) =>{
  const { state:imagesets, addImageset, deleteImageset, viewImageset, deleteAllImageset, setImagesets } = useContext(ImagesetContext);
  const { state:algorithms, addAlgorithm, deleteAlgorithm, viewCode, deleteAllAlgorithm, setAlgorithms } = useContext(AlgorithmContext);
  const {state:signinState, signin, signout, signup } = useContext(UserContext);
  const {state:stats, editStats } = useContext(StatsContext);

  const [imageset, setImageset] = useState('');
  const [algorithm, setAlgorithm] = useState('');

  const [loadingFlag, setLoadingFlag] = useState(false);
  const [text, setText] = useState("Apply Algorithm");

  useEffect(() => {
    setImageset(imagesets[0].imagesetName);
    setAlgorithm(algorithms[0].algorithmName);
  }, []);
  const handleClick = () => {
    var tech=[];
    var count=0;
    let temp=[];

    let obj = algorithms.find(o => (o.algorithmName == algorithm));

    let values=obj.techniques.split(',');
    for(let j=1;j<values.length;j++){
      tech.push(values[j-1]);
    }
    let obj2 = imagesets.find(o => (o.imagesetName == imageset));
    count=obj2.count;
    let all={};
    let stat={};
    all["img_set"]=imageset;
    all["username"]=signinState[0].userInfo.email;
    all["count"]=count;
    all["techniques"]=tech;
    stat["img_set"]=imageset;
    stat["username"]=signinState[0].userInfo.email;
    stat["count"]=count;
    stat["techniques"]=["show-histogram","stats"];
    for(let r=0;r<count;r++){
      temp.push(r);
    }
    //localStorage.setItem("Imagesetname",Imagesets.current.value);
    let tec=obj.parametres.split(';');
    for(let j=1;j<tec.length;j++){
      var name=tech[j-1];
      let te=tec[j-1].split(':');
      let t=te[1].split('&');
      let names=[];
      let values=[];
      for(let u=0;u<t.length;u++){
        let tt=t[u].split('=');
        names.push(tt[0]);
        values.push(tt[1]);
      }
      var json_arr = {};
      names.map((item,index)=>{
        if(name=="adaptive-histogram-equalization" || name=="band-pass"||name=="band-reject" || name=="canny"||
        name=="color-contrast-algorithm"|| name=="crop"||name=="high-pass"|| name=="histogram-stretch"|| name=="hough"||
        name=="low-pass"||name=="resize"||name=="rotate" ||name=="translate" ||name=="binary-threshold"||
        name=="gray-quantization" ||name=="create-circle"||name=="create-line"||name=="create-rectangle"||name=="create-ellipse"||
        name=="gaussian-filter"||name=="median-filter"||name=="average-filter"||name=="min-filter"||name=="max-filter"
        || name=="histogram-slide"){
          json_arr[item]=parseInt(values[index]);
        }
        else if(name=="gray-level-multiplication"){
          json_arr[item]=parseFloat(values[index]);
        }
        else if(name=="harris-corner"){
          if(item=="minimum_distance"|| item=="kernel_size"){
            json_arr[item]=parseInt(values[index]);
          }
          else{
            json_arr[item]=parseFloat(values[index]);
          }
        }
        else if(name=="laplacian" || name=="prewitt" || name=="roberts"||name=="sobel"){
          if(item=="filter_size"|| item=="post_threshold"||item=="kernel_size"){
            json_arr[item]=parseInt(values[index]);
          }
          else{
            json_arr[item]=values[index];
          }
        }
        else if(name=="zoom"){
          if(item=="arrow"){
            json_arr[item]=values[index];
          }
          else if(item=="by"){
            json_arr[item]=parseFloat(values[index]);
          }
          else{
            json_arr[item]=parseInt(values[index]);
          }
        }
        else if(name=="power-low" || name=="s-p-noise"){
          json_arr[item]=parseFloat(values[index]);
        }
        else if(name=="morphological"){
          if(item=="size"||item=="iterationss"||item=="width"||item=="height"){
            json_arr[item]=parseInt(values[index]);
          }
          else{
            json_arr[item]=values[index];
          }
        }
        else{
          json_arr[item]=values[index];
        }
        })
        all[tech[j-1]]=json_arr;
        }
      console.log(JSON.stringify(all))
        axios.post('https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/post-main/',  JSON.stringify(all)).then( (response)=> {
            //setapplying(false);
            //force();
            console.log("success")
            axios.post('https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/post-main/',
             JSON.stringify(stat)).then((response)=>{
               //localStorage.setItem("stats",JSON.stringify(response.data.body));
               //setResult(temp);
               var images = [];
               var  i;
               for(i = 0; i < count; i++){
                 images[i] = {"image": "https://gp-1-hiba-raghad.s3.us-east-2.amazonaws.com/"+signinState[0].userInfo.email+"/"+imageset +"/final" + i.toString(10) + ".jpg"};
               }
               console.log("IMAGESSSSSS")
               console.log(images)

               var statsArray = response.data.body;
               editStats(statsArray, signinState[0].userInfo.email, imageset, count);
               setText("Apply Algorithm");
               setLoadingFlag(false);
               navigation.navigate('Result', {
                 screen: 'View',
                 params: { images: images, name: "Images", imageset: imageset, flag:true},
               },
               {
                 screen: 'Stats',
                 params: {  imageset: imageset},
               });

            }).catch((error)=>{
              console.log(error)
            });
          }).catch(function (error) {
            console.log("fail")
            setTimeout(function(){
          axios.post('https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/post-main/',
          JSON.stringify(stat)).then((response)=>{
         //localStorage.setItem("stats",JSON.stringify(response.data.body));
         //setResult(temp);
         var images = [];
         var  i;
         for(i = 0; i < count; i++){
           images[i] = {"image": "https://gp-1-hiba-raghad.s3.us-east-2.amazonaws.com/"+signinState[0].userInfo.email+"/"+imageset +"/final" + i.toString(10) + ".jpg"};
         }
         console.log("IMAGESSSSSS")
         console.log(images)
         //navigation.navigate('View', {images: images, name: item.imagesetName})
         console.log(response.data.body)
        }).catch((error)=>{
          console.log(error)
        });

      }.bind(this),100)

          });

    };


  const  renderImagesets = () => {
    //console.log(imagesets)
    return imagesets.map((item) => {
        return (
            <Picker.Item
                label={item.imagesetName}
                value={item.imagesetName}
                key={item.imagesetName}
            />
        );
    });
}

const  renderAlgorithms = () => {
  return algorithms.map((item) => {
      return (
          <Picker.Item
              label={item.algorithmName}
              value={item.algorithmName}
              key={item.algorithmName}
          />
      );
  });
}

  return (
    <ScrollView style={styles.containerStyle}>
    <View style={styles.viewStyle}>
    <View>
    <Text style={styles.text2Style}>Imagesets</Text>
    <Text style={styles.text1Style}>Here you can find all imagesets you uploaded!</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={imageset}
    onValueChange={(itemValue, itemIndex) => setImageset(itemValue)}>
    {renderImagesets()}
    </Picker>
    </View>

    <View>
    <Text style={styles.text2Style}>Algorithms</Text>
    <Text style={styles.text1Style}>Here you can find all algorithms you saved on the cloud!</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={algorithm}
    onValueChange={(itemValue, itemIndex) => setAlgorithm(itemValue)}>
    {renderAlgorithms()}
    </Picker>
    </View>
    <Button uppercase={false} style={styles.loginBtn} loading={loadingFlag} mode="contained" onPress={() =>{
      setLoadingFlag(true);
      setText("Processing");
      handleClick()
    }}>
    {text}
    </Button>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle:{
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 10,

  },
  viewStyle:{
    justifyContent: 'center',


    backgroundColor: '#F5F5F5',
  },
  text1Style:{
    fontSize: 10,
    color: '#1F1F1F',
    marginBottom: 7,
    marginLeft: 7
  },
  text2Style:{
    fontSize: 20,
    color: '#234143',
    marginTop: 20,
    marginLeft: 7,
    fontWeight: 'bold'
  },
  loginBtn:{
    width:"100%",
    backgroundColor:"#f6a823",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default ApplyScreen;
