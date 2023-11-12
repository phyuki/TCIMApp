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

export default function ResultadoParcialSCID({route, navigation}){

    const { user, patient, lifetime, past, disorderPrev, disorderNext } = route.params

    async function queryDiagnosis(tableName) {

        let newUrl = new URL(config.urlRootNode+'disorders'),
            params={disorder: tableName}
            Object.keys(params).forEach(key => newUrl.searchParams.append(key, params[key]))
        let reqs = await fetch(newUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const resp = await reqs.json()
        return resp
    }

    const disorderToTableName = () => {
        switch(disorderNext){
            case "Trico":
                return "Tricotilomania"
            case "Internet":
                return "Uso Indevido de Internet"
            case "AmorPatologico":
                return "Amor Patologico"
            case "CiumePatologico":
                return "Ciume Patologico"
            case "DependenciaComida":
                return "Dependencia de Comida"
            default:
                return disorderNext
        }
    }

    const disorderToButtonName = () => {
        switch(disorderNext){
            case "Clepto":
                return "Cleptomania"
            case "Jogo":
                return "Jogo Patológico"
            case "Trico":
                return "Tricotilomania"
            case "Hipersexualidade":
                return "Transtorno de Hipersexualidade"
            case "Internet":
                return "Transtorno por Uso Indevido de Internet"
            case "Escoriacao":
                return "Transtorno de Escoriação"
            case "Videogame":
                return "Transtorno do Videogame"
            case "Automutilacao":
                return "Transtorno de Automutilação"
            case "AmorPatologico":
                return "Amor Patológico"
            case "CiumePatologico":
                return "Ciúme Patológico"
            case "DependenciaComida":
                return "Dependência de Comida"
            default:
                return disorderNext
        }
    }

    async function nextDisorder(){
        const tableName = disorderToTableName()
        if(disorderNext != "Finish")
            return queryDiagnosis(tableName).then(result =>
                navigation.navigate(disorderNext, {user: user, patient: patient, questions: result}))
        else
            return navigation.navigate('FinishSCID', {user: user}) 
    }

    const convertScores = (score) => {
        if(score == '1') return 'Ausente'
        else if(score == '2') return 'Subclínico'
        else return 'Presente'
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>{"Resultado do "+disorderPrev}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 80}}>
                <View>
                    <View style={{backgroundColor: 'white', marginHorizontal: 20, marginTop: 25, borderRadius: 20}}>
                        <Text style={{color: '#000', fontSize: 20, textAlign:'justify', marginHorizontal: 20, marginVertical: 30}}>
                            {'Critério Atual: '+ convertScores(lifetime)}
                        </Text>
                        <Text style={{color: '#000', fontSize: 20, textAlign:'justify', marginHorizontal: 20, marginBottom: 30}}>
                            {'Critério Mês Passado: '+ convertScores(past)}
                        </Text>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 40}}> 
                        <TouchableOpacity style={styles.buttonNext} onPress={nextDisorder}>
                            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>{
                            disorderNext != "Finish" ? "Ir para "+disorderToButtonName()
                                                    : "Finalizar SCID-TCIm"}</Text>
                        </TouchableOpacity>
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
        padding: 10,
        backgroundColor: '#097969',
        borderRadius: 10
    },
})