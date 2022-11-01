import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, FlatList} from 'react-native';
import TechCard from '../../components/TechCard';
import { RadioButton} from 'react-native-paper';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'
import { Context as UserContext} from '../../context/UserContext';
import { Context as PipelineContext} from '../../context/PipelineContext';
import { Context as OriginalContext} from '../../context/OriginalContext';
const ArithLogicScreen = ({navigation}) => {
  const [image, setImage] = useState('')
  const [value, setValue] = React.useState("none");
  const [img1_add, setImg1_add] = React.useState("");
  const [img2_add, setImg2_add] = React.useState("");
  const [img1_subtract, setImg1_subtract] = React.useState("");
  const [img2_subtract, setImg2_subtract] = React.useState("");
  const [img1_multiply, setImg1_multiply] = React.useState("");
  const [img2_multiply, setImg2_multiply] = React.useState("");
  const [img1_divide, setImg1_divide] = React.useState("");
  const [img2_divide, setImg2_divide] = React.useState("");
  const [img1_and, setImg1_and] = React.useState("");
  const [img2_and, setImg2_and] = React.useState("");
  const [img1_or, setImg1_or] = React.useState("");
  const [img2_or, setImg2_or] = React.useState("");
  const [img1_xor, setImg1_xor] = React.useState("");
  const [img2_xor, setImg2_xor] = React.useState("");
  const [img_not, setImg_not] = React.useState("");

  const {state:signinState, signin, signout} = useContext(UserContext);
  const { state:pipeline, addTechnique, deleteTechnique, editTechnique, showTechnique, updateTechniques, deleteAll } = useContext(PipelineContext);
  const {state:original, editOriginal } = useContext(OriginalContext);

  useEffect(() => {
    setImg1_add(pipeline[0].imgName)
    setImg2_add(pipeline[0].imgName)
    setImg1_subtract(pipeline[0].imgName)
    setImg2_subtract(pipeline[0].imgName)
    setImg1_multiply(pipeline[0].imgName)
    setImg2_multiply(pipeline[0].imgName)
    setImg1_divide(pipeline[0].imgName)
    setImg2_divide(pipeline[0].imgName)
    setImg1_and(pipeline[0].imgName)
    setImg2_and(pipeline[0].imgName)
    setImg1_or(pipeline[0].imgName)
    setImg2_or(pipeline[0].imgName)
    setImg1_xor(pipeline[0].imgName)
    setImg2_xor(pipeline[0].imgName)
    setImg_not(pipeline[0].imgName)
}, []);

  const  renderPickerItems = () => {
    return pipeline.map((item) => {
        return (
            <Picker.Item
                label={item.imgName}
                value={item.imgName}
                key={item.imgName}
            />
        );
    });
}
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
    <RadioButton value="add" />
    <Text style={styles.textStyle}>Add</Text>
    </View>
    {value=="add"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>First Image</Text>

    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img1_add}
    onValueChange={(itemValue, itemIndex) => setImg1_add(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Second Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img2_add}
    onValueChange={(itemValue, itemIndex) => setImg2_add(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>
    </View>
    :
    null
  }
    </TechCard>


    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="subtract" />
    <Text style={styles.textStyle}>Subtract</Text>
    </View>
    {value=="subtract"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>First Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img1_subtract}
    onValueChange={(itemValue, itemIndex) => setImg1_subtract(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Second Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img2_subtract}
    onValueChange={(itemValue, itemIndex) => setImg2_subtract(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="multiply" />
    <Text style={styles.textStyle}>Multiply</Text>
    </View>
    {value=="multiply"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>First Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img1_multiply}
    onValueChange={(itemValue, itemIndex) => setImg1_multiply(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Second Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img2_multiply}
    onValueChange={(itemValue, itemIndex) => setImg2_multiply(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="divide" />
    <Text style={styles.textStyle}>Divide</Text>
    </View>
    {value=="divide"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>First Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img1_divide}
    onValueChange={(itemValue, itemIndex) => setImg1_divide(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Second Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img2_divide}
    onValueChange={(itemValue, itemIndex) => setImg2_divide(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>
    </View>
    :
    null
  }
    </TechCard>
    </View>

    <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10}}>
    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="and" />
    <Text style={styles.textStyle}>AND</Text>
    </View>
    {value=="and"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>First Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img1_and}
    onValueChange={(itemValue, itemIndex) => setImg1_and(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Second Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img2_and}
    onValueChange={(itemValue, itemIndex) => setImg2_and(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="or" />
    <Text style={styles.textStyle}>OR</Text>
    </View>
    {value=="or"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>First Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img1_or}
    onValueChange={(itemValue, itemIndex) => setImg1_or(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Second Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img2_or}
    onValueChange={(itemValue, itemIndex) => setImg2_or(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="xor" />
    <Text style={styles.textStyle}>XOR</Text>
    </View>
    {value=="xor"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>First Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img1_xor}
    onValueChange={(itemValue, itemIndex) => setImg1_xor(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Second Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img2_xor}
    onValueChange={(itemValue, itemIndex) => setImg2_xor(itemValue)}>
    {renderPickerItems()}
    </Picker>
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="not" />
    <Text style={styles.textStyle}>NOT</Text>
    </View>
    {value=="not"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Image</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={img_not}
    onValueChange={(itemValue, itemIndex) => setImg_not(itemValue)}>
    {renderPickerItems()}
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
        if(value == 'add' && img1_add!='' && img2_add!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/arith-add?username='+user.email+'&new_img='+image+'.jpg'+'&img1='+img1_add+'.jpg&img2='+img2_add+'.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'img1='+img1_add+'.jpg&img2='+img2_add+'.jpg',
                "techniqueName": "Arithmetic Add",
                "technique": "arith-add",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Arithmetic Add",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:'img1='+img1_add+'.jpg&img2='+img2_add+'.jpg',
                  technique: "arith-add"
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
        else if(value == 'subtract' && img1_subtract!='' && img2_subtract!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/arith-subtract?username='+user.email+'&new_img='+image+'.jpg'+'&img1='+img1_subtract+'.jpg&img2='+img2_subtract+'.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'img1='+img1_subtract+'.jpg&img2='+img2_subtract+'.jpg',
                "techniqueName": "Arithmetic Subtract",
                "technique": "arith-subtract",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Arithmetic Subtract",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:'img1='+img1_subtract+'.jpg&img2='+img2_subtract+'.jpg',
                  technique: "arith-subtract"
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
        else if(value == 'multiply' && img1_multiply!='' && img2_multiply!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/arith-multiply?username='+user.email+'&new_img='+image+'.jpg'+'&img1='+img1_multiply+'.jpg&img2='+img2_multiply+'.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'img1='+img1_multiply+'.jpg&img2='+img2_multiply+'.jpg',
                "techniqueName": "Arithmetic Multiply",
                "technique": "arith-multiply",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Arithmetic Multiply",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:'img1='+img1_multiply+'.jpg&img2='+img2_multiply+'.jpg',
                  technique: "arith-multiply"
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
        else if(value == 'divide' && img1_divide!='' && img2_divide!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/arith-divide?username='+user.email+'&new_img='+image+'.jpg'+'&img1='+img1_divide+'.jpg&img2='+img2_divide+'.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'img1='+img1_divide+'.jpg&img2='+img2_divide+'.jpg',
                "techniqueName": "Arithmetic Divide",
                "technique": "arith-divide",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Arithmetic Divide",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:'img1='+img1_divide+'.jpg&img2='+img2_divide+'.jpg',
                  technique: "arith-divide"
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
        else if(value == 'and' && img1_and!='' && img2_and!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/logic-and?username='+user.email+'&new_img='+image+'.jpg'+'&img1='+img1_and+'.jpg&img2='+img2_and+'.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'img1='+img1_and+'.jpg&img2='+img2_and+'.jpg',
                "techniqueName": "Logic AND",
                "technique": "logic-and",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Logic AND",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:'img1='+img1_and+'.jpg&img2='+img2_and+'.jpg',
                  technique: "logic-and"
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
        else if(value == 'or' && img1_or!='' && img2_or!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/logic-or?username='+user.email+'&new_img='+image+'.jpg'+'&img1='+img1_or+'.jpg&img2='+img2_or+'.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'img1='+img1_or+'.jpg&img2='+img2_or+'.jpg',
                "techniqueName": "Logic OR",
                "technique": "logic-or",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Logic OR",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:'img1='+img1_or+'.jpg&img2='+img2_or+'.jpg',
                  technique: "logic-or"
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
        else if(value == 'xor' && img1_xor!='' && img2_xor!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/logic-xor?username='+user.email+'&new_img='+image+'.jpg'+'&img1='+img1_xor+'.jpg&img2='+img2_xor+'.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'img1='+img1_xor+'.jpg&img2='+img2_xor+'.jpg',
                "techniqueName": "Logic XOR",
                "technique": "logic-xor",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Logic XOR",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:'img1='+img1_xor+'.jpg&img2='+img2_xor+'.jpg',
                  technique: "logic-xor"
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
        else if(value == 'not' && img_not!='' ){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/logic-not?username='+user.email+'&old_img='+img_not+'.jpg&new_img='+image+'.jpg',
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'old_img='+img_not+'.jpg',
                "techniqueName": "Logic NOT",
                "technique": "logic-not",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Logic NOT",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'old_img='+img_not+'.jpg',
                  technique: "logic-not"
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


export default ArithLogicScreen;
