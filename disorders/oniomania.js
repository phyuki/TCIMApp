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
import { TextInputMask } from 'react-native-masked-text';

export default function Oniomania({route, navigation}){

    const { user, patient, questions, answers, scores, questionId } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [prevQuestion, setPrevQuestion] = useState([])
    const [finish, setFinish] = useState(false)
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [answerK80, setAnswerK80] = useState('')
    const [criteriaK65, setCriteriaK65] = useState('')
    const [criteriaK67, setCriteriaK67] = useState('')
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const qtdQuestions = [2, 2, 2, 3, 3, 2, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

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
      return(<>
      <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
            setChecked={setChecked}/>
        </View>
      </>)
    }

    const question3Choices = () => {
      return (
      <View style={[styles.containerQuestion, {marginTop: -20}]}>
        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
        <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
           options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
      </View>
      )
    }

    const questionK61A = () =>{
      return (<>
          <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
            <TextInputMask
              style={{ height: 40, marginHorizontal: 20, marginVertical: 15, color: 'black', borderBottomColor: 'black', borderBottomWidth: 0.5}}
              type={'datetime'}
              options={{ format: 'MM/AA' }}
              placeholder="MM/AA"
              placeholderTextColor='gray'
              value={dateStart}
              onChangeText={setDateStart}
            />
          </View>
          <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
            <Text style={styles.textObs}>Caso seja o atual, coloque a data presente</Text>
            <TextInputMask
              style={{ height: 40, marginHorizontal: 20, marginBottom: 15, color: 'black', borderBottomColor: 'black', borderBottomWidth: 0.5}}
              type={'datetime'}
              options={{ format: 'MM/AA' }}
              placeholder="MM/AA"
              placeholderTextColor='gray'
              value={dateEnd}
              onChangeText={setDateEnd}
            />
            </View>
          </>
      )
    }

    const questionK80 = () => {
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <RadioButton.Group onValueChange={value => setAnswerK80(value)} value={answerK80}>
                <View style={styles.radioButton}>
                  <RadioButton value="1" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Sem dificuldade</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="2" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Alguma dificuldade</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="3" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Muita dificuldade</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="4" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Dificuldade extrema</Text>
                </View>
          </RadioButton.Group>
          <View style={{marginBottom: 10}}/>
        </View>
      )
    }

    function showQuestion(){
      switch(questionInd+1){
          case 1:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={[styles.textQuestion, {marginBottom: 10}]}>
                  Agora eu gostaria de perguntar sobre a sua forma de comprar coisas:</Text>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
            </>)
          case 3:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Agora eu gostaria de perguntar sobre a sua forma de comprar coisas:</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
            </>)
          case 5:
            return questionK61A()
          case 7:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Quais das alternativas de compras têm sido mais problemáticas para você?</Text>
                  <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>
            )
          case 10:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Quais das alternativas de compras têm sido mais problemáticas para você?</Text>
                  <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>
            )
          case 13:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Quais das alternativas de compras têm sido mais problemáticas para você?</Text>
                  <View style={{marginBottom: 10}}/>
              </View>
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
          case 15:
          case 16:
          case 17:
            return question3Choices()
          case 18:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                Você se sentia excitado, estimulado, ou gratificado enquanto comprava? Com o passar do tempo, você notou que...</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
            </>
            )
          case 20:
            return question3Choices()
          case 21:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                Você diria que seus impulsos e pensamentos sobre compras são ou eram:</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>
            )
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
          case 30:
          case 31:
          case 32:
          case 33:
          case 34:
            return question3Choices()
          case 35:
            return (
              <View style={[styles.containerQuestion, {marginTop: -20}]}>
                <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                  options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>{'Obs.: Sim = Atenção para Transtorno Afetivo Bipolar'}</Text>
              </View>
              )
          case 36:
            return questionK80()
          case 37:
            return question2Choices(questionInd)
          case 38:
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
          case 39:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                  <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                          options={['Em remissão parcial', 'Em remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
              </View>
              </>)
          case 40:
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
          case 41:
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

    async function nextDisorder(lifetime, past){
      let id = questions.map((array) => array[0])
      while(checked.length < id.length) checked.push(undefined)
      scores.push([lifetime, past])
      questionId.push(id)
      answers.push(checked)
      navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, answers: answers, scores: scores, 
          questionId: questionId, disorderPrev: 'Oniomania', disorderNext: 'Hipersexualidade'})
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToHipersexualidade = false, nextToK83 = false, nextToK84 = false, nextToK84X = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if(questionInd == 4 && dateStart && dateEnd) success = true
      if(questionInd == 10 && checked[questionInd+3] == '3' && !input) success = false
      if(questionInd == 35 && answerK80) success = true
      if((questionInd == 39 || questionInd == 40) && input) success = true

      if(success){

        if(questionInd == 2 && checked[0] == '1' && checked[1] == '1' && 
            checked[2] == '1' && checked[3] == '1'){
              goToHipersexualidade = true
              nextDisorder('1', '1')
        }

        if(questionInd == 12 && checked[questionInd+1] == '3'){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd+1] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 17){
          if(checked[17] == '1' && checked[18] == '1') setCriteriaK65('1')
          else setCriteriaK65('3')
        }

        if(questionInd == 20){
          if(checked[20] == '1' && checked[21] == '1' && checked[22] == '1') setCriteriaK65('1')
          else setCriteriaK67('3')
        }

        if(questionInd == 33){
          let qtdPresente = 0
          for(let i=14; i<=33; i++){
            if(i == 17){
              if(criteriaK65 == '3') qtdPresente++
              i = 18
            }
            else if(i == 20){
              if(criteriaK67 == '3') qtdPresente++
              i = 22
            }
            else if(checked[i] == '3') qtdPresente++
          }
          console.log(qtdPresente)
          if(qtdPresente < 2){
            goToHipersexualidade = true
            nextDisorder('1', '1')
          }
          else if(qtdPresente == 2){
            nextToK84 = true
            setLifetime('2')
            setPast('1')
          }
        }

        if(questionInd == 34){
          if(checked[34] == '3'){
            goToHipersexualidade = true
            nextDisorder('1', '1')
          }
          else if(checked[34] == '2'){
            nextToK84 = true
            setLifetime('2')
            setPast('1')
          }
        }

        if(questionInd == 35){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[35] = answerK80
            return newArr
          })
          if(answerK80 == '1'){
            goToHipersexualidade = true
            nextDisorder('1', '1')
          }
          else if(answerK80 == '2'){
            nextToK84 = true
            setLifetime('2')
            setPast('1')
          }
        }
    
        if(questionInd == 36){
          if(checked[36] == '1')
            nextToK83 = true
          setLifetime('3')
          setPast(checked[36])
        }

        if(questionInd == 37){
          nextToK84X = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[37] = checked[37]
              newArr[38] = null
              newArr[39] = '0'
              return newArr
          })
        }

        if(questionInd == 40){
          goToHipersexualidade = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[40] = checked[40]
            return newArr
          })
        }

        setPrevQuestion(() => {
          const newArr = prevQuestion.concat()
          newArr.push([questionInd, nextInd])
          return newArr
        })

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToHipersexualidade && !nextToK83 && !nextToK84 && !nextToK84X){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK83){
          setQuestionInd(38)
          setNextInd(26)
        }
        else if(nextToK84){
          setQuestionInd(39)
          setNextInd(27)
        }
        else if(nextToK84X){
          setQuestionInd(40)
          setNextInd(28)
        }
        else if(questionInd == 40) setFinish(true)
      }
      else Alert.alert("Aviso","Responda todas as questões antes de prosseguir!")
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 40 && finish) nextDisorder(lifetime, past)
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
        case 15:
          return ["Critério A1", "Dificuldade em controlar as compras indicadas por períodos maiores do que planejados ou gastando mais do que pretendia."]
        case 16:
          return ["Critério A2", "Repetidos insucessos em controlar, cortar ou parar o comprar excessivo."]
        case 17:
          return ["Critério A3", "Inquietude ou irritabilidade quando tenta reduzir ou controlar o hábito de comprar."]
        case 18:
          return ["Critério A4", "Necessidade de gastar mais tempo comprando ou gastar mais dinheiro para atingir os sentimentos desejados ou experimentou uma diminuição no nível de excitação atingido com o mesmo tempo ou quantia de dinheiro gasto."]
        case 20:
          return ["Critério A5", "Preocupação frequente com o compras (p. ex., apresenta pensamentos persistentes sobre possibilidades de compras ou tem pensamentos recorrentes sobre como viabilizar compras futuras."]
        case 21:
          return ["Critério A6", "Sente impulsos para comprar que são experimentados como incontroláveis, intrusivos e/ou sem sentido."]
        case 24:
          return ["Critério A7", "Aumento de tensão, disforia ou sensação de desconforto físico antes da compra."]
        case 25:
          return ["Critério A8", "Prazer, gratificação, satisfação ou alívio enquanto compra ou logo após."]  
        case 26:
          return ["Critério A9", "Comprar como uma forma de escapar dos problemas ou como alívio de um humor disfórico (ex. sentimento de desesperança, culpa, ansiedade ou tristeza)."]
        case 27:
          return ["Critério A10", "Vida social, ocupacional, ou atividades recreativas prejudicadas ou diminuídas pelo comprar excessivo."]          
        case 28:
          return ["Critério A11", "Repetidos engajamentos em comprar excessivo gerando sentimentos de culpa."]
        case 29:
          return ["Critério A12", "Mentir para membros da família, amigos, terapeuta ou outros a quem possa interessar."]  
        case 30:
          return ["Critério A13", "Já prejudicou ou perdeu um relacionamento importante, trabalho, escola ou oportunidade na carreira devido à compra excessiva."]
        case 31:
          return ["Critério A14", "O comprar excessivo causa estresse clinicamente significativo."]  
        case 32:
          return ["Critério A15", "Problemas financeiros significativos devido às compras excessivas."] 
        case 33:
          return ["Critério A16", "Pedir dinheiro a outros para resolver os problemas financeiros causados pelas compras excessivas."]         
        case 34:
          return ["Critério A17", "Comprou coisas que nunca foram usadas."]    
        case 35:
          return ["Critério B", "O comportamento de comprar excessivamente não é melhor explicado por um episódio maníaco."]         
        case 36:
          return ["Critério C", "O ato de comprar excessivamente causa sofrimento clinicamente significativo, OU prejuízo no funcionamento social, profissional, OU em outras áreas importantes da vida do indivíduo."] 
        default:
          return ""
      }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,}}>
                      {questionInd >= 14 && questionInd <= 33 ? <>
                      <Text style={{marginBottom: 15, color: 'black', fontSize: 18, fontWeight: 'bold'}}>{"Critério A"}</Text>
                      <Text style={{marginBottom: 15, color: 'black', fontSize: 16, textAlign: 'justify'}}>{"Comportamento mal adaptativo persistente e recorrente como resultado excessivo de comprar sendo indicado por pelo menos 3 dos 17 itens em questão."}</Text>
                      </>: null}
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
                {questionInd >= 14 && questionInd < 36 ?
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
          {!isKeyboardVisible || questionInd == 12 ? 
          <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', marginTop: 20, marginHorizontal: 20, textAlign: 'center'}}>
              {questionInd < 36 ? "Oniomania" : "Cronologia da Oniomania"}</Text>
              : <View style={{marginTop: 40}} />}
          
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <KeyboardAvoidingView
                keyboardVerticalOffset={80}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1, justifyContent: 'space-evenly'}}>
                    {showQuestion()}
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            {(!isKeyboardVisible || questionInd == 39 || questionInd == 40) &&
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