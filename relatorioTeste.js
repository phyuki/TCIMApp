import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';

export default function RelatorioTeste({route, navigation}){

    const {scales} = route.params

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
                <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>Relatório Final</Text>
                <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}> Questionário DASS-21</Text>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent: 'center', marginBottom: 20}}>
                <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Depressão: "+scales[2]}</Text>
                <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Ansiedade: "+scales[1]}</Text>
                <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Estresse: "+scales[0]}</Text>
            </View>
        </SafeAreaView>
    )
}