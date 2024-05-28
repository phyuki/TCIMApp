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
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import config from '../config/config.json'
import RadioButton3Items from '../radiobutton3Items';
import { RadioButton } from 'react-native-paper';
import RadioButtonHorizontal from '../radiobutton';
import { TextInputMask } from 'react-native-masked-text';

export default function JogoPatologico({route, navigation}){

    const { user, patient, questions, answers, scores, questionId } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [dateStart, setDateStart] = useState()
    const [dateEnd, setDateEnd] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const qtdQuestions = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

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
          <Text style={styles.textQuestion}>Início do Período</Text>
          <TextInputMask
            style={{ height: 40, marginHorizontal: 20, marginVertical: 10, color: 'black', borderBottomColor: 'black', borderBottomWidth: 0.5}}
            type={'datetime'}
            options={{ format: 'MM/AA' }}
            placeholder="MM/AA"
            placeholderTextColor='gray'
            value={dateStart}
            onChangeText={setDateStart}
          />
          <Text style={styles.textQuestion}>Término do Período</Text>
          <TextInputMask
            style={{ height: 40, marginHorizontal: 20, marginVertical: 10, color: 'black', borderBottomColor: 'black', borderBottomWidth: 0.5}}
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
          case 5:
            return questionsK32()
          case 7:
          case 9:
          case 11:
          case 13:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={{ color: '#000', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginVertical: 10, textAlign: 'justify' }}>
                  Apostar em algum dos jogos a seguir já lhe causou um problema, ou você sentiu que apostou descontroladamente em algum deles?</Text>
              </View>
                {questionsK32()}
              </>)
          case 15:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={{ color: '#000', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginVertical: 10, textAlign: 'justify' }}>
                  Apostar em algum dos jogos a seguir já lhe causou um problema, ou você sentiu que apostou descontroladamente em algum deles?</Text>
              </View>
                {questionsK32()}
              </>)
          case 17:
            return(
              <>
              {!isKeyboardVisible && <View style={styles.containerQuestion}>
                <Text style={{ color: '#000', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginVertical: 10, textAlign: 'justify' }}>
                  Apostar em algum dos jogos a seguir já lhe causou um problema, ou você sentiu que apostou descontroladamente em algum deles?</Text>
              </View>}
              {question2Choices(questionInd)}
              {isKeyboardVisible && <View style={{marginTop: 30}}/>}
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
              </View></>
            )
          case 19:
            return(<>
              {!isKeyboardVisible && <View style={styles.containerQuestion}>
                <Text style={{ color: '#000', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginVertical: 10, textAlign: 'justify' }}>
                  Apostar em algum dos jogos a seguir já lhe causou um problema, ou você sentiu que apostou descontroladamente em algum deles?</Text>
              </View>}
              {question2Choices(questionInd)}
              {isKeyboardVisible && <View style={{marginTop: 40}}/>}
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
                <Text style={[styles.textQuestion, {marginBottom: 15}]}>Agora, eu gostaria de lhe fazer mais perguntas em relação ao período no qual o seu comportamento de jogar estava mais fora do controle, ou quando o comportamento de jogar lhe causou mais problemas. Durante este período…</Text>
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
                <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                  options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>Obs.: Sim = Atenção para Transtorno Afetivo Bipolar</Text>
              </View>
              )
          case 32:
            return question2Choices(questionInd)
          case 33:
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
          case 34:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                  <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, marginBottom: -20, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                          options={['Em remissão parcial', 'Em remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
              </View>
              </>)
          case 35:
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
          case 36:
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

    async function nextDisorder(lifetime, past){
      const current = upSize(checked)
      let id = questions.map((array) => array[0])
      if(checked[1]) id = repeat(id, 1)
      while(current.length < id.length) current.push(undefined)
      scores.push([lifetime, past])
      questionId.push(id)
      answers.push(current)

      navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, answers: answers, scores: scores, 
          questionId: questionId, disorderPrev: 'Jogo Patológico', disorderNext: 'Trico'})
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
      if(questionInd == 16 && checked[questionInd+1] == '3' && !input) success = false
      if(questionInd == 18 && checked[questionInd+1] == '3' && !input) success = false
      if((questionInd == 34 || questionInd == 35) && input) success = true
      
      if(success){

        if(questionInd == 0 && checked[0] == '1'){ 
          goToTrico = true
          nextDisorder('1', '1')
        }

        if(questionInd == 1){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[1] = [dateStart, dateEnd]
            return newArr
          })
        }

        if(questionInd == 4 && checked[2] == '1' && checked[3] == '1' && checked[4] == '1' 
            && checked[5] == '1'){
            goToTrico = true
            nextDisorder('1', '1')
        }

        if((questionInd == 16 || questionInd == 18) && checked[questionInd+1] == '3'){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd+1] = input
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
            nextDisorder('1', '1')
          }
          else if(qtdCriteria <= 3){
            nextToK48 = true
            setLifetime('2')
            setPast('1')
          }
        }

        if(questionInd == 30){
          if(checked[30] == '3'){
            goToTrico = true
            nextDisorder('1', '1')
          }
          else if(checked[30] == '2'){
            nextToK48 = true
            setLifetime('2')
            setPast('1')
          }
        }

        if(questionInd == 31){
          if(checked[31] == '1')
            nextToK47 = true
          setLifetime('3')
          setPast(checked[31])
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

        if(questionInd == 35){
          goToTrico = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[35] = checked[35]
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
          setNextInd(24)
        }
        else if(nextToK48){
          setQuestionInd(34)
          setNextInd(25)
        }
        else if(nextToK49){
          setQuestionInd(35)
          setNextInd(26)
        }
        else if(questionInd == 35) setFinish(true)
      }
    }

    useEffect(() => {
        showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 35 && finish) nextDisorder(lifetime, past)
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
        case 21:
          return ["Critério A4", "Preocupação frequente com o jogo (p. ex., apresenta pensamentos persistentes sobre experiências de jogo passadas, avalia possibilidades ou planeja a quantia a ser apostada, pensa em modos de obter dinheiro para jogar)."]
        case 22:
          return ["Critério A1", "Necessidade de apostar quantias de dinheiro cada vez maiores a fim de atingir a excitação desejada."]
        case 23:
          return ["Critério A3", "Fez esforços repetidos e malsucedidos no sentido de controlar, reduzir, ou interromper o hábito de jogar."]
        case 24:
          return ["Critério A2", "Inquietude ou irritabilidade quando tenta reduzir ou interromper o hábito de jogar."]
        case 25:
          return ["Critério A5", "Frequentemente joga quando se sente angustiado (p.ex., sentimentos de impotência, culpa, ansiedade, depressão)."]
        case 26:
          return ["Critério A6", "Após perder dinheiro no jogo, frequentemente volta outro dia para ficar quite (“recuperar o prejuízo”)."]
        case 27:
          return ["Critério A7", "Mente para esconder a extensão de seu envolvimento com o jogo."]
        case 28:
          return ["Critério de gravidade", "Cometeu atos ilegais como estelionato, fraude ou furto para financiar o comportamento de jogo."]  
        case 29:
          return ["Critério A8", "Pôs em perigo ou perdeu um relacionamento, emprego, oportunidade profissional ou educacional importante por causa do comportamento de jogo."]
        case 30:
          return ["Critério A9", "Depende de outras pessoas para obter dinheiro a fim de saldar situações financeiras desesperadoras causadas pelo jogo."]          
        case 31:
          return ["Critério B", "O comportamento de jogo não é melhor explicado por um episódio maníaco."]
        default:
          return ""
      }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,}}>
                      {questionInd >= 20 && questionInd <= 29 ? <>
                      <Text style={{marginBottom: 15, color: 'black', fontSize: 18, fontWeight: 'bold'}}>{"Critério A"}</Text>
                      <Text style={{marginBottom: 15, color: 'black', fontSize: 16, textAlign: 'justify'}}>{"Comportamento de jogo problemático persistente e recorrente levando a sofrimento, conforme indicado pela apresentação de 4 (ou mais) dos 9 itens em questão, em um período de 12 meses."}</Text>
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
                {questionInd >= 20 && questionInd < 31 ?
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
          {!isKeyboardVisible || questionInd > 31 ? 
            <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd < 31 ? "Jogo Patológico" : "Cronologia do Jogo Patológico"}</Text> 
                : <View style={{marginTop: 40}}/>}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={80}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1, justifyContent: 'space-evenly'}}>
                      {showQuestion()}
              </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
          {!isKeyboardVisible && 
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