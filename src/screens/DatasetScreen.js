import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, FlatList, TouchableOpacity, TextInput} from 'react-native';
import ImagesetCard from '../components/ImagesetCard';
import AlgorithmCard from '../components/AlgorithmCard';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Context as ImagesetContext} from '../context/ImagesetContext';
import { Context as AlgorithmContext} from '../context/AlgorithmContext';
import { Context as UserContext} from '../context/UserContext';
import { RNS3 } from 'react-native-aws3';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
const DatasetScreen = ({navigation}) =>{
  const { state:imageset, addImageset, deleteImageset, viewImageset, deleteAllImageset, setImagesets } = useContext(ImagesetContext);
  const { state:algorithm, addAlgorithm, deleteAlgorithm, viewCode, deleteAllAlgorithm, setAlgorithms } = useContext(AlgorithmContext);
  const {state:signinState, signin, signout, signup } = useContext(UserContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageset_name, setImageset_name] = useState('');
  var axios = require('axios');

  const removeAllImagesets = () => {
    deleteAllImageset();
    console.log("hi");
    var config1 = {
      method: 'get',
      url: 'http://192.168.1.24:9000/api/ImageSets/',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    //var techniques;
    axios(config1)
    .then(function (response) {
      console.log(response.data);
      var i;
      for(i = 0; i < response.data.length; i++){
        console.log(response.data[i].id);
        console.log(response.data[i].email);
        if(response.data[i].email == signinState[0].userInfo.email){
          deleteImageset(response.data[i].id);
        }

      }
    })
    .catch(function (error) {
      console.log(error);
    });


  }

  const removeAllAlgorithms = () => {
    deleteAllAlgorithm();

    var config1 = {
      method: 'get',
      url: 'http://192.168.1.24:9000/api/Algorithms/',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    //var techniques;
    axios(config1)
    .then(function (response) {
      console.log(response.data);
      var i;
      for(i = 0; i < response.data.length; i++){
        console.log(response.data[i].id);
        console.log(response.data[i].email);
        if(response.data[i].email == signinState[0].userInfo.email){
          deleteAlgorithm(response.data[i].id);
        }

      }
    })
    .catch(function (error) {
      console.log(error);
    });


  }

  const getImagesets = async () =>{
    var config1 = {
      method: 'get',
      url: 'http://192.168.1.24:9000/api/ImageSets/',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try{
      const response = await  axios(config1)
        .then(function (response) {
          console.log(response.data);
          setImagesets(response.data, signinState[0].userInfo.email);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  catch(e){
    console.log(e);
  }
  };

  const getAlgorithms = async () =>{
    var config1 = {
      method: 'get',
      url: 'http://192.168.1.24:9000/api/Algorithms/',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try{
      const response = await  axios(config1)
        .then(function (response) {
          console.log(response.data);
          setAlgorithms(response.data, signinState[0].userInfo.email);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  catch(e){
    console.log(e);
  }
  };
  useEffect(() => {
  getImagesets();
  getAlgorithms();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


    const pickImage = () => {
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      }).then(res => {
        console.log(res);
        //uploadImage(res.uri);
      });
    };
  return (
    <ScrollView style={styles.containerStyle}>
    <View>
    <Text style={styles.text2Style}>Your Imagesets</Text>
    <Text style={styles.text1Style}>Here you can find all Imagesets you uploaded!</Text>
    <View style={styles.settingsStyle}>
    <TouchableOpacity onPress={()=>{
      //navigation.navigate('Picker');
      //console.log(imageset);
      //uploadSet();
      //pickImage();
      //addImageset();
      toggleModal();

    }}>
    <View style={{marginRight: 15}}>
    <Entypo name="circle-with-plus" size={50} color="black" />
    </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>removeAllImagesets()}>
    <AntDesign name="delete" size={50} color="black" />
    </TouchableOpacity>
    </View>

    <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    legacyImplementation={false}
    data={imageset}
    keyExtractor = {item => item.id}
    renderItem={({item}) =>{
      return(
        <ImagesetCard item={item} onView={() => {
          var images = [];
          var  i;
          for(i = 0; i < item.count; i++){
            images[i] = {"image": item.uri + i.toString(10) + ".jpg"};
          }
          console.log(images)
          navigation.navigate('View', {images: images, name: item.imagesetName, imageset:item.imagesetName, flag:false})
        }} onDelete={() => deleteImageset(item.id)} />
      )
    }}
/>
    </View>

    <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" animationOutTiming={500} animationInTiming={500}>
    <View style={{flex: 1}}>
    <View style={styles.modalStyle}>
    <Text style={{marginTop: 10, marginBottom: 10, fontSize: 16, fontWeight: 'bold'}}>Add New Imageset</Text>
    <Text>Imageset Name</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 50, paddingLeft: 5}}
      value={imageset_name}
      onChangeText={text => setImageset_name(text)}
    />
    <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10}} onPress={()=>{
      if(imageset_name != ''){
        toggleModal();
        navigation.navigate('Picker', {imageset_name: imageset_name});
        setImageset_name('');
      }
      else{
        alert("Choose a proper name.")
      }
    }
    }>
    <Text style={{color: "gray"}}>Choose Images</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{position: 'absolute', bottom: 10, left: 10}} onPress={toggleModal}>
    <Text style={{color: "gray"}}>Close</Text>
    </TouchableOpacity>
    </View>
    </View>
    </Modal>
    <View>
    <Text style={styles.text2Style}>Your Saved Algorithms</Text>
    <Text style={styles.text1Style}>Here you can find all algorithms you saved on the cloud!</Text>
    <View style={styles.settingsStyle}>

    <TouchableOpacity onPress={()=>removeAllAlgorithms()}>
    <AntDesign name="delete" size={50} color="black" />
    </TouchableOpacity>
    </View>

    <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    legacyImplementation={false}
    data={algorithm}
    keyExtractor = {item => item.id}
    renderItem={({item}) =>{
      return(
        <AlgorithmCard item={item} onDelete={(a)=>deleteAlgorithm(item.id)} onView={()=>navigation.navigate("Code", {source_code: item.code, view: 'old'})} />
      )
    }}
/>
    </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle:{
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  text1Style:{
    fontSize: 10,
    color: '#1F1F1F',
    marginBottom: 7,
    marginLeft: 7
  },
  text2Style:{
    fontSize: 20,
    color: '#234143',
    marginTop: 20,
    marginLeft: 7,
    fontWeight: 'bold'
  },
  settingsStyle:{
    flexDirection: 'row',
    marginLeft: 7,
    marginBottom: 10,
    alignItems: "center"
  },
  modalStyle:{
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: "white",
    marginTop: 100
  }
});

export default DatasetScreen;
