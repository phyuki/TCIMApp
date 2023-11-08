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
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'

export default function FinalizarSCID({route, navigation}){

    const { user } = route.params

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
            </View>
            <View style={{alignItems:'center', marginTop: 20}}>
                <Text style={{color: '#000', fontSize: 27, fontWeight: 'bold'}}>{"Conclusão do SCID-TCIm"}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 80}}>
                <View>
                    <View style={{backgroundColor: 'white', marginHorizontal: 20, marginTop: 25, borderRadius: 20}}>
                        <Text style={{color: '#000', fontSize: 20, textAlign:'justify', marginHorizontal: 20, marginVertical: 20}}>
                            Os resultados referentes à aplicação da entrevista SCID-TCIm foram salvos com sucesso e podem ser acessados
                            a partir da seção "Relatórios" no Menu Inicial.
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}> 
                        <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.navigate('MenuProfessional', {user: user})}>
                            <Text style={{color: '#fff', fontSize: 18}}>Voltar para o Menu Inicial</Text>
                        </TouchableOpacity>
                    </View>
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