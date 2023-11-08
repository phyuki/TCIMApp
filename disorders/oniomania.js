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
import { TextInputMask } from 'react-native-masked-text';

export default function Oniomania({route, navigation}){

    const { user, patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [answerK80, setAnswerK80] = useState('')
    const [criteriaK65, setCriteriaK65] = useState('')
    const [criteriaK67, setCriteriaK67] = useState('')
    const qtdQuestions = [4, 2, 4, 4, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

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
                <Text style={styles.textQuestion}>
                  Agora eu gostaria de perguntar sobre a sua forma de comprar coisas:</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginTop: -15}}>
                <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10, marginHorizontal: 20}}>
                    <RadioButton
                        value="1"
                        status={ checked[questionInd] === '1' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked(() => {
                            const newArr = checked.concat()
                            newArr[questionInd] = '1'
                            return newArr
                        })}
                        color='#0047AB'
                    />
                    <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold'}}>Não</Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10, marginHorizontal: 20}}>
                    <RadioButton
                            value="3"
                            status={ checked[questionInd] === '3' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked(() => {
                                const newArr = checked.concat()
                                newArr[questionInd] = '3'
                                return newArr
                            })}
                            color='#0047AB'
                    />
                    <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold'}}>Sim</Text>
                </View>
                </View>
              </View>
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
              {question2Choices(questionInd+3)}
            </>
            )
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
              {question2Choices(questionInd+3)}
            </>
            )
          case 11:
            return(<>
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
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                  options={['Sim', 'Talvez', 'Não']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>{'Transtorno Afetivo Bipolar'}</Text>
              </View>
              )
          case 36:
            return questionK80()
          case 37:
            return question2Choices(questionInd)
          case 38:
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
          case 39:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'#00009c'} questionInd={questionInd} 
                          options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
                      <View style={{marginBottom: 10}}/>
              </View>
            </>)
          case 40:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}
                  placeholderTextColor='grey'/>
              </View></>)
          case 41:
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
              disorder: 'Oniomania',
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
            disorder: 'Oniomania',
            answers: checked,
            patientId: patient,
            questionId: questionId
          })
      })
      let resp = await reqs.json()
      return resp
    }

    async function queryHipersexualidade() {

      let newUrl = new URL(config.urlRootNode+'disorders'),
          params={disorder: 'Hipersexualidade'}
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
      const questions = await queryHipersexualidade()
      const answers = await registerAnswers()
      registerDiagnosis(lifetime, past).then(
          navigation.navigate('Hipersexualidade', {user: user, patient: patient, questions: questions}))
    }

    async function saveAnswers(){
      const questions = await queryHipersexualidade()
      registerAnswers().then(
        navigation.navigate('Hipersexualidade', {user: user, patient: patient, questions: questions}))
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

        if(questionInd == 0 && checked[0] == '1' && checked[1] == '1' && 
            checked[2] == '1' && checked[3] == '1'){
              goToHipersexualidade = true
              saveDiagnosis('1', '1')
        }

        if(questionInd == 10 && checked[questionInd+3] == '3'){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd+3] = input
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
            saveDiagnosis('1', '1')
          }
          else if(qtdPresente == 2){
            nextToK84 = true
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 34){
          if(checked[34] == '1'){
            goToHipersexualidade = true
            saveDiagnosis('1', '1')
          }
          else if(checked[34] == '2'){
            nextToK84 = true
            registerDiagnosis('2', '1')
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
            saveDiagnosis('1', '1')
          }
          else if(answerK80 == '2'){
            nextToK84 = true
            registerDiagnosis('2', '1')
          }
        }
    
        if(questionInd == 36){
          if(checked[36] == '1'){
            nextToK83 = true
            registerDiagnosis('3', '1')
          }
          else
            registerDiagnosis('3', '3')
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

        if(questionInd == 39){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[39] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 40){
          goToHipersexualidade = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[40] = input
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToHipersexualidade && !nextToK83 && !nextToK84 && !nextToK84X){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK83){
          setQuestionInd(38)
          setNextInd(25)
        }
        else if(nextToK84){
          setQuestionInd(39)
          setNextInd(26)
        }
        else if(nextToK84X){
          setQuestionInd(40)
          setNextInd(27)
        }
        else if(questionInd == 40) setFinish(true)
      }
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 40 && finish) saveAnswers()
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
              <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', marginTop: 20, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd < 36 ? "Oniomania" : "Cronologia da Oniomania"}</Text>
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