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
const EdgeLineScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const [value, setValue] = useState('');
  const [pre_roberts, setPre_roberts] = useState('none');
  const [thre_roberts, setThre_roberts] = useState('');
  const [filter_roberts, setFilter_roberts] = useState('');
  const [pre_sobel, setPre_sobel] = useState('none');
  const [thre_sobel, setThre_sobel] = useState('');
  const [filter_sobel, setFilter_sobel] = useState('');
  const [kernel_sobel, setKernel_sobel] = useState('');
  const [axis_sobel, setAxis_sobel] = useState('X');
  const [pre_prewitt, setPre_prewitt] = useState('none');
  const [thre_prewitt, setThre_prewitt] = useState('');
  const [filter_prewitt, setFilter_prewitt] = useState('');
  const [axis_prewitt, setAxis_prewitt] = useState('X');
  const [pre_laplacian, setPre_laplacian] = useState('none');
  const [thre_laplacian, setThre_laplacian] = useState('');
  const [filter_laplacian, setFilter_laplacian] = useState('');
  const [distance_harris, setDistance_harris] = useState('');
  const [kernel_harris, setKernel_harris] = useState('');
  const [alpha_harris, setAlpha_harris] = useState('');
  const [thre_harris, setThre_harris] = useState('');
  const [low_hough, setLow_hough] = useState('');
  const [high_hough, setHigh_hough] = useState('');
  const [distance_hough, setDistance_hough] = useState('');
  const [thre_hough, setThre_hough] = useState('');
  const [min_hough, setMin_hough] = useState('');
  const [max_hough, setMax_hough] = useState('');
  const [low_canny, setLow_canny] = useState('');
  const [high_canny, setHigh_canny] = useState('');

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
    <RadioButton value="roberts" />
    <Text style={styles.textStyle}>Roberts</Text>
    </View>
    {value=="roberts"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>PreFilter</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={pre_roberts}
    onValueChange={(itemValue, itemIndex) => setPre_roberts(itemValue)}>
    <Picker.Item label="none" value="none" />
    <Picker.Item label="average" value="average" />
    <Picker.Item label="gaussian" value="gaussian" />
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Filter Size</Text>
    <TextInput
      editable={pre_roberts=='none'?false:true}
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={filter_roberts}
      onChangeText={text => setFilter_roberts(text)}
    />
    </View>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Post Threshold</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={thre_roberts}
      onChangeText={text => setThre_roberts(text)}
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
    <RadioButton value="sobel" />
    <Text style={styles.textStyle}>Sobel</Text>
    </View>
    {value=="sobel"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>PreFilter</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={pre_sobel}
    onValueChange={(itemValue, itemIndex) => setPre_sobel(itemValue)}>
    <Picker.Item label="none" value="none" />
    <Picker.Item label="average" value="average" />
    <Picker.Item label="gaussian" value="gaussian" />
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Filter Size</Text>
    <TextInput
      editable={pre_sobel=='none'?false:true}
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={filter_sobel}
      onChangeText={text => setFilter_sobel(text)}
    />
    </View>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Post Threshold</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={thre_sobel}
      onChangeText={text => setThre_sobel(text)}
    />
    </View>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Kernel Size</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={kernel_sobel}
      onChangeText={text => setKernel_sobel(text)}
    />
    </View>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Axis</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={axis_sobel}
    onValueChange={(itemValue, itemIndex) => setAxis_sobel(itemValue)}>
    <Picker.Item label="X" value="X" />
    <Picker.Item label="Y" value="Y" />
    <Picker.Item label="Both" value="Both" />
    </Picker>
    </View>
    </View>
    </>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="prewitt" />
    <Text style={styles.textStyle}>Prewitt</Text>
    </View>
    {value=="prewitt"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>PreFilter</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={pre_prewitt}
    onValueChange={(itemValue, itemIndex) => setPre_prewitt(itemValue)}>
    <Picker.Item label="none" value="none" />
    <Picker.Item label="average" value="average" />
    <Picker.Item label="gaussian" value="gaussian" />
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Filter Size</Text>
    <TextInput
      editable={pre_prewitt=='none'?false:true}
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={filter_prewitt}
      onChangeText={text => setFilter_prewitt(text)}
    />
    </View>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Post Threshold</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={thre_prewitt}
      onChangeText={text => setThre_prewitt(text)}
    />
    </View>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Axis</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={axis_prewitt}
    onValueChange={(itemValue, itemIndex) => setAxis_prewitt(itemValue)}>
    <Picker.Item label="X" value="X" />
    <Picker.Item label="Y" value="Y" />
    <Picker.Item label="Both" value="Both" />
    </Picker>
    </View>
    </View>
    </>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="laplacian" />
    <Text style={styles.textStyle}>Laplacian</Text>
    </View>
    {value=="laplacian"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>PreFilter</Text>
    <Picker
    style={{ height: 40, width: '100%' }}
    selectedValue={pre_laplacian}
    onValueChange={(itemValue, itemIndex) => setPre_laplacian(itemValue)}>
    <Picker.Item label="none" value="none" />
    <Picker.Item label="average" value="average" />
    <Picker.Item label="gaussian" value="gaussian" />
    </Picker>
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Filter Size</Text>
    <TextInput
      editable={pre_laplacian=='none'?false:true}
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={filter_laplacian}
      onChangeText={text => setFilter_laplacian(text)}
    />
    </View>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Post Threshold</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={thre_laplacian}
      onChangeText={text => setThre_laplacian(text)}
    />
    </View>
    </View>
    </>
    :
    null
  }
    </TechCard>
    </View>

    <View style={{borderWidth: 2, borderColor: "gray", marginHorizontal: 5, marginBottom: 10}}>
    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="harris" />
    <Text style={styles.textStyle}>Harris Corner</Text>
    </View>
    {value=="harris"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Min. Distance</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={distance_harris}
      onChangeText={text => setDistance_harris(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Kernel Size</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={kernel_harris}
      onChangeText={text => setKernel_harris(text)}
    />
    </View>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Alpha</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={alpha_harris}
      onChangeText={text => setAlpha_harris(text)}
    />
    </View>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Threshold Factor</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={thre_harris}
      onChangeText={text => setThre_harris(text)}
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
    <RadioButton value="hough" />
    <Text style={styles.textStyle}>Hough</Text>
    </View>
    {value=="hough"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Low Threshold</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={low_hough}
      onChangeText={text => setLow_hough(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>High Threshold</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={high_hough}
      onChangeText={text => setHigh_hough(text)}
    />
    </View>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Distance Resolution</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={distance_hough}
      onChangeText={text => setDistance_hough(text)}
    />
    </View>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Threshold</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={thre_hough}
      onChangeText={text => setThre_hough(text)}
    />
    </View>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10, marginTop: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Min Line Length</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={min_hough}
      onChangeText={text => setMin_hough(text)}
    />
    </View>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Max Line Gap</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={max_hough}
      onChangeText={text => setMax_hough(text)}
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
    <RadioButton value="canny" />
    <Text style={styles.textStyle}>Canny</Text>
    </View>
    {value=="canny"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Low Threshold</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={low_canny}
      onChangeText={text => setLow_canny(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>High Threshold</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={high_canny}
      onChangeText={text => setHigh_canny(text)}
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
        if(value == 'roberts' && pre_roberts != '' && thre_roberts != ''){
          if(pre_roberts != 'none' && filter_roberts == ''){
            alert('Please check all fields.');
          }
          else{
            var size = '0';
            if(pre_roberts != 'none'){
              size = filter_roberts;
            }

            var config = {
              method: 'get',
              url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/roberts?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&pre_filter='+pre_roberts+'&filter_size='+size+'&post_threshold='+thre_roberts,
              headers: {
                'Content-Type': 'application/json'
              }
            };

              axios(config).then((response)=> {
                axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                  "email": user.email,
                  "parameters":'pre_filter='+pre_roberts+'&filter_size='+size+'&post_threshold='+thre_roberts,
                  "techniqueName": 'Roberts',
                  "technique": "roberts",
                  "satgeName":image,
                  "imageURL": response.data.url,
                  "position": indexx
                }).then((response1) => {
                  console.log(response.data.url)
                  var img = {
                    imgName: image,
                    techniqueName: "Roberts",
                    uri: response.data.url,
                    id: response1.data.id,
                    email: response1.data.email,
                    parameters:'pre_filter='+pre_roberts+'&filter_size='+size+'&post_threshold='+thre_roberts,
                    technique: "roberts"
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
        else if(value == 'sobel' &&  thre_sobel != ''  && kernel_sobel != ''){
          if(pre_sobel != 'none' && filter_sobel == ''){
            alert('Please check all fields.');
          }
          else{
            var size = '0';
            if(pre_sobel != 'none'){
              size = filter_sobel;
            }
            var config = {
              method: 'get',
              url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/sobel?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&pre_filter='+pre_sobel+'&filter_size='+size+'&post_threshold='+thre_sobel+'&kernel_size='+kernel_sobel+'&axis='+axis_sobel,
              headers: {
                'Content-Type': 'application/json'
              }
            };

              axios(config).then((response)=> {
                axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                  "email": user.email,
                  "parameters":'pre_filter='+pre_sobel+'&filter_size='+size+'&post_threshold='+thre_sobel+'&kernel_size='+kernel_sobel+'&axis='+axis_sobel,
                  "techniqueName": 'Sobel',
                  "technique": "sobel",
                  "satgeName":image,
                  "imageURL": response.data.url,
                  "position": indexx
                }).then((response1) => {
                  console.log(response.data.url)
                  var img = {
                    imgName: image,
                    techniqueName: "Sobel",
                    uri: response.data.url,
                    id: response1.data.id,
                    email: response1.data.email,
                    parameters:'pre_filter='+pre_sobel+'&filter_size='+size+'&post_threshold='+thre_sobel+'&kernel_size='+kernel_sobel+'&axis='+axis_sobel,
                    technique: "sobel"
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
        else if(value == 'prewitt' &&  thre_prewitt != '' ){
          if(pre_prewitt != 'none' && filter_prewitt == ''){
            alert('Please check all fields.');
          }
          else{
            var size = '0';
            if(pre_prewitt != 'none'){
              size = filter_prewitt;
            }
            var config = {
              method: 'get',
              url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/prewitt?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&pre_filter='+pre_prewitt +'&filter_size='+size+'&post_threshold='+thre_prewitt+'&axis='+axis_prewitt,
              headers: {
                'Content-Type': 'application/json'
              }
            };

              axios(config).then((response)=> {
                axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                  "email": user.email,
                  "parameters":'pre_filter='+pre_prewitt+'&filter_size='+size+'&post_threshold='+thre_prewitt+'&axis='+axis_prewitt,
                  "techniqueName": 'Prewitt',
                  "technique": "prewitt",
                  "satgeName":image,
                  "imageURL": response.data.url,
                  "position": indexx
                }).then((response1) => {
                  console.log(response.data.url)
                  var img = {
                    imgName: image,
                    techniqueName: "Prewitt",
                    uri: response.data.url,
                    id: response1.data.id,
                    email: response1.data.email,
                    parameters:'pre_filter='+pre_prewitt+'&filter_size='+size+'&post_threshold='+thre_prewitt+'&axis='+axis_prewitt,
                    technique: "prewitt",
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
        else if(value == 'laplacian' &&  thre_laplacian != '' ){
          if(pre_laplacian != 'none' && filter_laplacian == ''){
            alert('Please check all fields.');
          }
          else{
            var size = '0';
            if(pre_laplacian != 'none'){
              size = filter_laplacian;
            }
            var config = {
              method: 'get',
              url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/laplacian?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&pre_filter='+pre_laplacian +'&filter_size='+size+'&post_threshold='+thre_laplacian,
              headers: {
                'Content-Type': 'application/json'
              }
            };

              axios(config).then((response)=> {
                axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                  "email": user.email,
                  "parameters":'pre_filter='+pre_laplacian+'&filter_size='+size+'&post_threshold='+thre_laplacian,
                  "techniqueName": 'Laplacian',
                  "technique": "laplacian",
                  "satgeName":image,
                  "imageURL": response.data.url,
                  "position": indexx
                }).then((response1) => {
                  console.log(response.data.url)
                  var img = {
                    imgName: image,
                    techniqueName: "Laplacian",
                    uri: response.data.url,
                    id: response1.data.id,
                    email: response1.data.email,
                    parameters:'pre_filter='+pre_laplacian+'&filter_size='+size+'&post_threshold='+thre_laplacian,
                    technique: "laplacian"
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
        else if(value == 'harris' && distance_harris != '' && thre_harris != '' && alpha_harris != '' && kernel_harris != '' ){
            var config = {
              method: 'get',
              url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/harris-corner?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&minimum_distance='+distance_harris+'&kernel_size='+kernel_harris+'&alpha='+alpha_harris+'&threshold_factor='+thre_harris,
              headers: {
                'Content-Type': 'application/json'
              }
            };

              axios(config).then((response)=> {
                axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                  "email": user.email,
                  "parameters":'minimum_distance='+distance_harris+'&kernel_size='+distance_harris+'&alpha='+alpha_harris+
                  '&threshold_factor='+alpha_harris,
                  "techniqueName": "Harris Corner",
                  "technique": "harris-corner",
                  "satgeName":image,
                  "imageURL": response.data.url,
                  "position": indexx
                }).then((response1) => {
                  console.log(response.data.url)
                  var img = {
                    imgName: image,
                    techniqueName: "Harris Corner",
                    uri: response.data.url,
                    id: response1.data.id,
                    email: response1.data.email,
                    parameters:'minimum_distance='+distance_harris+'&kernel_size='+distance_harris+'&alpha='+alpha_harris+
                    '&threshold_factor='+alpha_harris,
                    technique: "harris-corner"
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
        else if(value == 'hough' && low_hough != '' && high_hough != '' && max_hough != '' && min_hough != '' && thre_hough != '' &&distance_hough != '' ){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/hough?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&low_threshold_val='+low_hough+'&high_threshold_val='+high_hough+'&distance_resolution='+distance_hough+'&threshold='+thre_hough+'&min_line_length='+min_hough+'&max_line_gap='+max_hough,
            headers: {
                  'Content-Type': 'application/json'
                }
              };

                axios(config).then((response)=> {
                  axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                    "email": user.email,
                    "parameters":'low_threshold_val='+low_hough+'&high_threshold_val='+high_hough+'&distance_resolution='+distance_hough+'&threshold='+thre_hough+'&min_line_length='+min_hough+'&max_line_gap='+max_hough,
                    "techniqueName": "Hough",
                    "technique": "hough",
                    "satgeName":image,
                    "imageURL": response.data.url,
                    "position": indexx
                  }).then((response1) => {
                    console.log(response.data.url)
                    var img = {
                      imgName: image,
                      techniqueName: "Hough",
                      uri: response.data.url,
                      id: response1.data.id,
                      email: response1.data.email,
                      parameters:'low_threshold_val='+low_hough+'&high_threshold_val='+high_hough+'&distance_resolution='+distance_hough+'&threshold='+thre_hough+'&min_line_length='+min_hough+'&max_line_gap='+max_hough,
                      technique: "hough"
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
        else if(value == 'canny' && low_canny != '' && high_canny != ''){
              var config = {
                method: 'get',
                url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/canny?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&low_threshold='+low_canny+'&high_threshold='+high_canny,
                headers: {
                      'Content-Type': 'application/json'
                    }
                  };

                    axios(config).then((response)=> {
                      axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                        "email": user.email,
                        "parameters":'low_threshold='+low_canny+'&high_threshold='+high_canny,
                        "techniqueName": "Canny",
                        "technique": "canny",
                        "satgeName":image,
                        "imageURL": response.data.url,
                        "position": indexx
                      }).then((response1) => {
                        console.log(response.data.url)
                        var img = {
                          imgName: image,
                          techniqueName: "Canny",
                          uri: response.data.url,
                          id: response1.data.id,
                          email: response1.data.email,
                          parameters:'low_threshold='+low_canny+'&high_threshold='+high_canny,
                          technique: "canny",
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


export default EdgeLineScreen;
