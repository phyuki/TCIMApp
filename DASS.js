import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity
} from 'react-native';
import { RadioButton } from 'react-native-paper'
import config from './config/config.json'

export default function DASS({navigation}){

    const [checked, setChecked] = useState(null)
    const [questions, setQuestions] = useState([])
    const [questionInd, setQuestionInd] = useState(0)
    const [answers, setAnswers] = useState([])
    const [textButton, setTextButton] = useState("Próximo")

    useEffect(()=> {queryDASS()}, [])
    useEffect(() => {showQuestion()}, [questionInd])

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
        setQuestions(resp)
    }

    const plusQuestion = () => {
        if(checked){
            let copy = answers.concat()
            copy[questionInd] = checked
            setAnswers(copy)
            if(questionInd == 19) setTextButton("Finalizar")
            if(questionInd == 20) navigation.navigate('RelatorioTeste', {scales: copy})
            else{
                setQuestionInd(questionInd+1)
            }
        }
    }

    const minusQuestion = () => {
        if(questionInd == 0){
            navigation.goBack()
        }
        if(checked){
            if(questionInd == 20) setTextButton("Próximo")
            setQuestionInd(questionInd-1)
        }
    }

    function showQuestion(){
        return "Q"+(questionInd+1)+ ": "+questions[questionInd]
    }

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"DASS-21"}</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"Questionário"}</Text>
          </View>
          <View style={{marginTop: 220}}>
            <View style={{backgroundColor: 'white', borderRadius: 20, marginHorizontal: 20}}>
                <View style={{marginHorizontal: 10, alignItems: 'center'}}>
                    <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>{showQuestion()}</Text>
                    <View style={{flexDirection: 'row',alignItems: 'center', marginTop: 20}}>
                        <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10}}>
                            <RadioButton
                                    value="0"
                                    status={ checked === '0' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('0')}
                                    color='#0047AB'
                            />
                            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>0</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10}}>
                            <RadioButton
                                    value="1"
                                    status={ checked === '1' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('1')}
                                    color='#0047AB'
                            />
                            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>1</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10}}>
                            <RadioButton
                                    value="2"
                                    status={ checked === '2' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('2')}
                                    color='#0047AB'
                            />
                            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>2</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10}}>
                            <RadioButton
                                    value="3"
                                    status={ checked === '3' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('3')}
                                    color='#0047AB'
                            />
                            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>3</Text>
                        </View>
                    </View>
                </View>
            </View>
                <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                    <TouchableOpacity style={styles.buttonPrev} onPress={minusQuestion}>
                        <Text style={{color: '#fff', fontSize: 15}}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNext} onPress={plusQuestion}>
                        <Text style={{color: '#fff', fontSize: 15}}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 100, 
        backgroundColor: '#097969',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 100, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30
    }
})