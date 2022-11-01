import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, FlatList, ScrollView} from 'react-native';
import Box from '../components/Box';
import Card2 from '../components/Card2';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const TechniquesScreen = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [pressedBox, setPressedBox] = useState("Analysis");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const boxes = [
    {title: "Analysis", icon: <AntDesign name="piechart" size={55} color="white" />, color:"rgb(220, 53, 69)",
    techniques:[
      {title: "Geometry", icon: <FontAwesome5 name="dungeon" size={35} color="#5e5e5e" />, page: "Geometry"},
      {title: "Edge/Line Detection", icon: <FontAwesome name="map-signs" size={35} color="#5e5e5e" />, page: "Edge"},
      {title: "Morphological Filters", icon: <FontAwesome5 name="hand-scissors" size={35} color="#5e5e5e" />, page: "Morphological"},
      {title: "Transforms", icon: <FontAwesome name="exchange" size={35} color="#5e5e5e" />, page: "Transforms"},
    ]},
    {title: "Enhancement", icon: <FontAwesome5 name="tools" size={55} color="white" />, color:"rgb(255, 193, 7)",
     techniques:[
       {title: "Histogram/Contrast", icon: <FontAwesome5 name="adjust" size={35} color="#5e5e5e" />, page:"Histogram"},
       {title: "Enhance", icon: <FontAwesome5 name="chart-line" size={35} color="#5e5e5e" />, page:"Enhance"},
     ]},
    {title: "Restoration", icon: <FontAwesome5 name="cut" size={55} color="white" />, color:"rgb(40, 167, 69)",
    techniques:[
      {title: "Spatial Filters", icon: <FontAwesome5 name="filter" size={35} color="#5e5e5e" />, page: "Spatial"},
      {title: "Filter", icon: <FontAwesome name="binoculars" size={35} color="#5e5e5e" />, page:"Filter"},
    ]},
    {title: "Utilities", icon: <FontAwesome5 name="truck" size={55} color="white" />, color:"rgb(52, 58, 64)",
    techniques:[
      {title: "Arith/Logic", icon: <FontAwesome5 name="clipboard-check" size={35} color="#5e5e5e"/>, page: "ArithLogic"},
      {title: "Convert", icon: <FontAwesome5 name="arrows-alt-h" size={35} color="#5e5e5e" />, page:"Convert"},
      {title: "Create", icon: <FontAwesome5 name="file-signature" size={35} color="#5e5e5e" />, page:"Create"},
    ]},
  ];
  return(
    <View style={styles.container1Style}>
    <View style={styles.containerStyle}>
    <Box item={boxes.find(element => element.title==="Analysis")} onBoxPress={() => {
      setPressedBox("Analysis");
      toggleModal();
    }} />
    </View>
    <View style={styles.containerStyle}>
    <Box item={boxes.find(element => element.title==="Enhancement")} onBoxPress={() => {
      setPressedBox("Enhancement");
      toggleModal();
    }} />
    </View>
    <View style={styles.containerStyle}>
    <Box item={boxes.find(element => element.title==="Restoration")} onBoxPress={() => {
      setPressedBox("Restoration");
      toggleModal();
    }} />
    </View>
    <View style={styles.containerStyle}>

    <Box item={boxes.find(element => element.title==="Utilities")} onBoxPress={() => {
      setPressedBox("Utilities");
      toggleModal();
    }} />
    </View>


    <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={() => toggleModal()} animationOutTiming={500} animationInTiming={500}>
    <View style={{flex: 1}}>
        <View style={styles.modalStyle}>
          <Text style={styles.modalTitleStyle}>{pressedBox}</Text>
          <FlatList
          data={boxes.find(element => element.title===pressedBox).techniques}
          renderItem={({item}) =><Card2 item={item} onCard2Press={() => {
            toggleModal();
            navigation.navigate(item.page);
          }}/>}
          keyExtractor={item => item.title}
          />
        </View>

    </View>
    </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  containerStyle:{
    backgroundColor: "#dedede",
    flexDirection: "row",
    //alignSelf: "stretch",
    //flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  //  borderWidth: 1,
  //  borderColor: "black",
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    padding: 15
  },
  container1Style:{
    flex: 1,
    backgroundColor: '#dedede'
  },
  modalTitleStyle:{
    marginLeft: 10,
    fontSize: 28,
    marginBottom: 15,
    marginTop: 10,
    color: "#006080",
    fontWeight: "bold"

  },
  modalStyle:{
    //flex: 1,
    borderRadius: 10,
    backgroundColor: "#dedede",
    padding: 5
    //marginTop: 40,
  }

});



export default TechniquesScreen;
