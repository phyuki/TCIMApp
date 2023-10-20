import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import { RadioButton } from 'react-native-paper'

export default function TEI({route, navigation}){

    const { user, questions } = route.params
    
    const [checked, setChecked] = useState(null)
    const [questionInd, setQuestionInd] = useState(0)
    const [answers, setAnswers] = useState([])
    const qtdQuestions = [3, 3]

    const radioButton = <>
    <View style={{flexDirection: 'row',alignItems: 'center', justifyContent:'center', marginTop: 5}}>
        <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10, marginHorizontal: 20}}>
            <RadioButton
                    value="1"
                    status={ checked === '1' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('1')}
                    color='#0047AB'
            />
            <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>1 - Não</Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10, marginHorizontal: 20}}>
            <RadioButton
                    value="3"
                    status={ checked === '3' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('3')}
                    color='#0047AB'
            />
            <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>3 - Sim</Text>
        </View>
    </View>
    </>

    const textQuestion = (questionSection) => {
        return questions[questionSection][0]+" - "+questions[questionSection][1]
    }

    const questionsBySection = <>
    <View style={{backgroundColor: 'white', borderRadius: 20, marginHorizontal: 20, marginTop: 10}}>
            <Text style={{color: '#000', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
            {radioButton}
    </View>
    <View style={{backgroundColor: 'white', borderRadius: 20, marginHorizontal: 20, marginTop: 10}}>
            <Text style={{color: '#000', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd+1)}</Text>
            {radioButton}
    </View>
    <View style={{backgroundColor: 'white', borderRadius: 20, marginHorizontal: 20, marginTop: 10}}>
            <Text style={{color: '#000', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd+2)}</Text>
            {radioButton}
    </View>
    </>

    const plusQuestion = () => {
        if(checked){
            let copy = answers.concat()
            copy[questionInd] = checked
            setAnswers(copy)
            setQuestionInd(questionInd + qtdQuestions[questionInd])
        }
    }

    const minusQuestion = () => {
        if(questionInd == 0){
            navigation.goBack()
        }
        if(checked){
            setQuestionInd(questionInd - qtdQuestions[questionInd])
        }
    }

    function showQuestion(){
        switch(questionInd+1){
            case 1:
                return questionsBySection
            case 4:
                return (
                    <>
                        <View style={{backgroundColor: 'white', borderRadius: 10, marginHorizontal: 20, marginTop: 35}}>
                                <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold', marginHorizontal: 20, marginVertical: 10, textAlign: 'justify'}}>
                                    Você já perdeu o controle ao ponto de...</Text>
                        </View>
                        {questionsBySection}
                    </>)
            default:
                console.log("Error")
        }
    }

    useEffect(() => {
        showQuestion()
        console.log(answers)}, [questionInd])
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
              <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>{"Transtorno Explosivo Intermitente (TEI)"}</Text>
          </View>
          <View style={{justifyContent: 'space-evenly'}}>
            {showQuestion()}
                <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                    <TouchableOpacity style={styles.buttonPrev} onPress={minusQuestion}>
                        <Text style={{color: '#fff', fontSize: 15}}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNext} onPress={plusQuestion}>
                        <Text style={{color: '#fff', fontSize: 15}}>Próximo</Text>
                    </TouchableOpacity>
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
        width: 100, 
        backgroundColor: '#097969',
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 30
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 100, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 30
    }
})