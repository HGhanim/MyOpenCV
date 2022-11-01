import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import TechCard from '../../components/TechCard';
import { RadioButton} from 'react-native-paper';
import { Button } from 'react-native-elements';

import axios from 'axios'
import { Context as UserContext} from '../../context/UserContext';
import { Context as PipelineContext} from '../../context/PipelineContext';
import { Context as OriginalContext} from '../../context/OriginalContext';

const GeometryScreen = ({navigation}) =>{
  const [value, setValue] = React.useState("");
  const [image, setImage] = useState('')
  const [column1, setColumn1] = useState('')
  const [row1, setRow1] = useState('')
  const [width1, setWidth1] = useState('')
  const [height1, setHeight1] = useState('')
  const [width2, setWidth2] = useState('')
  const [height2, setHeight2] = useState('')
  const [degrees, setDegrees] = useState('')
  const [right, setRight] = useState('')
  const [down, setDown] = useState('')
  const [gray, setGray] = useState('')
  const [translate, setTranslate] = useState('')
  const [column_zoom, setColumn_zoom] = useState('')
  const [row_zoom, setRow_zoom] = useState('')
  const [width_zoom, setWidth_zoom] = useState('')
  const [height_zoom, setHeight_zoom] = useState('')
  const [by_zoom, setBy_zoom] = useState('')
  const [zoom_method, setZoom_method] = useState('')

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
    <RadioButton value="crop" />
    <Text style={styles.textStyle}>Crop a subimage from the upper left corner</Text>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '20%'}}>
    <Text>Column</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setColumn1(text)}
      value={column1}
    />
    </View>

    <View style={{flexDirection: 'column', width: '20%'}}>
    <Text>Row</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setRow1(text)}
      value={row1}
    />
    </View>

    <View style={{flexDirection: 'column', width: '20%'}}>
    <Text>Width</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setWidth1(text)}
      value={width1}
    />
    </View>

    <View style={{flexDirection: 'column', width: '20%'}}>
    <Text>Height</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setHeight1(text)}
      value={height1}
    />
    </View>
    </View>

    </TechCard>
    </View>

    <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10}}>
    <TechCard color={"white"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="resize" />
    <Text style={styles.textStyle}>Resize image</Text>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '40%'}}>
    <Text>Width</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setWidth2(text)}
      value={width2}
    />
    </View>

    <View style={{flexDirection: 'column', width: '40%'}}>
    <Text>Height</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setHeight2(text)}
      value={height2}
    />
    </View>
    </View>
    </TechCard>
    </View>

    <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10}}>
    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="rotate" />
    <Text style={styles.textStyle}>Rotate an image clockwise</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '40%'}}>
    <Text>Degrees</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setDegrees(text)}
      value={degrees}
    />
    </View>
    </View>
    </TechCard>
    </View>

    <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10}}>
    <TechCard color={"white"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="translate" />
    <Text style={styles.textStyle}>Translate an image
    </Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '40%'}}>
    <Text>Right pixels</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setRight(text)}
      value={right}
    />
    </View>

    <View style={{flexDirection: 'column', width: '40%'}}>
    <Text>Down pixels</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setDown(text)}
      value={down}
    />
    </View>
    </View>

    <View style={{flexDirection: 'column', width: '100%', justifyContent: "flex-start", alignSelf: "flex-start", marginLeft: 10, marginTop: 10}}>
    <RadioButton.Group onValueChange={newValue => setTranslate(newValue)} value={translate}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="wrap" />
    <Text>Wrap the image around the edge</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="fill" />
    <Text style={{marginRight: 10}}>Fill with gray value of</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5, width: "20%"}}
      onChangeText={text => setGray(text)}
      value={gray}
      editable={translate=="wrap"?false:true}
    />

    </View>
    </RadioButton.Group>
    </View>

    </TechCard>
    </View>

    <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10}}>
    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="zoom" />
    <Text style={styles.textStyle}>Zoom</Text>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginBottom: 10}}>
    <View style={{flexDirection: 'column', width: '40%'}}>
    <Text>By</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setBy_zoom(text)}
      value={by_zoom}
    />
    </View>
    </View>


        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
        <View style={{flexDirection: 'column', width: '40%'}}>
        <Text>Width</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
          onChangeText={text => setWidth_zoom(text)}
          value={width_zoom}
        />
        </View>

        <View style={{flexDirection: 'column', width: '40%'}}>
        <Text>Height</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
          onChangeText={text => setHeight_zoom(text)}
          value={height_zoom}
        />
        </View>
        </View>

    <View style={{flexDirection: 'column', width: '100%', justifyContent: "flex-start", alignSelf: "flex-start", marginLeft: 10, marginTop: 10}}>
    <RadioButton.Group onValueChange={newValue => setZoom_method(newValue)} value={zoom_method}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="upperLeft" />
    <Text>Upper Left</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="upperRight" />
    <Text>Upper Right</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="lowerLeft" />
    <Text>Lower Left</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="lowerRight" />
    <Text>Lower Right</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="randomArea" />
    <Text>Area beginning at:</Text>
    </View>
    </RadioButton.Group>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginBottom: 10}}>
    <View style={{flexDirection: 'column', width: '40%'}}>
    <Text>Column</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setColumn_zoom(text)}
      value={column_zoom}
    />
    </View>

    <View style={{flexDirection: 'column', width: '40%'}}>
    <Text>Row</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      onChangeText={text => setRow_zoom(text)}
      value={row_zoom}
    />
    </View>
    </View>

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
        if(value == 'crop' && width1 != '' && height1 != '' && column1 != '' && row1 != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/crop?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&column='
            +column1+'&row='+row1+'&width='+width1+'&height='+height1,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": "column="+column1+"&row="+row1+"&width="
                  +width1+"&height="+height1,
                "techniqueName": 'Crop',
                "technique": "crop",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: 'Crop',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: "column="+column1+"&row="+row1+"&width="
                    +width1+"&height="+height1,
                  technique: "crop"
                }
                addTechnique(img);
                navigation.navigate("Pipeline");
              }).catch((error) => {
                console.log(error)
                alert("Please check all fields.111");
              });
            }).catch((error)=> {
              console.log(error);
              alert("A problem occured. Please, try again.");
            })
        }
        else if(value == 'resize' && width2 != '' && height2 != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/resize?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&width='+width2+'&height='+height2,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": "width="+width2+"&height="+height2,
                "techniqueName": 'Resize',
                "technique": "resize",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: 'Resize',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: "width="+width2+"&height="+height2,
                  technique: "resize"
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
        else if(value == 'rotate' && degrees != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/rotate?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&degree='+degrees,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": "degree="+degrees,
                "techniqueName": 'Rotate',
                "technique": "rotate",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: 'Rotate',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: "degree="+degrees,
                  technique: "rotate"
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
        else if(value == 'translate' && right != '' && down != '' &&((translate=='wrap')||(translate=='fill'&&gray!=''))){
          var gray_value = 0;
          if(translate=='fill'){
            gray_value = gray;
          }
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/translate?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&right='+
            right+'&down='+down+'&gray_value='+gray_value,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":"right="+right+"&down="+down+"&gray_value="
                +gray_value,
                "techniqueName": 'Translate',
                "technique": "translate",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: 'Translate',
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:"right="+right+"&down="+down+"&gray_value="
                  +gray_value,
                  technique: "translate"
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
        else if(value == 'zoom' && by_zoom != '' && zoom_method != '' && width_zoom!='' && height_zoom!=''){
          var column = 0, row = 0;
          if(zoom_method=='randomArea' && (row_zoom=='' || column_zoom=='' )){
            alert('Please check all fields.');
          }
          else{
            if(zoom_method=='randomArea'){
              column = column_zoom;
              row = row_zoom;
            }
            else{
              var config = {
                method: 'get',
                url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/zoom?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&arrow='+zoom_method+'&column='+column+'&roww='+row+'&width='+width_zoom+'&height='+height_zoom+'&by='+by_zoom,
                headers: {
                  'Content-Type': 'application/json'
                }
              };

                axios(config).then((response)=> {
                  axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                    "email": user.email,
                    "parameters":'arrow='+zoom_method+'&column='+column+'&roww='+row+'&width='+width_zoom+'&height='+height_zoom+'&by='+by_zoom,
                    "techniqueName": 'Zoom',
                    "technique": "zoom",
                    "satgeName":image,
                    "imageURL": response.data.url,
                    "position": indexx
                  }).then((response1) => {
                    console.log(response.data.url)
                    var img = {
                      imgName: image,
                      techniqueName: 'Zoom',
                      uri: response.data.url,
                      id: response1.data.id,
                      email: response1.data.email,
                      parameters:'arrow='+zoom_method+'&column='+column+'&roww='+row+'&width='+width_zoom+'&height='+height_zoom+'&by='+by_zoom,
                      technique: "zoom"
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
          }


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
export default GeometryScreen;
