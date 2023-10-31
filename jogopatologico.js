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
import config from './config/config.json'
import RadioButton3Items from './radiobutton3Items';
import { RadioButton } from 'react-native-paper';
import RadioButtonHorizontal from './radiobutton';
import { TextInputMask } from 'react-native-masked-text';

export default function JogoPatologico({route, navigation}){

    const { patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [dateStart, setDateStart] = useState()
    const [dateEnd, setDateEnd] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const qtdQuestions = [1, 1, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    const textQuestion = (index) => {
      return questions[index][1]+" - "+questions[index][2]
    }

    const question2Choices = (questionInd) => {
      return(<View style={styles.containerQuestion}>
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

    const questionK32a2 = () =>{
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <Text style={styles.textObs}>Início do Período</Text>
          <TextInputMask
            style={{ height: 40, marginHorizontal: 20, marginBottom: 10, color: 'black', borderBottomColor: 'black', borderBottomWidth: 0.5}}
            type={'datetime'}
            options={{ format: 'MM/AA' }}
            placeholder="MM/AA"
            placeholderTextColor='gray'
            value={dateStart}
            onChangeText={setDateStart}
          />
          <Text style={styles.textObs}>Término do Período</Text>
          <TextInputMask
            style={{ height: 40, marginHorizontal: 20, marginBottom: 10, color: 'black', borderBottomColor: 'black', borderBottomWidth: 0.5}}
            type={'datetime'}
            options={{ format: 'MM/AA' }}
            placeholder="MM/AA"
            placeholderTextColor='gray'
            value={dateEnd}
            onChangeText={setDateEnd}
          />
          <Text style={styles.textObs}>Observação: codificar 99 / 99 se houve apenas apostas esporádicas ao longo da vida, sem um período específico.</Text>
        </View>
      )
    }

    function questionsK32(){
      return(<>
          {question2Choices(questionInd)}
          {question2Choices(questionInd+1)}
          {question2Choices(questionInd+2)}
          {question2Choices(questionInd+3)}
        </>
      )
    }

    function showQuestion(){
      switch(questionInd+1){
          case 1:
            return question2Choices(questionInd)
          case 2:
            return questionK32a2()
          case 3:
            return questionsK32()
          case 7:
            return(<>
            <View style={styles.containerQuestion}>
              <Text style={{ color: '#000', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginVertical: 10, textAlign: 'justify' }}>
                Apostar em algum dos jogos a seguir já lhe causou um problema, ou você sentiu que apostou descontroladamente em algum deles?</Text>
            </View>
              {questionsK32()}
            </>)
          case 11:
            return questionsK32()
          case 15:
            return (<>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd+3)}</Text>
                <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+3} 
                  setChecked={setChecked}/>
                {checked[questionInd+3] == '3' ?
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholder='Especificar'
                    placeholderTextColor='gray'/> : null}
              </View>
              </>
            )
          case 19:
            return(<>
              {question2Choices(questionInd)}
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
                <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+1} 
                  setChecked={setChecked}/>
                {checked[questionInd+1] == '3' ?
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholder='Especificar'
                    placeholderTextColor='gray'/> : null}
              </View>
              </>)
          case 21:
            return (<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Instrução para o entrevistado</Text>
                <Text style={styles.textQuestion}>Agora, eu gostaria de lhe fazer mais perguntas em relação ao período no qual o seu comportamento de jogar estava mais fora do controle, ou quando o comportamento de jogar lhe causou mais problemas. Durante este período…</Text>
              </View>
              {question3Choices()}
            </>)
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
          case 30:
            return question3Choices()
          case 31:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                  options={['Sim', 'Talvez', 'Não']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>Transtorno Afetivo Bipolar</Text>
              </View>
              )
          case 32:
            return question2Choices(questionInd)
          case 33:
            return (
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
              </View>)
          case 34:
            return(
              <View style={styles.containerQuestion}>
                  <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'#00009c'} questionInd={questionInd} 
                          options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
                      <View style={{marginBottom: 10}}/>
              </View>)
          case 35:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                  <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}/>
              </View></>)
          case 36:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                  <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}/>
                  <Text style={styles.textObs}>Observação: codificar 99 se desconhecida</Text>
              </View></>)
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
              disorder: 'Jogo',
              patientId: patient
          })
      })
      let resp = await reqs.json()
      return resp
    }

    function upSize(arr) {
      const result = [];
    
      function up(array) {
        for (let i = 0; i < array.length; i++) {
          if (Array.isArray(array[i])) {
            up(array[i]);
          } else {
            result.push(array[i]);
          }
        }
      }

      up(arr);
      return result;
    }

    function repeat(array, repeticoes) {
    
      const elemento = array[1];
      const resultado = [...array];
    
      for (let i = 0; i < repeticoes; i++) {
        resultado.splice(1, 0, elemento);
      }
    
      return resultado;
    }

    async function registerAnswers() {

      const answers = upSize(checked)

      let questionId = questions.map((array) => array[0]); 
      if(checked[1]) questionId = repeat(questionId, 1)

      let reqs = await fetch(config.urlRootNode+'answers', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            disorder: 'Jogo',
            answers: answers,
            patientId: patient,
            questionId: questionId
          })
      })
      let resp = await reqs.json()
      return resp
    }

    async function queryTrico() {

      let newUrl = new URL(config.urlRootNode+'disorders'),
          params={disorder: 'Trico'}
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
      const questions = await queryTrico()
      const answers = await registerAnswers()
      registerDiagnosis(lifetime, past).then(
          navigation.navigate('Trico', {patient: patient, questions: questions}))
    }

    async function saveAnswers(){
      const questions = await queryTrico()
      registerAnswers().then(
        navigation.navigate('Trico', {patient: patient, questions: questions}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToTrico = false, nextToK47 = false, nextToK48 = false, nextToK49 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)
      console.log(checked)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if(questionInd == 1 && dateStart && dateEnd) success = true
      if(questionInd == 14 && checked[questionInd+3] == '3' && !input) success = false
      if(questionInd == 18 && checked[questionInd+1] == '3' && !input) success = false
      if((questionInd == 34 || questionInd == 35) && input) success = true
      
      if(success){

        if(questionInd == 0 && checked[0] == '1'){ 
          goToTrico = true
          saveDiagnosis('1', '1')
        }

        if(questionInd == 1){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[1] = [dateStart, dateEnd]
            return newArr
          })
        }

        if(questionInd == 2 && checked[2] == '1' && checked[3] == '1' && checked[4] == '1' 
            && checked[5] == '1'){
            goToTrico = true
            saveDiagnosis('1', '1')
        }

        if(questionInd == 14 && checked[questionInd+3] == '3'){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[17] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 18 && checked[questionInd+1] == '3'){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[19] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 29){
          let ausente = true, qtdCriteria = 0
          for(let i = 20; i<=29; i++){
            if(i != 27){
              ausente = ausente && parseInt(checked[i]) < 3
              if(parseInt(checked[i]) == 3) qtdCriteria++
            }
          }
          if(ausente){
            goToTrico = true
            saveDiagnosis('1', '1')
          }
          else if(qtdCriteria <= 3){
            nextToK48 = true
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 30){
          if(checked[30] == '1'){
            goToTrico = true
            saveDiagnosis('1', '1')
          }
          else if(checked[30] == '2'){
            nextToK48 = true
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 31){
          if(checked[31] == '1'){
            nextToK47 = true
            registerDiagnosis('3', '1')
          }
          else
            registerDiagnosis('3', '3')
        }

        if(questionInd == 32){
          nextToK49 = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[32] = checked[32]
              newArr[33] = null
              newArr[34] = '0'
              return newArr
          })
        }

        if(questionInd == 34){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[34] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 35){
          goToTrico = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[35] = input
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToTrico && !nextToK47 && !nextToK48 && !nextToK49){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK47){
          setQuestionInd(33)
          setNextInd(20)
        }
        else if(nextToK48){
          setQuestionInd(34)
          setNextInd(21)
        }
        else if(nextToK49){
          setQuestionInd(35)
          setNextInd(22)
        }
        else if(questionInd == 35) setFinish(true)
      }
    }

    useEffect(() => {
        showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 35 && finish) saveAnswers()
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
                {questionInd < 31 ? "Jogo Patológico" : "Cronologia do Jogo Patológico"}</Text>
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
    containerKTEIB: {
      flex: 1, 
      backgroundColor: 'white', 
      borderRadius: 20, 
      marginTop: 10, 
      flexDirection: 'row'
  },
  textKTEIB:{
      flex:1, 
      color: '#000', 
      fontSize: 17, 
      marginHorizontal: 20, 
      fontWeight: 'bold', 
      marginTop: 10, 
      textAlign: 'justify'
  },
})