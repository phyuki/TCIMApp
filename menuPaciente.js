import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';

export default function MenuPaciente({route, navigation}){
  
  const { user } = route.params
  const userName = user.name

  return(
    <SafeAreaView style={{flex:1, backgroundColor: '#87ceeb'}}>
          <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCIDApp"}</Text>
          </View>
        
          
          <View style={{marginTop: 100, alignItems: 'center', marginBottom: 100}}>
            <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>{"Seja bem vindo, "+userName}</Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-evenly', alignItems: 'center', marginTop: 60}}>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PatientProfile", {user: user})}>
              <Image
                source={require('./assets/paciente.png')}
                style={{height: 40,
                  width: 40,
                  resizeMode: 'stretch'}}
              />
              <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ScreenDASS", {user: user})}>
              <Image
                source={require('./assets/teste.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>DASS-21</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button}>
              <Image
                source={require('./assets/ajuda.png')}
                style={{height: 40,
                  width: 40,
                  resizeMode: 'stretch'}}
              />
              <Text style={styles.buttonText}>Info</Text>
            </TouchableOpacity>
          </View>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#084d6e',
      marginTop: 20,
      width: 110,
      height: 100
  },
  buttonIcon: {
    height: 40,
    width: 30,
    resizeMode: 'stretch',
  },
  buttonText: {
    color: '#000', 
    fontSize: 15, 
    fontWeight: 'bold', 
    margin: 10
  },
  buttonTextInit: {
    color: '#000', 
    fontSize: 15, 
    fontWeight: 'bold',
    marginTop:5
  },
})