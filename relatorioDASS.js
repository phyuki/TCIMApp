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

export default function RelatorioPrevioDASS({route, navigation}){

    const {scores, user} = route.params
    
    const redirectToAnotherScreen = () => {
      navigation.navigate('MenuPatients', {user: user}); 
    };

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

    const depression = reportDetails(scores.depression, 9, 13, 20, 27)
    const anxiety = reportDetails(scores.anxiety, 7, 9, 14, 19)
    const stress = reportDetails(scores.stress, 14, 18, 25, 33)
    
    useEffect(() => {
      const backAction = () => {
        redirectToAnotherScreen();
        return true; 
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
      return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>DASS-21</Text>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>Relatório Final</Text>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent: 'center', marginBottom: 60}}>
                <View  style={{backgroundColor: 'white', padding: 20, borderRadius:20}}>
                    <Text style={{color: reportCaption(depression), fontSize: 22, fontWeight: 'bold'}}>{"Depressão: "+depression}</Text>
                    <Text style={{color: reportCaption(anxiety), fontSize: 22, fontWeight: 'bold'}}>{"Ansiedade: "+anxiety}</Text>
                    <Text style={{color: reportCaption(stress), fontSize: 22, fontWeight: 'bold'}}>{"Estresse: "+stress}</Text>
                </View>
                <View  style={{backgroundColor: 'white', padding: 20, borderRadius:20, marginTop: 20, marginHorizontal: 5}}>
                    <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>{"Observação"}</Text>
                    <Text style={{color: 'black', fontSize: 18, textAlign: 'justify'}}>Com a conclusão do questionário DASS-21, abra o espaço para discutir seus resultados com o profissional. 
                    Ele será responsável por te instruir a respeito da aplicação deste questionário.</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 30}}> 
                    <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.navigate('MenuPatients', {user: user})}>
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
      marginTop: 30
    },
})