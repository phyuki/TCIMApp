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
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Alert
} from 'react-native';
import config from '../config/config.json'
import RadioButton3Items from '../radiobutton3Items';
import { RadioButton } from 'react-native-paper';
import RadioButtonHorizontal from '../radiobutton';

export default function Tricotilomania({route, navigation}){

    const { user, patient, questions, answers, scores, questionId } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [inputK59, setInputK59] = useState('')
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [prevQuestion, setPrevQuestion] = useState([])
    const [finish, setFinish] = useState(false)
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const qtdQuestions = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

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
          case 2:
          case 3:
          case 4:
            return question3Choices()
          case 5:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                  options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>{'Obs.: Sim = Atenção para Condição Médica Geral (ex.: condição dermatológica)'}</Text>
              </View>
              )
          case 6:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                  options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>{'Obs.: Sim = Atenção para Transtorno Dismórfico Corporal ou TOC'}</Text>
              </View>
              )
          case 7:
            return question3Choices()
          case 8:
              return (<>
                <View style={styles.containerQuestion}>
                  {question2Choices(questionInd)}
                </View>
              </>)
          case 9:
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
                      Moderado = Comprometimento funcional entre “leve” e “grave” estão presentes.</Text>
                      <Text style={styles.textObs}>
                      Grave = Vários sintomas excedendo aqueles necessários para o diagnóstico, ou vários sintomas particularmente graves estão presentes, 
                      ou os sintomas resultam em comprometimento social ou ocupacional notável.</Text>
                      <View style={{marginBottom: 10}}/>
              </View>)
          case 10:
            return(
              <View style={styles.containerQuestion}>
                <Text style={[styles.textObs, {marginBottom: 0}]}>Observação: Não deve ser lida para o paciente</Text>
                  <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                          options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
                      <View style={{marginBottom: 10}}/>
              </View>)
          case 11:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                  <TextInput style={styles.input}
                      onChangeText={setInputK59}
                      maxLength={2}
                      keyboardType="numeric"
                      value={inputK59}
                      placeholder='Tempo em meses'
                      placeholderTextColor='grey'/>
              </View></>)
          case 12:
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
                      maxLength={2}
                      keyboardType="numeric"
                      value={checked[questionInd]}
                      placeholder='Tempo em anos'
                      placeholderTextColor='grey'/>
                  <Text style={styles.textObs}>Observação: codificar 99 se desconhecida</Text>
              </View></>)
          default:
              console.log("Error")
      }
    }

    async function nextDisorder(lifetime, past){
      let id = questions.map((array) => array[0])
      while(checked.length < id.length) checked.push(undefined)
      scores.push([lifetime, past])
      questionId.push(id)
      answers.push(checked)

      navigation.push('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, answers: answers, scores: scores, 
          questionId: questionId, disorderPrev: 'Tricotilomania', disorderNext: 'Oniomania'})
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToOniomania = false, nextToK58 = false, nextToK59 = false, nextToK60 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if(questionInd == 10 && inputK59) success = true

      if(success){

        if(questionInd == 0 && checked[0] == '1'){ 
          goToOniomania = true
          nextDisorder('1', '1')
        }

        if(questionInd == 2 && checked[2] == '1'){ 
          nextToK59 = true
          setLifetime('2')
          setPast('1')
        }

        if(questionInd == 4 && checked[4] == '3'){ 
          nextToK59 = true
          setLifetime('2')
          setPast('1')
        }

        if(questionInd == 5 && checked[5] == '3'){ 
          nextToK59 = true
          setLifetime('2')
          setPast('1')
        }

        if(questionInd == 6){
          if(checked[6] == '1'){
            nextToK59 = true
            setLifetime('2')
            setPast('1')
          }
          else if(checked[0] == '2' || checked[2] == '2' || checked[4] == '2' || checked[5] == '2' || checked[6] == '2'){
            nextToK59 = true
            setLifetime('2')
            setPast('1')
          }
        }

        if(questionInd == 7){
          if(checked[7] == '1')
            nextToK58 = true
          setLifetime('3')
          setPast(checked[7])
        }

        if(questionInd == 8){
          nextToK60 = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[8] = checked[8]
              newArr[9] = null
              newArr[10] = '0'
              return newArr
          })
        }

        if(questionInd == 10)
          setChecked(() => {
            const newArr = checked.concat()
            newArr[10] = inputK59
            return newArr
          })

        if(questionInd == 11)
          goToOniomania = true
        
        if(goToOniomania){
          const newArr = checked.concat()
          for(let i=checked.length-1; i>(questionInd+qtdQuestions[nextInd]-1); i--)
              newArr[i] = null
          setChecked(newArr)
        }

        if(questionInd != 11 && !goToOniomania){
          setPrevQuestion(() => {
            const newArr = prevQuestion.concat()
            newArr.push([questionInd, nextInd])
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToOniomania && !nextToK58 && !nextToK59 && !nextToK60){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK58){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[8] = null
            return newArr
          })
          setQuestionInd(9)
          setNextInd(9)
        }
        else if(nextToK59){
          const newArr = checked.concat()
          for(let i=(questionInd+qtdQuestions[nextInd]); i<10; i++)
            newArr[i] = null
          setChecked(newArr)
          setQuestionInd(10)
          setNextInd(10)
        }
        else if(nextToK60){
          setQuestionInd(11)
          setNextInd(11)
        }
        else if(questionInd == 11) setFinish(true)
      }
      else Alert.alert("Aviso","Responda todas as questões antes de prosseguir!")
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 11 && finish) nextDisorder(lifetime, past)
    }, [checked])

    const minusQuestion = () => {
      if(questionInd == 0){
        navigation.goBack()
      }
      else if(checked){
        if(questionInd == 11) 
          setFinish(false)
        const prev = prevQuestion[prevQuestion.length-1]
        setQuestionInd(prev[0])
        setNextInd(prev[1])
        setPrevQuestion(() => {
            const newArr = prevQuestion.concat()
            newArr.pop()
            return newArr
        })
      }
    }

    const showCriteria = () => {
      switch(questionInd+1){
        case 1:
          return ["Critério A", "Arrancar recorrente do cabelo ou pelos do corpo resultando em perda notável."]
        case 2:
          return ["Critério suplementar", "Aumento de tensão imediatamente antes de arrancar, ou tentativa de resistir ao comportamento."]
        case 3:
          return ["Critério B", "Tentativas repetidas de reduzir ou parar o comportamento de arrancar o cabelo."]      
        case 4:
          return ["Critério suplementar", "Prazer, gratificação ou alívio quando arranca o cabelo/pelo."]
        case 5:
          return ["Critério D", "O transtorno não é melhor explicado por outra condição médica geral (ex. condição dermatológica)."]          
        case 6:
          return ["Critério E", "O transtorno não é melhor explicado por outra doença mental (ex. tentativas de melhorar um defeito ou falha percebidos na aparência, no transtorno dismórfico corporal, ou rituais de simetria e perfeccionismo no TOC)."]          
        case 7:
          return ["Critério C", "O comportamento ou suas consequências causam sofrimento clinicamente significativo ou interferência no funcionamento interpessoal, acadêmico ou em outras áreas importantes do funcionamento."]
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
                {questionInd < 7 ?
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
            {questionInd < 7 ? "Tricotilomania" : "Cronologia da Tricotilomania"}</Text>
          
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <KeyboardAvoidingView
                  keyboardVerticalOffset={80}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  style={{flex: 1, justifyContent: 'space-evenly'}}>
                        {showQuestion()}
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
              <TouchableOpacity style={styles.buttonPrev} onPress={minusQuestion}>
                <Text style={{color: '#fff', fontSize: 15}}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNext} onPress={plusQuestion}>
                <Text style={{color: '#fff', fontSize: 15}}>Próximo</Text>
              </TouchableOpacity>
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