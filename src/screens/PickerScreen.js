import React, {useContext} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import StatusBarPlaceHolder from '../components/StatusBarPlaceHolder';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomNavigator from '../components/CustomTopNavigator';
import { Context as ImagesetContext} from '../context/ImagesetContext';
import { Context as UserContext} from '../context/UserContext';
import { RNS3 } from 'react-native-aws3';
const ForceInset = {
  top: 'never',
  bottom: 'never',
};

const PickerScreen = ({navigation, route}) => {
  const {state:imageset, addImageset, deleteImageset, viewImageset, deleteAllImageset } = useContext(ImagesetContext);
  const {state:signinState, signin, signout, signup } = useContext(UserContext);
  const {imageset_name} = route.params;

  const uploadSet = (uris) => {
    const count = uris.length;
    var i;
    for(i = 0; i < count; i++){
      uploadImage(uris[i], i.toString(10))
    }

    }
    const uploadImage = (imageUri, imageName) => {
      const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: imageUri,
        name: imageName+".jpg",
        type: "image/jpg"
      }

      const options = {
        keyPrefix: signinState[0].userInfo.email+"/"+imageset_name+"/",
        bucket: "gp-1-hiba-raghad",
        region: "us-east-2",
        accessKey: "AKIAUYEWTEH6DE44Q3P7",
        secretKey: "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",
        successActionStatus: 201
      }
      RNS3.put(file, options).then(response => {
        console.log("upload done"+ imageName)
      }).catch(function(error){
        console.log(error)
      })
    }
  const onDone = (data) => {
    const uris = data.map(item=>{
      return item.uri;
    })


    var axios = require('axios');
    axios.post('http://192.168.1.24:9000/api/ImageSets/', {
      "email": signinState[0].userInfo.email,
      "ImagesetURL": "https://gp-1-hiba-raghad.s3.us-east-2.amazonaws.com/"+signinState[0].userInfo.email+"/"+imageset_name+"/",
      "ImagesetName": imageset_name,
      "ImagesCount": uris.length
    }).then((response1) => {
      addImageset(signinState[0].userInfo.email, uris.length, imageset_name, response1.data.id)
      uploadSet(uris);
      navigation.navigate('Dataset');
    }).catch((error) => {
      console.log(error)
      alert("An error has occured.");
    });

    //Alert.alert(data);

    //console.log("hiiiiiiiiiiii");
    //console.log(uris)
  };

  const goBack = () => {
    console.log('Going back use Navigator goBack() hook');
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>

        <View style={styles.container}>
          <AssetsSelector
            options={{
              assetsType: ['photo', 'video'],
              maxSelections: 100,
              margin: 2,
              portraitCols: 4,
              landscapeCols: 5,
              widgetWidth: 100,
              widgetBgColor: 'white',
              videoIcon: {
                Component: Ionicons,
                iconName: 'ios-videocam',
                color: 'tomato',
                size: 20,
              },
              selectedIcon: {
                Component: Ionicons,
                iconName: 'ios-checkmark-circle-outline',
                color: '#f6a823',
                bg: 'rgba(0, 0, 0, 0.59)',
                size: 26,
              },
              spinnerColor: 'black',
              onError: () => {},
              noAssets: () => <View></View>,
              defaultTopNavigator: {
                continueText: 'Finish',
                goBackText: 'Back',
                selectedText: 'Selected',
                midTextColor: 'tomato',
                buttonStyle: _buttonStyle,
                buttonTextStyle: _textStyle,
                backFunction: goBack,
                doneFunction: (data) => onDone(data),
              },
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const _textStyle = {
  color: 'white',
};
const _buttonStyle = {
  backgroundColor: '#f6a823',
  borderRadius: 5,
};

// if you want to use defaultTopNavigator you must send in basic style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
});

export default PickerScreen;
