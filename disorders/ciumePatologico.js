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

export default function CiumePatologico({route, navigation}){

    const { user, patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [criteriaK219, setCriteriaK219] = useState()
    const [criteriaK222, setCriteriaK222] = useState()
    const [criteriaK223, setCriteriaK223] = useState()
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [finish, setFinish] = useState(false)
    const qtdQuestions = [2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1]

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

    const questionK223 = (disorders) => {
      return (<>
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>
          Você perdeu o controle do seu ciúme apenas quando...</Text>
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
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
          </>)
        case 3:
          return question3Choices()
        case 4:
        case 6:
        case 8:
          return(<>
          <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>
            Você costumava buscar informações ou evidências para comprovar as suas suspeitas de infidelidade? Você fez coisas como...</Text>
            <View style={{marginBottom: 10}}/>
          </View>
          {question2Choices(questionInd)}
          {question2Choices(questionInd+1)}
          </>)
        case 10:
        case 11:
          return question3Choices()
        case 12:
          return(<>
          <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>
            Você já perdeu o controle do seu ciúme, resultando em bater, ameaçar alguém ou danificar algo? Se sim, o que você fez?</Text>
            <View style={{marginBottom: 10}}/>
          </View>
          {question2Choices(questionInd)}
          {question2Choices(questionInd+1)}
          </>)
        case 14:
        case 16:
          return(<>
          <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>
            As suas manifestações de ciúme fazem, ou fizeram você sofrer? Como?</Text>
            <View style={{marginBottom: 10}}/>
          </View>
          {question2Choices(questionInd)}
          {question2Choices(questionInd+1)}
          </>)
        case 18:
          return questionK223(['Mania ou hipomania', 'Síndrome psicótica'])
        case 20:
          return questionK223(['Delírio de ciúme', 'Abuso de substância'])
        case 22:
          return question2Choices(questionInd)
        case 23:
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
        case 24:
          return(<>
            <View style={styles.containerQuestion}>
              <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
              <RadioButton3Items direction={'column'} color={'#00009c'} questionInd={questionInd} 
                options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
              <View style={{marginBottom: 10}}/>
            </View>
          </>)
        case 25:
          return(
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <TextInput style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholderTextColor='grey'/>
            </View>)
        case 26:
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
              disorder: 'Ciume Patologico',
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
            disorder: 'Ciume Patologico',
            answers: checked,
            patientId: patient,
            questionId: questionId
          })
      })
      let resp = await reqs.json()
      return resp
    }

    async function saveDiagnosis(lifetime, past){
      const answers = await registerAnswers()
      registerDiagnosis(lifetime, past).then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, disorderPrev: 'Ciúme Patológico', 
          disorderNext: 'DependenciaComida'}))
    }

    async function saveAnswers(){
      registerAnswers().then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, disorderPrev: 'Ciúme Patológico', 
          disorderNext: 'DependenciaComida'}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToDependenciaComida = false, nextToK225A = false, nextToK226 = false, nextToK227 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if((questionInd == 24 || questionInd == 25) && input) success = true

      if(success){

        if(questionInd == 7){
          if(checked[3] == '1' && checked[4] == '1' && checked[5] == '1' && 
            checked[6] == '1' && checked[7] == '1' && checked[8] == '1')
              setCriteriaK219('1')
          else setCriteriaK219('3')
        }

        if(questionInd == 11){
          if(checked[11] == '1' && checked[12] == '1') setCriteriaK222('1')
          else setCriteriaK222('3')
        }

        if(questionInd == 15){
          if(checked[13] == '1' && checked[14] == '1' && checked[15] == '1' && checked[16] == '1')
            setCriteriaK223('1')
          else setCriteriaK223('3')
        }

        if(questionInd == 19){

          console.log('K219: '+criteriaK219)
          console.log('K222: '+criteriaK222)
          let newCriteriaK223 = criteriaK223

          if(criteriaK223 == '3' && checked[17] == '1' && checked[18] == '1' && 
            checked[19] == '1' && checked[20] == '1'){
            console.log('K223: 3')
            newCriteriaK223 = '3'
          }
          else {
            console.log('K223: 1')
            newCriteriaK223 = '1'
          }

          if(checked[2] == '1' && criteriaK219 == '1' && checked[9] == '1' &&
            checked[10] == '1' && criteriaK222 == '1' && newCriteriaK223 == '1'){
              goToDependenciaComida = true
              saveDiagnosis('1', '1')
          }
          else if(!(checked[2] == '3' && criteriaK219 == '3' && checked[9] == '3' &&
            checked[10] == '3' && criteriaK222 == '3' && newCriteriaK223 == '3')){
              nextToK226 = true
              setLifetime('2')
              setPast('1')
              registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 21){
          if(checked[21] == '1'){
            nextToK225A = true
            setLifetime('3')
            setPast('1')
            registerDiagnosis('3', '1')
          }
          else{
            setLifetime('3')
            setPast('3')
            registerDiagnosis('3', '3')
          }
        }

        if(questionInd == 22){
          nextToK227 = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[22] = checked[22]
              newArr[23] = null
              newArr[24] = '0'
              return newArr
          })
        }

        if(questionInd == 24){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[24] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 25){
          goToDependenciaComida = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[25] = input
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToDependenciaComida && !nextToK225A && !nextToK226 && !nextToK227){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK225A){
          setQuestionInd(23)
          setNextInd(14)
        }
        else if(nextToK226){
          setQuestionInd(24)
          setNextInd(15)
        }
        else if(nextToK227){
          setQuestionInd(25)
          setNextInd(16)
        }
        else if(questionInd == 25) setFinish(true)
      }
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 25 && finish) saveAnswers()
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
                {questionInd < 21 ? "Ciúme Patológico" : "Cronologia do Ciúme Patológico"}</Text>
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