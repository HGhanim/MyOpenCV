import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';

const Box = ({item, navigation, onBoxPress}) => {
  const {containerStyle, titleStyle} = styles;
  const colorStyles = {
    backgroundColor: item.color,
    borderColor: item.color
};
      //  style={[colorStyles,{ width: '99%', height: '99%', borderRadius: 10, borderWidth: 1}]}
  return (

    <TouchableOpacity onPress={onBoxPress} style={{width: "100%"}}>
    <View style={[containerStyle, colorStyles]}>


    {item.icon}
    <Text style={titleStyle} >{item.title}</Text>


    </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({

  containerStyle: {
    flexDirection: 'row',
    //backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,

    borderRadius: 10,
    //borderColor: 'blue',
    //paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 20

  },
  titleStyle:{
    fontSize: 25,
    color: "white",
    marginLeft: 20
  }
}
);

export default Box;
