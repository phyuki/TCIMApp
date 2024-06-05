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
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import config from '../config/config.json'
import RadioButton3Items from '../radiobutton3Items';
import { RadioButton } from 'react-native-paper';
import RadioButtonHorizontal from '../radiobutton';

export default function Automutilacao({route, navigation}){

    const { user, patient, questions, answers, scores, questionId } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [prevQuestion, setPrevQuestion] = useState([])
    const [finish, setFinish] = useState(false)
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const qtdQuestions = [3, 2, 2, 1, 1, 3, 2, 1, 1, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1]

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
  
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

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
        <View style={[styles.containerQuestion, {borderRadius: 10}]}>
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
        <View style={[styles.containerQuestion, {marginVertical: 10}]}/>
        </>)
    }

    const questionK199 = (disorders) => {
      return (<>
        <View style={[styles.containerQuestion, {borderRadius: 10}]}>
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
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              Alguma vez na vida, você já se machucou de propósito? Se sim, o que você fez?</Text>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            {question2Choices(questionInd+2)}
          </>)
        case 4:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              Alguma vez na vida, você já se machucou de propósito? Se sim, o que você fez?</Text>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
          </>)
        case 6:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              Alguma vez na vida, você já se machucou de propósito? Se sim, o que você fez?</Text>
            </View>
            {question2Choices(questionInd)}
            {checked[questionInd] == '3' ?
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
                <TextInput style={styles.input}
                    onChangeText={value => {
                    setChecked(() => {
                      const newArr = checked.concat()
                      newArr[questionInd+1] = value
                      return newArr
                    })}}
                    value={checked[questionInd+1]}
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
                options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
              <Text style={styles.textObs}>{'Observação: Outras tentativas de suicídio podem ter ocorrido, mas não envolveram autolesão'}</Text>
              <Text style={styles.textObs}>{'Aviso: Sim = Atenção para Tentativa de Suicídio'}</Text>
            </View> )
        case 10:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>Por que você fez isso?</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            {question2Choices(questionInd+2)}
          </>)
        case 13:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              Normalmente, acontecia alguma coisa um pouco antes de você tentar se machucar? Por exemplo:</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
          </>)
        case 15:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              Normalmente, acontecia alguma coisa um pouco antes de você tentar se machucar? Por exemplo:</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
          </>)
        case 16:
        case 17:
        case 18:
          return questionK197()
        case 19:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              Quanto o comportamento de se machucar prejudica a sua vida?</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
          </>)
        case 21:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              Quanto o comportamento de se machucar prejudica a sua vida?</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            <View style={styles.containerQuestion}/>
          </>)
        case 22:
          return questionK199(['Síndrome psicótica', 'Delirium'])
        case 24:
          return questionK199(['Intoxicação exógena', 'Tricotilomania ou Escoriação'])
        case 26:
        case 27:
          return (
            <View style={styles.containerQuestion}>
              <Text style={styles.textObs}>Averiguação: Não deve ser lida para o paciente</Text>
              <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
                setChecked={setChecked}/>
            </View>)
        case 28:
          return question2Choices(questionInd)
        case 29:
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
                    Moderado = Comprometimento funcional entre “leve” e “grave” estão presentes.</Text>
                    <Text style={styles.textObs}>
                    Grave = Vários sintomas excedendo aqueles necessários para o diagnóstico, ou vários sintomas particularmente graves estão presentes, 
                    ou os sintomas resultam em comprometimento social ou ocupacional notável.</Text>
            </View></>)
        case 30:
          return(<>
            <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                    <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                        options={['Em remissão parcial', 'Em remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
            </View>
            </>)
        case 31:
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
                      placeholder='Tempo em anos'
                      placeholderTextColor='grey'/>
              <Text style={styles.textObs}>Observação: codificar 99 se desconhecida</Text>
            </View>)
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
      navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, answers: answers, scores: scores, 
          questionId: questionId, disorderPrev: 'Transtorno de Automutilação', 
          disorderNext: 'AmorPatologico'})
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToAmorPatologico = false, nextToK203 = false, nextToK204 = false, nextToK205 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if(questionInd == 5 && checked[5] == '1') success = true
      if((questionInd == 30 || questionInd == 31) && input) success = true

      if(success){

        if(questionInd == 5 && checked[0] == '1' && checked[1] == '1' && checked[2] == '1' && 
            checked[3] == '1' && checked[4] == '1' && checked[5] == '1'){
          goToAmorPatologico = true
          nextDisorder('1', '1')
        }

        if(questionInd == 8 && (checked[7] == '1' || checked[8] == '3')){
          goToAmorPatologico = true
          nextDisorder('1', '1')
        }

        if(questionInd == 9 && checked[9] == '1' && checked[10] == '1' && checked[11] == '1'){
          nextToK204 = true
          setLifetime('2')
          setPast('1')
        }

        if(questionInd == 14 && checked[12] == '1' && checked[13] == '1' && checked[14] == '1'){
          nextToK204 = true
          setLifetime('2')
          setPast('1')
        }

        if(questionInd == 17 && (checked[15] == '3' || checked[16] == '3' || checked[17] == '3')){
          nextToK204 = true
          setLifetime('2')
          setPast('1')
        }

        if(questionInd == 20 && checked[18] == '1' && checked[19] == '1' && checked[20] == '1'){
          nextToK204 = true
          setLifetime('2')
          setPast('1')
        }

        if(questionInd == 26 && (checked[21] == '3' || checked[22] == '3' || checked[23] == '3' ||
            checked[24] == '3' || checked[25] == '3' || checked[26] == '3')){
          nextToK204 = true
          setLifetime('2')
          setPast('1')
        }

        if(questionInd == 27){
          if(checked[27] == '1')
            nextToK203 = true
          setLifetime('3')
          setPast(checked[27])
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

        if(questionInd == 31){
          goToAmorPatologico = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[31] = checked[31]
            return newArr
          })
        }

        setPrevQuestion(() => {
          const newArr = prevQuestion.concat()
          newArr.push([questionInd, nextInd])
          return newArr
        })

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToAmorPatologico && !nextToK203 && !nextToK204 && !nextToK205){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK203){
          setQuestionInd(29)
          setNextInd(19)
        }
        else if(nextToK204){
          setQuestionInd(30)
          setNextInd(20)
        }
        else if(nextToK205){
          setQuestionInd(31)
          setNextInd(21)
        }
        else if(questionInd == 31) setFinish(true)
      }
      else Alert.alert("Aviso","Responda todas as questões antes de prosseguir!")
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 31 && finish) nextDisorder(lifetime, past)
    }, [checked])

    const minusQuestion = () => {
      if(questionInd == 0){
        navigation.goBack()
      }
      else if(checked){
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
        case 5:
        case 8:
        case 9:
          return ["Critério A", "No intervalo de um ano, o indivíduo se engajou, em cinco ou mais dias, em dano intencional autoinfligido à superfície do seu corpo provavelmente induzindo sangramento, contusão ou dor com a expectativa de que a lesão levasse somente a um dano físico menor ou moderado (p. ex., não há intenção suicida)."]
        case 10:
          return ["Critério B", "O indivíduo se engaja em comportamento de autolesão com uma ou mais das seguintes expectativas: obter alívio de um estado de sentimento ou de cognição negativos, resolver uma dificuldade interpessoal; induzir um estado de sentimento positivo."]
        case 13:
          return ["Critério C", "A autolesão está associada a pelo menos um dos seguintes casos:", "- Dificuldades interpessoais ou sentimentos ou pensamentos negativos, como depressão, ansiedade, tensão, raiva, angústia generalizada ou autocrítica, ocorrendo no período imediatamente anterior ao ato de autolesão.",
            "- Antes do engajamento no ato, um período de preocupação com o comportamento pretendido que é difícil de controlar.", "- Pensar na autolesão que ocorre frequentemente, mesmo quando não é praticada."]
        case 16:
        case 17:
        case 18:
          return ["Critério D", "O comportamento não é socialmente aprovado (p.ex., piercing corporal, tatuagem, parte de um ritual religioso ou cultural) e não está restrito a arrancar casca de feridas ou roer as unhas."]
        case 19:
          return ["Critério E", "O comportamento ou suas consequências causam sofrimento clinicamente significativo ou interferência no funcionamento interpessoal, acadêmico ou em outras áreas importantes do funcionamento."]
        case 22:
        case 24:
        case 26:
        case 27:
          return ["Critério F", "O comportamento não é mais bem explicado por outro transtorno mental ou condição médica (p.ex., transtorno psicótico, transtorno do espectro autista, deficiência intelectual, síndrome de Lesch-Nyhan, transtorno do movimento estereotipado com autolesão, tricotilomania, transtorno de escoriação)."]
        default:
          return ""
      }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,}}>
                        <Text style={{marginBottom: 15, color: 'black', fontSize: 18, fontWeight: 'bold'}}>{showCriteria()[0]}</Text>
                        <Text style={{marginBottom: 15, color: 'black', fontSize: 16, textAlign: 'justify'}}>{showCriteria()[1]}</Text>
                        {questionInd==12 ? <>
                        <Text style={{marginBottom: 15, color: 'black', fontSize: 16, textAlign: 'justify'}}>{showCriteria()[2]}</Text>
                        <Text style={{marginBottom: 15, color: 'black', fontSize: 16, textAlign: 'justify'}}>{showCriteria()[3]}</Text>
                        <Text style={{marginBottom: 15, color: 'black', fontSize: 16, textAlign: 'justify'}}>{showCriteria()[4]}</Text>
                        </>: null
                        }
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
                {questionInd < 27 ?
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
                {questionInd < 27 ? "Transtorno de Automutilação" : "Cronologia do Transtorno de Automutilação"}</Text>
          
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={80}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1, justifyContent: 'space-evenly'}}>
                  {showQuestion()}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
          {(!isKeyboardVisible) &&
          <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
              <TouchableOpacity style={styles.buttonPrev} onPress={minusQuestion}>
                  <Text style={{color: '#fff', fontSize: 15}}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNext} onPress={plusQuestion}>
                  <Text style={{color: '#fff', fontSize: 15}}>Próximo</Text>
              </TouchableOpacity>
          </View>}
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