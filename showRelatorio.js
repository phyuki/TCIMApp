import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SectionList,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
  StatusBar,
  FlatList,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'
import { RadioButton } from 'react-native-paper';

export default function ExibirRelatorio({route, navigation}){

    const { user, patient, report, type } = route.params
    
    const window = useWindowDimensions()

    const showTitle = () => {
        if(type == 'DASS'){
            return(<>
            <View style={{alignItems: 'center', marginTop: 10}}>
                <Text style={styles.reportTitle}>DASS Scores</Text>
            </View>
            <View style={styles.header}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={styles.item}>Depressão</Text>
                    <Text style={styles.score}>{report[0]}</Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={styles.item}>Ansiedade</Text>
                    <Text style={styles.score}>{report[1]}</Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={styles.item}>Estresse</Text>
                    <Text style={styles.score}>{report[2]}</Text>
                </View>
            </View></>)
        }
        else{
            return(<>
                <View  style={{alignItems: 'center', marginTop: 10}}>
                    <Text>SCID-TCIm</Text>
                </View>
                <View style={styles.header}>
                    <Text>Transtorno do Controle de Impulsos</Text>
                    <Text>Prevalência durante a vida</Text>
                    <Text>Preencheu critério diagnóstico mês passado</Text>
                </View></>)
        }
    }

    const showReport = () => {
        if(type == 'DASS'){
            
        }
        else{

        }
    }
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>SCIDApp</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>Relatórios</Text>
              <Text style={{color: '#000', marginTop: 40, fontSize: 22, fontWeight: 'bold'}}>{'Paciente: '+patient}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
            <ScrollView contentContainerStyle={[styles.container,{width: window.width}]}>
                {showTitle()}
                <ScrollView vertical>
                    {showReport()}
                </ScrollView>
            </ScrollView>
            </View>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.goBack()}>
                    <Text style={{color: '#fff', fontSize: 18}}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        height: 450,
        borderWidth: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    reportTitle:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    score:{
        color: '#b20000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
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
        width: 120, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginTop: 40
    },
})