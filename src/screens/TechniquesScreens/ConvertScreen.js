import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import TechCard from '../../components/TechCard';
import { RadioButton} from 'react-native-paper';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'
import { Context as UserContext} from '../../context/UserContext';
import { Context as PipelineContext} from '../../context/PipelineContext';
import { Context as OriginalContext} from '../../context/OriginalContext';
const ConvertScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const [value, setValue] = useState('');
  const [threshold, setThreshold] = useState('');
  const [levels, setLevels] = useState('');
  const [space, setSpace] = useState('BGR2HSV');
  const {state:signinState, signin, signout} = useContext(UserContext);
  const { state:pipeline, addTechnique, deleteTechnique, editTechnique, showTechnique, updateTechniques, deleteAll } = useContext(PipelineContext);
  const {state:original, editOriginal } = useContext(OriginalContext);

  return(
    <View style={{flex: 1, backgroundColor: "#f7f7f7"}}>
    <ScrollView>

    <View style={{flexDirection: 'column', marginVertical: 10, marginHorizontal: 5}}>
    <Text style={{fontSize: 18, marginBottom: 2}}>Stage Name</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setImage(text)}
      value={image}
    />
    </View>

    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
    <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10}}>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="threshold" />
    <Text style={styles.textStyle}>Binary Threshold</Text>
    </View>
    {value=="threshold"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Threshold Value</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={threshold}
      onChangeText={text => setThreshold(text)}
    />
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="quantization" />
    <Text style={styles.textStyle}>Gray Level Quantization</Text>
    </View>
    {value=="quantization"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Gray Levels Number</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={levels}
      onChangeText={text => setLevels(text)}
    />
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="gray" />
    <Text style={styles.textStyle}>Color to Gray</Text>
    </View>

    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="color" />
    <Text style={styles.textStyle}>Color Space</Text>
    </View>
    {value=="color"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={space}
    onValueChange={(itemValue, itemIndex) => setSpace(itemValue)}>
    <Picker.Item label="RGB to HSV" value="BGR2HSV" />
    <Picker.Item label="RGB to LUV" value="BGR2LUV" />
    <Picker.Item label="RGB to XYZ" value="BGR2XYZ" />
    <Picker.Item label="RGB to HLS" value="BGR2HLS" />
    <Picker.Item label="HSV to RGB" value="HSV2BGR" />
    </Picker>

    </View>
    </View>
    :
    null
  }
    </TechCard>
  </View>
  </RadioButton.Group>
  <View style={{marginBottom: 10}}>
  <Button
  title="Add"
  type="solid"
  buttonStyle={{marginHorizontal: 5, marginVerical: 10, backgroundColor: "#006080"}}
  onPress={()=>{
  var axios = require('axios');
  const user = signinState[0].userInfo;
  var indexx = pipeline.length + 1;
  var old_img = "";
  {indexx==1?old_img="begin.jpg":old_img=pipeline[indexx - 2].imgName+".jpg"}

    if(image == '' || value == ''){
      alert('Please check all fields.');
    }
    else if(pipeline.some(img=>img.imgName==image)){
      alert('Image name already exists in the pipeline.');
    }
    else{
      if(value == 'quantization' && levels != ''){
        var config = {
          method: 'get',
          url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/gray-quantization?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&gray_levels='+levels,
          headers: {
            'Content-Type': 'application/json'
          }
        };

          axios(config).then((response)=> {
            axios.post('http://192.168.1.24:9000/api/PipeLine/', {
              "email": user.email,
              "parameters": 'gray_levels='+levels,
              "techniqueName": "Gray Level Quantization",
              "technique": "gray-quantization",
              "satgeName":image,
              "imageURL": response.data.url,
              "position": indexx
            }).then((response1) => {
              console.log(response.data.url)
              var img = {
                imgName: image,
                techniqueName: "Gray Level Quantization",
                uri: response.data.url,
                id: response1.data.id,
                email: response1.data.email,
                technique: "gray-quantization",
                parameters: 'gray_levels='+levels,
              }
              addTechnique(img);
              navigation.navigate("Pipeline");
            }).catch((error) => {
              console.log(error)
              alert("Please check all fields.");
            });
          }).catch((error)=> {
            console.log(error);
            alert("A problem occured. Please, try again.");
          })
      }
      else if(value == 'threshold' && threshold != ''){
        var config = {
          method: 'get',
          url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/binary-threshold?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&threshold_value='+threshold,
          headers: {
            'Content-Type': 'application/json'
          }
        };

          axios(config).then((response)=> {
            axios.post('http://192.168.1.24:9000/api/PipeLine/', {
              "email": user.email,
              "parameters": 'threshold_value='+threshold,
              "techniqueName": "Binary Threshold",
              "technique": "binary-threshold",
              "satgeName":image,
              "imageURL": response.data.url,
              "position": indexx
            }).then((response1) => {
              console.log(response.data.url)
              var img = {
                imgName: image,
                techniqueName: "Binary Threshold",
                uri: response.data.url,
                id: response1.data.id,
                email: response1.data.email,
                technique: "binary-threshold",
                parameters: 'threshold_value='+threshold,
              }
              addTechnique(img);
              navigation.navigate("Pipeline");
            }).catch((error) => {
              console.log(error)
              alert("Please check all fields.");
            });
          }).catch((error)=> {
            console.log(error);
            alert("A problem occured. Please, try again.");
          })
      }
      else if(value == 'gray'){
        var config = {
          method: 'get',
          url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/color-to-gray?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg',
          headers: {
            'Content-Type': 'application/json'
          }
        };

          axios(config).then((response)=> {
            axios.post('http://192.168.1.24:9000/api/PipeLine/', {
              "email": user.email,
              "parameters": 'nothing',
              "techniqueName": "Color to Gray",
              "technique": "color-to-gray",
              "satgeName":image,
              "imageURL": response.data.url,
              "position": indexx
            }).then((response1) => {
              console.log(response.data.url)
              var img = {
                imgName: image,
                techniqueName: "Color to Gray",
                uri: response.data.url,
                id: response1.data.id,
                email: response1.data.email,
                technique: "color-to-gray",
                parameters:'nothing'
              }
              addTechnique(img);
              navigation.navigate("Pipeline");
            }).catch((error) => {
              console.log(error)
              alert("Please check all fields.");
            });
          }).catch((error)=> {
            console.log(error);
            alert("A problem occured. Please, try again.");
          })
      }
      else if(value == 'color'){
        var config = {
          method: 'get',
          url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/color-space?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&img_format='+space,
          headers: {
            'Content-Type': 'application/json'
          }
        };

          axios(config).then((response)=> {
            axios.post('http://192.168.1.24:9000/api/PipeLine/', {
              "email": user.email,
              "parameters": 'img_format='+space,
              "techniqueName": "Color Space",
              "technique": "color-space",
              "satgeName":image,
              "imageURL": response.data.url,
              "position": indexx
            }).then((response1) => {
              console.log(response.data.url)
              var img = {
                imgName: image,
                techniqueName: "Color Space",
                uri: response.data.url,
                id: response1.data.id,
                email: response1.data.email,
                technique:"color-space",
                parameters: 'img_format='+space
              }
              addTechnique(img);
              navigation.navigate("Pipeline");
            }).catch((error) => {
              console.log(error)
              alert("Please check all fields.");
            });
          }).catch((error)=> {
            console.log(error);
            alert("A problem occured. Please, try again.");
          })
      }
      else{
        alert("Please check all fields.");
      }
    }
  }}
  />
  </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle:{
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16
  },
  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
},
firstSectionStyle:{
  flexDirection: 'row',
  marginBottom: 10,
  alignItems: 'center'

}
});


export default ConvertScreen;
