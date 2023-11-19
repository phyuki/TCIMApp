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

export default function AmorPatologico({route, navigation}){

    const { user, patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const [criteriaK206, setCriteriaK206] = useState()
    const [criteriaK210, setCriteriaK210] = useState()
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const qtdQuestions = [1, 1, 3, 3, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1]

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
        <View style={styles.containerQuestion}>
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
            <View style={styles.containerQuestion}>
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
            <View style={styles.containerQuestion}>
              <Text style={styles.textQuestion}>
              {'Quando o seu parceiro(a) se afastava, ou dizia que gostaria de se afastar, como você se sentia?'}</Text>
              <View style={{marginBottom: 10}}/>
            </View>
            {question2Choices(questionInd)}
            {question2Choices(questionInd+1)}
            <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd+2)}</Text>
                <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+2} 
                  setChecked={setChecked}/>
                {checked[questionInd+2] != '1' ?
                <TextInput style={styles.input}
                  onChangeText={value => {
                    setChecked(() => {
                    const newArr = checked.concat()
                    newArr[questionInd+2] = value
                    return newArr
                  })}}
                  value={checked[questionInd+2]}
                  placeholder='Especificar'
                  placeholderTextColor='gray'/>: null}
            </View>
          </>)
        case 9:
        case 10:
        case 11:
          return question3Choices()
        case 12:
        case 14:
          return (<>
            <View style={styles.containerQuestion}>
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
          <View style={styles.containerQuestion}>
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
          </>)
        case 20:
          return question2Choices(questionInd)
        case 21:
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
        case 22:
          return(<>
            <View style={styles.containerQuestion}>
              <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
              <RadioButton3Items direction={'column'} color={'#00009c'} questionInd={questionInd} 
                options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
              <View style={{marginBottom: 10}}/>
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

    async function registerDiagnosis(lifetime, past, disorder) {

      let reqs = await fetch(config.urlRootNode+'reports', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              lifetime: lifetime,
              past: past,
              disorder: disorder,
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
            disorder: 'Amor Patologico',
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
      registerDiagnosis(lifetime, past, 'Amor Patologico').then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, disorderPrev: 'Amor Patológico', 
          disorderNext: 'CiumePatologico'}))
    }

    async function saveAnswers(){
      registerAnswers().then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, disorderPrev: 'Amor Patológico', 
          disorderNext: 'CiumePatologico'}))
    }

    async function skipCiumePatologico(){
      const amorpatologico = await registerDiagnosis('1', '1', 'Amor Patologico')
      const answers = await registerAnswers()
      registerDiagnosis('1', '1', 'Ciume Patologico').then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: '1', past: '1', disorderPrev: 'Amor Patológico', 
          disorderNext: 'DependenciaComida'}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToCiumePatologico = false, nextToK215 = false, nextToK216 = false, nextToK217 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if((questionInd == 22 || questionInd == 23) && input) success = true

      if(success){

        if(questionInd == 0 && checked[0] == '1'){
          goToCiumePatologico = true
          skipCiumePatologico()
        }

        if(questionInd == 5){
          if(checked[2] == '1' && checked[3] == '1' && checked[4] == '1' && 
            checked[5] == '1' && checked[6] == '1' && checked[7] == '1')
              setCriteriaK206('1')
          else setCriteriaK206('3')
        }

        if(questionInd == 13){
          if(checked[11] == '1' && checked[12] == '1' && checked[13] == '1' && checked[14] == '1')
            setCriteriaK210('1')
          else setCriteriaK210('3')
        }

        if(questionInd == 18){
          if(checked[16] == '3' || checked[17] == '3' || checked[18] == '3'){
            goToCiumePatologico = true
            saveDiagnosis('1', '1')
          }
          else if(criteriaK206 == '1' && checked[8] == '1' && checked[9] == '1' && 
            checked[10] == '1' && criteriaK210 == '1' && checked[15] == '1'){
              goToCiumePatologico = true
              saveDiagnosis('1', '1')
          }
          else if(!(checked[8] == '3' && checked[9] == '3' && checked[10] == '3' && checked[15] == '3')){
            nextToK216 = true
            setLifetime('2')
            setPast('1')
            registerDiagnosis('2', '1', 'Amor Patologico')
          }
        }

        if(questionInd == 19){
          if(checked[19] == '1'){
            nextToK215 = true
            setLifetime('3')
            setPast('1')
            registerDiagnosis('3', '1', 'Amor Patologico')
          }
          else{
            setLifetime('3')
            setPast('3')
            registerDiagnosis('3', '3', 'Amor Patologico')
          }
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

        if(questionInd == 22){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[22] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 23){
          goToCiumePatologico = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[23] = input
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
          setNextInd(14)
        }
        else if(nextToK216){
          setQuestionInd(22)
          setNextInd(15)
        }
        else if(nextToK217){
          setQuestionInd(23)
          setNextInd(16)
        }
        else if(questionInd == 23) setFinish(true)
      }
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 23 && finish) saveAnswers()
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
                {questionInd < 19 ? "Amor Patológico" : "Cronologia do Amor Patológico"}</Text>
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