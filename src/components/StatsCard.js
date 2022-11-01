import React, { useContext, useState}  from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { Context } from '../context/PipelineContext';

const StatsCard = ({uri, name, stats}) =>{
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  return(
    <View style={styles.containerStyle}>
    <View style={{flexDirection: 'column'}}>

    <View style={{flexDirection: 'column'}}>
    <Text style={{fontSize: 18}}>{name}</Text>
    <Image
    key={(new Date()).getTime()}
    source={{ uri: uri+"?time=" + (new Date()).getTime(), headers: {Pragma: 'no-cache' }}}
    style = {{width: "100%", height: 300}}
    resizeMode="contain"
    />
    </View>

    <View style={{marginTop: 30, marginBottom: 10}}>
    <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: "gray", paddingVertical: 8}}>
    <Text style={{fontSize: 12, marginRight: 35}}>Band</Text>
    <Text style={{fontSize: 12, marginRight: 30}}>Mean</Text>
    <Text style={{fontSize: 12, marginRight: 35}}>STD</Text>
    <Text style={{fontSize: 12, marginRight: 30}}>Skew</Text>
    <Text style={{fontSize: 12}}>Entropy</Text>
    </View>
    <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: "gray", paddingVertical: 8}}>
    <Text style={{color: "blue", fontSize: 12, marginRight: 30}}>Blue  </Text>
    <Text style={{color: "blue", fontSize: 12, marginRight: 30}}>{financial(stats.mean0)}</Text>
    <Text style={{color: "blue", fontSize: 12, marginRight: 30}}>{financial(stats.std0)}</Text>
    <Text style={{color: "blue", fontSize: 12, marginRight: 38}}>{financial(stats.skew0)}</Text>
    <Text style={{color: "blue", fontSize: 12}}>{financial(stats.entropy0)}</Text>
    </View>
    <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: "gray", paddingVertical: 8}}>
    <Text style={{color: "green", fontSize: 12, marginRight: 28}}>Green</Text>
    <Text style={{color: "green", fontSize: 12, marginRight: 30}}>{financial(stats.mean1)}</Text>
    <Text style={{color: "green", fontSize: 12, marginRight: 30}}>{financial(stats.std1)}</Text>
    <Text style={{color: "green", fontSize: 12, marginRight: 30}}>{financial(stats.skew1)}</Text>
    <Text style={{color: "green", fontSize: 12, marginRight: 38}}>{financial(stats.entropy1)}</Text>
    </View>
    <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: "gray", paddingVertical: 8}}>
    <Text style={{color: "red", fontSize: 12, marginRight: 40}}>Red</Text>
    <Text style={{color: "red", fontSize: 12, marginRight: 30}}>{financial(stats.mean2)}</Text>
    <Text style={{color: "red", fontSize: 12, marginRight: 30}}>{financial(stats.std2)}</Text>
    <Text style={{color: "red", fontSize: 12, marginRight: 38}}>{financial(stats.skew2)}</Text>
    <Text style={{color: "red", fontSize: 12}}>{financial(stats.entropy2)}</Text>
    </View>

    </View>

    </View>
    </View>
  )
};

const styles = StyleSheet.create({
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
    marginVertical:20,
    padding: 10

  },
})


export default StatsCard;
