import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import { FontAwesome5, FontAwesome} from '@expo/vector-icons';
import { Context as UserContext} from '../context/UserContext';
import axios from 'axios'

const SignupScreen = ({navigation}) =>{
  const {state:signinState, signin, signout} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [hide1, setHide1] = useState(true);
  const [hide2, setHide2] = useState(true);
  const [about, setAbout] = useState('');
  const [msg, setMsg] = useState(false);
  const [users, setUsers] = useState([]);
  const [redEmail, setRedEmail] = useState(false);
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
    style={{width: 85, height: 85, marginBottom: 10}}
    resizeMode="contain"
    />

    <View style={
      startEmail?
      {width:"90%",
      backgroundColor:"white",
      borderRadius:5,
      height:50,
      justifyContent:'space-between',
      padding:20,
      alignItems: 'center',
      flexDirection: 'row'
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
      borderWidth: 2,
    }:
    {width:"90%",
    backgroundColor:"white",
    borderRadius:5,
    height:50,
    justifyContent:'center',
    padding:20,
    alignItems: 'center',
    borderColor:"green",
    borderWidth: 2,
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
        <View style={{position: 'absolute', top: 5, right: 5}}>
        <FontAwesome name="asterisk" size={10} color="red" />
        </View>
    </View>
    {msg?
      <Text style={{marginTop:2, color:"red", fontSize: 12}}>PLEASE ENTER A PROPER EMAIL ADDRESS</Text>
      :
      null
    }

        <View style={{flexDirection: 'row', width: '49%', justifyContent: 'center', alignItems: 'center'}}>

        <View style={
          startFirst?
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
          }:
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
            placeholder="First Name"
            placeholderTextColor="gray"
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
            onFocus={()=>{
              if(startFirst){
                setStartFirst(false)
                setRedFirst(true)
              }

            }}
            />
            <View style={{position: 'absolute', top: 5, right: 5}}>
            <FontAwesome name="asterisk" size={10} color="red" />
            </View>
        </View>

        <View style={{width: 6}}></View>

        <View style={
          startSecond?
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
          }:
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
            placeholder="Second Name"
            placeholderTextColor="gray"
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
            onFocus={()=>{
              if(startSecond){
                setStartSecond(false)
                setRedSecond(true)
              }

            }}
            />
            <View style={{position: 'absolute', top: 5, right: 5}}>
            <FontAwesome name="asterisk" size={10} color="red" />
            </View>
        </View>
        </View>
        <View style={
          startPassword1?
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
          }:
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
            placeholder="Password"
            placeholderTextColor="gray"
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
            onFocus={()=>{
              if(startPassword1){
                setStartPassword1(false)
                setRedPassword1(true)
              }

            }}
            />
            <TouchableOpacity onPress={()=>setHide1(!hide1)}>
             <FontAwesome5 name={hide1?"eye-slash":"eye"}size={20} color="#f6a823" />
           </TouchableOpacity>

           <View style={{position: 'absolute', top: 5, right: 5}}>
           <FontAwesome name="asterisk" size={10} color="red" />
           </View>
            </View>


            <View style={
              startPassword2?
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
              }:
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
                placeholder="Confirm Password"
                placeholderTextColor="gray"
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
                onFocus={()=>{
                  if(startPassword2){
                    setStartPassword2(false)
                    setRedPassword2(true)
                    setMsg2(true)
                  }

                }}
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
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="About Me"
            placeholderTextColor="gray"
            onChangeText={text => setAbout(text)}
            value = {about}
            multiline={true}
            />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={() =>{
          if(!email || !first || !last || !password1 || !password2 || (password1 != password2))
          alert("Please check all fields.");
          else{
            const user = users.filter(function(item) { return (item.email === email); });
            //console.log(user)
            if(user[0]){
              alert("This user already exists.")
            }
            else{

              axios.post('http://192.168.1.24:9000/api/UserProfile/', {
                "FirstName": first,
                "LastName": last,
                "email": email,
                "AboutMe": about,
                "Password": password1,
                "ProfilePicture":null,
                "BackGroundPicture": null
              }).then(response => {
                console.log(response.data)
                signin(response.data);
                //navigation.navigate('Signin')

              }).catch(error => {
                console.log(error.response)
              });


            }
          }


        }}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Signin')} >
          <Text style={styles.loginText}>Login</Text>
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
  fontSize:50,
  color:"#fb5b5a",
  marginBottom:40
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
  marginTop:20,
  marginBottom:10
},
loginText:{
  color:"white"
}
})

export default SignupScreen;
