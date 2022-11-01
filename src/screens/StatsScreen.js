import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, ImageBackground, FlatList, SafeAreaView} from 'react-native';
import { Context as UserContext} from '../context/UserContext';4
import { FontAwesome5, FontAwesome} from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Context as ImagesetContext} from '../context/ImagesetContext';
import { Context as AlgorithmContext} from '../context/AlgorithmContext';
import { Context as StatsContext} from '../context/StatsContext';
import StatsCard from '../components/StatsCard';
import axios from 'axios'
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { downloadToFolder } from 'expo-file-dl';

const StatsScreen = ({navigation, route}) => {
  const {state:signinState, signin, signout, signup } = useContext(UserContext);
  const {state:stats, editStats } = useContext(StatsContext);
  console.log("ROUTE");
  console.log(route);
  //console.log(navigation.getParam('imageset'))
  //const {stats} = route.params;
  //console.log("STATS");
  //console.log(stats);
  const downloadCSV = async() =>{
    const data = [["Image ID","Blue Band MEAN","Blue Band STD","Blue Band SKEW","Blue Band ENTROPY",
"Green Band MEAN","Green Band STD","Green Band SKEW","Green Band ENTROPY",
"Red Band MEAN","Red Band STD","Red Band SKEW","Red Band ENTROPY"]];

for (let i = 0; i < stats.length; i += 1) {
    data.push(["Result"+i,
    stats[i].stats.mean0, stats[i].stats.std0,stats[i].stats.skew0,stats[i].stats.entropy0,
    stats[i].stats.mean1, stats[i].stats.std1,stats[i].stats.skew1,stats[i].stats.entropy1,
    stats[i].stats.mean2, stats[i].stats.std2,stats[i].stats.skew2,stats[i].stats.entropy2]
    );
}

var ws = XLSX.utils.json_to_sheet(data);
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Stats");
const wbout = XLSX.write(wb, {
type: 'base64',
bookType: "xlsx"
});
const uri = FileSystem.cacheDirectory + 'Stats.csv';
console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);

await FileSystem.writeAsStringAsync(uri, wbout, {
encoding: FileSystem.EncodingType.Base64
});

await Sharing.shareAsync(uri, {
mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
dialogTitle: 'MyWater data',
UTI: 'com.microsoft.excel.csv'
});
  }


  const renderHeader = () => {
    const user = signinState[0].userInfo;
     return (
       <View style={{flexDirection: 'row'}}>
       <View style={{marginLeft: 7, marginTop: 5}}>
       <TouchableOpacity onPress={() =>{
         //console.log(stats)
       downloadCSV();

       }}>

       <FontAwesome5 name="file-csv" size={50} color="gray" />
       </TouchableOpacity>
       </View>

       <View style={{marginLeft: 30, marginTop: 5}}>
       <TouchableOpacity onPress={async () => {
         var i;
         for(i = 0; i < stats.length; i++){
           const uri = stats[i].uri;
           const filename = stats[i].name+".jpg";
           const folder = "Flowers Histograms";
           const channelId = "0";
           await downloadToFolder(uri, filename, folder, channelId);
         }
         console.log("DONE");
         alert("Histgram images have been downloaded successfully to Flowers Histograms");
         }}>

       <FontAwesome5 name="chart-line" size={50} color="red" />
       </TouchableOpacity>
       </View>

       </View>
     )
   }
  return(
    <View style={{flex: 1}}>

    <FlatList
    data={stats}
    keyExtractor = {item => item.name}
    renderItem={({item}) =>{
      return(
        <StatsCard uri={item.uri} name={item.name} stats={item.stats}/>
      )
    }}
    ListHeaderComponent={renderHeader}
/>
</View>

  )

}

const styles = StyleSheet.create({});

export default StatsScreen;
