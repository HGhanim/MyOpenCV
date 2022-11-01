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
const SpatialScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const [value, setValue] = useState('none');
  const [size1, setSize1] = useState('3');
  const [size2, setSize2] = useState('3');
  const [size3, setSize3] = useState('3');
  const [size4, setSize4] = useState('3');

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
    <RadioButton value="median" />
    <Text style={styles.textStyle}>Median Filter</Text>
    </View>
    {value=="median"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Mask Size</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={size1}
    onValueChange={(itemValue, itemIndex) => setSize1(itemValue)}>
    <Picker.Item label="3" value="3" />
    <Picker.Item label="5" value="5" />
    <Picker.Item label="7" value="7" />
    <Picker.Item label="9" value="9" />
    <Picker.Item label="11" value="11" />
    </Picker>

    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="min" />
    <Text style={styles.textStyle}>Min Filter</Text>
    </View>
    {value=="min"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Mask Size</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={size2}
    onValueChange={(itemValue, itemIndex) => setSize2(itemValue)}>
    <Picker.Item label="3" value="3" />
    <Picker.Item label="5" value="5" />
    <Picker.Item label="7" value="7" />
    <Picker.Item label="9" value="9" />
    <Picker.Item label="11" value="11" />
    </Picker>

    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="max" />
    <Text style={styles.textStyle}>Max Filter</Text>
    </View>
    {value=="max"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Mask Size</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={size3}
    onValueChange={(itemValue, itemIndex) => setSize3(itemValue)}>
    <Picker.Item label="3" value="3" />
    <Picker.Item label="5" value="5" />
    <Picker.Item label="7" value="7" />
    <Picker.Item label="9" value="9" />
    <Picker.Item label="11" value="11" />
    </Picker>

    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="mean" />
    <Text style={styles.textStyle}>Arithmetic Mean Filter</Text>
    </View>
    {value=="mean"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Mask Size</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={size4}
    onValueChange={(itemValue, itemIndex) => setSize4(itemValue)}>
    <Picker.Item label="3" value="3" />
    <Picker.Item label="5" value="5" />
    <Picker.Item label="7" value="7" />
    <Picker.Item label="9" value="9" />
    <Picker.Item label="11" value="11" />
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
        if(value == 'median'){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/median-filter?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&filter_size='+size1,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'filter_size='+size1,
                "techniqueName": "Median Filter",
                "technique": "median-filter",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Median Filter",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'filter_size='+size1,
                  technique: "median-filter"
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
        else if(value == 'min'){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/min-filter?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&filter_size='+size2,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'filter_size='+size2,
                "techniqueName": "Min Filter",
                "technique": "min-filter",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Min Filter",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'filter_size='+size2,
                  technique: "min-filter",
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
        else if(value == 'max'){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/max-filter?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&filter_size='+size3,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'filter_size='+size3,
                "techniqueName": "Max Filter",
                "technique": "max-filter",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Max Filter",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'filter_size='+size3,
                  technique: "max-filter"
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
        else if(value == 'mean'){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/average-filter?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&filter_size='+size4,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'filter_size='+size4,
                "techniqueName": "Arithmetic Mean Filter",
                "technique": "average-filter",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Arithmetic Mean Filter",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'filter_size='+size4,
                  technique: "average-filter",
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


export default SpatialScreen;
