import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-paper';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'
import { TextInputMask } from 'react-native-masked-text'

export default function Info({route, navigation}){

    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#87ceeb'}}>
            
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
                <View style={{backgroundColor: '#87ceeb', borderRadius: 10, marginRight:20, width: 50, height: 50}}></View>
            </View>
            <View style={{alignItems:'center', justifyContent: 'center', marginTop: 30}}>
                <Text style={{color: '#000', fontSize: 28, fontWeight: 'bold'}}>{'Guia de Uso'}</Text>
            </View>
            <View style={styles.scrollView}>
                <ScrollView 
                    style={{marginVertical: 20}} 
                    contentContainerStyle={styles.contentContainer} 
                    showsVerticalScrollIndicator={true}
                >
                    <Text style={[styles.section, {marginTop: 0}]}>{"Abaixo, pode-se encontrar uma explicação sucinta sobre cada função prevista durante o uso do TCIMApp."}</Text>
                    <Text style={styles.section}>{"1.   Gerenciamento do perfil"}</Text>
                    <Text textBreakStrategy={'simple'} style={styles.paragraph}>{"A seção 'Perfil' é responsável pela atualização dos dados do profissional cadastrado no aplicativo."}</Text>
                    <Text style={styles.section}>{"2.   Gestão dos pacientes"}</Text>
                    <Text textBreakStrategy={'simple'} style={styles.paragraph}>{"As seções 'Cadastrar Paciente' e 'Atualizar Paciente' são designadas para as funções de armazenamento e gerenciamento dos dados dos pacientes."}</Text>
                    <Text style={styles.section}>{"3.   Execução do SCID-TCIm"}</Text>
                    <Text textBreakStrategy={'simple'} style={styles.paragraph}>{"A seção 'SCID-TCIm' é responsável pela execução do questionário SCID para Transtornos do Controle de Impulsos."}</Text>
                    <Text textBreakStrategy={'simple'} style={styles.paragraph}>{"Para mais informações sobre como executar o SCID-TCIm, a seção possui uma introdução com as relevantes instruções antes da realização do questionário."}</Text>
                    <Text textBreakStrategy={'simple'} style={styles.section}>{"4.    Relatórios dos pacientes"}</Text>
                    <Text textBreakStrategy={'simple'} style={styles.paragraph}>{"A seção 'Relatórios' contém os resultados de um paciente quanto à aplicação do DASS ou do SCID-TCIm."}</Text>
                    <Text textBreakStrategy={'simple'} style={styles.paragraph}>{"Os relatórios referentes à aplicação do questionário DASS são separados por data de aplicação, enquanto os relatórios produzidos pelo SCID-TCIm são isolados por transtorno avaliado."}</Text>
                </ScrollView>
            </View>  
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    section:{
        color: 'black',
        fontWeight: '700',
        marginTop: 20,
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'justify',
    },
    paragraph: {
        color: 'black',
        fontWeight: '400',
        marginTop: 20,
        fontSize: 18,
        lineHeight: 24,
        paddingHorizontal: 15,
        textAlign: 'justify',
    },
    scrollView: {
        flexShrink: 1,
        backgroundColor: 'white', 
        marginHorizontal: 20, 
        marginTop: 40, 
        marginBottom: 55, 
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 4,
        padding:10,
        paddingHorizontal: 20
    },
    contentContainer: {
        paddingBottom: 20,
    },
})