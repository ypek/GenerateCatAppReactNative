import { NavigationContainer, NavigationRouteContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import axios from 'axios';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{title:'Home'}}/>
      <Stack.Screen name="Cat" component={CatScreen} options={{}}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles:StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
};

interface CatParams{
  id: string
  url: string
  width: number
  height: number
}

async function GenerateCat(): Promise<CatParams>{
  const generate = await axios.get<Array<CatParams>>('https://api.thecatapi.com/v1/images/search')
  const catresponse = generate.data
  console.log(catresponse)
  return catresponse[0]
}

function HomeScreen({navigation}:any){
  return(
    <View style={styles}>
    <Button title="Gerar Meow" onPress={async ()=> {
      const Cat = await GenerateCat()
      navigation.navigate('Cat', Cat)}
    }
    />
    </View>
  )
}

function CatScreen({navigation, route}:any){
  return(
    <View>
      <Button title="Gerar Outro Meow" onPress={async () => {
        const Cat = await GenerateCat()
        navigation.setParams(Cat)
      }}/>
      <Image style={{objectFit:'cover'}} source={{uri:route.params.url, width:route.params.width, height: route.params.height}}/>
    </View>
  )
}


