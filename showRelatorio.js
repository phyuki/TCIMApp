import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'
import { RadioButton } from 'react-native-paper';

export default function ExibirRelatorio({route, navigation}){

    const { user, patient, report, type } = route.params
    
    const window = useWindowDimensions()

    const [simple, setSimple] = useState(true)

    const reportDetails = (score, normal, mild, moderate, severe) => {
        let text = ''
        score = parseInt(score)
        if(score <= normal) text = "Normal"
        else if(score <= mild) text = "Leve"
        else if(score <= moderate) text = "Moderado"
        else if(score <= severe) text = "Grave"
        else text = "Extremamente Grave"
        return text
    }

    const reportCaption = (score) => {
        if(score == "Normal" || score == "Leve") return '#009000'
        else if(score == "Moderado") return '#e6c619'
        else return '#b81414'
    }

    const showWarning = (disorder) => {
        return disorder.map((item, index) => 
            {
            let disorderName = ''
            if(index == 0) disorderName = "Depressão"
            else if(index == 1) disorderName = "Ansiedade"
            else disorderName = "Estresse"
            return (disorder[index] == "Grave" || disorder[index] == "Extremamente Grave" ? 
                <View key={index} >
                    <Text style={{color: '#b81414', marginBottom: 10, fontSize: 18, fontWeight: 'bold'}}>
                        {disorderName+": "+item}</Text>
                </View> : null
        )})
    }

    const showSCIDReport = (simple) => {
        const disorders = ["Transtorno Explosivo Intermitente", "Cleptomania", "Piromania", 
            "Jogo Patológico", "Tricotilomania", "Oniomania", "Transtorno de Hipersexualidade",
            "Transtorno por Uso Indevido de Internet", "Transtorno de Escoriação",
            "Transtorno do Videogame", "Transtorno de Automutilação", "Amor Patológico",
            "Ciúme Patológico", "Dependência de Comida"]
        return report.map((item, index) => 
            {
            let lifetime = ['Clínico', '#b81414']
            if(report[index][0] != '3')
                lifetime = report[index][0] == '1' ? ['Ausente', '#00a8cc'] : ['Subclínico', '#800080']
            const past = report[index][1] == '1' ? ['Ausente', '#00a8cc'] : ['Clínico', '#b81414'] 
           
            return (<>
            {simple && report[index][0] != '1' || !simple ? 
            <View key={index} style={[styles.scidHeader, {alignItems: 'stretch'}]}>
                <View style={[styles.scidItems]}>
                    <Text style={[styles.textSCID, {textAlign: 'center'}]}>{disorders[index]}</Text>
                </View>
                <View style={[styles.scidItems, {justifyContent: 'center'}]}>
                    <Text style={[styles.textSCID, {color: lifetime[1]}]}>{lifetime[0]}</Text>
                </View>
                <View style={[styles.scidItems, {justifyContent: 'center', borderRightWidth: 0}]}>
                    <Text style={[styles.textSCID, {color: past[1]}]}>{past[0]}</Text>
                </View>
            </View> : null}
            </>
        )})
    }

    const changeReport = () => {
        setSimple(!simple)
    }

    const showReport = () => {

        console.log(report)
        const scoreA = report[0], scoreD = report[1], scoreE = report[2]
        const depression = reportDetails(scoreD, 9, 13, 20, 27)
        const anxiety = reportDetails(scoreA, 7, 9, 14, 19)
        const stress = reportDetails(scoreE, 14, 18, 25, 33)

        const colorDepression = reportCaption(depression)
        const colorAnxiety = reportCaption(anxiety)
        const colorStress = reportCaption(stress)

        const disorder = [depression, anxiety, stress]

        if(type == 'DASS'){
            return(
            <View style={styles.dassContainer}>
                <View style={{alignItems: 'center', marginTop: 10}}>
                    <Text style={styles.reportTitle}>DASS Scores</Text>
                </View>
            <View style={styles.header}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={styles.item}>Depressão</Text>
                    <Text style={[styles.score, {color: colorDepression, fontSize: 20}]}>{report[1]}</Text>
                    <Text style={[styles.score, {color: colorDepression, marginBottom: 20}]}>{depression}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={styles.item}>Ansiedade</Text>
                    <Text style={[styles.score, {color: colorAnxiety, fontSize: 20}]}>{report[0]}</Text>
                    <Text style={[styles.score, {color: colorAnxiety, marginBottom: 20}]}>{anxiety}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={styles.item}>Estresse</Text>
                    <Text style={[styles.score, {color: colorStress, fontSize: 20}]}>{report[2]}</Text>
                    <Text style={[styles.score, {color: colorStress, marginBottom: 20}]}>{stress}</Text>
                </View>
            </View>
            {disorder.includes("Grave") || disorder.includes("Extremamente Grave") ?
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.reportWarning}>Atenção</Text>
                </View>: null}
            <View style={{alignItems: 'flex-start'}}>
                {showWarning(disorder)}
            </View>
            </View>)
        }
        else{
            return(
            <>
            <View style={styles.scidContainer}>
                <View style={{alignItems: 'center', marginTop: 10, marginBottom: -10}}>
                    <Text style={styles.reportTitle}>SCID-TCIm</Text>
                </View>
                <View style={[styles.scidHeader, {alignItems: 'stretch', borderTopWidth: 1, marginTop: 20}]}>
                    <View style={styles.scidItems}>
                        <Text style={[styles.titleSCID, {textAlign: 'center'}]}>Transtorno do Controle de Impulsos</Text>
                    </View>
                    <View style={styles.scidItems}>
                        <Text style={[styles.titleSCID, {textAlign: 'center'}]}>Prevalência ao longo da vida</Text>
                    </View>
                    <View style={[styles.scidItems, {borderRightWidth: 0}]}>
                        <Text style={styles.titleSCID}>Mês Passado</Text>
                    </View>
                </View>
                <ScrollView style={{width:window.width}}>
                        {showSCIDReport(simple)}
                </ScrollView>
            </View>
            </>)
        }
    }
    
    const showTitle = () => {
        if(type == 'SCID') return !simple ? 'Relatório SCID Detalhado' : 'Relatório SCID Simplificado'
        else return 'Relatório DASS' 
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold', marginBottom: 25}}>TCIMApp</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{showTitle()}</Text>
              <Text style={{color: '#000', marginTop: 25, fontSize: 22, fontWeight: 'bold'}}>{'Paciente: '+patient}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
                {showReport()}
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    {type == 'SCID' ?
                    <TouchableOpacity style={styles.buttonReport} onPress={changeReport}>
                        <Text style={{color: '#fff', fontSize: 18}}>{simple ? 'Detalhar' : 'Simplificar'}</Text>
                    </TouchableOpacity> : null}
                    <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.goBack()}>
                        <Text style={{color: '#fff', fontSize: 18}}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dassContainer: {
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        alignItems: 'center'
    },
    scidContainer: {
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        height: 450
    },
    scidHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
        
    },
    scidItems: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingVertical: 5
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginTop: 20
    },
    reportWarning:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    reportTitle:{
        color: 'black',
        fontSize: 23,
        fontWeight: 'bold',
    },
    score:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    titleSCID: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textSCID: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    item: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    titleItem: {
        fontSize: 20,
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        paddingHorizontal: 35, 
        backgroundColor: '#b20000',
        borderRadius: 10,
    },
    buttonReport:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        paddingHorizontal: 30, 
        backgroundColor: '#000080',
        borderRadius: 10,
        marginRight: 40
    },
})