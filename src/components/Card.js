import React, { useContext, useState}  from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { Context } from '../context/PipelineContext';

const Card = ({img, onViewPressed, onRedPressed, onGreenPressed, onBluePressed, onHistogramPressed, onDeletePressed}) => {
  const { state, addTechnique, deleteTechnique, editTechnique, showTechnique } = useContext(Context);
  const {containerStyle, imgStyle, settingsStyle, bodyStyle, titleStyle, techniqueStyle, topSectionStyle} = styles;
  var name = '';
  if(img.techniqueName == 'Gray Level Multiplication'){
    name = `Gray Level\nMultiplication`;
  }
  else if(img.techniqueName == 'Histogram Equalization'){
    name = `Histogram\nEqualization`;
  }
  else if(img.techniqueName == 'Adaptive Histogram Equalization'){
    name = `Adaptive Histogram\nEqualization`;
  }
  else if(img.techniqueName == 'Color Contrast Algorithm'){
    name = `Color Contrast\nAlgorithm`;
  }
  else if(img.techniqueName == 'Arithmetic Mean Filter'){
    name = `Arithmetic \nMean Filter`;
  }
  else if(img.techniqueName == 'Gray Level Quantization'){
    name = `Gray Level\nQuantization`;
  }
  else if(img.techniqueName == 'Add Salt and Pepper Noise'){
    name = `Add Salt and\nPepper Noise`;
  }
  else if(img.techniqueName == 'Histogram Stretch'){
    name = `Histogram\nStretch`;
  }
  else{
    name = img.techniqueName;
  }
  return (
    <View style={containerStyle}>



    <View style = {bodyStyle}>

    <View style={styles.section1Style}>
    <View>

    <Text  style={titleStyle}>{img.imgName}</Text>

    <Text  style={techniqueStyle}>{name}</Text>

    </View>
    <Image
    key={(new Date()).getTime()}
    source={{ uri: img.uri+"?time=" + (new Date()).getTime(), headers: {Pragma: 'no-cache' }}}
    style = {imgStyle}
    resizeMode="contain"
    />
    </View>

    <Divider style={{ backgroundColor: '#fff' }} />
    <View style={styles.bottomStyle}>
    <View style = {styles.viewStyle}>
    <TouchableOpacity onPress={onViewPressed}>
    <FontAwesome name="search-plus" size={27} color="rgb(108, 117, 125)" />
    </TouchableOpacity>

    <View style={{alignItems: 'center', flexDirection: 'row',justifyContent: 'space-between'}}>
    <TouchableOpacity onPress={onRedPressed}>
    <Text style={{fontSize: 27, fontWeight: 'bold', marginRight: 3, color: 'red'}}>R</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={onGreenPressed}>
    <Text style={{fontSize: 27, fontWeight: 'bold', marginRight: 3, color: 'green'}}>G</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={onBluePressed}>
    <Text style={{fontSize: 27, fontWeight: 'bold', color: 'blue'}}>B</Text>
    </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={onHistogramPressed}>
    <FontAwesome name="bar-chart" size={27} color="#31bdae" />
    </TouchableOpacity>
    </View>

    <View style = {settingsStyle}>
    <TouchableOpacity onPress={() => onDeletePressed()}><MaterialIcons name="delete" size={27} color="#6e3c3c" /></TouchableOpacity>


    </View>
    </View>

    </View>
    </View>
  );
};

const styles = {
  section1Style:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 7,
    marginBottom: 10
  },
  bottomStyle:{
    flexDirection: "row",
    marginHorizontal: 7
  },
  imgStyle:{
    width: 90,
    height: 90,
  },
  titleStyle:{
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold'
  },
  techniqueStyle:{
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold'
  },
  bodyStyle:{
    marginTop: 10,
    flexDirection: 'column',
  },
  settingsStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  viewStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: "space-between",
  },
  containerStyle: {
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#D9D9D9',

    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,


    marginLeft: 7,
    marginRight: 7,
    marginBottom:20

  },

};
export default Card;
