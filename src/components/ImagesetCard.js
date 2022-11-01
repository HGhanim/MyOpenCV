import React from 'react';
import {Text, Button, View, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

const ImagesetCard = ({item, onDelete, onView}) => {
  const {containerStyle, imgStyle, settingsStyle, bodyStyle, titleStyle, title2Style, uploadTextStyle} = styles;
  console.log({item})
  return(

    <View style={containerStyle}>

    <View style={styles.section1Style}>
    <Text  style={titleStyle}>{item.imagesetName}</Text>
    <Text  style={title2Style}>{item.count} Images</Text>
    </View>

    <View style={styles.bodyStyle}>

    <Divider style={{ backgroundColor: '#fff', marginHorizontal: 10}} />

    <View style = {styles.viewStyle}>

    <TouchableOpacity onPress={onView}>
    <FontAwesome5 name="images" size={24} color="gray" />
    </TouchableOpacity>

    <TouchableOpacity onPress={onDelete}>
    <MaterialIcons name="delete" size={24} color="red" />
    </TouchableOpacity>


    </View>

    </View>
    </View>

  )
}

const styles = StyleSheet.create({
  section1Style:{
    flexDirection: "column",
    justifyContent: "center",
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
  title2Style:{
    fontSize: 14,
    color: "gray"
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
  viewStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10
  },

});

export default ImagesetCard;
