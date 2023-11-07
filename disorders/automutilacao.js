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
import config from '../config/config.json'
import RadioButton3Items from '../radiobutton3Items';
import { RadioButton } from 'react-native-paper';
import RadioButtonHorizontal from '../radiobutton';

export default function Automutilacao({route, navigation}){

    const { patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const qtdQuestions = [4, 3, 1, 1, 3, 3, 1, 1, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1]

    const textQuestion = (index) => {
      return questions[index][1]+" - "+questions[index][2]
    }

    const question2Choices = (questionInd) => {
      return(
        <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
            <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
              setChecked={setChecked}/>
        </View>)
    }

    const question3Choices = () => {
      return (
      <View style={styles.containerQuestion}>
        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
        <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
           options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
      </View>
      )
    }

    const questionK197 = () => {
      return(<>
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>Os machucados que você causou foram consequência de...</Text>
          <View style={{marginBottom: 10}}/>
        </View>
        <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
            <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
              setChecked={setChecked}/>
              <Text style={styles.textObs}>{'Obs.: Não, ou apenas a minoria deles'}</Text>
            <Text style={styles.textObs}>{'Obs.: Sim, a maioria deles'}</Text>
        </View> 
        </>)
    }

    const questionK199 = (disorders) => {
      return (<>
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>
          Todas as vezes que você se machucou, você estava com alguma doença ou problema que fazia com que você se ferisse? Como por exemplo...</Text>
          <View style={{marginBottom: 10}}/>
        </View>
        <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
            <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
              setChecked={setChecked}/>
            <Text style={styles.textObs}>{'Obs.: Sim = Atenção para '+disorders[0]}</Text>
        </View>
        <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
            <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+1} 
              setChecked={setChecked}/>
            <Text style={styles.textObs}>{'Obs.: Sim = Atenção para '+disorders[1]}</Text>
        </View> 
      </>)
    }

    function showQuestion(){
      switch(questionInd+1){
        case 1:
          return (<>
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>
              Alguma vez na vida, você já se machucou de propósito? Se sim, o que você fez?</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            {question2Choices(questionInd+2)}
            {question2Choices(questionInd+3)}
          </>)
        case 5:
          return (<>
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>
              Alguma vez na vida, você já se machucou de propósito? Se sim, o que você fez?</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            {checked[questionInd+1] == '3' ?
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd+2)}</Text>
                <TextInput style={styles.input}
                    onChangeText={value => {
                    setChecked(() => {
                      const newArr = checked.concat()
                      newArr[questionInd+2] = value
                      return newArr
                    })}}
                    value={checked[questionInd+2]}
                    placeholder='Especificar'
                    placeholderTextColor='gray'/>
              </View> : null}
          </>)
        case 8:
          return question2Choices(questionInd)
        case 9:
          return (
            <View style={styles.containerQuestion}>
              <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
              <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                options={['Sim', 'Talvez', 'Não']} checked={checked} setChecked={setChecked}/>
              <Text style={styles.textObs}>{'Observação: Outras tentativas de suicídio podem ter ocorrido, mas não envolveram autolesão'}</Text>
              <Text style={styles.textObs}>{'Aviso: Sim = Atenção para Tentativa de Suicídio'}</Text>
            </View> )
        case 10:
          return (<>
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>Por que você fez isso?</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            {question2Choices(questionInd+2)}
          </>)
        case 13:
          return (<>
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>
              Normalmente, acontecia alguma coisa um pouco antes de você tentar se machucar? Por exemplo:</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            {question2Choices(questionInd+2)}
          </>)
        case 16:
        case 17:
        case 18:
          return questionK197()
        case 19:
          return (<>
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>
              Quanto o comportamento de se machucar prejudica a sua vida?</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            {question2Choices(questionInd+2)}
          </>)
        case 22:
          return questionK199(['Síndrome psicótica', 'Delirium'])
        case 24:
          return questionK199(['Intoxicação exógena', 'Tricotilomania ou Escoriação'])
        case 26:
        case 27:
          return (
            <View style={styles.containerQuestion}>
              <Text style={styles.textObs}>Averiguação</Text>
              <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
                setChecked={setChecked}/>
            </View>)
        case 28:
          return question2Choices(questionInd)
        case 29:
          return (<>
            <View style={styles.containerQuestion}>
              <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#00009c'} questionInd={questionInd} 
                  options={['1 - Leve', '2 - Moderado', '3 - Grave']} checked={checked} setChecked={setChecked}/>
                <View style={{marginTop: 10}}/>
                <Text style={styles.textObs}>
                  1 - Poucos (se alguns) sintomas excedendo aqueles necessários para o diagnóstico presente, e os sintomas resultam em não mais do que um 
                  comprometimento menor seja social ou no desempenho ocupacional.</Text>
                <Text style={styles.textObs}>
                  2 - Sintomas ou comprometimento funcional entre “leve” e “grave” estão presentes.</Text>
                <Text style={styles.textObs}>
                  3 - Vários sintomas excedendo aqueles necessários para o diagnóstico, ou vários sintomas particularmente graves estão presentes, 
                  ou os sintomas resultam em comprometimento social ou ocupacional notável.</Text>
                <View style={{marginBottom: 10}}/>
            </View>
          </>)
        case 30:
          return(<>
            <View style={styles.containerQuestion}>
              <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
              <RadioButton3Items direction={'column'} color={'#00009c'} questionInd={questionInd} 
                options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
              <View style={{marginBottom: 10}}/>
            </View>
          </>)
        case 31:
          return(
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <TextInput style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholderTextColor='grey'/>
            </View>)
        case 32:
          return(
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <TextInput style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholderTextColor='grey'/>
              <Text style={styles.textObs}>Observação: codificar 99 se desconhecida</Text>
            </View>)
          default:
            console.log("Error")
      }
    }

    async function registerDiagnosis(lifetime, past) {

      let reqs = await fetch(config.urlRootNode+'reports', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              lifetime: lifetime,
              past: past,
              disorder: 'Automutilacao',
              patientId: patient
          })
      })
      let resp = await reqs.json()
      return resp
    }

    async function registerAnswers() {

      let questionId = questions.map((array) => array[0])
      
      let reqs = await fetch(config.urlRootNode+'answers', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            disorder: 'Automutilacao',
            answers: checked,
            patientId: patient,
            questionId: questionId
          })
      })
      let resp = await reqs.json()
      return resp
    }

    async function queryAmorPatologico() {

      let newUrl = new URL(config.urlRootNode+'disorders'),
          params={disorder: 'Amor Patologico'}
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

    async function saveDiagnosis(lifetime, past){
      const questions = await queryAmorPatologico()
      const answers = await registerAnswers()
      registerDiagnosis(lifetime, past).then(
          navigation.navigate('AmorPatologico', {patient: patient, questions: questions}))
    }

    async function saveAnswers(){
      const questions = await queryAmorPatologico()
      registerAnswers().then(
        navigation.navigate('AmorPatologico', {patient: patient, questions: questions}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToAmorPatologico = false, nextToK203 = false, nextToK204 = false, nextToK205 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if(questionInd == 4 && checked[5] == '1') success = true
      if((questionInd == 30 || questionInd == 31) && input) success = true

      if(success){

        if(questionInd == 4 && checked[0] == '1' && checked[1] == '1' && checked[2] == '1' && 
            checked[3] == '1' && checked[4] == '1' && checked[5] == '1'){
          goToAmorPatologico = true
          saveDiagnosis('1', '1')
        }

        if(questionInd == 8 && (checked[7] == '1' || checked[8] == '1')){
          goToAmorPatologico = true
          saveDiagnosis('1', '1')
        }

        if(questionInd == 9 && checked[9] == '1' && checked[10] == '1' && checked[11] == '1'){
          nextToK204 = true
          registerDiagnosis('2', '1')
        }

        if(questionInd == 12 && checked[12] == '1' && checked[13] == '1' && checked[14] == '1'){
          nextToK204 = true
          registerDiagnosis('2', '1')
        }

        if(questionInd == 17 && (checked[15] == '3' || checked[16] == '3' || checked[17] == '3')){
          nextToK204 = true
          registerDiagnosis('2', '1')
        }

        if(questionInd == 18 && checked[18] == '1' && checked[19] == '1' && checked[20] == '1'){
          nextToK204 = true
          registerDiagnosis('2', '1')
        }

        if(questionInd == 26 && (checked[21] == '3' || checked[22] == '3' || checked[23] == '3' ||
            checked[24] == '3' || checked[25] == '3' || checked[26] == '3')){
          nextToK204 = true
          registerDiagnosis('2', '1')
        }

        if(questionInd == 27){
          if(checked[27] == '1'){
            nextToK203 = true
            registerDiagnosis('3', '1')
          }
          else
            registerDiagnosis('3', '3')
        }

        if(questionInd == 28){
          nextToK205 = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[28] = checked[28]
              newArr[29] = null
              newArr[30] = '0'
              return newArr
          })
        }

        if(questionInd == 30){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[30] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 31){
          goToAmorPatologico = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[31] = input
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToAmorPatologico && !nextToK203 && !nextToK204 && !nextToK205){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK203){
          setQuestionInd(29)
          setNextInd(16)
        }
        else if(nextToK204){
          setQuestionInd(30)
          setNextInd(17)
        }
        else if(nextToK205){
          setQuestionInd(31)
          setNextInd(18)
        }
        else if(questionInd == 31) setFinish(true)
      }
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 31 && finish) saveAnswers()
    }, [checked])

    const minusQuestion = () => {
      if(questionInd == 0){
          navigation.goBack()
      }
      if(checked){
          setQuestionInd(questionInd - qtdQuestions[nextInd-1])
          setNextInd(nextInd-1)
      }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
              <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd < 27 ? "Transtorno de Automutilação" : "Cronologia do Transtorno de Automutilação"}</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
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
        borderRadius: 10
    },
    buttonPrev:{
      alignItems: 'center',
      justifyContent: 'center', 
      height: 40,
      width: 100, 
      backgroundColor: '#b20000',
      borderRadius: 10
    },
    input: {
      marginBottom:20,
      marginHorizontal:20,
      textShadowColor: '#000',
      color: '#000',
      borderBottomWidth: 1,
      borderColor: 'grey',
      backgroundColor: '#fff',
      fontSize: 16,
      width: 300
    },
    containerQuestion:{
        backgroundColor: 'white', 
        borderRadius: 20, 
        marginHorizontal: 20
    },
    textQuestion:{
      color: '#000', 
      fontSize: 17, 
      marginHorizontal: 20, 
      fontWeight: 'bold', 
      marginTop: 10, 
      textAlign: 'justify'
    },
    textObs:{
      color: '#00009c', 
      fontSize: 17,  
      fontWeight: 'bold', 
      marginVertical: 10, 
      marginHorizontal: 20,
      textAlign: 'justify'
    },
    radioButton:{
      flexDirection: 'row', 
      alignItems: 'center', 
      marginVertical: 10, 
      marginHorizontal: 20
    },
    textRadioButton:{
      color: '#000', 
      fontSize: 17, 
      fontWeight: 'bold'
    },
})