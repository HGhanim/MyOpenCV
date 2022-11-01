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
const TransformsScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const [value, setValue] = useState('');
  const [freq_lpf, setFreq_lpf] = useState('');
  const [freq_hpf, setFreq_hpf] = useState('');
  const [order_hpf, setOrder_hpf] = useState('');
  const [low_bpf, setLow_bpf] = useState('');
  const [high_bpf, setHigh_bpf] = useState('');
  const [low_brf, setLow_brf] = useState('');
  const [high_brf, setHigh_brf] = useState('');

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
    <RadioButton value="dct" />
    <Text style={styles.textStyle}>DCT</Text>
    </View>

    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="fft" />
    <Text style={styles.textStyle}>FFT</Text>
    </View>

    </TechCard>
    </View>

    <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10}}>
    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="lpf" />
    <Text style={styles.textStyle}>Low Pass</Text>
    </View>
    {value=="lpf"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Cutoff Frequency</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={freq_lpf}
      onChangeText={text => setFreq_lpf(text)}
    />

    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="hpf" />
    <Text style={styles.textStyle}>High Pass</Text>
    </View>
    {value=="hpf"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Cutoff Frequency</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={freq_hpf}
      onChangeText={text => setFreq_hpf(text)}
    />
    </View>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Butterworth Filter Order</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={order_hpf}
      onChangeText={text => setOrder_hpf(text)}
    />

    </View>
    </View>
    </>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="bpf" />
    <Text style={styles.textStyle}>Band Pass</Text>
    </View>
    {value=="bpf"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Low Cutoff Frequency</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={low_bpf}
      onChangeText={text => setLow_bpf(text)}
    />
    </View>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>High Cutoff Frequency</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={high_bpf}
      onChangeText={text => setHigh_bpf(text)}
    />

    </View>
    </View>
    </>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="brf" />
    <Text style={styles.textStyle}>Band Reject</Text>
    </View>
    {value=="brf"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Low Cutoff Frequency</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={low_brf}
      onChangeText={text => setLow_brf(text)}
    />
    </View>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>High Cutoff Frequency</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={high_brf}
      onChangeText={text => setHigh_brf(text)}
    />

    </View>
    </View>
    </>
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
        if(value == 'dct'){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/dct?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'nothing',
                "techniqueName": 'DCT',
                "technique": "dct",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                console.log(response1.data.id);
                var img = {
                  imgName: image,
                  techniqueName: 'DCT',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'nothing',
                  technique: "dct"
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
        else if(value == 'fft'){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/fft?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'nothing',
                "techniqueName": 'FFT',
                "technique": "fft",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: 'FFT',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'nothing',
                  technique: "fft"
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
        else if(value == 'lpf' && freq_lpf != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/low-pass?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg&radius='+
            freq_lpf,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'radius='+ freq_lpf,
                "techniqueName": 'Low Pass',
                "technique": "low-pass",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: 'Low Pass',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'radius='+ freq_lpf,
                  technique: "low-pass",
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
        else if(value == 'hpf' && freq_hpf != '' && order_hpf != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/high-pass?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg&radius='+
            freq_hpf+'&order='+order_hpf,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'radius='+ freq_hpf+'&order='+order_hpf,
                "techniqueName": 'High Pass',
                "technique": "high-pass",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: 'High Pass',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'radius='+ freq_hpf+'&order='+order_hpf,
                  technique: "high-pass",
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
        else if(value == 'bpf' && low_bpf != '' && high_bpf != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/band-pass?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg&low_frequency='+
            low_bpf+'&high_frequency='+high_bpf,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'low_frequency='+low_bpf+'&high_frequency='+high_bpf,
                "techniqueName": 'Band Pass',
                "technique": "band-pass",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: 'Band Pass',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'low_frequency='+low_bpf+'&high_frequency='+high_bpf,
                  technique: "band-pass"
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
        else if(value == 'brf' && low_brf != '' && high_brf != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/band-reject?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg&low_frequency='+
            low_brf+'&high_frequency='+high_brf,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'low_frequency='+low_brf+'&high_frequency='+high_brf,
                "techniqueName": 'Band Reject',
                "technique": "band-reject",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: 'Band Reject',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'low_frequency='+low_brf+'&high_frequency='+high_brf,
                  technique: "band-reject"
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


export default TransformsScreen;
