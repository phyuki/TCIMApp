import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
  Image
} from 'react-native';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'
import CiumePatologico from './disorders/ciumePatologico';

export default function ResultadoParcialSCID({route, navigation}){

    const { user, patient, lifetime, past, disorderPrev, disorderNext, answers, scores, questionId } = route.params

    useEffect(() => {
        const backAction = () => {
          return true; // Impede que o botão de voltar padrão seja executado
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      
        return () => backHandler.remove();
    }, []);

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

    async function querySCIDReports() {
        let url = new URL(config.urlRootNode+'reports'),
        params={patient: patient}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  
        let reqs = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const resp = await reqs.json()
        console.log(resp)
        return resp
      }

    const disorderToTableName = () => {
        if(disorderPrev == "Amor Patológico" && disorderNext == "DependenciaComida")
            return "Ciume Patologico"
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
        if(disorderPrev == "Amor Patológico" && disorderNext == "DependenciaComida")
            return "Ciúme Patológico"
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

    async function actualReport(reports){
        const date = new Date()
        const onlyDate = date.toISOString().split('T')[0]
        const onlyReports = reports.filter(item => {
            return item[3] === onlyDate
        })
        const report = onlyReports.map(item => {
            return [item[0], item[1], item[2]];
        })
        return report
    }

    async function nextDisorder(){
        const tableName = disorderToTableName()
        console.log(scores)
        console.log(answers)
        console.log(questionId)
        if(disorderNext != "Finish"){
            if(disorderPrev == "Amor Patológico" && disorderNext == "DependenciaComida"){
                scores.push(['1', '1'])
                return navigation.navigate('ShowPartial', {user: user, patient: patient, 
                        lifetime: lifetime, past: past, disorderPrev: 'Ciúme Patológico', 
                        disorderNext: 'DependenciaComida', answers: answers, scores: scores})
            }
            else
                return queryDiagnosis(tableName).then(result =>
                    navigation.navigate(disorderNext, {user: user, patient: patient, questions: result,
                        answers: answers, scores: scores, questionId: questionId}))
        }
        else{
            const reports = await querySCIDReports()
            const report = await actualReport(reports)
            return navigation.navigate('FinishSCID', {user: user, report: report})
    
        }
    }
    const convertScores = (score) => {
        if(score == '1') return 'Ausente'
        else if(score == '2') return 'Subclínico'
        else return 'Presente'
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20}}>
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginLeft:20, padding: 10}} onPress={() => navigation.navigate("ScreenSCID", {user: user})}>
                <Image
                    source={require('./assets/logout.png')}
                    style={{height: 30,
                    width: 30,
                    resizeMode: 'stretch'}}
                />
                </TouchableOpacity>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCIDApp"}</Text>
                <View style={{backgroundColor: '#87ceeb', borderRadius: 10, marginRight:20, width: 50, height: 50}}></View>
            </View>
            <View style={{alignItems: 'center', marginTop: 20, marginHorizontal: 20}}>
                <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>{"Resultado do "+disorderPrev}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10, marginBottom: 80}}>
                <View>
                    <View style={{backgroundColor: 'white', marginHorizontal: 20, marginTop: 25, borderRadius: 20}}>
                        <Text style={{color: '#000', fontSize: 20, textAlign:'justify', marginHorizontal: 20, marginVertical: 30}}>
                            {'Critério ao longo da vida: '+ convertScores(lifetime)}
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