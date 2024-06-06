import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,
  Modal
} from 'react-native';

export default function MenuProfessional({route, navigation}){
  
  const { user } = route.params
  const userName = user.name
  const [modalVisible, setModalVisible] = useState(false)

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
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,}}>
                        <View>
                          <Text style={{marginBottom: 10, color: 'black', fontSize: 18, fontWeight: 'bold', textAlign: 'justify'}}>Tem certeza de que deseja desconectar da sua conta?</Text>
                          <Text style={{marginBottom: 10, color: 'black', fontSize: 18, textAlign: 'justify'}}>Esta ação encerrará a sessão atual e você precisará fazer login novamente para acessar sua conta.</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableHighlight style={[styles.buttonPrev, {marginBottom: 0}]} onPress={()=>{setModalVisible(!modalVisible)}}>
                              <Text style={{color: '#fff', fontSize: 15}}>Cancelar</Text>
                          </TouchableHighlight>
                          <TouchableHighlight style={[styles.buttonPrev, {backgroundColor: '#097969', marginBottom: 0}]} onPress={()=>{navigation.goBack()}}>
                              <Text style={{color: '#fff', fontSize: 15}}>Confirmar</Text>
                          </TouchableHighlight>
                        </View>
                    </View>
                </View>
          </Modal>
          <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20}}>
          <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginLeft:20, padding: 10}} onPress={()=>{setModalVisible(!modalVisible)}}>
              <Image
                source={require('./assets/logout.png')}
                style={{height: 30,
                  width: 30,
                  resizeMode: 'stretch'}}
              />
            </TouchableOpacity>
            <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"TCIMApp"}</Text>
            <View style={{backgroundColor: '#87ceeb', borderRadius: 10, marginRight:20, width: 50, height: 50}}></View>
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
              <Text style={styles.buttonText}>Perfil</Text>
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ScreenSCID", {user: user})}>
              <Image
                source={require('./assets/teste.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>SCID-TCIm</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-evenly', alignItems: 'center', marginHorizontal: 60}}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ScreenRelatorio", {user: user})}>
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
      backgroundColor: 'white',
      marginTop: 20,
      width: 110,
      height: 100,
      borderRadius: 10
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
  buttonPrev:{
    alignItems: 'center',
    justifyContent: 'center', 
    height: 40,
    width: 100, 
    backgroundColor: '#b20000',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 25
  },
  buttonTextInit: {
    color: '#000', 
    fontSize: 15, 
    fontWeight: 'bold',
    marginTop:5
  },
})