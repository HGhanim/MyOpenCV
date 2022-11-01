import React, { useContext }  from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons';

const TechCard = ({children, color}) => {
  const {containerStyle, titleStyle, iconStyle, arrowStyle, container2Style} = styles;
  const colorStyles = {
    backgroundColor: color,
};
  return (
    <View style={[containerStyle, colorStyles]}>
    {children}
    </View>
  );
};

const styles = StyleSheet.create({

  containerStyle: {
    flexDirection:"column",
    alignItems: "center",
    padding: 7,
    paddingRight: 10,

  },

});
export default TechCard;
