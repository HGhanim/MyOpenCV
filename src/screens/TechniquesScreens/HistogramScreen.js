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
const HistogramScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const [value, setValue] = useState('none');
  const [equ_band, setEqu_band] = useState('');
  const [slide, setSlide] = useState('');
  const [slide_amount, setSlide_amount] = useState('');
  const [stretch_low, setStretch_low] = useState('');
  const [stretch_high, setStretch_high] = useState('');
  const [adaptive_clip, setAdaptive_clip] = useState('');
  const [adaptive_tile, setAdaptive_tile] = useState('');
  const [power_gamma, setPower_gamma] = useState('');
  const [power_constant, setPower_constant] = useState('');
  const [color_band, setColor_band] = useState('');
  const [color_low, setColor_low] = useState('');
  const [color_high, setColor_high] = useState('');
  const [gray_factor, setGray_factor] = useState('');

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
    <RadioButton value="equ" />
    <Text style={styles.textStyle}>Histogram Equalization</Text>
    </View>
    {value=="equ"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Band</Text>
    <RadioButton.Group onValueChange={newValue => setEqu_band(newValue)} value={equ_band}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="lightness" />
    <Text>Lightness</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="red" />
    <Text>Red</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="green" />
    <Text>Green</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="blue" />
    <Text>Blue</Text>
    </View>
    </RadioButton.Group>
    </View>
    </View>
    </>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="slide" />
    <Text style={styles.textStyle}>Histogram Slide</Text>
    </View>
    {value=="slide"?
    <>
    <View style={{flexDirection: 'column', width: '100%', marginLeft: 20}}>
    <RadioButton.Group onValueChange={newValue => setSlide(newValue)} value={slide}>
    <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginRight: 10}}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="up" />
    <Text>Up</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="down" />
    <Text>Down</Text>
    </View>
    </View>
    </RadioButton.Group>
    </View>
    <View style={{ alignItems: 'flex-start', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%', marginTop: 10}}>
    <Text>Amount</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={slide_amount}
      onChangeText={text => setSlide_amount(text)}
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
    <RadioButton value="stretch" />
    <Text style={styles.textStyle}>Histogram Stretch</Text>
    </View>
    {value=="stretch"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Low limit</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={stretch_low}
      onChangeText={text => setStretch_low(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>High limit</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={stretch_high}
      onChangeText={text => setStretch_high(text)}
    />
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="adaptive" />
    <Text style={styles.textStyle}>Adaptive Histogram Equalization</Text>
    </View>
    {value=="adaptive"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Clip Limit</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={adaptive_clip}
      onChangeText={text => setAdaptive_clip(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Tile Grid Size</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={adaptive_tile}
      onChangeText={text => setAdaptive_tile(text)}
    />
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="power" />
    <Text style={styles.textStyle}>Power Low</Text>
    </View>
    {value=="power"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Gamma</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={power_gamma}
      onChangeText={text => setPower_gamma(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Constant</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={power_constant}
      onChangeText={text => setPower_constant(text)}
    />
    </View>
    </View>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="color" />
    <Text style={styles.textStyle}>Color Contrast Algorithm</Text>
    </View>
    {value=="color"?
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Low limit</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={color_low}
      onChangeText={text => setColor_low(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>High limit</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={color_high}
      onChangeText={text => setColor_high(text)}
    />
    </View>
    </View>

    <View style={{flexDirection: 'column', width: '100%', marginLeft: 20, marginTop:20}}>
    <Text>Band</Text>
    <RadioButton.Group onValueChange={newValue => setColor_band(newValue)} value={color_band}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between',marginRight: 10}}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="red" />
    <Text>Red</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="green" />
    <Text>Green</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <RadioButton value="blue" />
    <Text>Blue</Text>
    </View>

    </View>
    </RadioButton.Group>
    </View>
    </>
    :
    null
  }
    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="gray" />
    <Text style={styles.textStyle}>Gray Level Multiplication</Text>
    </View>
    {value=="gray"?
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>
    <View style={{flexDirection: 'column', width: '100%'}}>
    <Text>Factor</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={gray_factor}
      onChangeText={text => setGray_factor(text)}
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
        if(value == 'equ' && equ_band != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/histogram-equalization?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&band='+equ_band,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'band='+equ_band,
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
                  parameters: 'band='+equ_band,
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
        else if(value == 'slide' && slide_amount != '' && slide != ''){
          var arrow;
              if(slide=="up")
                arrow=1;
              else if(slide=="down")
                arrow=2;
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/histogram-slide?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&up='+arrow+'&val='+slide_amount,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'up='+arrow+'&val='+slide_amount,
                "techniqueName": "Histogram Slide",
                "technique": "histogram-slide",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Histogram Slide",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'up='+arrow+'&val='+slide_amount,
                  technique: "histogram-slide"
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
        else if(value == 'stretch' && stretch_low != '' && stretch_high != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/histogram-stretch?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&low='+stretch_low+'&high='+stretch_high,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'low='+stretch_low+'&high='+stretch_high,
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
                  parameters: 'low='+stretch_low+'&high='+stretch_high,
                  technique: "histogram-stretch"
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
        else if(value == 'adaptive' && adaptive_clip != '' && adaptive_tile != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/adaptive-histogram-equalization?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&clip_limit='+adaptive_clip+'&tile_size='+adaptive_tile,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'clip_limit='+adaptive_clip+'&tile_size='+adaptive_tile,
                "techniqueName": "Adaptive Histogram Equalization",
                "technique": "adaptive-histogram-equalization",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Adaptive Histogram Equalization",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'clip_limit='+adaptive_clip+'&tile_size='+adaptive_tile,
                  technique: "adaptive-histogram-equalization"
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
        else if(value == 'power' && power_gamma != '' && power_constant != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/power-low?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&gamma='+power_gamma+'&constant='+power_constant,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'gamma='+power_gamma+'&constant='+power_constant,
                "techniqueName": "Power Low",
                "technique": "power-low",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Power Low",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'gamma='+power_gamma+'&constant='+power_constant,
                  technique: "power-low"
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
        else if(value == 'color' && color_low != '' && color_high != '' && color_band != ''){
          var band;
             if(color_band=="blue")
                band=0;
             else if(color_band=="green")
                band=1;
             else if(color_band=="red")
                band=2;
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/color-contrast-algorithm?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&band='+band+'&low='+color_low+'&high='+color_high,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'band='+band+'&low='+color_low+'&high='+color_high,
                "techniqueName": "Color Contrast Algorithm",
                "technique": "color-contrast-algorithm",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: `Color Contrast
Algorithm`,
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'band='+band+'&low='+color_low+'&high='+color_high,
                  technique: "color-contrast-algorithm"
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
        else if(value == 'gray' && gray_factor != ''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/gray-level-multiplication?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&factor='+gray_factor,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'factor='+gray_factor,
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
                  parameters: 'factor='+gray_factor,
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


export default HistogramScreen;
