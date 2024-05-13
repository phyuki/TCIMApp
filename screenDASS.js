import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler
} from 'react-native';
import config from './config/config.json'

export default function TelaDASS({route, navigation}){

    const { user } = route.params

    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true
        }    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove()
      }, [])

      async function queryDASS() {
        let url = new URL(config.urlRootNode+'dass')

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

    async function initDASS() {
        const dass = await queryDASS()
        const questions = dass.map(item => item.question)
        const questionsId = dass.map(item => item.id)
        return navigation.navigate('DASS', {user: user, questions: questions, questionsId: questionsId})
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
                <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20}}>
                    <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginLeft:20, padding: 10}} onPress={() => navigation.goBack()}>
                    <Image
                        source={require('./assets/back.png')}
                        style={{height: 25,
                        width: 25,
                        resizeMode: 'stretch'}}
                    />
                    </TouchableOpacity>
                    <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"TCIMApp"}</Text>
                    <View style={{backgroundColor: '#87ceeb', borderRadius: 10, marginRight:20, width: 45, height: 45}}></View>
                </View>
                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 40}}>
                    <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{'Seção de Instruções'}</Text>
                </View>         
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50}}>
                <View style={{backgroundColor: 'white', marginHorizontal: 20, borderRadius: 20}}>
                    <View style={{marginHorizontal: 20, marginVertical: 20}}>
                    <Text style={{color: '#000', fontSize: 20, textAlign:'justify', marginBottom: 10}}>
                        O questionário DASS-21 é constituído por 21 questões com respostas númericas que variam de 0 a 4
                        de acordo com o grau de intensidade identificado pelo paciente.
                    </Text>
                    <Text style={{color: '#000', fontSize: 20, textAlign:'justify'}}>
                        Por favor, leia cuidadosamente cada uma das afirmações e
                        marque o número apropriado que indique o quanto ela se aplicou a você
                        durante a última semana.</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonNext} onPress={initDASS}>
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