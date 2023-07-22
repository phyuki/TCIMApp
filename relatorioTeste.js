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
    const intScales = scales.map(x => parseInt(x))

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>DASS-21</Text>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>Relatório Final</Text>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent: 'center', marginBottom: 60}}>
                <View  style={{backgroundColor: 'white', padding: 20, borderRadius:20}}>
                    <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Depressão: "+(intScales[2]+intScales[4])}</Text>
                    <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Ansiedade: "+(intScales[1]+intScales[3])}</Text>
                    <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Estresse: "+(intScales[0]+intScales[5])}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}