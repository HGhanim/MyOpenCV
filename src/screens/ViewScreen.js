import React, {useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { downloadToFolder } from 'expo-file-dl';
const ViewScreen = ({navigation, route}) => {


  const {images, name, imageset, flag} = route.params;
  console.log(images);
  console.log(flag);
  useEffect(() => {
    navigation.setOptions({
      title: name,
    })
  }, []);
  console.log("Viewwwwwwwww");
  console.log(images);
  return (
    <View style={styles.background}>
    {flag?(
      <View style={{marginLeft: 5, marginBottom: 20, marginTop: 10}}>
      <TouchableOpacity  onPress={async () => {
        var i;
        for(i = 0; i < images.length; i++){
          const uri = images[i].image;
          const filename = imageset+i.toString(10)+".jpg";
          const folder = imageset;
          const channelId = "0";
          await downloadToFolder(uri, filename, folder, channelId);
        }
        console.log("DONE");
        alert("Images has been downloaded successfully to "+imageset);

        }}>
      <FontAwesome5 name="download" size={50} color="#f6a823" />
      </TouchableOpacity>
      </View>
    ):null}


      <GridImageView data={images} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1
  },
  headline_text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 20
  },
  explore_text: {
    marginTop: 5,
    marginBottom: 10,
    color: 'white',
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '600'
  },
});

export default ViewScreen;
