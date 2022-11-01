import React, { useContext, useState, useCallback, useEffect }  from 'react';
import {ActivityIndicator, Pressable,Alert, Text, StyleSheet, View, Button, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Image, Platform, ImageBackground} from 'react-native';
import Modal from 'react-native-modal';

const CustomProgressBar = ({ visible }) => {
  //console.log(visible)
  return(
  <Modal transparent={true} onRequestClose={() => null} visible={visible}>
    <View style={{ backgroundColor: 'rgba(255,255,255,0)', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.9)', padding: 25 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20, color: "gray"}}>Processing</Text>
        <ActivityIndicator size="large" color="gray"/>
      </View>
    </View>
  </Modal>
)
}

export default CustomProgressBar;
