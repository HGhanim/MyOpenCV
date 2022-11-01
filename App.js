import React, {useState, useContext} from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PipelineScreen from './src/screens/PipelineScreen';
import { Provider as PipelineProvider } from './src/context/PipelineContext';
import { Provider as OriginalProvider } from './src/context/OriginalContext';
import { Provider as ImagesetProvider } from './src/context/ImagesetContext';
import { Provider as AlgorithmProvider } from './src/context/AlgorithmContext';
import { Provider as UserProvider } from './src/context/UserContext';
import { Provider as StatsProvider } from './src/context/StatsContext';
import { Context as UserContext} from './src/context/UserContext';
import TechniquesScreen from './src/screens/TechniquesScreen';
import TechniqueParametersScreen from './src/screens/TechniqueParametersScreen';
import CodeScreen from './src/screens/CodeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CameraScreen from './src/screens/CameraScreen';
import DatasetScreen from './src/screens/DatasetScreen';
import ApplyScreen from './src/screens/ApplyScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import GeometryScreen from './src/screens/TechniquesScreens/GeometryScreen';
import ArithLogicScreen from './src/screens/TechniquesScreens/ArithLogicScreen';
import ConvertScreen from './src/screens/TechniquesScreens/ConvertScreen';
import FilterScreen from './src/screens/TechniquesScreens/FilterScreen';
import SpatialScreen from './src/screens/TechniquesScreens/SpatialScreen';
import CreateScreen from './src/screens/TechniquesScreens/CreateScreen';
import EnhanceScreen from './src/screens/TechniquesScreens/EnhanceScreen';
import TransformsScreen from './src/screens/TechniquesScreens/TransformsScreen';
import EdgeLineScreen from './src/screens/TechniquesScreens/EdgeLineScreen';
import HistogramScreen from './src/screens/TechniquesScreens/HistogramScreen';
import MorphologicalScreen from './src/screens/TechniquesScreens/MorphologicalScreen';
import PickerScreen from './src/screens/PickerScreen';
import ViewScreen from './src/screens/ViewScreen';
import StatsScreen from './src/screens/StatsScreen';
import { FontAwesome5, FontAwesome} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();




//     options={{ headerTitle: props => <LogoTitle {...props}/>}}
const LogoTitle = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
    <Image
      style={{ width:50 , height: 45 }}
      source={require('./assets/logo.png')}
      resizeMode="contain"
    />
  </View>

  );
}

// const CodeTitle = () => {
//   return (
//
//     <Text style={{color: "white", fontWeight:"bold", fontSize: 20}}>Code</Text>
//
//   );
// }

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="View">
      <Tab.Screen name="View" component={ViewScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
}

