import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native';

export default function MenuProfessional({route, navigation}){
  
  const { user } = route.params
  console.log(user)
  const userName = user.name

  useEffect(() => {
    const backAction = () => {
        BackHandler.exitApp()
      return true; 
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove()
  }, [])

  return(
    <SafeAreaView style={{flex:1, backgroundColor: '#87ceeb'}}>
          <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCIDApp"}</Text>
          </View>
        
          
          <View style={{marginTop: 100, alignItems: 'center', marginBottom: 100}}>
            <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>{"Seja bem vindo, "+userName}</Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-evenly', alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProfessionalProfile", {user: user})}>
              <Image
                source={require('./assets/person.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonTextInit}>Profissional Saúde Mental</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Patients", {user: user})}>
              <Image
                source={require('./assets/paciente.png')}
                style={{height: 40,
                  width: 40,
                  resizeMode: 'stretch'}}
              />
              <Text style={styles.buttonText}>Pacientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require('./assets/teste.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>SCID-TCIm</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-evenly', alignItems: 'center', marginHorizontal: 60}}>
          <TouchableOpacity style={styles.button}>
              <Image
                source={require('./assets/relatorio.png')}
                style={{height: 40,
                  width: 40,
                  resizeMode: 'stretch'}}
              />
              <Text style={styles.buttonText}>Relatórios</Text>
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