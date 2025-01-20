import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
  ScrollView,
  useWindowDimensions,
  Modal,
  TouchableHighlight,
  Image
} from 'react-native';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'

export default function FinalizarSCID({route, navigation}){

    const { user, report } = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const window = useWindowDimensions()

    const showSCIDReport = () => {
        console.log(report)
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
            {report[index][0] != '1' ?
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

    const showReport = () => {
        return(
            <View style={styles.scidContainer}>
                <View style={{alignItems: 'center', marginTop: 10}}>
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
                        {showSCIDReport()}
                </ScrollView>
            </View>)
        
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,}}>
                        <Text style={{marginBottom: 10, color: 'black', fontSize: 18, textAlign: 'justify'}}>{'Esse relatório consiste em uma versão simplificada dos dados obtidos com a entrevista SCID-TCIm.'}</Text>
                        <Text style={{marginBottom: 20, color: 'black', fontSize: 18, textAlign: 'justify'}}>{'Caso queira obter a versão detalhada contendo todos os transtornos previstos, vá para a seção Relatórios no menu inicial.'}</Text>
                        <TouchableHighlight style={[styles.buttonPrev, {marginBottom: 0}]} onPress={()=>{setModalVisible(!modalVisible)}}>
                            <Text style={{color: '#fff', fontSize: 15}}>Fechar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
          <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20}}>
                <View style={{backgroundColor: '#87ceeb', borderRadius: 10, marginRight:20, width: 50, height: 50}} />
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginRight:20, padding: 10}} onPress={() => {setModalVisible(true)}}>
                <Image
                    source={require('./assets/help.png')}
                    style={{height: 30,
                    width: 30,
                    resizeMode: 'stretch'}}
                />
                </TouchableOpacity> 
            </View>
            <View style={{alignItems:'center', marginTop: 20}}>
                <Text style={{color: '#000', fontSize: 27, fontWeight: 'bold'}}>{"Relatório Simplificado"}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
                {showReport()}
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.navigate('MenuProfessional', {user: user})}>
                        <Text style={{color: '#fff', fontSize: 18}}>Voltar para o Menu Inicial</Text>
                    </TouchableOpacity>
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
      },
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
        height: 520
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
        fontWeight: 'bold'
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
})