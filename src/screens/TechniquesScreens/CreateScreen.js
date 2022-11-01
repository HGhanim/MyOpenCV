import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import TechCard from '../../components/TechCard';
import { RadioButton, Checkbox } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'
import { Context as UserContext} from '../../context/UserContext';
import { Context as PipelineContext} from '../../context/PipelineContext';
import { Context as OriginalContext} from '../../context/OriginalContext';
const CreateScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const [value, setValue] = useState('');
  const [x_ellipse, setX_ellipse] = useState('');
  const [y_ellipse, setY_ellipse] = useState('');
  const [major_ellipse, setMajor_ellipse] = useState('');
  const [minor_ellipse, setMinor_ellipse] = useState('');
  const [s_angle_ellipse, setS_angle_ellipse] = useState('');
  const [e_angle_ellipse, setE_angle_ellipse] = useState('');
  const [angle_ellipse, setAngle_ellipse] = useState('');
  const [thikness_ellipse, setThikness_ellipse] = useState('');
  const [red_ellipse, setRed_ellipse] = useState('');
  const [green_ellipse, setGreen_ellipse] = useState('');
  const [blue_ellipse, setBlue_ellipse] = useState('');
  const [fill_ellipse, setFill_ellipse] = useState(false);
  const [x_circle, setX_circle] = useState('');
  const [y_circle, setY_circle] = useState('');
  const [radius_circle, setRadius_circle] = useState('');
  const [thikness_circle, setThikness_circle] = useState('');
  const [red_circle, setRed_circle] = useState('');
  const [green_circle, setGreen_circle] = useState('');
  const [blue_circle, setBlue_circle] = useState('');
  const [fill_circle, setFill_circle] = useState(false);
  const [s_x_line, setS_x_line] = useState('');
  const [s_y_line, setS_y_line] = useState('');
  const [e_x_line, setE_x_line] = useState('');
  const [e_y_line, setE_y_line] = useState('');
  const [thikness_line, setThikness_line] = useState('');
  const [red_line, setRed_line] = useState('');
  const [green_line, setGreen_line] = useState('');
  const [blue_line, setBlue_line] = useState('');
  const [s_x_rectangle, setS_x_rectangle] = useState('');
  const [s_y_rectangle, setS_y_rectangle] = useState('');
  const [e_x_rectangle, setE_x_rectangle] = useState('');
  const [e_y_rectangle, setE_y_rectangle] = useState('');
  const [thikness_rectangle, setThikness_rectangle] = useState('');
  const [red_rectangle, setRed_rectangle] = useState('');
  const [green_rectangle, setGreen_rectangle] = useState('');
  const [blue_rectangle, setBlue_rectangle] = useState('');
  const [fill_rectangle, setFill_rectangle] = useState(false);
  const [salt, setSalt] = useState('');
  const [pepper, setPepper] = useState('');
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
    <RadioButton value="ellipse" />
    <Text style={styles.textStyle}>Ellipse</Text>
    </View>
    {value=="ellipse"?
    <>
    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>

    <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>Center Coordinates</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>X</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={x_ellipse}
      onChangeText={text => setX_ellipse(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Y</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={y_ellipse}
      onChangeText={text => setY_ellipse(text)}
    />
    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <Text style={{marginLeft: 10, color: "black", fontWeight: 'bold', fontSize: 16}}>Axis Length</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Major Axis</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={major_ellipse}
      onChangeText={text => setMajor_ellipse(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Minor Axis</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={minor_ellipse}
      onChangeText={text => setMinor_ellipse(text)}
    />
    </View>
    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Angle</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={angle_ellipse}
      onChangeText={text => setAngle_ellipse(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Start Angle</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={s_angle_ellipse}
      onChangeText={text => setS_angle_ellipse(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>End Angle</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={e_angle_ellipse}
      onChangeText={text => setE_angle_ellipse(text)}
    />
    </View>
    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Thickness</Text>
    <TextInput
      editable={fill_ellipse?false:true}
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={fill_ellipse?'-1':thikness_ellipse}
      onChangeText={text => setThikness_ellipse(text)}
    />
    </View>

    <View style={{flexDirection: 'row', width: '45%', alignItems: 'center'}}>
    <Checkbox
      status={fill_ellipse ? 'checked' : 'unchecked'}
      onPress={() => {
        setFill_ellipse(!fill_ellipse);
      }}
    />
    <Text>Fill Ellipse</Text>
    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>Color</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Red</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={red_ellipse}
      onChangeText={text => setRed_ellipse(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Green</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={green_ellipse}
      onChangeText={text => setGreen_ellipse(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Blue</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={blue_ellipse}
      onChangeText={text => setBlue_ellipse(text)}
    />
    </View>
    </View>
    </View>



    </>
    :
    null
  }

    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="circle" />
    <Text style={styles.textStyle}>Circle</Text>
    </View>
    {value=="circle"?
    <>
    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>

    <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>Center Coordinates</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>X</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={x_circle}
      onChangeText={text => setX_circle(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Y</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={y_circle}
      onChangeText={text => setY_circle(text)}
    />
    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Radius</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={radius_circle}
      onChangeText={text => setRadius_circle(text)}
    />
    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Thickness</Text>
    <TextInput
      editable={fill_circle?false:true}
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={fill_circle?'-1':thikness_circle}
      onChangeText={text => setThikness_circle(text)}
    />
    </View>

    <View style={{flexDirection: 'row', width: '45%', alignItems: 'center'}}>
    <Checkbox
      status={fill_circle ? 'checked' : 'unchecked'}
      onPress={() => {
        setFill_circle(!fill_circle);
      }}
    />
    <Text>Fill Circle</Text>
    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>Color</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Red</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={red_circle}
      onChangeText={text => setRed_circle(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Green</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={green_circle}
      onChangeText={text => setGreen_circle(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Blue</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={blue_circle}
      onChangeText={text => setBlue_circle(text)}
    />
    </View>
    </View>
    </View>



    </>
    :
    null
  }

    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="line" />
    <Text style={styles.textStyle}>Line</Text>
    </View>
    {value=="line"?
    <>
    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>

    <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>Start Point</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>X</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={s_x_line}
      onChangeText={text => setS_x_line(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Y</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={s_y_line}
      onChangeText={text => setS_y_line(text)}
    />
    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>

    <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>End Point</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>X</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={e_x_line}
      onChangeText={text => setE_x_line(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Y</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={e_y_line}
      onChangeText={text => setE_y_line(text)}
    />
    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Thickness</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={thikness_line}
      onChangeText={text => setThikness_line(text)}
    />
    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>Color</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Red</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={red_line}
      onChangeText={text => setRed_line(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Green</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={green_line}
      onChangeText={text => setGreen_line(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Blue</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={blue_line}
      onChangeText={text => setBlue_line(text)}
    />
    </View>
    </View>
    </View>
    </>
    :
    null
  }

    </TechCard>

    <TechCard color={"#e6e6e6"}>
    <View style={styles.firstSectionStyle}>
    <RadioButton value="rectangle" />
    <Text style={styles.textStyle}>Rectangle</Text>
    </View>
    {value=="rectangle"?
    <>
    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>

    <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>Start Point</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>X</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={s_x_rectangle}
      onChangeText={text => setS_x_rectangle(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Y</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={s_y_rectangle}
      onChangeText={text => setS_y_rectangle(text)}
    />
    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>

    <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>End Point</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>X</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={e_x_rectangle}
      onChangeText={text => setE_x_rectangle(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Y</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={e_y_rectangle}
      onChangeText={text => setE_y_rectangle(text)}
    />
    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '45%'}}>
    <Text>Thickness</Text>
    <TextInput
      editable={fill_rectangle?false:true}
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={fill_rectangle?'-1':thikness_rectangle}
      onChangeText={text => setThikness_rectangle(text)}
    />
    </View>

    <View style={{flexDirection: 'row', width: '45%', alignItems: 'center'}}>
    <Checkbox
      status={fill_rectangle ? 'checked' : 'unchecked'}
      onPress={() => {
        setFill_rectangle(!fill_rectangle);
      }}
    />
    <Text>Fill Rectangle</Text>

    </View>

    </View>
    </View>

    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>Color</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Red</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={red_rectangle}
      onChangeText={text => setRed_rectangle(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Green</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={green_rectangle}
      onChangeText={text => setGreen_rectangle(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '30%'}}>
    <Text>Blue</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={blue_rectangle}
      onChangeText={text => setBlue_rectangle(text)}
    />
    </View>
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
    <RadioButton value="s_p_noise" />
    <Text style={styles.textStyle}>Salt and Pepper Noise</Text>
    </View>
    {value=="s_p_noise"?
    <>
    <View style={{flexDirection: 'column', justifyContent: 'flex-start', width: "100%", marginBottom: 20}}>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', marginLeft: 10}}>

    <View style={{flexDirection: 'column', width: '47%'}}>
    <Text>Salt Probability</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={salt}
      onChangeText={text => setSalt(text)}
    />
    </View>

    <View style={{flexDirection: 'column', width: '47%'}}>
    <Text>Pepper Probability</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 5}}
      value={pepper}
      onChangeText={text => setPepper(text)}
    />
    </View>

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
    if(fill_ellipse==true) setThikness_ellipse(-1);
    if(fill_circle==true) setThikness_circle(-1);
    if(fill_rectangle==true) setThikness_rectangle(-1);
    {indexx==1?old_img="begin.jpg":old_img=pipeline[indexx - 2].imgName+".jpg"}
      if(image == '' || value == ''){
        alert('Please check all fields.');
      }
      else if(pipeline.some(img=>img.imgName==image)){
        alert('Image name already exists in the pipeline.');
      }
      else{
        if(value == 'ellipse'&&x_ellipse!=''&&y_ellipse!=''&&major_ellipse!=''&&minor_ellipse!=''
      &&angle_ellipse!=''&&s_angle_ellipse!=''&&e_angle_ellipse!=''&&thikness_ellipse!=''
    &&red_ellipse!=''&&green_ellipse!=''&&blue_ellipse!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/create-ellipse?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&x_coor='+x_ellipse+'&y_coor='+y_ellipse+'&major_axis='+major_ellipse+'&minor_axis='+
                  minor_ellipse+'&anglee='+angle_ellipse+'&start_angle='+ s_angle_ellipse+'&end_angle='+ e_angle_ellipse+
                  '&red='+red_ellipse+'&green='+green_ellipse+'&blue='+blue_ellipse+'&thickness='+thikness_ellipse,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters": 'x_coor='+x_ellipse+'&y_coor='+y_ellipse+'&major_axis='+major_ellipse+'&minor_axis='+
                      minor_ellipse+'&anglee='+angle_ellipse+'&start_angle='+ s_angle_ellipse+'&end_angle='+ e_angle_ellipse+
                      '&red='+red_ellipse+'&green='+green_ellipse+'&blue='+blue_ellipse+'&thickness='+thikness_ellipse,
                "techniqueName": "Create Ellipse",
                "technique": "create-ellipse",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Create Ellipse",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters: 'x_coor='+x_ellipse+'&y_coor='+y_ellipse+'&major_axis='+major_ellipse+'&minor_axis='+
                        minor_ellipse+'&anglee='+angle_ellipse+'&start_angle='+ s_angle_ellipse+'&end_angle='+ e_angle_ellipse+
                        '&red='+red_ellipse+'&green='+green_ellipse+'&blue='+blue_ellipse+'&thickness='+thikness_ellipse,
                  technique: "create-ellipse",
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
        else if(value=='circle' &&x_circle!=''&&y_circle!=''&&red_circle!=''&&green_circle!=''&&blue_circle!=''&&thikness_circle!=''&&radius_circle!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/create-circle?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&x_coor='+x_circle+'&y_coor='+y_circle+'&red='+red_circle+'&green='+green_circle+'&blue='+blue_circle+'&thickness='+thikness_circle+'&radius='+radius_circle,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'x_coor='+x_circle+'&y_coor='+y_circle+'&red='+red_circle+'&green='+green_circle+'&blue='+blue_circle+'&thickness='+thikness_circle+'&radius='+radius_circle,
                "techniqueName": "Create Circle",
                "technique": "create-circle",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Create Circle",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:'x_coor='+x_circle+'&y_coor='+y_circle+'&red='+red_circle+'&green='+green_circle+'&blue='+blue_circle+'&thickness='+thikness_circle+'&radius='+radius_circle,
                  technique: "create-circle"
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
        else if(value=='line' &s_x_line!=''&&s_y_line!=''&&e_x_line!=''&&e_y_line!=''&&blue_line!=''&&red_line!=''&&green_line!=''&&thikness_line!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/create-line?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&start_x='+s_x_line+'&start_y='+s_y_line+'&end_x='+e_x_line+'&end_y='+e_y_line+'&red='+red_line+'&green='+green_line+'&blue='+blue_line+'&thickness='+thikness_line,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'start_x='+s_x_line+'&start_y='+s_y_line+'&end_x='+e_x_line+'&end_y='+e_y_line+'&red='+red_line+'&green='+green_line+'&blue='+blue_line+'&thickness='+thikness_line,
                "techniqueName": "Create Line",
                "technique": "create-line",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Create Line",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                 parameters:'start_x='+s_x_line+'&start_y='+s_y_line+'&end_x='+e_x_line+'&end_y='+e_y_line+'&red='+red_line+'&green='+green_line+'&blue='+blue_line+'&thickness='+thikness_line,
                 technique: "create-line"
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
        else if(value=='rectangle' &s_x_rectangle!=''&&s_y_rectangle!=''&&e_x_rectangle!=''&&e_y_rectangle!=''&&blue_rectangle!=''&&red_rectangle!=''&&green_rectangle!=''&&thikness_rectangle!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/create-rectangle?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&start_x='+s_x_rectangle+'&start_y='+s_y_rectangle+'&end_x='+e_x_rectangle+'&end_y='+e_y_rectangle+'&red='+red_rectangle+'&green='+green_rectangle+'&blue='+blue_rectangle+'&thickness='+thikness_rectangle,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'start_x='+s_x_rectangle+'&start_y='+s_y_rectangle+'&end_x='+e_x_rectangle+'&end_y='+e_y_rectangle+'&red='+red_rectangle+'&green='+green_rectangle+'&blue='+blue_rectangle+'&thickness='+thikness_rectangle,
                "techniqueName": "Create Rectangle",
                "technique": "create-rectangle",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Create Rectangle",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:'start_x='+s_x_rectangle+'&start_y='+s_y_rectangle+'&end_x='+e_x_rectangle+'&end_y='+e_y_rectangle+'&red='+red_rectangle+'&green='+green_rectangle+'&blue='+blue_rectangle+'&thickness='+thikness_rectangle,
                  technique: "create-rectangle",
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
        else if(value=='s_p_noise' &salt!=''&&pepper!=''){
          var config = {
            method: 'get',
            url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/s-p-noise?username='+user.email+'&old_img='+old_img+'&new_img='+image+'.jpg'+'&salt_prob='+salt+'&pepper_prob='+pepper,
            headers: {
              'Content-Type': 'application/json'
            }
          };

            axios(config).then((response)=> {
              axios.post('http://192.168.1.24:9000/api/PipeLine/', {
                "email": user.email,
                "parameters":'salt_prob='+salt+'&pepper_prob='+pepper,
                "techniqueName": "Add Salt and Pepper Noise",
                "technique": "s-p-noise",
                "satgeName":image,
                "imageURL": response.data.url,
                "position": indexx
              }).then((response1) => {
                console.log(response.data.url)
                var img = {
                  imgName: image,
                  techniqueName: "Add Salt and Pepper Noise",
                  uri: response.data.url,
                  id: response1.data.id,
                  email: response1.data.email,
                  parameters:'salt_prob='+salt+'&pepper_prob='+pepper,
                  technique: "s-p-noise"
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


export default CreateScreen;
