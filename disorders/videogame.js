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

export default function Videogame({route, navigation}){

    const { user, patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [criteriaK175, setCriteriaK175] = useState()
    const [finish, setFinish] = useState(false)
    const qtdQuestions = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 2, 1, 1, 1, 2, 1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

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

    const questionK163 = (qtdAnswers, options) => {
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <RadioButton.Group onValueChange={value => {setChecked(() => {
                                                          const newArr = checked.concat()
                                                          newArr[questionInd] = value
                                                          return newArr
                                                        })}} value={checked[questionInd]}>
                <View style={styles.radioButton}>
                  <RadioButton value="1" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>{options[0]}</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="2" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>{options[1]}</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="3" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>{options[2]}</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="4" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>{options[3]}</Text>
                </View>
                {qtdAnswers == 5 ? <View style={styles.radioButton}>
                  <RadioButton value="5" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>{options[4]}</Text>
                </View> : null}
          </RadioButton.Group>
          <View style={{marginBottom: 10}}/>
        </View>
      )
    }

    const gameClassification = (questionInd) => {
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <RadioButton.Group onValueChange={value => {setChecked(() => {
                                                          const newArr = checked.concat()
                                                          newArr[questionInd] = value
                                                          return newArr
                                                        })}} value={checked[questionInd]}>
              <View style={styles.radioButton}>
                <RadioButton value="1" color='#0047AB'/>
                <Text style={styles.textRadioButton}>{'Ação (plataforma, tiro, luta, sobrevivência, etc.)'}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="2" color='#0047AB'/>
                <Text style={styles.textRadioButton}>{'Aventura (enredo, exploração e enigmas)'}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="3" color='#0047AB'/>
                <Text style={styles.textRadioButton}>{'RPG (encenação de papéis e roteiros)'}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="4" color='#0047AB'/>
                <Text style={styles.textRadioButton}>{'Simuladores (construção, administração, vida, carro, avião, etc.)'}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="5" color='#0047AB'/>
                <Text style={styles.textRadioButton}>{'Estratégia (artilharia, jogos de guerra, jogos de arena com múltiplos jogadores)'}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="6" color='#0047AB'/>
                <Text style={styles.textRadioButton}>{'Esportes (corrida, futebol, outros esportes coletivos, etc.)'}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="7" color='#0047AB'/>
                <Text style={styles.textRadioButton}>{'Outros (dança, música, quebra-cabeça, tipo “Candy Crush”, etc.)'}</Text>
              </View>
          </RadioButton.Group>
          <View style={{marginBottom: 10}}/>
        </View>
      )
    }

    const questionK163F = () => {
      return(<>
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>Você pode dar o nome dos jogos que você mais pratica? Em qual dos tipos abaixo esses jogos se classificam?</Text>
          <View style={{marginBottom: 10}}/>
        </View>
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <TextInput style={styles.input}
              onChangeText={value => {setChecked(() => {
                const newArr = checked.concat()
                newArr[questionInd] = value
                return newArr
              })}}
              value={checked[questionInd]}
              placeholderTextColor='gray'
              autoCapitalize='sentences'/>
        </View>
      </>)
    }

    const questionK189 = () => {
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <RadioButton.Group onValueChange={value => {setChecked(() => {
                                                          const newArr = checked.concat()
                                                          newArr[questionInd] = value
                                                          return newArr
                                                        })}} value={checked[questionInd]}>
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
            return (<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                Agora eu gostaria de conversar com você sobre jogos eletrônicos, videogames e jogos de celular, exceto outros jogos que envolvem apostas.</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}</>)
          case 2:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholderTextColor='gray'
                    maxLength={2}
                    keyboardType='numeric'/>
                <Text style={styles.textObs}>Observação: registre a idade de início da fase em que mais jogou na vida.</Text>
              </View> )
          case 3:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholderTextColor='gray'
                    maxLength={2}
                    keyboardType='numeric'/>
                <Text style={styles.textObs}>Observação: marcar a idade atual se o momento presente for a fase de maior frequência de game na vida do indivíduo.</Text>
              </View> )
          case 4:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholderTextColor='gray'
                    maxLength={2}
                    keyboardType='numeric'/>
              </View> )
          case 5:
            return questionK163(5, ['Não tenho jogado', 'Menos de 4 horas seguidas', 'Entre 4 e 8 horas seguidas', 'Entre 8 e 12 horas seguidas', 'Mais de 12 horas seguidas'])
          case 6:
            return questionK163(5, ['Menos que uma vez por semana', '1 a 2 vezes por semana', '3 a 4 dias por semana', '5 a 6 dias por semana', 'Diariamente'])
          case 7:
            return questionK163(4, ['Apenas 1', 'Apenas 2', 'Apenas 3', 'Praticou mais do que 3 jogos regularmente no último mês'])
          case 8:
            return questionK163F()
          case 9:
            return gameClassification(questionInd)
          case 10:
            return questionK163F()
          case 11:
            return gameClassification(questionInd)
          case 12:
            return questionK163F()
          case 13:
            return gameClassification(questionInd)
          case 14:
            return(<>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 17:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Por favor, indique os locais e as plataformas mais comuns de jogo para você:</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 20:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Por favor, indique os locais e as plataformas mais comuns de jogo para você:</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 23:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  Por favor, indique os locais e as plataformas mais comuns de jogo para você:</Text>
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
          case 25:
            return (<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                Agora, eu gostaria de lhe fazer mais perguntas em relação ao período no qual o seu comportamento de jogar estava mais frequente ou quando o comportamento de jogar causou mais problemas na sua vida. Durante aquele período…</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question3Choices()}
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Obs.: Este transtorno é distinto dos jogos de azar pela Internet, que estão inclusos no transtorno de jogo.</Text>
              </View>  
            </>)
          case 26:
          case 27:
            return question3Choices()
          case 28:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                Você se sente excitado, “pra cima”, estimulado, ou gratificado enquanto joga videogame? Com o passar do tempo, você notou que...</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
            </>)
          case 30:
            return question3Choices()
          case 31:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                Você diria que seus impulsos e pensamentos sobre videogame são ou eram:</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
            </>)
          case 34:
            return(<>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
            </>)
          case 36:
          case 37:
          case 38:
          case 39:
          case 40:
          case 41:
          case 42:
          case 43:
            return question3Choices()
          case 44:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                  options={['Sim', 'Talvez', 'Não']} checked={checked} setChecked={setChecked}/>
                <Text style={styles.textObs}>{'Obs.: Sim = Atenção para Transtorno Afetivo Bipolar'}</Text>
              </View> )
          case 45:
            return questionK189()
          case 46:
            return question2Choices(questionInd)
          case 47:
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
          case 48:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                  <RadioButton3Items direction={'column'} color={'#00009c'} questionInd={questionInd} 
                      options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
                  <View style={{marginBottom: 10}}/>
              </View>
            </>)
          case 49:
            return(
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <View style={{marginBottom: -20}}/>
                <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}
                  placeholderTextColor='grey'/>
              </View>)
          case 50:
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
              disorder: 'Videogame',
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
            disorder: 'Videogame',
            answers: checked,
            patientId: patient,
            questionId: questionId
          })
      })
      let resp = await reqs.json()
      return resp
    }

    async function queryAutomutilacao() {

      let newUrl = new URL(config.urlRootNode+'disorders'),
          params={disorder: 'Automutilacao'}
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
      const questions = await queryAutomutilacao()
      const answers = await registerAnswers()
      registerDiagnosis(lifetime, past).then(
          navigation.navigate('Automutilacao', {user: user, patient: patient, questions: questions}))
    }

    async function saveAnswers(){
      const questions = await queryAutomutilacao()
      registerAnswers().then(
        navigation.navigate('Automutilacao', {user: user, patient: patient, questions: questions}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let nextToK163D = false, nextToK163I = false
      let goToAutomutilacao = false, nextToK192 = false, nextToK193 = false, nextToK193X = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)
      console.log(checked)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if((questionInd == 1 || questionInd == 2 || questionInd == 3) && input) success = true
      if(questionInd == 22 && checked[23] == '3' && !input) success = false
      if((questionInd == 48 || questionInd == 49) && input) success = true

      if(success){

        if(questionInd == 0 && checked[0] == '1'){
          goToAutomutilacao = true
          saveDiagnosis('1', '1')
        }

        if(questionInd == 1 || questionInd == 3){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 2){
          if(parseInt(checked[1]) < parseInt(input)){
            nextToK163D = true
            setChecked(() => {
              const newArr = checked.concat()
              newArr[2] = input
              newArr[3] = (parseInt(input) - parseInt(checked[1]))*12
              return newArr
            })
          }
          else{
            setChecked(() => {
              const newArr = checked.concat()
              newArr[2] = input
              return newArr
            })
          }
          setInput('')
        }
        
        if((questionInd == 8 && checked[6] == '1') || (questionInd == 10 && checked[6] == '2')) 
          nextToK163I = true
        
        if(questionInd == 22){
          if(checked[23] == '3'){
            setChecked(() => {
              const newArr = checked.concat()
              newArr[23] = input
              return newArr
            })
            setInput('')
          }
          if(checked[13] == '1' && checked[14] == '1' && checked[15] == '1'){
            goToAutomutilacao = true
            saveDiagnosis('1', '1')
          }
        }

        if(questionInd == 27){
          if(checked[27] == '1' && checked[28] == '1') setCriteriaK175('1')
          else setCriteriaK175('3')
        }

        if(questionInd == 42){
          let qtdPresente = 0
          for(let i=25; i<=40;i++){
            if(i != 27 && i != 28 && !(i >= 30 && i <= 35)){
              if(checked[i] == '3') {
                console.log('i: ' + i)
                console.log('cod: '+questions[i][1])
                qtdPresente++
              }
            }
          }
          if(criteriaK175 == '3') qtdPresente++
          console.log(qtdPresente)
          if(qtdPresente <= 1){
            goToAutomutilacao = true
            saveDiagnosis('1', '1')
          }
          else if(qtdPresente < 5){
            nextToK193 = true
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 43){
          if(checked[43] == '1'){
            goToAutomutilacao = true
            saveDiagnosis('1', '1')
          }
          else if(checked[43] == '2'){
            nextToK193 = true
            registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 45){
          if(checked[45] == '1'){
            nextToK192 = true
            registerDiagnosis('3', '1')
          }
          else
            registerDiagnosis('3', '3')
        }

        if(questionInd == 46){
          nextToK193X = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[46] = checked[46]
              newArr[47] = null
              newArr[48] = '0'
              return newArr
          })
        }

        if(questionInd == 48){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[48] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 49){
          goToAutomutilacao = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[49] = input
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToAutomutilacao && !nextToK163D && !nextToK163I && !nextToK192 && !nextToK193 && !nextToK193X){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK163D){
          setQuestionInd(4)
          setNextInd(4)
        }
        else if(nextToK163I){
          setQuestionInd(13)
          setNextInd(13)
        }
        else if(nextToK192){
          setQuestionInd(47)
          setNextInd(36)
        }
        else if(nextToK193){
          setQuestionInd(48)
          setNextInd(37)
        }
        else if(nextToK193X){
          setQuestionInd(49)
          setNextInd(38)
        }
        else if(questionInd == 49) setFinish(true)
      }
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 49 && finish) saveAnswers()
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
                {questionInd < 45 ? "Transtorno do Videogame" : "Cronologia do Transtorno do Videogame"}</Text>
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
      fontWeight: 'bold',
      marginRight: 30
    },
})