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

export default function Hipersexualidade({route, navigation}){

    const { user, patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [answerK110, setAnswerK110] = useState('')
    const [criteriaK100, setCriteriaK100] = useState('')
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const qtdQuestions = [3, 2, 2, 3, 3, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1]

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

    const questionK85a = () =>{
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

    const questionK110 = () => {
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <RadioButton.Group onValueChange={value => setAnswerK110(value)} value={answerK110}>
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
                  Agora eu gostaria de lhe fazer algumas perguntas sobre seu comportamento sexual:</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 4:
            return(<>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
            </>)
          case 6:
              return questionK85a()
          case 8:
          case 11:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Quais dos seguintes comportamentos sexuais podem ter se tornado um problema para você?</Text>
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
                  Quais dos seguintes comportamentos sexuais podem ter se tornado um problema para você?</Text>
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
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
            return question3Choices()
          case 22:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Você diria que seus impulsos e pensamentos sobre sexo são ou eram:</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
          case 30:
          case 31:
            return question3Choices()
          case 32:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Durante pelo menos 6 meses, as suas fantasias, impulsos ou comportamentos sexuais foram tão intensos e frequentes que...</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              <View style={styles.containerQuestion}>
              <Text style={{color: '#00009c', fontSize: 15,  fontWeight: 'bold', marginVertical: 10, marginHorizontal: 20, textAlign: 'justify'}}>
                Observação: Desconsiderar os casos em que o indivíduo oculta seu comportamento sexual em virtude de estigma social, 
                disforia relativa à identidade de gênero ou à orientação sexual.</Text>
              </View>
            </>)
          case 34:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Durante pelo menos 6 meses, as suas fantasias, impulsos ou comportamentos sexuais foram tão intensos e frequentes que...</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 37:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Durante pelo menos 6 meses, as suas fantasias, impulsos ou comportamentos sexuais foram tão intensos e frequentes que...</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {checked[questionInd] == '3' ?
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholder='Especificar'
                    placeholderTextColor='gray'/>
              </View> : null}
            </>)
          case 39:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                  options={['Sim', 'Talvez', 'Não']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>{'Transtorno Afetivo Bipolar'}</Text>
              </View> )
          case 40:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                  options={['Sim', 'Talvez', 'Não']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>{'Efeito fisiológico de substância exógena'}</Text>
              </View> )
          case 41:
            return questionK110()
          case 42:
            return question2Choices(questionInd)
          case 43:
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
          case 44:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                  <RadioButton3Items direction={'column'} color={'#00009c'} questionInd={questionInd} 
                      options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
                  <View style={{marginBottom: 10}}/>
              </View>
            </>)
          case 45:
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
          case 46:
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
              disorder: 'Hipersexualidade',
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
            disorder: 'Hipersexualidade',
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
          lifetime: lifetime, past: past, disorderPrev: 'Transtorno de Hipersexualidade', 
          disorderNext: 'Internet'}))
    }

    async function saveAnswers(){
      registerAnswers().then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, disorderPrev: 'Transtorno de Hipersexualidade', 
          disorderNext: 'Internet'}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToInternet = false, nextToK113 = false, nextToK114 = false, nextToK114X = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if(questionInd == 5 && dateStart && dateEnd) success = true
      if(questionInd == 13 && checked[questionInd+2] == '3' && !input) success = false
      if(questionInd == 36) 
            if(checked[36] == '1' || (checked[36] == '3' && input)) success = true
            else success = false
      if(questionInd == 40 && answerK110) success = true
      if((questionInd == 44 || questionInd == 45) && input) success = true

      if(success){

        if(questionInd == 3 && checked[0] == '1' && checked[1] == '1' && 
            checked[2] == '1' && checked[3] == '1' && checked[4] == '1'){
              goToInternet = true
              saveDiagnosis('1', '1')
        }

        if(questionInd == 13 && checked[questionInd+2] == '3'){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd+2] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 21){
          if(checked[21] == '1' && checked[22] == '1' && checked[23] == '1')
            setCriteriaK100('1')
          else setCriteriaK100('3')
        }

        if(questionInd == 30){
          let qtdPresente = 0
          for(let i=17; i<=30; i++)
            if((i == 17 || i == 24 || i == 25 || i == 26 || i == 30) && checked[i] == '3')
              qtdPresente++
          console.log(qtdPresente)
          if(qtdPresente <= 1){
            goToInternet = true
            saveDiagnosis('1', '1')
          }
          else if(qtdPresente == 2 || qtdPresente == 3){
            nextToK114 = true
            setLifetime('2')
            setPast('1')
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 36){
          if(checked[36] == '3'){
            setChecked(() => {
              const newArr = checked.concat()
              newArr[37] = input
              return newArr
            })
            setInput('')
          }
          let criteriaK107a = '3', criteriaK107b = '3'
          if(checked[31] == '1' && checked[32] == '1') 
            criteriaK107a = '1'
          if(checked[33] == '1' && checked[34] == '1' && checked[35] == '1' && checked[36] == '1') 
            criteriaK107b='1'
          if(criteriaK107a == '1' && criteriaK107b == '1'){
            nextToK114 = true
            setLifetime('2')
            setPast('1')
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 39 && (parseInt(checked[38]) < 3 || parseInt(checked[39]) < 3)){
          nextToK114 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 40){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[40] = answerK110
            return newArr
          })
        }

        if(questionInd == 41){
          if(checked[41] == '1'){
            nextToK113 = true
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

        if(questionInd == 42){
          nextToK114X = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[42] = checked[42]
              newArr[43] = null
              newArr[44] = '0'
              return newArr
          })
        }

        if(questionInd == 44){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[44] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 45){
          goToInternet = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[45] = input
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToInternet && !nextToK113 && !nextToK114 && !nextToK114X){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK113){
          setQuestionInd(43)
          setNextInd(27)
        }
        else if(nextToK114){
          setQuestionInd(44)
          setNextInd(28)
        }
        else if(nextToK114X){
          setQuestionInd(45)
          setNextInd(29)
        }
        else if(questionInd == 45) setFinish(true)
      }
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 45 && finish) saveAnswers()
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
              <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd < 41 ? "Transtorno de Hipersexualidade" : "Cronologia do Transtorno de Hipersexualidade"}</Text>
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