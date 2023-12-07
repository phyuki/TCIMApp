import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
  Modal,
  TouchableHighlight,
  Image
} from 'react-native';
import config from '../config/config.json'
import RadioButton3Items from '../radiobutton3Items';
import { RadioButton } from 'react-native-paper';
import RadioButtonHorizontal from '../radiobutton';

export default function Piromania({route, navigation}){

    const { user, patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const qtdQuestions = [1, 1, 1, 1, 4, 3, 3, 1, 1, 1, 1, 1]

    const textQuestion = (index) => {
      return questions[index][1]+" - "+questions[index][2]
    }

    const question2Choices = (questionInd) => {
      return(<>
        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
        <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
          setChecked={setChecked}/>
      </>)
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

    function showQuestion(){
      switch(questionInd+1){
          case 1:
            return question3Choices()
          case 2:
            return question3Choices()
          case 3:
            return question3Choices()
          case 4:
            return question3Choices()
          case 5:
            return(<>
              <View style={styles.containerQuestion}>
                {question2Choices(questionInd)}
              </View>
              <View style={styles.containerQuestion}>
                {question2Choices(questionInd+1)}
               </View>
               <View style={styles.containerQuestion}>
                {question2Choices(questionInd+2)}
               </View>
               <View style={styles.containerQuestion}>
                {question2Choices(questionInd+3)}
               </View>
               </>)
          case 9:
            return(<>
              <View style={styles.containerQuestion}>
                {question2Choices(questionInd)}
              </View>
              <View style={styles.containerQuestion}>
                {question2Choices(questionInd+1)}
              </View>
              <View style={styles.containerQuestion}>
                  <Text style={{color: '#00009c', fontSize: 17, fontWeight: 'bold', marginTop: 10, marginHorizontal: 20}}>
                    Averiguação: Não deve ser lida para o paciente</Text>
                  <Text style={styles.textQuestion}>{textQuestion(questionInd+2)}</Text>
                  <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+2} 
                    setChecked={setChecked}/>
              </View>
              </>)
          case 12:
            return(<>
              <View style={styles.containerQuestion}>
                {question2Choices(questionInd)}
              </View>
              <View style={styles.containerQuestion}>
                {question2Choices(questionInd+1)}
               </View>
               <View style={styles.containerQuestion}>
                {question2Choices(questionInd+2)}
               </View>
               </>)
          case 15:
              return (<>
                <View style={styles.containerQuestion}>
                  {question2Choices(questionInd)}
                </View>
              </>)
          case 16:
            return (
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
              </View>)
          case 17:
            return(
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                  <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                          options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
                      <View style={{marginBottom: 10}}/>
              </View>)
          case 18:
            return(<>
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
              </View></>)
          case 19:
            return(<>
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
              disorder: 'Piromania',
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
            disorder: 'Piromania',
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
          lifetime: lifetime, past: past, disorderPrev: 'Piromania', disorderNext: 'Jogo'}))
    }

    async function saveAnswers(){
      registerAnswers().then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, disorderPrev: 'Piromania', disorderNext: 'Jogo'}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToJogo = false, nextToK29 = false, nextToK30 = false, nextToK31 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if((questionInd == 17 || questionInd == 18) && input) success = true

      if(success){

        if(questionInd == 0 && checked[0] == '1'){ 
          goToJogo = true
          saveDiagnosis('1', '1')
        }

        if(questionInd == 1 && checked[1] == '1'){ 
          nextToK30 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 2 && checked[2] == '1'){ 
          nextToK30 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 3 && checked[3] == '1'){ 
          nextToK30 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 4 && (checked[4] == '3' || checked[5] == '3' || checked[6] == '3' || checked[7] == '3')){
          nextToK30 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 8 && (checked[8] == '3' || checked[9] == '3' || checked[10] == '3')){
          nextToK30 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 11){
          if((checked[11] == '3' || checked[12] == '3' || checked[13] == '3') || 
              (checked[0] == '2' || checked[1] == '2' || checked[2] == '2'|| checked[3] == '2')){
            nextToK30 = true
            setLifetime('2')
            setPast('1')
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 14){
          if(checked[14] == '1'){
            nextToK29 = true
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

        if(questionInd == 15){
          nextToK31 = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[15] = checked[15]
              newArr[16] = null
              newArr[17] = '0'
              return newArr
          })
        }

        if(questionInd == 17){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[17] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 18){
          goToJogo = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[18] = input
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToJogo && !nextToK29 && !nextToK30 && !nextToK31){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK29){
          setQuestionInd(16)
          setNextInd(9)
        }
        else if(nextToK30){
          setQuestionInd(17)
          setNextInd(10)
        }
        else if(nextToK31){
          setQuestionInd(18)
          setNextInd(11)
        }
        else if(questionInd == 18) setFinish(true)
      }
    }

    useEffect(() => {
        showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 18 && finish) saveAnswers()
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

    const showCriteria = () => {
      switch(questionInd+1){
        case 1:
          return ["Critério A", "Incêndio provocado de forma deliberada e proposital em mais de uma ocasião."]
        case 2:
          return ["Critério B", "Tensão ou excitação afetiva antes do ato."]
        case 3:
          return ["Critério C", "Fascinação, interesse, curiosidade ou atração pelo fogo e seus contextos situacionais (p.ex., equipamentos, usos, consequências)."]
        case 4:
          return ["Critério D", "Prazer, gratificação, ou alívio ao provocar incêndios, ou quando testemunhando ou participando de suas consequências."]
        case 5:
          return ["Critério E", "O incêndio não é provocado com fins monetários, como expressão de uma ideologia sociopolítica, para ocultar atividades criminosas, para expressar raiva ou vingança, para melhorar as circunstâncias de vida de uma pessoa."]
        case 9:
          return ["Critério E", "O incêndio não é provocado em resposta a um delírio ou alucinação, ou como resultado de julgamento alterado (p.ex. no transtorno neurocognitivo maior, na deficiência intelectual); ou ocorreu somente durante a intoxicação por substâncias exógenas."]
        case 12:
          return ["Critério F", "A provocação de incêndios não é melhor explicada por Transtorno de Conduta, Personalidade Antissocial, ou Episódio Maníaco/Hipomaníaco."]  
        default:
          return ""
      }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                justifyContent: 'center',
                alignItems: 'center'}}>
                    <View style={{margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 25,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,}}>
                        <Text style={{marginBottom: 15, color: 'black', fontSize: 18, fontWeight: 'bold'}}>{showCriteria()[0]}</Text>
                        <Text style={{marginBottom: 15, color: 'black', fontSize: 16, textAlign: 'justify'}}>{showCriteria()[1]}</Text>
                        <TouchableHighlight style={[styles.buttonPrev, {marginBottom: 0}]} onPress={()=>{setModalVisible(!modalVisible)}}>
                            <Text style={{color: '#fff', fontSize: 15}}>Fechar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
          <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20}}>
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginLeft:20, padding: 10}} onPress={() => navigation.navigate("ScreenSCID", {user: user})}>
                <Image
                    source={require('../assets/logout.png')}
                    style={{height: 30,
                    width: 30,
                    resizeMode: 'stretch'}}
                />
                </TouchableOpacity>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
                {questionInd < 13 ?
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginRight:20, padding: 10}} onPress={() => {setModalVisible(true)}}>
                <Image
                    source={require('../assets/diagnostico.png')}
                    style={{height: 30,
                    width: 30,
                    resizeMode: 'stretch'}}
                />
                </TouchableOpacity> :
                <View style={{backgroundColor: '#87ceeb', borderRadius: 10, marginRight:20, width: 50, height: 50}}/>
                }
            </View>
          <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd < 13 ? "Piromania" : "Cronologia da Piromania"}</Text>
    
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