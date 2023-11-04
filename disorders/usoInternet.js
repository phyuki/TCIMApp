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

export default function UsoDeInternet({route, navigation}){

    const { patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const [answerK115A, setAnswerK115A] = useState('')
    const [criteriaK127, setCriteriaK127] = useState('')
    const [criteriaK136, setCriteriaK136] = useState('')
    const [answerK141, setAnswerK141] = useState('')
    const qtdQuestions = [1, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 1, 3, 2, 1, 1, 1, 1, 1, 3, 2, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1]

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
            <View style={styles.containerQuestion}>
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
              <View style={styles.containerQuestion}>
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
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Que tipos de páginas ou serviços da Internet você visita?</Text>
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
              {question2Choices(questionInd+2)}
            </>)
          case 17:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Que tipos de páginas ou serviços da Internet você visita?</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd+2)}</Text>
                <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+2} 
                  setChecked={setChecked}/>
                {checked[questionInd+2] == '3' ?
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
              <View style={styles.containerQuestion}>
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
              <View style={styles.containerQuestion}>
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
              <View style={styles.containerQuestion}>
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
                  options={['Sim', 'Talvez', 'Não']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>{'Transtorno Afetivo Bipolar'}</Text>
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
            return (<>
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
              </View>
            </>)
          case 50:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'column'} color={'#00009c'} questionInd={questionInd} 
                  options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
                <View style={{marginBottom: 10}}/>
              </View>
            </>)
          case 51:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}
                  placeholderTextColor='grey'/>
              </View></>)
          case 52:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}
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
              disorder: 'Uso Indevido de Internet',
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
            disorder: 'Uso Indevido de Internet',
            answers: checked,
            patientId: patient,
            questionId: questionId
          })
      })
      let resp = await reqs.json()
      return resp
    }

    async function queryEscoriacao() {

      let newUrl = new URL(config.urlRootNode+'disorders'),
          params={disorder: 'Escoriacao'}
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
      const questions = await queryEscoriacao()
      const answers = await registerAnswers()
      registerDiagnosis(lifetime, past).then(
          navigation.navigate('Escoriacao', {patient: patient, questions: questions}))
    }

    async function saveAnswers(){
      const questions = await queryEscoriacao()
      registerAnswers().then(
        navigation.navigate('Escoriacao', {patient: patient, questions: questions}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToEscoriacao = false, nextToK144 = false, nextToK145 = false, nextToK145X = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if(questionInd == 0 && answerK115A) success = true
      if(questionInd == 13 && checked[questionInd+1] == '3' && !input) success = false
      if(questionInd == 16 && checked[questionInd+2] == '3' && !input) success = false
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
          saveDiagnosis('1', '1')
        }

        if(questionInd == 13 && checked[questionInd+1] == '3'){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd+2] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 16 && checked[questionInd+2] == '3'){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd+2] = input
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
            saveDiagnosis('1', '1')
          }
          else if(qtdPresente < 5){
            nextToK145 = true
            registerDiagnosis('2', '1')
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
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 42){
          if(checked[42] == '1'){
            goToEscoriacao = true
            saveDiagnosis('1', '1')
          }
          else if(checked[42] == '2'){
            nextToK145 = true
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 43){
          if(checked[43] == '3' || checked[44] == '3' || checked[45] == '3'){
            nextToK145 = true
            registerDiagnosis('2', '1')
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
          if(checked[47] == '1'){
            nextToK144 = true
            registerDiagnosis('3', '1')
          }
          else
            registerDiagnosis('3', '3')
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

        if(questionInd == 50){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[50] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 51){
          goToEscoriacao = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[51] = input
            return newArr
          })
        }

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
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 51 && finish) saveAnswers()
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
              <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd < 47 ? "Transtorno por Uso Indevido de Internet" : "Cronologia do Transtorno por Uso Indevido de Internet"}</Text>
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
})