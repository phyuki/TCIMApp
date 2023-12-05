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
import RadioButtonHorizontal from '../radiobutton';
import { RadioButton } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';

export default function Cleptomania({route, navigation}){

    const { user, patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    //Variáveis para controlar o múltiplo input da questão K10A/K10B/K10C
    const [firstOpt, setFirstOpt] = useState('')
    const [secondOpt, setSecondOpt] = useState('')
    const [thirdOpt, setThirdOpt] = useState('')
    //Vetor para controlar a questão K10D -> Múltipla escolha
    const [answerK10D, setAnswerK10D] = useState([])
    //Variável para controlar a questão K10E
    const [answerK10E, setAnswerK10E] = useState('')
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const qtdQuestions = [1, 3, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1]

    const textQuestion = (index) => {
      return questions[index][1]+" - "+questions[index][2]
    }

    const question2Choices = (questionInd) => {
      return(
      <View style={{marginBottom: 10}}>
        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
        <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
          setChecked={setChecked}/>
      </View>
      )
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

    const questionK10D = () => {
      return (<>
        <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
            <View style={styles.radioButton}>
              <Checkbox
                status={answerK10D[0] ? 'checked' : 'unchecked'}
                onPress={() => setAnswerK10D(() => {
                  const newArr = answerK10D.concat()
                  newArr[0] ? newArr[0] = null : newArr[0] = 'Jogou fora ou destruiu'
                  return newArr
              })}
              />
              <Text style={styles.textRadioButton}>Jogou fora ou destruiu</Text>
          </View>
          <View style={styles.radioButton}>
            <Checkbox
                status={answerK10D[1] ? 'checked' : 'unchecked'}
                onPress={() => setAnswerK10D(() => {
                  const newArr = answerK10D.concat()
                  newArr[1] ? newArr[1] = null : newArr[1] = 'Guardou, mas não usou'
                  return newArr
              })}
              />
              <Text style={styles.textRadioButton}>Guardou, mas não usou</Text>
          </View>
          <View style={styles.radioButton}>
            <Checkbox
                status={answerK10D[2] ? 'checked' : 'unchecked'}
                onPress={() => setAnswerK10D(() => {
                  const newArr = answerK10D.concat()
                  newArr[2] ? newArr[2] = null : newArr[2] = 'Guardou e usou'
                  return newArr
              })}
              />
              <Text style={styles.textRadioButton}>Guardou e usou</Text>
          </View>
          <View style={styles.radioButton}>
            <Checkbox
                status={answerK10D[3] ? 'checked' : 'unchecked'}
                onPress={() => setAnswerK10D(() => {
                  const newArr = answerK10D.concat()
                  newArr[3] ? newArr[3] = null : newArr[3] = 'Doou, ou deu para alguém'
                  return newArr
              })}
              />
              <Text style={styles.textRadioButton}>Doou, ou deu para alguém</Text>
          </View>
          <Text style={styles.textObs}>Observação: Pode assinalar mais de uma alternativa.</Text>
        </View>
      </>)
    }

    const questionK10E = () => {
      return (<>
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <RadioButton.Group onValueChange={value => setAnswerK10E(value)} value={answerK10E}>
                <View style={styles.radioButton}>
                  <RadioButton value="Diariamente, quase todo dia" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Diariamente, quase todo dia</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="3 a 4 vezes por semana" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>3 a 4 vezes por semana</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="1 a 2 vezes por semana" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>1 a 2 vezes por semana</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="2 a 3 vezes por mês" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>2 a 3 vezes por mês</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="1 vez por mês ou menos" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>1 vez por mês ou menos</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="1 a 3 vezes nos últimos 6 meses" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>1 a 3 vezes nos últimos 6 meses</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="1 a 3 vezes nos últimos 12 meses" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>1 a 3 vezes nos últimos 12 meses</Text>
                </View>
              </RadioButton.Group>
              <Text style={styles.textObs}>Observação: Assinar apenas uma alternativa.</Text>
          </View>
      </>)
    }

    function showQuestion(){
      switch(questionInd+1){
          case 1:
            return question3Choices()
          case 2:
            return (<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                  <TextInput style={styles.input}
                        onChangeText={setFirstOpt}
                        value={firstOpt}
                        placeholder='1º objeto mais roubado'
                        placeholderTextColor='grey'/>
                  <TextInput style={styles.input}
                        onChangeText={setSecondOpt}
                        value={secondOpt}
                        placeholder='2º objeto mais roubado'
                        placeholderTextColor='grey'/>
                  <TextInput style={styles.input}
                        onChangeText={setThirdOpt}
                        value={thirdOpt}
                        placeholder='3º objeto mais roubado'
                        placeholderTextColor='grey'/> 
              </View>
            </>)
          case 5:
            return questionK10D()
          case 6:
            return questionK10E()
          case 7:
            return question3Choices()
          case 8:
              return question3Choices()
          case 9:
              return (<>
                <View style={styles.containerQuestion}>
                  <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold', marginHorizontal: 20, marginVertical: 15, textAlign: 'justify'}}>
                    Você roubou coisas somente quando...</Text>
                </View>
                <View style={styles.containerQuestion}>{question2Choices(questionInd)}</View>
                <View style={styles.containerQuestion}>{question2Choices(questionInd+1)}</View>
              </>)
          case 11:
              return (<>
                <View style={styles.containerQuestion}>
                  {question2Choices(questionInd)}
                  <Text style={styles.textObs}>{'Obs.: Sim = Atenção para Transtorno de conduta'}</Text>
                </View>
              </>)
          case 12:
              return (<>
                <View style={styles.containerQuestion}>{question2Choices(questionInd)}
                <Text style={styles.textObs}>{'Obs.: Sim = Atenção para Transtorno antissocial de personalidade'}</Text>
                </View>
                <View style={styles.containerQuestion}>{question2Choices(questionInd+1)}
                <Text style={styles.textObs}>{'Obs.: Sim = Mania ou hipomania'}</Text>
                </View>
              </>)
          case 14:
              return (<>
                <View style={styles.containerQuestion}>
                  {question2Choices(questionInd)}
                </View>
              </>)
          case 15:
            return (<>
              <View style={styles.containerQuestion}>
              <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                  <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'row'} color={'black'} questionInd={questionInd} 
                          options={['Leve', 'Moderado', 'Grave']} checked={checked} setChecked={setChecked}/>
                      
                      <Text style={[styles.textObs, {marginBottom: 0, textAlign: 'justify'}]}>
                      Leve = Poucos (se alguns) sintomas excedendo aqueles necessários para o diagnóstico presente, e os sintomas resultam em não mais do que um 
                      comprometimento menor seja social ou no desempenho ocupacional.</Text>
                      <Text style={[styles.textObs, {marginBottom: 0, textAlign: 'justify'}]}>
                      Moderado = Sintomas ou comprometimento funcional entre “leve” e “grave” estão presentes.</Text>
                      <Text style={styles.textObs}>
                      Grave = Vários sintomas excedendo aqueles necessários para o diagnóstico, ou vários sintomas particularmente graves estão presentes, 
                      ou os sintomas resultam em comprometimento social ou ocupacional notável.</Text>
              </View>
              </>)
          case 16:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                  <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                          options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
                      <View style={{marginBottom: 10}}/>
              </View>
              </>)
          case 17:
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
              disorder: 'Clepto',
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
    
      const elemento = array[4];
      const resultado = [...array];
    
      for (let i = 0; i < repeticoes; i++) {
        resultado.splice(4, 0, elemento);
      }
    
      return resultado;
    }

    async function registerAnswers() {

      const answers = upSize(checked)

      let questionId = questions.map((array) => array[0]); 
      if(checked[4]){
        const numAnswersK10D = checked[4].length
        questionId = repeat(questionId, numAnswersK10D-1)
      }
      
      let reqs = await fetch(config.urlRootNode+'answers', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            disorder: 'Clepto',
            answers: answers,
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
          lifetime: lifetime, past: past, disorderPrev: 'Cleptomania', disorderNext: 'Piromania'}))
    }

    async function saveAnswers(){
      registerAnswers().then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, disorderPrev: 'Cleptomania', disorderNext: 'Piromania'}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToPyro = false, nextToK18 = false, nextToK19 = false, nextToK20 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if(questionInd == 1 && firstOpt) success = true
      if(questionInd == 4 && answerK10D) success = true
      if(questionInd == 5 && answerK10E) success = true
      if((questionInd == 16 || questionInd == 17) && input) success = true

      if(success){

        if(questionInd == 0 && checked[0] == '1'){ 
          goToPyro = true
          saveDiagnosis('1', '1')
        }

        if(questionInd == 1){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[1] = firstOpt
            newArr[2] = secondOpt
            newArr[3] = thirdOpt
            return newArr
        })}

        if(questionInd == 4){
          const answers = answerK10D.filter((item) => item !== null && item !== undefined)
          setChecked(() => {
            const newArr = checked.concat()
            newArr[4] = answers
            return newArr
        })}

        if(questionInd == 5){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[5] = answerK10E
            return newArr
        })}

        if((questionInd == 6 && checked[6] == '1') || (questionInd == 7 && checked[7] == '1')){
          nextToK19 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 8 && (checked[8] == '3' || checked[9] == '3')){
          nextToK19 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 10 && checked[10] == '3'){
          nextToK19 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 11){
          if((checked[11] == '3' || checked[12] == '3') || (checked[0] == '2' || checked[6] == '2' || checked[7] == '2')){
            nextToK19 = true
            setLifetime('2')
            setPast('1')
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 13){
          if(checked[13] == '1'){
            nextToK18 = true
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

        if(questionInd == 14){
          nextToK20 = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[14] = checked[14]
              newArr[15] = null
              newArr[16] = '0'
              return newArr
          })
        }

        if(questionInd == 16){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[16] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 17){
          goToPyro = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[17] = input
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToPyro && !nextToK18 && !nextToK19 && !nextToK20){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK18){
          setQuestionInd(15)
          setNextInd(11)
        }
        else if(nextToK19){
          setQuestionInd(16)
          setNextInd(12)
        }
        else if(nextToK20){
          setQuestionInd(17)
          setNextInd(13)
        }
        else if(questionInd == 17) setFinish(true)
      }
    }

    useEffect(() => {
        showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 17 && finish) saveAnswers()
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
          return ["Critério A", "Falha recorrente em resistir aos impulsos de roubar objetos que não são necessários para uso pessoal ou em razão do seu valor monetário."]
        case 7:
          return ["Critério B", "Sensação crescente de tensão imediatamente antes de cometer o furto."]
        case 8:
            return ["Critério C", "Prazer, gratificação, ou alívio no momento de cometer o furto."]
        case 9:
            return ["Critério D", "O ato de furtar NÃO é cometido para expressar raiva ou vingança e NÃO ocorre em resposta a um delírio, ou a uma alucinação."]
        case 11:
        case 12:
            return ["Critério E", "O roubar NÃO é melhor explicado por Transtorno de Conduta, Episódio Maníaco ou Personalidade Antissocial."]
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
                {!(questionInd > 0 && questionInd < 6) && questionInd < 13 ?
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
                {questionInd < 13 ? "Cleptomania" : "Cronologia da Cleptomania"}</Text>
          
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
      marginHorizontal: 20
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