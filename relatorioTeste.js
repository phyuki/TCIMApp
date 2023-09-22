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
    console.log(scales)
    const intScales = scales.map(x => parseInt(x))
    const scaleDepression = intScales[2]+intScales[4]+intScales[9]+intScales[12]+intScales[15]+intScales[16]+intScales[20]
    const scaleAnxiety = intScales[1]+intScales[3]+intScales[6]+intScales[8]+intScales[14]+intScales[18]+intScales[19]
    const scaleStress = intScales[0]+intScales[5]+intScales[7]+intScales[10]+intScales[11]+intScales[13]+intScales[17]

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>DASS-21</Text>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>Relatório Final</Text>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent: 'center', marginBottom: 60}}>
                <View  style={{backgroundColor: 'white', padding: 20, borderRadius:20}}>
                    <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Depressão: "+(scaleDepression)}</Text>
                    <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Ansiedade: "+(scaleAnxiety)}</Text>
                    <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>{"Estresse: "+(scaleStress)}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}