const MainNavigator = () => {
  return(
  <Stack.Navigator initialRouteName="Pipeline"
  screenOptions={{
    headerTitleAlign:"center",
    headerStyle: {backgroundColor: '#353535'},
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>

    <Stack.Screen name="Pipeline"
     component={ PipelineScreen}
     options={{title: 'Algorithm'}}
    />

    <Stack.Screen name="Techniques"
      component={ TechniquesScreen}
      options={{ title: 'Techniques'}}
    />

    <Stack.Screen name="Camera"
     component={ CameraScreen}
     options={{headerShown: false}}
    />

    <Stack.Screen name="Parameters"
      component={ TechniqueParametersScreen}
      options={{title: 'Parameters'}}
    />

    <Stack.Screen name="Morphological"
      component={ MorphologicalScreen}
      options={{title: 'Morphological'}}
    />

    <Stack.Screen name="Histogram"
      component={ HistogramScreen}
      options={{title: 'Histogram'}}
    />

    <Stack.Screen name="Edge"
      component={ EdgeLineScreen}
      options={{title: 'Edge/Line Detection'}}
    />

    <Stack.Screen name="Transforms"
      component={ TransformsScreen}
      options={{title: 'Transforms'}}
    />

    <Stack.Screen name="Enhance"
      component={ EnhanceScreen}
      options={{title: 'Enhance'}}
    />

    <Stack.Screen name="Create"
      component={ CreateScreen}
      options={{title: 'Create'}}
    />

    <Stack.Screen name="Filter"
      component={ FilterScreen}
      options={{title: 'Filter'}}
    />

    <Stack.Screen name="Spatial"
      component={ SpatialScreen}
      options={{title: 'Spatial Filters'}}
    />

    <Stack.Screen name="Convert"
      component={ ConvertScreen}
      options={{title: 'Convert'}}
    />

    <Stack.Screen name="ArithLogic"
      component={ ArithLogicScreen}
      options={{title: 'Arith/Logic'}}
    />

    <Stack.Screen name="Geometry"
      component={ GeometryScreen}
      options={{title: 'Geometry'}}
    />


    <Stack.Screen name="Picker"
      component={PickerScreen}
      options={{headerShown: false}}
    />

    <Stack.Screen name="View"
      component={ViewScreen}
      options={{title: 'View Imageset'}}
    />

    <Stack.Screen name="Code"
         component={ CodeScreen}
         options={{ title: "Source Code", headerStyle: {backgroundColor: '#353535'}}}
    />

    <Stack.Screen name="Result"
      component={ TabNavigator}
    />
  </Stack.Navigator>
)
}


const ProfileNavigator = () => {
  return(
  <Stack.Navigator initialRouteName="Profile"
  screenOptions={{
    headerTitleAlign:"center",
    headerStyle: {backgroundColor: '#353535'},
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>
  <Stack.Screen name="Profile"
    component={ ProfileScreen}
    options={{ title: 'User Profile'}}
  />
  </Stack.Navigator>
);
}

const DatasetNavigator = () => {
  return(
  <Stack.Navigator initialRouteName="Dataset"
  screenOptions={{
    headerTitleAlign:"center",
    headerStyle: {backgroundColor: '#353535'},
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>
  <Stack.Screen name="Dataset"
    component={ DatasetScreen}
    options={{ title: 'Dataset'}}
  />
  </Stack.Navigator>
);
}

const ApplyNavigator = () => {
  return(
  <Stack.Navigator initialRouteName="Apply"
  screenOptions={{
    headerTitleAlign:"center",
    headerStyle: {backgroundColor: '#353535'},
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>
  <Stack.Screen name="Apply"
    component={ ApplyScreen}
    options={{ title: 'Apply Aglorithm'}}
  />
  </Stack.Navigator>
);
}

const FeedbackNavigator = () => {
  return(
  <Stack.Navigator initialRouteName="Feedback"
  screenOptions={{
    headerTitleAlign:"center",
    headerStyle: {backgroundColor: '#353535'},
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>
  <Stack.Screen name="Feedback"
    component={ FeedbackScreen}
    options={{ title: 'Feedback'}}
  />
  </Stack.Navigator>
);
}

const CustomDrawerContent =(props) => {
    const {state:signinState, signin, signout} = useContext(UserContext);
  return (
    <DrawerContentScrollView {...props}>
    <View
      style={{
        backgroundColor: '#353535',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
    <Image
      style={{ width:70 , height: 70 }}
      source={require('./assets/logo.png')}
      resizeMode="contain"
    />
    <Text style={{ color: 'white', fontSize: 28, marginLeft: 10, fontWeight: 'bold'}}>
      MyOpenCV
    </Text>

  </View>

    </View>
      <DrawerItemList {...props} />

      <DrawerItem
        label="Logout"
        onPress={signout}
        icon={({ focused, color, size }) => <FontAwesome5 name="sign-out-alt" size={24} color="black" />}
      />
    </DrawerContentScrollView>
  );
};


const Drawers = () => {
  return(
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Build Algorithm" component={MainNavigator}
    options={{
          title: 'Build Algorithm',
          drawerIcon: ({focused, size}) => (
            <FontAwesome5 name="layer-group" size={24} color="black" />
          ),
        }} />
    <Drawer.Screen name="User Profile" component={ProfileNavigator}
     options={{
          title: 'User Profile',
          drawerIcon: ({focused, size}) => (
            <FontAwesome5 name="user-circle" size={24} color="black" />
          ),
        }} />
    <Drawer.Screen name="Upload Dataset" component={DatasetNavigator}
    options={{
         title: 'Upload Dataset',
         drawerIcon: ({focused, size}) => (
           <FontAwesome name="cloud-upload" size={24} color="black" />
         ),
       }} />
    <Drawer.Screen name="Apply Algorithm" component={ApplyNavigator}
    options={{
         title: 'Apply Algorithm',
         drawerIcon: ({focused, size}) => (
          <FontAwesome name="play-circle-o" size={24} color="black" />
         ),
       }} />
    <Drawer.Screen name="Feedback" component={FeedbackNavigator}
    options={{
         title: 'Feedback',
         drawerIcon: ({focused, size}) => (
           <FontAwesome5 name="comment-dots" size={24} color="black" />
         ),
       }} />
    </Drawer.Navigator>
  )
}
const App = () => {

    const {state:signinState, signin, signout} = useContext(UserContext);
    //console.log(signinState);
  return (
    <NavigationContainer>
    <Stack.Navigator>
    {
      signinState[1].sigininFlag?
      (
        <Stack.Screen name="Drawers" component={Drawers} options={{headerShown: false}} />
      )
      :
      (
        <>
        <Stack.Screen name="Signin"
          component={ SigninScreen}
          options={{headerShown: false}}
          state= {signinState}
        />
        <Stack.Screen name="Signup"
          component={ SignupScreen}
          options={{headerShown: false}}
        />
        </>
      )
    }

    </Stack.Navigator>
    </NavigationContainer>
  );
}





const myApp=() =>{

  const [showRealApp, setShow] = useState(false);
  _onDone = () => {
    setShow(true);
}

_renderItem = ({ item }) => {
  return (
    <View style={styles.mainContent}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
}

const slides = [
  {
    key: 'one',
    title: 'Build Your Algorithm',
    text: 'Start building your image algorithm\nstage by stage without a previous knowledge in coding!',
    image: require('./assets/picture.png'),
  },
  {
    key: 'two',
    title: 'Upload Your Image set',
    text: 'Upload your own image set to the\nserver to start using it!',
    image: require('./assets/file-upload.png'),
  },
  {
    key: 'three',
    title: 'Apply the Algorithm',
    text: 'Apply the saved Algorithm on the saved Image set!',
    image: require('./assets/play.png'),
  },
  {
    key: 'four',
    title: 'Get Your Results',
    text: 'Save the output images and features!',
    image: require('./assets/analytics.png'),
  }
];

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#353535'
  },
  image: {
    width: 250,
    height: 250,
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 10
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold'
  }
});

  if (showRealApp) {
    console.log("app")
  return (
    <StatsProvider>
    <UserProvider>
    <AlgorithmProvider>
    <ImagesetProvider>
    <OriginalProvider>
    <PipelineProvider>
    <App />
    </PipelineProvider>
    </OriginalProvider>
    </ImagesetProvider>
    </AlgorithmProvider>
    </UserProvider>
    </StatsProvider>
  )
}
else {
  return (

    <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} showSkipButton	/>

  );
}

}

export default myApp;
