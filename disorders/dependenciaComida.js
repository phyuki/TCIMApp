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

export default function DependenciaComida({route, navigation}){

    const { user, patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [criteriaK244, setCriteriaK244] = useState()
    const [criteriaK246, setCriteriaK246] = useState()
    const [finish, setFinish] = useState(false)
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const qtdQuestions = [2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

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

    const questionTextInput = (textQuestion, questionInd, placeholder) => {
      return (
      <View style={styles.containerQuestion}>
        <Text style={styles.textQuestion}>{textQuestion}</Text>
        <TextInput style={styles.input}
          onChangeText={value => {
            setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd] = value
            return newArr
          })}}
          value={checked[questionInd]}
          placeholder={placeholder}
          placeholderTextColor='gray'/>
      </View>)
    }

    function showQuestion(){
      switch(questionInd+1){
        case 1:
          return(<>
          {questionTextInput(textQuestion(questionInd), questionInd, 'Peso(kg)')}
          {questionTextInput(textQuestion(questionInd+1), questionInd+1, 'Altura(cm)')}
          </>)
        case 3:
          return question2Choices(questionInd)
        case 4:
          return (<>
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {questionTextInput('1º Alimento/bebida', questionInd, '')}
            {questionTextInput('2º Alimento/bebida', questionInd+1, '')}
            {questionTextInput('3º Alimento/bebida', questionInd+2, '')}
          </>)
        case 7:
        case 8:
          return question2Choices(questionInd)
        case 9:
          return questionTextInput(textQuestion(questionInd), questionInd, 'Anos')
        case 10:
          return (<>
            {questionTextInput(textQuestion(questionInd), questionInd, 'Anos')}
            <View style={styles.containerQuestion}>
              <Text style={styles.textObs}>
              Obs.: marcar a idade atual se o momento presente for a fase de maior dificuldade de controle dos hábitos alimentares</Text>
              <View style={{marginBottom: -15}}/>
            </View>
            </>)
        case 11:
          return questionTextInput(textQuestion(questionInd), questionInd, 'Meses')
        case 12:
        case 13:
        case 14:
        case 15:
          return question3Choices()
        case 16:
          return(<>
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>
              O consumo excessivo de alimentos ou bebidas não alcoólicas já lhe atrapalhou a ponto de interferir com suas responsabilidades...</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            {question2Choices(questionInd+2)}
            </>)
        case 19:
          return question3Choices()
        case 20:
          return(<>
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>
              O consumo excessivo de alimentos ou bebidas não alcoólicas fez você abandonar ou reduzir suas atividades...</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            {question2Choices(questionInd+2)}
            </>)
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
          return question3Choices()
        case 29:
          return question2Choices(questionInd)
        case 30:
          return(<>
            <View style={styles.containerQuestion}>
            <Text style={[styles.textObs, {marginBottom: 0}]}>Observação: Não deve ser lida para o paciente</Text>
                <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                    <RadioButton3Items direction={'row'} color={'black'} questionInd={questionInd} 
                        options={['Leve', 'Moderado', 'Grave']} checked={checked} setChecked={setChecked}/>
                   
                    <Text style={[styles.textObs, {marginBottom: 0}]}>
                    Leve = Poucos (se alguns) sintomas excedendo aqueles necessários para o diagnóstico presente, e os sintomas resultam em não mais do que um 
                    comprometimento menor seja social ou no desempenho ocupacional.</Text>
                    <Text style={[styles.textObs, {marginBottom: 0}]}>
                    Moderado = Sintomas ou comprometimento funcional entre “leve” e “grave” estão presentes.</Text>
                    <Text style={styles.textObs}>
                    Grave = Vários sintomas excedendo aqueles necessários para o diagnóstico, ou vários sintomas particularmente graves estão presentes, 
                    ou os sintomas resultam em comprometimento social ou ocupacional notável.</Text>
            </View></>)
        case 31:
          return(<>
            <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                    <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                        options={['Em remissão parcial', 'Em remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
            </View>
            </>)
        case 32:
          return(
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <TextInput style={styles.input}
                      onChangeText={value => {
                          setChecked(() => {
                          const newArr = checked.concat()
                          newArr[questionInd] = value
                          return newArr
                      })}}
                      value={checked[questionInd]}
                      placeholder='Tempo em meses'
                      placeholderTextColor='grey'/>
            </View>)
        case 33:
          return(
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <TextInput style={styles.input}
                      onChangeText={value => {
                          setChecked(() => {
                          const newArr = checked.concat()
                          newArr[questionInd] = value
                          return newArr
                      })}}
                      value={checked[questionInd]}
                      placeholder='Tempo em anos'
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
              disorder: 'Dependencia de Comida',
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
            disorder: 'Dependencia de Comida',
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
          lifetime: lifetime, past: past, disorderPrev: 'Dependência de Comida', 
          disorderNext: 'Finish'}))
    }

    async function saveAnswers(){
      registerAnswers().then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, disorderPrev: 'Dependência de Comida', 
          disorderNext: 'Finish'}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToFinish = false, nextToK255 = false, nextToK256 = false, nextToK257 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if(questionInd == 3 && checked[3]) success = true
      if((questionInd == 31 || questionInd == 32) && input) success = true

      if(success){

        if(questionInd == 7 && checked[6] == '1' && checked[7] == '1'){
          goToFinish = true
          saveDiagnosis('1', '1')
        }

        if(questionInd == 15){
          if(checked[15] == '1' && checked[16] == '1' && checked[17] == '1') setCriteriaK244('1')
          else setCriteriaK244('3')
        }

        if(questionInd == 19){
          if(checked[19] == '1' && checked[20] == '1' && checked[21] == '1') setCriteriaK246('1')
          else setCriteriaK246('3')
        }

        if(questionInd == 27){
          let qtdPresente = [0, 0]
          for(let i=11; i<= 23;i++){
            if(i == 15 || i == 19) i=i+2
            else if(checked[i] == '3') qtdPresente[0]++
          }
          if(criteriaK244 == '3') qtdPresente[0]++
          if(criteriaK246 == '3') qtdPresente[0]++

          for(let i=24; i<=27; i++)
            if(checked[i] == '3')
              qtdPresente[1]++

          console.log('K244: '+criteriaK244)
          console.log('K246: '+criteriaK246)
          console.log(qtdPresente)
          if((qtdPresente[0] == 1 && qtdPresente[1] == 0) || (qtdPresente[0] == 0 && qtdPresente[1] >= 1)){
            nextToK256 = true
            setLifetime('2')
            setPast('1')
            registerDiagnosis('2', '1')
          }
          else if(qtdPresente[0] == 0 && qtdPresente[1] == 0){
            goToFinish = true
            saveDiagnosis('1', '1')
          }
        }

        if(questionInd == 28){
          if(checked[28] == '1'){
            nextToK255 = true
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

        if(questionInd == 29){
          nextToK257 = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[29] = checked[29]
              newArr[30] = null
              newArr[31] = '0'
              return newArr
          })
        }

        if(questionInd == 31){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[31] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 32){
          goToFinish = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[32] = input
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToFinish && !nextToK255 && !nextToK256 && !nextToK257){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK255){
          setQuestionInd(30)
          setNextInd(23)
        }
        else if(nextToK256){
          setQuestionInd(31)
          setNextInd(24)
        }
        else if(nextToK257){
          setQuestionInd(32)
          setNextInd(25)
        }
        else if(questionInd == 32) setFinish(true)
      }
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 32 && finish) saveAnswers()
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
                {questionInd < 28 ? "Dependência de Comida" : "Cronologia da Dependência de Comida"}</Text>
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
      fontSize: 16,  
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