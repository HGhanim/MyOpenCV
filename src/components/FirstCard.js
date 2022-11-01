import React, { useContext }  from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

const FirstCard = ({id, title, technique, onViewPressed, onRedPressed, onGreenPressed, onBluePressed, onHistogramPressed, onUploadPressed, onCameraPressed, onDownloadPressed, imgURI}) => {
  const {containerStyle, imgStyle, settingsStyle, bodyStyle, titleStyle, uploadTextStyle} = styles;
  return (
    <View style={containerStyle}>
    <View style={styles.section1Style}>
    <Text  style={titleStyle}>Original Image</Text>
    {imgURI=='default'?
    <Image
    source={require('../../assets/default.png')}
    style={imgStyle}
    resizeMode="contain"
    />
    :
    <Image
    source={{ uri:imgURI+"?time=" + (new Date()).getTime(), headers: {Pragma: 'no-cache' }}}
    style = {imgStyle}
    resizeMode="contain"
    />
  }

    </View>

    <View style = {bodyStyle}>




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
    <View style={settingsStyle}>
    <TouchableOpacity style={{marginRight: 12}} onPress={onCameraPressed}>
    <FontAwesome name="camera" size={27} color="#284B63" />
    </TouchableOpacity>
    <TouchableOpacity style={{marginRight: 12}} onPress={onUploadPressed}>
    <FontAwesome name="upload" size={27} color="#284B63" />
    </TouchableOpacity>
    <TouchableOpacity  onPress={onDownloadPressed}>
    <FontAwesome5 name="download" size={24} color="#284B63" />
    </TouchableOpacity>
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
    marginVertical: 10,
    alignItems: 'center'
  },
  imgStyle:{
    width: 85,
    height: 85,
  },
  titleStyle:{
    fontSize: 25,
    marginBottom: 2
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
  bottomStyle:{
    flexDirection: "row",
    marginHorizontal: 7,
  },
  viewStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: "space-between",
  },

};
export default FirstCard;
