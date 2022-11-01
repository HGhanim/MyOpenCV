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
const MorphologicalScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const [value, setValue] = useState('');
  const [element, setElement] = useState('ellipse');
  const [ellipse_size, setEllipse_size] = useState('');
  const [ellipse_iterations, setEllipse_iterations] = useState('');
  const [square_size, setSquare_size] = useState('');
  const [square_iterations, setSquare_iterations] = useState('');
  const [rectangle_width, setRectangle_width] = useState('');
  const [rectangle_height, setRectangle_height] = useState('');
  const [rectangle_iterations, setRectangle_iterations] = useState('');
  const [cross_size, setCross_size] = useState('');
  const [cross_iterations, setCross_iterations] = useState('');


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
    <RadioButton value="dilation" />
    <Text style={styles.textStyle}>Dilation</Text>
    </View>

    </TechCard>
    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="erosion" />
    <Text style={styles.textStyle}>Erosion</Text>
    </View>

    </TechCard>
    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="opening" />
    <Text style={styles.textStyle}>Opening</Text>
    </View>

    </TechCard>
    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="closing" />
    <Text style={styles.textStyle}>Closing</Text>
    </View>

    </TechCard>
    </View>

    <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10}}>
    <View style={{flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
    <Text>Structuring Element</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={element}
    onValueChange={(itemValue, itemIndex) => setElement(itemValue)}>
    <Picker.Item label="ellipse" value="ellipse" />
    <Picker.Item label="square" value="square" />
    <Picker.Item label="rectangle" value="rectangle" />
    <Picker.Item label="cross" value="cross" />
    </Picker>
    </View>
    </View>

  {element=="ellipse"?
    <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10, backgroundColor:"#e6e6e6"}}>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginBottom: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Size</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={ellipse_size}
      onChangeText={text => setEllipse_size(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Iterations</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={ellipse_iterations}
      onChangeText={text => setEllipse_iterations(text)}
    />
    </View>
    </View>
    </View>
    : null
  }

  {element=="square"?
  <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10, backgroundColor:"#e6e6e6"}}>
  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginBottom: 10}}>
  <View style={{flexDirection: 'column', width: '45%'}}>
  <Text>Size</Text>
  <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
    value={square_size}
    onChangeText={text => setSquare_size(text)}
  />
  </View>

  <View style={{flexDirection: 'column', width: '45%'}}>
  <Text>Iterations</Text>
  <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
    value={square_iterations}
    onChangeText={text => setSquare_iterations(text)}
  />
  </View>
  </View>
  </View>
  : null
}

 {element=="rectangle"?
<View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10, backgroundColor:"#e6e6e6"}}>
<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginBottom: 10}}>
<View style={{flexDirection: 'column', width: '45%'}}>
<Text>Width</Text>
<TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
  value={rectangle_width}
  onChangeText={text => setRectangle_width(text)}
/>
</View>

<View style={{flexDirection: 'column', width: '45%'}}>
<Text>Height</Text>
<TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
  value={rectangle_height}
  onChangeText={text => setRectangle_height(text)}
/>
</View>
</View>

<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginBottom: 10}}>
<View style={{flexDirection: 'column', width: '100%'}}>
<Text>Iterations</Text>
<TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
  value={rectangle_iterations}
  onChangeText={text => setRectangle_iterations(text)}
/>
</View>
</View>
</View>
: null
}

{element=="cross"?
<View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10, backgroundColor:"#e6e6e6"}}>
<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginBottom: 10}}>
<View style={{flexDirection: 'column', width: '45%'}}>
<Text>Size</Text>
<TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
  value={cross_size}
  onChangeText={text => setCross_size(text)}
/>
</View>

<View style={{flexDirection: 'column', width: '45%'}}>
<Text>Iterations</Text>
<TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
  value={cross_iterations}
  onChangeText={text => setCross_iterations(text)}
