import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import { RadioButton } from 'react-native-paper'
import config from './config/config.json'

export default function DASS({route, navigation}){

    const { user, questions, questionsId } = route.params

    const controllerRef = useRef()
    const [checked, setChecked] = useState([])
    const [questionInd, setQuestionInd] = useState(0)
    const [textButton, setTextButton] = useState("Próximo")
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {showQuestion()}, [questionInd])

    async function saveScores(scores) {

        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        const timeout = setTimeout(() => controllerRef.current.abort(), 10000)

        try {
            let reqs = await fetch(config.urlRootNode+'dass', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patientId: user.id,
                    scoreD: scores.depression,
                    scoreA: scores.anxiety,
                    scoreE: scores.stress
                }), signal
            })
            let resp = await reqs.json()
            if(resp) {
                let answers = await registerAnswers()
                return answers
            }
            else {
                throw new Error('Erro de comunicação com o servidor - 500') 
            }
        } catch (error) {
            console.log(error)
            throw new Error('Erro de comunicação com o servidor - 500') 
        } finally {
            clearTimeout(timeout)
        }
    }

    async function registerAnswers() {
        let reqs = await fetch(config.urlRootNode+'dassanswers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              answers: checked,
              patientId: user.id,
              questionId: questionsId
            })
        })
        let resp = await reqs.json()
        return resp
    }

    const calculateScores = () => {
        const intScores = checked.map(x => parseInt(x))

        const scoreD = intScores[2]+intScores[4]+intScores[9]+intScores[12]+intScores[15]+intScores[16]+intScores[20]
        const scoreA = intScores[1]+intScores[3]+intScores[6]+intScores[8]+intScores[14]+intScores[18]+intScores[19]
        const scoreE = intScores[0]+intScores[5]+intScores[7]+intScores[10]+intScores[11]+intScores[13]+intScores[17]
        
        return { depression: 2*scoreD, anxiety: 2*scoreA, stress: 2*scoreE }
    }

    async function finishDASS() {
        setLoading(true)
        try{
            const scores = calculateScores()
            console.log(loading)
            await saveScores(scores)
            return scores
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const plusQuestion = () => {
        if(checked[questionInd]){
            if(questionInd == 19) {
                setTextButton("Finalizar")
            }
            if(questionInd == 20) {
                toggleModal()
            }
            else{
                setQuestionInd(questionInd+1)
            }
        }
        else Alert.alert("Aviso","Responda todas as questões antes de prosseguir!")
    }

    const minusQuestion = () => {
        if(questionInd == 0){
            navigation.goBack()
        }
        else {
            if(questionInd == 20) setTextButton("Próximo")
            setQuestionInd(questionInd-1)
        }
    }

    function showQuestion(){
        return "Q"+(questionInd+1)+ ": "+questions[questionInd]
    }

    const toggleModal = () => setModalVisible(!modalVisible)

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <Modal animationType="fade" transparent={true} visible={loading}>
            <View style={styles.modalHeader}>
                <View style={styles.modal}>
                    <ActivityIndicator size={"large"} color={"dodgerblue"} />
                    <Text style={{marginBottom: 10, color: 'black', fontSize: 18, marginTop: 15, textAlign: 'justify'}}>Salvando respostas...</Text>
                </View>
            </View>
          </Modal>
          <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={toggleModal}>
            <View style={styles.modalHeader}>
                <View style={styles.modal}>
                    <View>
                    <Text style={{marginBottom: 10, color: 'black', fontSize: 18, fontWeight: 'bold', textAlign: 'justify'}}>Tem certeza de que deseja concluir o questionário DASS?</Text>
                    <Text style={{marginBottom: 10, color: 'black', fontSize: 18, textAlign: 'justify'}}>Ao confirmar, as respostas serão armazenadas e você será redirecionado a um relatório simplificado com os resultados calculados.</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight style={[styles.buttonPrev, {marginBottom: 0, marginHorizontal: 25}]} onPress={toggleModal}>
                        <Text style={{color: '#fff', fontSize: 15}}>Cancelar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.buttonPrev, {backgroundColor: '#097969', marginBottom: 0, marginHorizontal: 25}]} 
                            onPress={() => finishDASS()
                                            .then((scores) => navigation.navigate('ReportDASS', {user: user, scores: scores}))
                                            .catch((error) => Alert.alert('Erro', error.message))}>
                        <Text style={{color: '#fff', fontSize: 15}}>Confirmar</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            </View>
          </Modal>
          <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"DASS-21"}</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"Questionário"}</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{backgroundColor: 'white', borderRadius: 20, marginHorizontal: 20}}>
                <View style={{marginHorizontal: 10, alignItems: 'center'}}>
                    <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>{showQuestion()}</Text>
                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                        <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10}}>
                            <RadioButton
                                    value="0"
                                    status={ checked[questionInd] === '0' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked(() => {
                                        const newArr = checked.concat()
                                        newArr[questionInd] = '0'
                                        return newArr
                                    })}
                                    color='#0047AB'
                            />
                            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>0</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10}}>
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
                            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>1</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10}}>
                            <RadioButton
                                    value="2"
                                    status={ checked[questionInd] === '2' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked(() => {
                                        const newArr = checked.concat()
                                        newArr[questionInd] = '2'
                                        return newArr
                                    })}
                                    color='#0047AB'
                            />
                            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>2</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10}}>
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
                            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>3</Text>
                        </View>
                    </View>
                </View>
            </View>
                <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop: 10}}>
                    <TouchableOpacity style={styles.buttonPrev} onPress={minusQuestion}>
                        <Text style={{color: '#fff', fontSize: 15}}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNext} onPress={plusQuestion}>
                        <Text style={{color: '#fff', fontSize: 15}}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: 'white', borderRadius: 20, marginHorizontal: 20, marginTop: 30}}>
                    <Text style={styles.textObs}>0 - Não se aplicou de maneira alguma</Text>
                    <Text style={styles.textObs}>1 - Aplicou-se em algum grau, ou por pouco de tempo</Text>
                    <Text style={styles.textObs}>2 - Aplicou-se em um grau considerável, ou por uma boa parte do tempo</Text>
                    <Text style={styles.textObs}>3 - Aplicou-se muito, ou na maioria do tempo</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 100, 
        backgroundColor: '#097969',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 100, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30
    },
    textObs:{
        color: '#00009c', 
        fontSize: 17,  
        fontWeight: 'bold', 
        marginVertical: 10, 
        marginHorizontal: 20,
        textAlign: 'justify'
    },
    modalHeader:{
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    modal:{
        margin: 20, 
        backgroundColor: 'white', 
        borderRadius: 20, 
        padding: 25, 
        alignItems: 'center', 
        shadowColor: '#000', 
        shadowOffset: {width: 0, height: 2}, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5
    }
})