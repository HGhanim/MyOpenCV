import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios'
import { Context as UserContext} from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';

const SigninScreen = ({navigation}) =>{
  const {state:signinState, signin, signout} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(true);
  const [msg, setMsg] = useState(false);
  const [users, setUsers] = useState([]);
  const [redEmail, setRedEmail] = useState(false);
  const [redPassword, setRedPassword] = useState(false);
  const [startEmail, setStartEmail] = useState(true);
  const [startPassword, setStartPassword] = useState(true);
  var config1 = {
    method: 'get',
    url: 'http://192.168.1.24:9000/api/UserProfile/',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  useEffect(() => {
    axios(config1)
    .then(function (response) {
      setUsers(response.data);
      //console.log(found);
    })
    .catch(function (error) {
      console.log(error);
    });

  }, []);



  const validate = (text) => {
  //console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    setEmail(text)
    setMsg(true)
    setRedEmail(true)
    return false;
  }
  else {
    setEmail(text)
    setMsg(false)
    setRedEmail(false)
    return true
  }
}
  return(
    <View style={styles.container}>
    <Image
    source={require('../../assets/logo.png')}
    style={{width: 85, height: 85}}
    resizeMode="contain"
    />
        <Text style={styles.logo}>MyOpenCV</Text>

        <View style={
          startEmail?
          {width:"90%",
          backgroundColor:"white",
          borderRadius:5,
          height:50,
          justifyContent:'center',
          padding:20,
          alignItems: 'center',
        }:
          redEmail?
          {width:"90%",
          backgroundColor:"white",
          borderRadius:5,
          height:50,
          justifyContent:'center',
          padding:20,
          alignItems: 'center',
          borderColor: "red",
          borderWidth: 2
        }:
        {width:"90%",
        backgroundColor:"white",
        borderRadius:5,
        height:50,
        justifyContent:'center',
        padding:20,
        alignItems: 'center',
        borderColor:"green",
        borderWidth: 2
      }
        } >
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              validate(text);
            }}
            value={email}
            onFocus={()=>{
              if(startEmail){
                setStartEmail(false)
                setRedEmail(true)
                setMsg(true)
              }
            }}
            />
        </View>
        {msg?
          <Text style={{marginTop:2, color:"red", fontSize: 12}}>PLEASE ENTER A PROPER EMAIL ADDRESS</Text>
          :
          null
        }

        <View style={
          startPassword?
          {
            width:"90%",
            backgroundColor:"white",
            borderRadius:5,
            height:50,
            marginBottom:20,
            justifyContent:'space-between',
            padding:20,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }:
          redPassword?
          {
            width:"90%",
            backgroundColor:"white",
            borderRadius:5,
            height:50,
            marginBottom:20,
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
            marginBottom:20,
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
            secureTextEntry={hide?true:false}
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="gray"
            onChangeText={(text)=>{
              setPassword(text)
              if(text){
                setRedPassword(false)
              }
              else{
                setRedPassword(true)
              }
            }}
            value={password}
            onFocus={()=>{
              if(startPassword){
                setStartPassword(false)
                setRedPassword(true)
              }

            }}
            />

         <TouchableOpacity onPress={()=>setHide(!hide)}>
          <FontAwesome5 name={hide?"eye-slash":"eye"}size={20} color="#f6a823" />
        </TouchableOpacity>


        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={() =>{
          if(!password || !email || msg){
            alert("Please check all fields.")
          }
          else {
            const user = users.filter(function(item) { return (item.email === email && item.Password===password); });
            if(user[0]){
              signin(user[0])
            }
            else{
              alert("Invalid Email or Password.")
            }
          }


        }}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')} >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#353535',
  alignItems: 'center',
  justifyContent: 'center',
},
logo:{
  fontWeight:"bold",
  fontSize:30,
  color:"white",
  marginBottom:40
},
inputView:{
  width:"90%",
  backgroundColor:"white",
  borderRadius:5,
  height:50,
  marginBottom:20,
  justifyContent:'space-between',
  padding:20,
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 20
},
emailView:{
  width:"90%",
  backgroundColor:"white",
  borderRadius:5,
  height:50,
  justifyContent:'center',
  padding:20,
  alignItems: 'center',
},
inputText:{
  height:50,
  color:"black",
  width: "93%"
},
forgot:{
  color:"white",
  fontSize:11
},
loginBtn:{
  width:"93%",
  backgroundColor:"#f6a823",
  borderRadius:5,
  height:50,
  alignItems:"center",
  justifyContent:"center",
  marginTop:40,
  marginBottom:10,
  borderColor: "#f6a823"
},
loginText:{
  color:"white"
}
})

export default SigninScreen;
