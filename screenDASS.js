import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';

export default function ScreenDASS({route, navigation}){

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"DASS-21"}</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"Seção de Instruções"}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
                <View style={{backgroundColor: 'white', marginHorizontal: 20, borderRadius: 20}}>
                    <View style={{marginHorizontal: 20, marginVertical: 20}}>
                    <Text style={{color: '#000', fontSize: 20, textAlign:'justify'}}>Por favor, leia cuidadosamente cada uma das afirmações abaixo e marque o número apropriado que indique o quanto ela se aplicou a você
    durante a última semana</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonNext} onPress={()=>navigation.navigate('DASS')}>
                    <Text style={{color: '#fff', fontSize: 18}}>Iniciar DASS-21</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 180, 
        backgroundColor: '#097969',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 30
    },
})