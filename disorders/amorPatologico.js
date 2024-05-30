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
  KeyboardAvoidingView
} from 'react-native';
import config from '../config/config.json'
import RadioButton3Items from '../radiobutton3Items';
import { RadioButton } from 'react-native-paper';
import RadioButtonHorizontal from '../radiobutton';

export default function AmorPatologico({route, navigation}){

    const { user, patient, questions, answers, scores, questionId } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const [criteriaK206, setCriteriaK206] = useState()
    const [criteriaK210, setCriteriaK210] = useState()
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const qtdQuestions = [1, 1, 3, 2, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1]

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

    const questionK211 = (disorders) => {
      return (<>
        <View style={[styles.containerQuestion, {borderRadius: 10}]}>
          <Text style={styles.textQuestion}>
          Esses fatos aconteceram somente...</Text>
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
          return question2Choices(questionInd)
        case 2:
          return question2Choices(questionInd)
        case 3:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              {'Quando o seu parceiro(a) se afastava, ou dizia que gostaria de se afastar, como você se sentia?'}</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            {question2Choices(questionInd+2)}
          </>)
        case 6:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              {'Quando o seu parceiro(a) se afastava, ou dizia que gostaria de se afastar, como você se sentia?'}</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
          </>)
        case 8:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              {'Quando o seu parceiro(a) se afastava, ou dizia que gostaria de se afastar, como você se sentia?'}</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
                  setChecked={setChecked}/>
                {checked[questionInd] == '3' ?
                <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}
                  placeholder='Especificar'
                  placeholderTextColor='gray'/>: null}
            </View>
            <View style={styles.containerQuestion}/>
          </>)
        case 9:
        case 10:
        case 11:
          return question3Choices()
        case 12:
        case 14:
          return (<>
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
              <Text style={styles.textQuestion}>
              Você deixou de fazer coisas de que gostava, ou que eram importantes para você por causa do relacionamento amoroso? Como por exemplo...</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
          </>)
        case 16:
          return question3Choices()
        case 17:
          return questionK211(['Mania ou hipomania', 'Síndrome psicótica'])
        case 19:
          return (<>
          <View style={[styles.containerQuestion, {borderRadius: 10}]}>
            <Text style={styles.textQuestion}>
            Esses fatos aconteceram somente...</Text>
            <View style={{marginBottom: 10}}/>
          </View>
          <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
            <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
              setChecked={setChecked}/>
            <Text style={styles.textObs}>{'Obs.: Sim = Atenção para Síndrome erotomaníaca'}</Text>
          </View>
          <View style={styles.containerQuestion}/>
          </>)
        case 20:
          return question2Choices(questionInd)
        case 21:
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
        case 22:
          return(<>
            <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                    <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                        options={['Em remissão parcial', 'Em remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
            </View>
            </>)
        case 23:
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
        case 24:
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

    async function nextDisorder(lifetime, past, disorderNext){
      let id = questions.map((array) => array[0])
      while(checked.length < id.length) checked.push(undefined)
      scores.push([lifetime, past])
      questionId.push(id)
      answers.push(checked)
      navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, answers: answers, scores: scores, 
          questionId: questionId, disorderPrev: 'Amor Patológico', disorderNext: disorderNext})
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToCiumePatologico = false, nextToK215 = false, nextToK216 = false, nextToK217 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)
      
      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]
      if(questionInd == 7 && checked[7] == '3' && !input) success = false
      if(success){

        if(questionInd == 0 && checked[0] == '1'){
          goToCiumePatologico = true
          nextDisorder('1', '1', 'DependenciaComida')
        }

        if(questionInd == 7){
          if(checked[7] == '3') 
            setChecked(() => {
              const newArr = checked.concat()
              newArr[7] = input
              return newArr
            })
          if(checked[2] == '1' && checked[3] == '1' && checked[4] == '1' && 
            checked[5] == '1' && checked[6] == '1' && checked[7] == '1')
              setCriteriaK206('1')
          else setCriteriaK206('3')
          setInput('')
        }

        if(questionInd == 13){
          if(checked[11] == '1' && checked[12] == '1' && checked[13] == '1' && checked[14] == '1')
            setCriteriaK210('1')
          else setCriteriaK210('3')
        }

        if(questionInd == 18){
          if(checked[16] == '3' || checked[17] == '3' || checked[18] == '3'){
            goToCiumePatologico = true
            nextDisorder('1', '1', 'CiumePatologico')
          }
          else if(criteriaK206 == '1' && checked[8] == '1' && checked[9] == '1' && 
            checked[10] == '1' && criteriaK210 == '1' && checked[15] == '1'){
              goToCiumePatologico = true
              nextDisorder('1', '1', 'CiumePatologico')
          }
          else if(!(checked[8] == '3' && checked[9] == '3' && checked[10] == '3' && checked[15] == '3')){
            nextToK216 = true
            setLifetime('2')
            setPast('1')
          }
        }

        if(questionInd == 19){
          if(checked[19] == '1')
            nextToK215 = true
          setLifetime('3')
          setPast(checked[19])
        }

        if(questionInd == 20){
          nextToK217 = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[20] = checked[20]
              newArr[21] = null
              newArr[22] = '0'
              return newArr
          })
        }

        if(questionInd == 23){
          goToCiumePatologico = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[23] = checked[23]
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToCiumePatologico && !nextToK215 && !nextToK216 && !nextToK217){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK215){
          setQuestionInd(21)
          setNextInd(15)
        }
        else if(nextToK216){
          setQuestionInd(22)
          setNextInd(16)
        }
        else if(nextToK217){
          setQuestionInd(23)
          setNextInd(17)
        }
        else if(questionInd == 23) setFinish(true)
      }
      else alert("Responda todas as questões antes de prosseguir!")
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 23 && finish) nextDisorder(lifetime, past, 'CiumePatologico')
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
        case 2:
        case 3:
        case 6:
          return ["Critério A", "Sinais e sintomas de abstinência - Quando o parceiro está distante (física ou emocionalmente) ou mediante ameaça de abandono, podem ocorrer sintomas físicos, como: insônia, hiperatividade autonômica, tensão muscular, alteração de apetite, alteração de atividade motora com alternância entre períodos de letargia e intensa atividade."]
        case 9:
          return ["Critério B", "O comportamento de cuidar do parceiro ocorre em maior quantidade do que o indivíduo gostaria - O indivíduo costuma se queixar de manifestar atenção ao parceiro com maior frequência ou por período mais longo do que inicialmente pretendia."]
        case 10:
          return ["Critério C", "As atitudes para reduzir ou controlar o comportamento patológico são malsucedidas - As tentativas para diminuir ou interromper a atenção dispensada ao companheiro são frustradas."]
        case 11:
          return ["Critério D", "É despendido muito tempo para controlar as atividades do parceiro - A maior parte da energia e do tempo do indivíduo é gasta com atitudes e/ou pensamentos para manter o parceiro sob controle."]
        case 12:
        case 14:
          return ["Critério E", "Interesses e atividades anteriormente valorizadas costumam ser abandonados - Como o indivíduo passa a viver em função dos interesses do parceiro, as atividades propiciadoras da realização pessoal e desenvolvimento profissional são deixados de lado, incluindo: cuidado com filhos, investimentos profissionais, convívio com colegas, etc."]
        case 16:
          return ["Critério F", "O indivíduo tenta manter o relacionamento apesar dos problemas pessoais, familiares e profissionais, mesmo consciente dos danos, persiste a queixa de não conseguir controlar o próprio comportamento."]
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
                {questionInd >= 1 && questionInd < 16 ?
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
                {questionInd < 19 ? "Amor Patológico" : "Cronologia do Amor Patológico"}</Text>
          
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