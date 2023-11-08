import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler
} from 'react-native';

export default function RelatorioPrevioDASS({route, navigation}){

    const {scoreA, scoreD, scoreE, user} = route.params
    
    const redirectToAnotherScreen = () => {
      navigation.navigate('MenuPatients', {user: user}); 
    };
    
    useEffect(() => {
      const backAction = () => {
        redirectToAnotherScreen();
        return true; // Impede que o botão de voltar padrão seja executado
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
      return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>DASS-21</Text>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>Relatório Final</Text>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent: 'center', marginBottom: 60}}>
                <View  style={{backgroundColor: 'white', padding: 20, borderRadius:20}}>
                    <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Depressão: "+scoreD}</Text>
                    <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Ansiedade: "+scoreA}</Text>
                    <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Estresse: "+scoreE}</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 30}}> 
                    <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.navigate('MenuPatients', {user: user})}>
                      <Text style={{color: '#fff', fontSize: 18}}>Voltar para o Menu Inicial</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  buttonPrev:{
      alignItems: 'center',
      justifyContent: 'center', 
      height: 40,
      width: 250, 
      backgroundColor: '#b20000',
      borderRadius: 10,
      marginTop: 30
    },
})