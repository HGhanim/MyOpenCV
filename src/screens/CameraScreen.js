import React, {useState, useContext} from 'react';
import {View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants';
import {Camera} from 'expo-camera';
import { MaterialIcons, AntDesign, FontAwesome5, Entypo, FontAwesome  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Context as OriginalContext} from '../context/OriginalContext';
import { Context as UserContext} from '../context/UserContext';
import { RNS3 } from 'react-native-aws3';
import axios from 'axios';

const CameraScreen = ({navigation}) =>{
  const [startCamera, setStartCamera] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = useState('off')
  let camera: Camera

  const {state:signinState, signin, signout, signup } = useContext(UserContext);
  const {state:original, editOriginal } = useContext(OriginalContext);

  const __navigateBack = () => {
    console.log("navigate");
    navigation.navigate("Pipeline")
  }
  const __retakePicture = () => {
    console.log("retake");
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert('Access denied')
    }
  }

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  }

  const __savePhoto = () => {
    //editOriginal(capturedImage);
      const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: capturedImage.uri,
        name: "begin.jpg",
        type: "image/jpg"
      }

      const options = {
        keyPrefix: signinState[0].userInfo.email+"/",
        bucket: "gp-1-hiba-raghad",
        region: "us-east-2",
        accessKey: "AKIAUYEWTEH6DE44Q3P7",
        secretKey: "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",
        successActionStatus: 201
      }

      RNS3.put(file, options).then(response => {

        axios.post('http://192.168.1.24:9000/api/PipeLine/', {
          "email": signinState[0].userInfo.email,
          "parameters": "nothing",
          "techniqueName": "Upload",
          "technique": "upload",
          "satgeName": "begin",
          "imageURL": response.body.postResponse.location,
          "position": 1
        }).then((response1) => {
          const img = {uri: response.body.postResponse.location, id: response1.data.id }
          editOriginal(img);
        }).catch((error) => {
          console.log(error);
          alert("A problem occured. Please, try again.");
        });

        __navigateBack();
      });
  }

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }

  return(
    <View style={{flex: 1,width: '100%'}}>

      {previewVisible && capturedImage ?
        <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} navigateBack={__navigateBack}/>
       :

        <Camera
          type={cameraType}
          flashMode={flashMode}
          style={{flex: 1}}
          ref={(r) => {
            camera = r
          }}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                position: 'absolute',
                left: '5%',
                top: '10%',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
            </View>
            <View
              style={{ position: 'absolute',bottom: 0,flexDirection: 'row',flex: 1,width: '100%',justifyContent: 'space-between', backgroundColor: '#353535', alignItems: "center",padding:10
              }}
            >
            {
              flashMode == 'off'?
              <TouchableOpacity onPress={__handleFlashMode}>
              <FontAwesome name="flash" size={30} color="white" />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={__handleFlashMode}>
              <FontAwesome name="flash" size={30} color="yellow" />
              </TouchableOpacity>
            }


              <TouchableOpacity
                onPress={__takePicture}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  marginLeft: 15
                }}
              />

              <TouchableOpacity onPress={__switchCamera}>
              <MaterialIcons name="flip-camera-ios" size={30} color="white" />
              </TouchableOpacity>

              </View>
            </View>

        </Camera>

      }
    </View>
  )
}

const CameraPreview = ({photo, savePhoto, retakePicture, navigateBack}) => {
const navigation = useNavigation();
//console.log(photo.photo.uri)
console.log(photo)
return (
  <View
    style={{
      backgroundColor: 'transparent',
      flex: 1,
      width: '100%',
      height: '100%'
    }}
  >
    <ImageBackground
      source={{uri: photo.uri}}
      style={{
        flex: 1
      }}
    />

    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#353535'}}>
    <TouchableOpacity onPress={navigateBack}>
    <Text style={{fontWeight: 'bold', color: "white"}}>Cancel</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={retakePicture}>
    <Text style={{fontWeight: 'bold', color: "white"}}>Re-take</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={savePhoto}>
    <Text style={{fontWeight: 'bold', color: "white"}}>Add</Text>
    </TouchableOpacity>
    </View>

  </View>
)
}


const styles = StyleSheet.create({});

export default CameraScreen;