/>
</View>
</View>
</View>
: null
}
    </RadioButton.Group>
    <View style={{marginBottom: 10}}>
    <Button
    title="Add"
    type="solid"
    buttonStyle={{marginHorizontal: 5, marginVerical: 10, backgroundColor: "#006080"}}

    onPress={() => {
      var axios = require('axios');
      const user = signinState[0].userInfo;
      var indexx = pipeline.length + 1;
      console.log(indexx);
      var old_img = "";
      //console.log(original.uri);
      //console.log(pipeline[indexx - 2].imgName)
      {indexx==1?old_img="begin.jpg":old_img=pipeline[indexx - 2].imgName+".jpg"}
      //console.log(old_img)
      var size = 0, iterations = 0;
      var width = 0;
      var height = 0;
      if(image == "" || value == ''){
        alert('Please check all fields.');
      }
      else if(pipeline.some(img=>img.imgName==image)){
        alert('Image name already exists in the pipeline.');
      }
      else{
        if(element=="ellipse"){
          if(ellipse_size=='' || ellipse_iterations=='')
          alert('Please check all fields.');
          else{
            size = ellipse_size;
            iterations = ellipse_iterations;

            var config = {
              method: 'get',
              url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/morphological?username='+user.email+'&old_img='+old_img+'&new_img='+image+
              '.jpg&morphoo='+value+'&elementt='+element+'&size='+size+
              '&iterationss='+iterations+'&width='+width+'&height='+height,
              headers: {
                'Content-Type': 'application/json'
              }
            };

              axios(config).then((response)=> {
                axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                  "email": user.email,
                  "parameters": 'morphoo='+value+'&elementt='+element+'&size='+size+
                  '&iterationss='+iterations+'&width='+width+'&height='+height,
                  "techniqueName": value,
                  "technique": "morphological",
                  "satgeName":image,
                  "imageURL": response.data.url,
                  "position": indexx
                }).then((response1) => {
                  console.log(response.data.url)
                  var img = {
                    id: indexx,
                    imgName: image,
                    techniqueName: value,
                    uri: response.data.url,
                    id: response1.data.id,
                    email: response1.data.email,
                    parameters: 'morphoo='+value+'&elementt='+element+'&size='+size+
                    '&iterationss='+iterations+'&width='+width+'&height='+height,
                    technique: "morphological"
                  }
                  addTechnique(img);
                  navigation.navigate("Pipeline");
                }).catch((error) => {
                  console.log(error)
                  alert("Please check all fields.2");
                });
              }).catch((error)=> {
                console.log(error);
                alert("A problem occured. Please, try again.");
              })
          }

        }
        else if(element == "square"){
          if(square_size=='' || square_iterations=='')
          alert('Please check all fields.');
          else{
            size = square_size;
            iterations = square_iterations;

            var config = {
              method: 'get',
              url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/morphological?username='+user.email+'&old_img='+old_img+'&new_img='+image+
              '.jpg&morphoo='+value+'&elementt='+element+'&size='+size+
              '&iterationss='+iterations+'&width='+width+'&height='+height,
              headers: {
                'Content-Type': 'application/json'
              }
            };

              axios(config).then((response)=> {
                axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                  "email": user.email,
                  "parameters": 'morphoo='+value+'&elementt='+element+'&size='+size+
                  '&iterationss='+iterations+'&width='+width+'&height='+height,
                  "techniqueName": value,
                  "technique": "morphological",
                  "satgeName":image,
                  "imageURL": response.data.url,
                  "position": indexx
                }).then((response1) => {
                  console.log(response.data.url)
                  var img = {
                    id: indexx,
                    imgName: image,
                    techniqueName: value,
                    uri: response.data.url,
                    id: response1.data.id,
                    email: response1.data.email,
                    parameters: 'morphoo='+value+'&elementt='+element+'&size='+size+
                    '&iterationss='+iterations+'&width='+width+'&height='+height,
                    technique: "morphological"
                  }
                  addTechnique(img);
                  navigation.navigate("Pipeline");
                }).catch((error) => {
                  console.log(error)
                  alert("Please check all fields.2");
                });
              }).catch((error)=> {
                console.log(error);
                alert("A problem occured. Please, try again.");
              })
          }
        }
        else if(element == "cross"){
          if(cross_size=='' || cross_iterations=='')
          alert('Please check all fields.');
          else{
            size = cross_size;
            iterations = cross_iterations;

            var config = {
              method: 'get',
              url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/morphological?username='+user.email+'&old_img='+old_img+'&new_img='+image+
              '.jpg&morphoo='+value+'&elementt='+element+'&size='+size+
              '&iterationss='+iterations+'&width='+width+'&height='+height,
              headers: {
                'Content-Type': 'application/json'
              }
            };

              axios(config).then((response)=> {
                axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                  "email": user.email,
                  "parameters": 'morphoo='+value+'&elementt='+element+'&size='+size+
                  '&iterationss='+iterations+'&width='+width+'&height='+height,
                  "techniqueName": value,
                  "technique": "morphological",
                  "satgeName":image,
                  "imageURL": response.data.url,
                  "position": indexx
                }).then((response1) => {
                  console.log(response.data.url)
                  var img = {
                    id: indexx,
                    imgName: image,
                    techniqueName: value,
                    uri: response.data.url,
                    id: response1.data.id,
                    email: response1.data.email,
                    parameters: 'morphoo='+value+'&elementt='+element+'&size='+size+
                    '&iterationss='+iterations+'&width='+width+'&height='+height,
                    technique: "morphological"
                  }
                  addTechnique(img);
                  navigation.navigate("Pipeline");
                }).catch((error) => {
                  console.log(error)
                  alert("Please check all fields.2");
                });
              }).catch((error)=> {
                console.log(error);
                alert("A problem occured. Please, try again.");
              })
          }
        }
        else if(element == "rectangle"){
          if(rectangle_width=='' || rectangle_height=='' || rectangle_iterations=='')
          alert('Please check all fields.1');
          else{
            width = rectangle_width;
            height = rectangle_height;
            iterations = rectangle_iterations;

            var config = {
              method: 'get',
              url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/morphological?username='+user.email+'&old_img='+old_img+'&new_img='+image+
              '.jpg&morphoo='+value+'&elementt='+element+'&size='+size+
              '&iterationss='+iterations+'&width='+width+'&height='+height,
              headers: {
                'Content-Type': 'application/json'
              }
            };

              axios(config).then((response)=> {
                axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                  "email": user.email,
                  "parameters": 'morphoo='+value+'&elementt='+element+'&size='+size+
                  '&iterationss='+iterations+'&width='+width+'&height='+height,
                  "techniqueName": value,
                  "technique": "morphological",
                  "satgeName":image,
                  "imageURL": response.data.url,
                  "position": indexx
                }).then((response1) => {
                  console.log(response.data.url)
                  var img = {
                    id: indexx,
                    imgName: image,
                    techniqueName: value,
                    uri: response.data.url,
                    id: response1.data.id,
                    email: response1.data.email,
                    parameters: 'morphoo='+value+'&elementt='+element+'&size='+size+
                    '&iterationss='+iterations+'&width='+width+'&height='+height,
                    technique: "morphological"
                  }
                  addTechnique(img);
                  navigation.navigate("Pipeline");
                }).catch((error) => {
                  console.log(error)
                  alert("Please check all fields.2");
                });
              }).catch((error)=> {
                console.log(error);
                alert("A problem occured. Please, try again.");
              })
          }
        }
        else{
          alert('Please check all fields.');
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


export default MorphologicalScreen;
