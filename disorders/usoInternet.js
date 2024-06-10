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

export default function UsoDeInternet({route, navigation}){

    const { user, patient, questions, answers, scores, questionId } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [prevQuestion, setPrevQuestion] = useState([])
    const [finish, setFinish] = useState(false)
    const [answerK115A, setAnswerK115A] = useState('')
    const [criteriaK127, setCriteriaK127] = useState('')
    const [criteriaK136, setCriteriaK136] = useState('')
    const [answerK141, setAnswerK141] = useState('')
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const qtdQuestions = [1, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1, 2, 1, 3, 2, 1, 1, 1, 1, 1, 3, 2, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1]

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
      <View style={styles.containerQuestion}>
        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
        <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
           options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
      </View>
      )
    }

    const questionK115A = () => {
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <RadioButton.Group onValueChange={value => setAnswerK115A(value)} value={answerK115A}>
                <View style={styles.radioButton}>
                  <RadioButton value="1" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Não tive acesso à Internet</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="2" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Menos de 4 horas seguidas</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="3" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Entre 4 e 8 horas seguidas</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="4" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Entre 8 e 12 horas seguidas</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="5" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Mais de 12 horas seguidas</Text>
                </View>
          </RadioButton.Group>
          <View style={{marginBottom: 10}}/>
        </View>
      )
    }

    const questionK141 = () => {
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <RadioButton.Group onValueChange={value => setAnswerK141(value)} value={answerK141}>
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
            <View style={[styles.containerQuestion, {borderRadius: 10}]}>
                <Text style={styles.textQuestion}>
                  Agora eu gostaria de lhe perguntar sobre o seu uso da Internet</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {questionK115A()} 
            </>)
          case 2:
            return (<>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 5:
          case 8:
          case 11:
            return(<>
              <View style={[styles.containerQuestion, {borderRadius: 10}]}>
                <Text style={styles.textQuestion}>
                  Que tipos de páginas ou serviços da Internet você visita?</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 14:
            return(<>
              {!isKeyboardVisible &&
              <View style={[styles.containerQuestion, {borderRadius: 10}]}>
                <Text style={styles.textQuestion}>
                  Que tipos de páginas ou serviços da Internet você visita?</Text>
                <View style={{marginBottom: 10}}/>
              </View>}
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
          case 16:
            return(<>
              <View style={[styles.containerQuestion, {borderRadius: 10}]}>
                <Text style={styles.textQuestion}>
                  Que tipos de páginas ou serviços da Internet você visita?</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
            </>)
          case 18:
            return(<>
              {!isKeyboardVisible &&
              <View style={[styles.containerQuestion, {borderRadius: 10}]}>
                <Text style={styles.textQuestion}>
                  Que tipos de páginas ou serviços da Internet você visita?</Text>
                <View style={{marginBottom: 10}}/>
              </View>}
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
          case 20:
          case 21:
          case 22:
            return question3Choices()
          case 23:
            return(<>
              <View style={[styles.containerQuestion, {borderRadius: 10}]}>
                <Text style={styles.textQuestion}>
                Você se sentia excitado, estimulado, ou gratificado enquanto comprava? Com o passar do tempo, você notou que...</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
            </>)
          case 25:
            return question3Choices()
          case 26:
            return(<>
              <View style={[styles.containerQuestion, {borderRadius: 10}]}>
                <Text style={styles.textQuestion}>
                  Você diria que seus impulsos e pensamentos sobre sexo de usar a Internet são ou eram:</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 29:
            return(<>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
            </>)
          case 31:
          case 32:
          case 33:
          case 34:
          case 35:
            return question3Choices()
          case 36:
            return(<>
              <View style={[styles.containerQuestion, {borderRadius: 10}]}>
                <Text style={styles.textQuestion}>
                  Seu uso da Internet já causou problemas de relacionamento a ponto de...</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 39:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Seu uso da Internet já causou problemas de relacionamento a ponto de...</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
            </>)
          case 41:
          case 42:
            return question3Choices()
          case 43:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                  options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>{'Obs.: Sim = Atenção para Transtorno Afetivo Bipolar'}</Text>
              </View> )
          case 44:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Você diria que a sua perda de controle com a Internet acontece principalmente com...</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 47:
            return questionK141()
          case 48:
            return question2Choices(questionInd)
          case 49:
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
          case 50:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                  <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                          options={['Em remissão parcial', 'Em remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
              </View>
              </>)
          case 51:
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
                      maxLength={3}
                      keyboardType="numeric"
                      value={checked[questionInd]}
                      placeholder='Tempo em meses'
                      placeholderTextColor='grey'/>
              </View></>)
          case 52:
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
      navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, answers: answers, scores: scores, 
          questionId: questionId, disorderPrev: 'Transtorno por Uso Indevido de Internet', 
          disorderNext: 'Escoriacao'})
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToEscoriacao = false, nextToK144 = false, nextToK145 = false, nextToK145X = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+qtdQuestions[nextInd])

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]
      
      if(questionInd == 0 && answerK115A) success = true
      if(questionInd == 13 && checked[questionInd+1] == '3' && !input) success = false
      if(questionInd == 17 && checked[questionInd+1] == '3' && !input) success = false
      if(questionInd == 46 && answerK141) success = true
      if((questionInd == 50 || questionInd == 51) && input) success = true
      
      if(success){

        if(questionInd == 0){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd] = answerK115A
            return newArr
          })
        }

        if(questionInd == 1 && checked[1] == '1' && checked[2] == '1' && checked[3] == '1'){
          goToEscoriacao = true
          nextDisorder('1', '1')
        }

        if(questionInd == 13 && checked[questionInd+1] == '3'){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd+1] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 17 && checked[questionInd+2] == '3'){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd+1] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 22){
          if(checked[22] == '1' && checked[23] == '1') setCriteriaK127('1')
          else setCriteriaK127('3')
        }

        if(questionInd == 24){
          let qtdPresente = 0
          for(let i=19; i<=24; i++){
            if(i == 22) i++
            else if(checked[i] == '3') qtdPresente++
          }
          if(criteriaK127 == '3') qtdPresente++
          if(qtdPresente <= 1){
            goToEscoriacao = true
            nextDisorder('1', '1')
          }
          else if(qtdPresente < 5){
            nextToK145 = true
            setLifetime('2')
            setPast('1')
          }
        }

        if(questionInd == 38){
          if(checked[35] == '1' && checked[36] == '1' && checked[37] == '1' && 
              checked[38] == '1' && checked[39] == '1')
                setCriteriaK136('1')
          else setCriteriaK136('3')
        }

        if(questionInd == 41){
          if(!(checked[31] == '3' || checked[34] == '3' || criteriaK136 == '3')){
            nextToK145 = true
            setLifetime('2')
            setPast('1')
          }
        }

        if(questionInd == 42){
          if(checked[42] == '3'){
            goToEscoriacao = true
            nextDisorder('1', '1')
          }
          else if(checked[42] == '2'){
            nextToK145 = true
            setLifetime('2')
            setPast('1')
          }
        }

        if(questionInd == 43){
          if(checked[43] == '3' || checked[44] == '3' || checked[45] == '3'){
            nextToK145 = true
            setLifetime('2')
            setPast('1')
          }
        }

        if(questionInd == 46){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[46] = answerK141
            return newArr
          })
        }

        if(questionInd == 47){
          if(checked[47] == '1')
            nextToK144 = true
          setLifetime('3')
          setPast(checked[47])
        }

        if(questionInd == 48){
          nextToK145X = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[48] = checked[48]
              newArr[49] = null
              newArr[50] = '0'
              return newArr
          })
        }

        if(questionInd == 51){
          goToEscoriacao = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[51] = checked[51]
            return newArr
          })
        }

        setPrevQuestion(() => {
          const newArr = prevQuestion.concat()
          newArr.push([questionInd, nextInd])
          return newArr
        })

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToEscoriacao && !nextToK144 && !nextToK145 && !nextToK145X){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK144){
          setQuestionInd(49)
          setNextInd(28)
        }
        else if(nextToK145){
          setQuestionInd(50)
          setNextInd(29)
        }
        else if(nextToK145X){
          setQuestionInd(51)
          setNextInd(30)
        }
        else if(questionInd == 51) setFinish(true)
      }
      else Alert.alert("Aviso","Responda todas as questões antes de prosseguir!")
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 51 && finish) nextDisorder(lifetime, past)
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
        case 20:
          return ["Critério 1", "Dificuldade em controlar o uso da Internet conforme indicado por permanência por períodos de tempo superiores ao pretendido."]
        case 21:
          return ["Critério 2", "Esforços repetitivos e sem sucesso para controlar, diminuir ou parar o uso da Internet."]
        case 22:
          return ["Critério 3", "Torna-se inquieto ou irritado quando tenta reduzir ou parar ou se é impedido de usar a Internet."]
        case 23:
          return ["Critério 4", "Necessita utilizar a Internet por períodos de tempo crescentes para obter a sensação desejada, ou percebe uma redução no nível destas sensações obtidas com a mesma quantidade de uso da Internet."]
        case 25:
          return ["Critério 5", "Preocupa-se com o uso da Internet (ex. planeja o próximo acesso ou pensa em formas para se conectar)."]
        case 26:
          return ["Critério suplementar", "Possui impulsos para utilizar a Internet que são percebidos como incontroláveis, intrusivos, e/ou sem sentido."]
        case 29:
          return ["Critério suplementar", "Sensação crescente de tensão, excitação afetiva, ou estado disfórico emocional ou físico imediatamente antes de acessar a Internet."]
        case 31:
          return ["Critério suplementar", "Prazer, gratificação, satisfação ou alívio enquanto utilizava-se da Internet ou após terminar um acesso."]
        case 32:
          return ["Critério 6", "Utiliza a Internet como forma de fugir dos problemas ou para aliviar um humor disfórico (ex. sentimentos de desamparo, culpa, ansiedade, depressão)."]
        case 33:
          return ["Critério suplementar", "Desistência ou diminuição de importantes atividades sociais, ocupacionais, ou recreativas devido ao uso excessivo da Internet."]
        case 34:
          return ["Critério suplementar", "Repetidamente se envolve em uso excessivo da Internet apesar de sentimentos de culpa sobre o uso excessivo da Internet."]
        case 35:
          return ["Critério 7", "Mente para familiares, amigos, terapeuta, ou outros para esconder a extensão do uso da Internet."]
        case 36:
        case 39:
          return ["Critério 8", "Comprometeu ou perdeu um importante relacionamento, o emprego, ou uma oportunidade escolar ou no trabalho devido a uso excessivo da Internet."]
        case 41:
          return ["Critério suplementar", "Uso da Internet causa aflição clinicamente significativa."]
        case 42:
          return ["Critério suplementar", "“Desligamento” ou perda de noção de tempo enquanto usava a Internet de forma “automática”, como se não percebesse estar na Internet."]
        case 43:
          return ["Critério B", "O uso excessivo da Internet não ocorre exclusivamente durante Episódios de Hipomania ou Mania."]
        case 44:
          return ["Critério C", "O uso excessivo da Internet não é melhor explicado por Jogo Patológico, Transtorno do Comprar Impulsivo-Compulsivo, ou Transtorno de Comportamento Sexual Impulsivo-Compulsivo Não-Parafílico."]
        default:
          return ""
      }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,}}>
                      {questionInd >= 19 && questionInd <= 30 ? <>
                      <Text style={{marginBottom: 15, color: 'black', fontSize: 18, fontWeight: 'bold'}}>{"Critério A1"}</Text>
                      <Text style={{marginBottom: 15, color: 'black', fontSize: 16, textAlign: 'justify'}}>{"Comportamento mal-adaptado persistente e recorrente como resultado de uso excessivo da Internet conforme indicado pelos cinco critérios em questão (comportamento adicto)."}</Text>
                      </>: null}
                      {questionInd >= 31 && questionInd <= 41 ? <>
                      <Text style={{marginBottom: 15, color: 'black', fontSize: 18, fontWeight: 'bold'}}>{"Critério A2"}</Text>
                      <Text style={{marginBottom: 15, color: 'black', fontSize: 16, textAlign: 'justify'}}>{"Comportamento mal-adaptado, persistente e recorrente como resultado de uso excessivo da Internet, indicado pelos critérios abaixo (sofrimento ocupacional, interpessoal, ou subjetivo)."}</Text>
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
                {questionInd >= 19 && questionInd < 44 ?
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
          <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd < 47 ? "Transtorno por Uso Indevido de Internet" : "Cronologia do Transtorno por Uso Indevido de Internet"}</Text>
          
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
              keyboardVerticalOffset={80}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1, justifyContent: 'space-evenly'}}>
                    {showQuestion()}
          </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
          {(!isKeyboardVisible || questionInd > 47) &&
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