import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';

export default function MenuPrincipal(){
  
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb', justifyContent: 'space-evenly'}}>
        <View style={{alignItems: 'center'}}>
          <Image 
            style={{width: 150, height: 150}}
            source={require('./logo.png')}/>
            <Text style={{color: '#000', fontSize: 20}}>SCIDApp</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: 'bold'}}>Cadastrar Paciente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: 'bold'}}>SCID-TCIm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: 'bold'}}>DASS-21</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: 'bold'}}>Relatório de Pacientes</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button:{
      alignItems: 'center',
      justifyContent: 'center', 
      height: 40,
      width: 150, 
      backgroundColor: '#084d6e',
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 30
  }
})