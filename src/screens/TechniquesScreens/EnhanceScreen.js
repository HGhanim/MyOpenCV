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
const EnhanceScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const [value, setValue] = useState('');
  const [factor, setFactor] = useState('');
  const [band, setBand] = useState('Lightness');
  const [low_limit, setLow_limit] = useState('');
  const [high_limit, setHigh_limit] = useState('');
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
    <RadioButton value="brighten" />
    <Text style={styles.textStyle}>Brighten/Darken</Text>
    </View>
    {value=="brighten"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Factor</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={factor}
      onChangeText={text => setFactor(text)}
    />
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="equalization" />
    <Text style={styles.textStyle}>Histogram Equalization</Text>
    </View>
    {value=="equalization"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Band</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={band}
    onValueChange={(itemValue, itemIndex) => setBand(itemValue)}>
    <Picker.Item label="Lightness" value="Lightness" />
    <Picker.Item label="Red" value="Red" />
    <Picker.Item label="Green" value="Green" />
    <Picker.Item label="Blue" value="Blue" />
    </Picker>

    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="stretch" />
    <Text style={styles.textStyle}>Histogram Stretch</Text>
    </View>
    {value=="stretch"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Low Limit</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={low_limit}
      onChangeText={text => setLow_limit(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>High Limit</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={high_limit}
      onChangeText={text => setHigh_limit(text)}
    />
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
        if(value == 'equalization'){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/histogram-equalization?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&band='+band,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'band='+band,
                "techniqueName": "Histogram Equalization",
                "technique": "histogram-equalization",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Histogram Equalization",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'band='+band,
                  technique: "histogram-equalization"
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
        else if(value == 'stretch' && low_limit != '' && high_limit != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/histogram-stretch?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&low='+low_limit+'&high='+high_limit,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'low='+low_limit+'&high='+high_limit,
                "techniqueName": "Histogram Stretch",
                "technique": "histogram-stretch",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Histogram Stretch",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'low='+low_limit+'&high='+high_limit,
                  technique: "histogram-stretch",
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
        else if(value == 'brighten' && factor != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/gray-level-multiplication?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&factor='+factor,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'factor='+factor,
                "techniqueName": "Gray Level Multiplication",
                "technique": "gray-level-multiplication",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: 'Gray Level Multiplication',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'factor='+factor,
                  technique: "gray-level-multiplication"
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


export default EnhanceScreen;
