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

export default function Cleptomania({route, navigation}){

    const { patient, questions } = route.params
    
    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true
        }    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove()
    }, [])

    async function queryTEI() {
        let url = new URL(config.urlRootNode+'tei')

        let reqs = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const resp = await reqs.json()
        return resp
    }

    async function initClepto(){
        const teiQuestions = await queryTEI()
        return navigation.navigate('TEI', {user: user, questions: teiQuestions})
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"Seção de Instruções"}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
                <View style={{backgroundColor: 'white', marginHorizontal: 20, borderRadius: 20}}>
                    <View style={{marginHorizontal: 20, marginVertical: 20}}>
                    <Text style={{color: '#000', fontSize: 20, textAlign:'justify'}}>
                        Leia as perguntas para o entrevistado de acordo com
                        as instruções especificadas a cada seção
                    </Text>
                    <Text style={{color: '#00009c', fontSize: 16, textAlign:'justify', marginTop: 30}}>
                        As perguntas podem ter observações que não devem ser lidas para o entrevistado
                        e por tal, serão marcadas por uma fonte reduzida e a cor azul como esse aviso.
                    </Text>
                    </View>
                </View>
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