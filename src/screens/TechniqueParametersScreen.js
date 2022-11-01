import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Platform, Image} from 'react-native';
import { Context } from '../context/PipelineContext';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const TechniqueParametersScreen = ({navigation}) => {
  const { state, addTechnique, deleteTechnique, editTechnique, showTechnique, updateTechniques, deleteAll } = useContext(Context);

  const [image, setImage] = useState(null);

  var axios = require('axios');

  const [n,setN]=React.useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  })();
}, []);

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setImage(result.uri);
  }
};

  // useEffect(() => {
  //   fetch('http://192.168.56.1:90/api/core/', {
  //     method: "GET"
  //   })
  //
  //   .then(resp => resp.json())
  //   .then(data => {
  //     console.log(data)
  //   })
  //   .catch(error => console.log(error))
  // })

  //IT WORKS FINALLY!!!
  useEffect(() => {
    fetch('http://192.168.1.24:90/api/core/', {
      method: "GET"
    })

    .then(resp => resp.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => console.log(error))
  })

  var config = {
    method: 'get',
    url: 'https://f7gbmdtbzi.execute-api.us-east-2.amazonaws.com/v2/median-filter?username=hiba&old_img=flowers.jpg&new_img=f3344.jpg&filter_size=5',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var config1 = {
    method: 'get',
    url: 'http://192.168.56.1:90/api/core/',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // <Button title="Add Technique"
  // onPress={() => {
  //   addTechnique();
  //   navigation.navigate("Pipeline");
  // }}/>
  //
  // // <Button title="Add Technique"
  // // onPress={() => {
  // //
  // //   navigation.navigate("Code");
  // // }}/>
  //
  // <Button title="api"
  // onPress={() => {
  //   axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //
  // }}/>
  //
  //
  // <Button title="api"
  // onPress={() => {
  //   axios(config1)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //
  // }}
  // />
  //
  // <Button title="upload image"
  // onPress={pickImage}
  // />
  //
  //  {image && <Image source={{ uri: image }} style={{ width: "100%", height: 600 }} />}

  return(
    <View>
    <Text>Prameters Screen</Text>

    </View>
  );
}


const styles = StyleSheet.create({

});



export default TechniqueParametersScreen;
