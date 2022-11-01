import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView,ImageBackground} from 'react-native';
import { Context as UserContext} from '../context/UserContext';
import {sendEmail} from '../hooks/sendEmail';
//import emailjs from 'emailjs-com';
import axios from 'axios';
//import email from 'react-native-email'
import RNSmtpMailer from "react-native-smtp-mailer";



const FeedbackScreen = () =>{
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');
  const {state:signinState, signin, signout} = useContext(UserContext);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
    <View style={styles.inputView}>
    <TextInput
    style={styles.inputText}
    value={subject}
    placeholder="Your feedback subject"
    placeholderTextColor="gray"
    onChangeText={(text)=>setSubject(text)}
    />
    </View>

    <View style={styles.inputView1}>
    <TextInput
    style={styles.inputText1}
    value={msg}
    placeholder="Write your feedback here"
    placeholderTextColor="gray"
    onChangeText={(text)=>setMsg(text)}
    multiline
    numberOfLines={10}
    />
    </View>

    <TouchableOpacity style={styles.loginBtn} onPress={() =>{
      if(!subject || !msg){
        alert("Please check all fields.")
      }
      else {
        console.log("feedback");
        alert("Your feedback was sent successfully.");
//         RNSmtpMailer.sendMail({
//           mailhost: "smtp.gmail.com",
//           port: "465",
//           ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
//           fromName: signinState[0].userInfo.FirstName + " " + signinState[0].userInfo.LastName,
//           username: "myopencv91@gmail.com",
//           password: "myopencv123456",
//           recipients: "myopencv91@gmail.com",
//           subject: subject,
//   htmlBody: `<div>
//   <p>${msg}</p>
//   <p>${signinState[0].userInfo.FirstName} ${signinState[0].userInfo.SecondName}</p>
//   <p>${signinState[0].userInfo.email}</p>
//   </div>`,
// })
//   .then(()=>{
//     alert("Your feedback was sent successfully.");
//   }
//   )
//   .catch(err => console.log(err));



        // sendEmail(
        //   'myopencv91@gmail.com',
        //   'Can we get there?',
        //   'Elon, here’s one destination you guys should consider [link]',
        // ).then(() => {
        //   alert('Your feedback was successfully sent!')
        //   console.log('Your message was successfully sent!');
        // });
                            //
                            //   emailjs.send('MyOpenCV', 'MyOpenCV',  {
                            //     subject: subject,
                            //     message: msg,
                            //     user_name:signinState[0].userInfo.FirstName+" "+signinState[0].userInfo.LastName,
                            //     user_email:signinState[0].userInfo.email
                            // },'user_T3mmSWCCAduxEDA0HISD0')
                            //   .then((result) => {
                            //     setSubject("");
                            //     setMsg("");
                            //     alert("The email was sent successfully.");
                            //   }, (error) => {
                            //     alert("A Problem occured. Please try again");
                            //     console.log(error);
                            //   });

                           }
    }}>
      <Text style={styles.loginText}>Send Feedback</Text>
    </TouchableOpacity>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: "center"
},
horizontal: {
  flexDirection: "row",
  justifyContent: "center",
  padding: 10
},
  inputText:{
    height:50,
    color:"black",
    width: "93%"
  },
  inputText1:{
    height:50,
    color:"black",
    width: "93%",
    justifyContent: "center"
  },
  inputView:{
    width:"90%",
    backgroundColor:"white",
    borderRadius:5,
    height:50,
    marginTop:20,
    justifyContent:'center',
    padding:20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputView1:{
    width:"90%",
    backgroundColor:"white",
    borderRadius:5,
    height:200,
    marginTop:20,
    justifyContent:'center',
    padding:20,
    flexDirection: 'row',

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
});

export default FeedbackScreen;
