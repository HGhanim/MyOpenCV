import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView,ImageBackground} from 'react-native';
import { Context as UserContext} from '../context/UserContext';
import { FontAwesome5, FontAwesome} from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { RNS3 } from 'react-native-aws3';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'

const ProfileScreen = ({navigation, route}) =>{
  const {state:signinState, signin, signout, signup } = useContext(UserContext);
  const [password1, setPassword1] = useState(signinState[0].userInfo.Password);
  const [password2, setPassword2] = useState(signinState[0].userInfo.Password);
  const [first, setFirst] = useState(signinState[0].userInfo.FirstName);
  const [last, setLast] = useState(signinState[0].userInfo.LastName);
  const [hide1, setHide1] = useState(true);
  const [hide2, setHide2] = useState(true);
  const [redPassword1, setRedPassword1] = useState(false);
  const [redPassword2, setRedPassword2] = useState(false);
  const [redFirst, setRedFirst] = useState(false);
  const [redSecond, setRedSecond] = useState(false);
  const [startEmail, setStartEmail] = useState(true);
  const [startPassword1, setStartPassword1] = useState(true);
  const [startPassword2, setStartPassword2] = useState(true);
  const [startFirst, setStartFirst] = useState(true);
  const [startSecond, setStartSecond] = useState(true);
  const [msg2, setMsg2] = useState(false);
  const [about, setAbout] = useState(signinState[0].userInfo.AboutMe);
  const [profile, setProfile] = useState('');
  const [background, setBackground] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [deleteText, setDeleteText] = useState('');
  console.log(background)
  const uploadImage = (imageUri, image) => {

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: imageUri,
      name: image+".jpg",
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
      //console.log(response.body.postResponse.location);
      if(image == "profile"){
        setProfile(response.body.postResponse.location)
      }
      else{
        setBackground(response.body.postResponse.location)
        console.log("done")
      }
    });
  }

  const pickImage = (image) => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    }).then(res => {
      //console.log(res);
      uploadImage(res.uri, image);
    });
  };
  return(
    <ScrollView>
    <View style={{flex: 1, backgroundColor: '#353535'}}>

    <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" animationOutTiming={500} animationInTiming={500}>
    <View style={{flex: 1}}>
    <View style={styles.modalStyle}>
    <Text style={{marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: 'bold'}}>Delete Account</Text>
    <Text style={{marginBottom: 30}}>Deleting your account will remove all of your information from our database. This cannot be undone.</Text>
    <TextInput
      placeholder="To confirm this, type DELETE"
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 50, paddingLeft: 5}}
      value={deleteText}
      onChangeText={text => setDeleteText(text)}
    />
    <TouchableOpacity style={{position: 'absolute', bottom: 15, right: 15}} onPress={()=>{

toggleModal()
    }
    }>
    <Text style={{color: "gray"}}>Confirm</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{position: 'absolute', bottom: 15, left: 15}} onPress={toggleModal}>
    <Text style={{color: "gray"}}>Cancel</Text>
    </TouchableOpacity>
    </View>
    </View>
    </Modal>

    <View style={{height: 350, backgroundColor: "#353535"}}>
    <ImageBackground source={background==''?require('../../assets/background.png'):
  {uri: background}} style={{width: "100%", height: 170, resizeMode: "cover",
    justifyContent: "center", alignItems: 'center'}}>
    <View >
    <Image
    source={profile==''?require('../../assets/profile.jpg'):
  {uri: profile}}
    style={{height: 220, width: 220, borderRadius:110, overflow: 'hidden', marginTop: 100}}
    />


    <TouchableOpacity  style={{position: 'absolute', bottom: 15, left: 100}} onPress={()=>pickImage("profile")}>
    <FontAwesome name="camera" size={24} color="black"/>
    </TouchableOpacity>

    </View>

    <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10}} onPress={()=>pickImage("background")} >
    <FontAwesome name="camera" size={30} color="black"/>
    </TouchableOpacity>




    </ImageBackground>
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{marginTop:80, color: 'white', fontSize: 18}}>{signinState[0].userInfo.FirstName} {signinState[0].userInfo.LastName}</Text>
    <Text style={{color: 'white'}}>{signinState[0].userInfo.email}</Text>
    <Text style={{color: 'gray', marginTop: 10}}>{signinState[0].userInfo.AboutMe}</Text>
    </View>
    </View>


    <View style={styles.containerStyle}>
    <TouchableOpacity style={styles.deleteBtn} onPress={() =>{
      toggleModal()

    }}>
      <Text style={styles.loginText}>Delete Account</Text>
    </TouchableOpacity>
      <View style={{flexDirection: 'row', width: '49%', justifyContent: 'center', alignItems: 'center'}}>

      <View style={
        redFirst?
        {
          width:"90%",
          backgroundColor:"white",
          borderRadius:5,
          height:50,
          justifyContent:'space-between',
          padding:20,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 2,
          borderColor: "red"
        }:
        {
          width:"90%",
          backgroundColor:"white",
          borderRadius:5,
          height:50,
          justifyContent:'space-between',
          padding:20,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 2,
          borderColor: "green"
        }
        }>
        <TextInput
          style={styles.inputText}
          onChangeText={(text)=>{
            setFirst(text)
            if(text){
              setRedFirst(false)
            }
            else{
              setRedFirst(true)
            }
          }}
          value={first}
          />
          <View style={{position: 'absolute', top: 5, right: 5}}>
          <FontAwesome name="asterisk" size={10} color="red" />
          </View>
      </View>

      <View style={{width: 6}}></View>

      <View style={
        redSecond?
        {
          width:"90%",
          backgroundColor:"white",
          borderRadius:5,
          height:50,
          justifyContent:'space-between',
          padding:20,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 2,
          borderColor: "red"
        }:
        {
          width:"90%",
          backgroundColor:"white",
          borderRadius:5,
          height:50,
          justifyContent:'space-between',
          padding:20,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 2,
          borderColor: "green"
        }
        }>
        <TextInput
          style={styles.inputText}
          onChangeText={(text)=>{
            setLast(text)
            if(text){
              setRedSecond(false)
            }
            else{
              setRedSecond(true)
            }
          }}
          value={last}
          />
          <View style={{position: 'absolute', top: 5, right: 5}}>
          <FontAwesome name="asterisk" size={10} color="red" />
          </View>
      </View>
      </View>


      <View style={
        redPassword1?
        {
          width:"90%",
          backgroundColor:"white",
          borderRadius:5,
          height:50,
          justifyContent:'space-between',
          padding:20,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 2,
          borderColor: "red"
        }:
        {
          width:"90%",
          backgroundColor:"white",
          borderRadius:5,
          height:50,
          justifyContent:'space-between',
          padding:20,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 2,
          borderColor: "green"
        }
        }
       >
        <TextInput
          secureTextEntry={hide1?true:false}
          style={styles.inputText}
          onChangeText={(text)=>{
            setPassword1(text)
            if(text){
              setRedPassword1(false)
            }
            else{
              setRedPassword1(true)
            }

            if(!startPassword2 && password2!=text){
              setRedPassword2(true)
            }
            else if(!startPassword2 && password2==text){
              setRedPassword2(false)
            }
          }}
          value={password1}
          />
          <TouchableOpacity onPress={()=>setHide1(!hide1)}>
           <FontAwesome5 name={hide1?"eye-slash":"eye"}size={20} color="#f6a823" />
         </TouchableOpacity>

         <View style={{position: 'absolute', top: 5, right: 5}}>
         <FontAwesome name="asterisk" size={10} color="red" />
         </View>
          </View>


          <View style={
            redPassword2?
            {
              width:"90%",
              backgroundColor:"white",
              borderRadius:5,
              height:50,
              justifyContent:'space-between',
              padding:20,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              borderWidth: 2,
              borderColor: "red"
            }:
            {
              width:"90%",
              backgroundColor:"white",
              borderRadius:5,
              height:50,
              justifyContent:'space-between',
              padding:20,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              borderWidth: 2,
              borderColor: "green"
            }
            }
           >
            <TextInput
              secureTextEntry={hide2?true:false}
              style={styles.inputText}
              onChangeText={(text)=>{
                setPassword2(text)
                if(text){
                  if(text != password1){
                    setMsg2(true)
                    setRedPassword2(true)
                  }
                  else{
                    setMsg2(false)
                    setRedPassword2(false)
                  }
                }
                else{
                  setRedPassword2(true)
                  setMsg2(true)
                }
              }}
              value={password2}
              />
              <TouchableOpacity onPress={()=>setHide2(!hide2)}>
               <FontAwesome5 name={hide2?"eye-slash":"eye"}size={20} color="#f6a823" />
             </TouchableOpacity>
             <View style={{position: 'absolute', top: 5, right: 5}}>
             <FontAwesome name="asterisk" size={10} color="red" />
             </View>
              </View>


              {msg2?
                <Text style={{marginTop:2, color:"red", fontSize: 12}}>THIS FIELD MUST MATCH PASSWORD FIELD</Text>
                :
                null
              }


              <View style={styles.inputView1} >
                <TextInput
                  style={styles.inputText1}
                  onChangeText={text => setAbout(text)}
                  value = {about}
                  multiline
                  numberOfLines={5}
                  />
              </View>

              <TouchableOpacity style={styles.loginBtn} onPress={() =>{
                if(!first || !last || !password1 || !password2 || (password1 != password2))
                alert("Please check all fields.");
                else{
                    axios.put(`http://192.168.1.24:9000/api/UserProfile/${signinState[0].userInfo.id}/`, {
                      "FirstName": first,
                      "LastName": last,
                      "email": signinState[0].userInfo.email,
                      "AboutMe": about,
                      "Password": password1,
                    }).then(response => {

                      console.log(signinState)
                      console.log(response.data)
                      signin(response.data)
                      //navigation.navigate('Signin')

                    }).catch(error => {
                      console.log(error)
                    });

                }


              }}>
                <Text style={styles.loginText}>Update Profile</Text>
              </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle:{
    flex: 1,
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText:{
    height:50,
    color:"black",
    width: "93%"
  },
  inputView:{
    width:"90%",
    backgroundColor:"white",
    borderRadius:5,
    height:50,
    marginTop:20,
    justifyContent:'space-between',
    padding:20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  loginBtn:{
    width:"90%",
    backgroundColor:"#f6a823",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  deleteBtn:{
    width:"90%",
    backgroundColor:"red",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
  inputView1:{
    width:"90%",
    backgroundColor:"white",
    borderRadius:5,
    height:100,
    marginTop:20,
    justifyContent:'center',
    padding:5,
    flexDirection: 'row',
  },
  inputText1:{
    height:50,
    color:"black",
    width: "93%",
    justifyContent: "center",

  },
  modalStyle:{
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: "white",
    marginTop: 150
  }
})
export default ProfileScreen;
