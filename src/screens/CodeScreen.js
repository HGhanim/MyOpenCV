import React, { useContext, useState, useCallback, useEffect }  from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Clipboard} from 'react-native';
import { FontAwesome5, FontAwesome} from '@expo/vector-icons';
import { Context as UserContext} from '../context/UserContext';
import { Context as AlgorithmContext} from '../context/AlgorithmContext';
import Modal from 'react-native-modal';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';


const CodeScreen = ({navigation, route}) =>{
  const {source_code, view, algorithm_item} = route.params;

  const [code, setCode] = useState('#The code will be generated here');
  const [isModalVisible, setModalVisible] = useState(false);
  const [algorithm_name, setAlgorithm_name] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {containerStyle} = styles;
  var axios = require('axios');
  const {state:signinState, signin, signout, signup } = useContext(UserContext);
  const { state:algorithm, addAlgorithm, deleteAlgorithm, viewCode, deleteAllAlgorithm, setAlgorithms } = useContext(AlgorithmContext);
  const [copiedText, setCopiedText] = useState('')
  const copyToClipboard = () => {
    Clipboard.setString(code);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    console.log(text);
    setCopiedText(text);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: "row"}}>
        <View style={{marginRight: 15}}>
        <TouchableOpacity onPress={copyToClipboard}><FontAwesome5 name="copy" size={24} color="gray" /></TouchableOpacity>
        </View>
        {view=='new'?(
          <View style={{marginRight: 15}}>
          <TouchableOpacity onPress={()=>toggleModal()}><FontAwesome name="cloud-upload" size={24} color="gray" /></TouchableOpacity>
           </View>
        ):
      null}

         </View>
       ),
    })
    setCode(source_code);
    console.log(source_code);
  }, []);


//   <WebView
// originWhitelist={['*']}
// source={{ html: `<!DOCTYPE html>
//                     <html>
//                       <head>
//                         <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism-dark.min.css" rel="stylesheet" />
//                       </head>
//                       <body style="font-size: 25px">
//                         <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/components/prism-core.min.js"></script>
//                         <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/autoloader/prism-autoloader.min.js"></script>
//                         <pre>
//                           <code class="language-js">${codee}
// </code>
//                         </pre>
//                       </body>
//                     </html>` }}
// />
  return(
    <View style={containerStyle}>
    <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown" animationOutTiming={500} animationInTiming={500}>
    <View style={{flex: 1}}>
    <View style={styles.modalStyle}>
    <Text style={{marginTop: 10, marginBottom: 10, fontSize: 16, fontWeight: 'bold'}}>Save Algorithm</Text>
    <Text>Algorithm Name</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 50, paddingLeft: 5}}
      value={algorithm_name}
      onChangeText={text => setAlgorithm_name(text)}
    />
    <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10}} onPress={()=>{
      if(algorithm_name != ''){
        axios.post('http://192.168.1.24:9000/api/Algorithms/', {
          "email": signinState[0].userInfo.email,
          "Code": source_code,
          "AlgorithmName": algorithm_name,
          "parametres": algorithm_item.parametres,
          "techniques": algorithm_item.techniques
        }).then((response1) => {
          addAlgorithm(signinState[0].userInfo.email, algorithm_name, response1.data.id, source_code, algorithm_item.parametres, algorithm_item.techniques)
          toggleModal();
          setAlgorithm_name('');
          navigation.navigate('Pipeline');
        }).catch((error) => {
          console.log(error)
          alert("An error has occured.");
        });
      }
      else{
        alert("Choose a proper name.")
      }
    }
    }>
    <Text style={{color: "gray"}}>Save</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{position: 'absolute', bottom: 10, left: 10}} onPress={toggleModal}>
    <Text style={{color: "gray"}}>Close</Text>
    </TouchableOpacity>
    </View>
    </View>
    </Modal>

    <SyntaxHighlighter
  	language='python'
  	style={agate}
  	highlighter={"hljs"}
    fontSize={12}
  >
  	{code}
  </SyntaxHighlighter>


    </View>

  );
}

const styles = StyleSheet.create({
  containerStyle:{
    flex: 1,
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


export default CodeScreen;
