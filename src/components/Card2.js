import React, { useContext }  from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';

const Card2 = ({item, onCard2Press}) => {
  const {containerStyle, titleStyle, iconStyle, arrowStyle, container2Style} = styles;
  return (
    <TouchableOpacity onPress={onCard2Press}>
    <View style={containerStyle}>
    <View style={container2Style}>
    <View style={iconStyle}>
    {item.icon}
    </View>
    <Text style={titleStyle}>{item.title}</Text>
    </View>

    <View style={arrowStyle}>
    <Feather name="arrow-right" size={20} color="#5e5e5e" />
    </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = {

  containerStyle: {
    flexDirection:"row",
    backgroundColor: '#ededed',
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
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom:5
  },
  titleStyle:{
    color: "#5e5e5e",
    borderLeftWidth: 1,
    borderLeftColor: "#5e5e5e",
    paddingLeft:15,
  },
  iconStyle:{
    width: 50
  },
  arrowStyle:{
  },
  container2Style:{
    flexDirection: "row",
    alignItems: "center"
  }

};
export default Card2;
