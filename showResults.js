import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
  SafeAreaView,
  BackHandler,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import config from './config/config.json'

export default function ResultadoParcialSCID({route, navigation}){
    const routes = useNavigationState((state) => state.routes)
    console.log(routes.map(route => route.name))

    const { user, patient, lifetime, past, disorderPrev, disorderNext, answers, scores, questionId } = route.params
    
    const controllerRef = useRef()
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        const backAction = () => {
          return true; 
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      
        return () => backHandler.remove();
    }, []);

    async function queryDiagnosis(tableName) {

        let newUrl = new URL(config.urlRootNode+'disorders'),
            params={disorder: tableName}
            Object.keys(params).forEach(key => newUrl.searchParams.append(key, params[key]))

        setLoading(true)

        try {
            let reqs = await fetch(newUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const resp = await reqs.json()
            return resp
        } catch (error) {
            Alert.alert('Erro', 'Erro de comunicação com o servidor - 500')
            throw new Error(error)
        } finally {
            setLoading(false)
        }
    }

    async function saveDiagnosis() {
        const disorders = ["TEI", "Clepto", "Piromania", "Jogo", "Tricotilomania", "Oniomania", 
            "Hipersexualidade", "Uso Indevido de Internet", "Escoriacao", "Videogame", 
            "Automutilacao", "Amor Patologico", "Ciume Patologico", "Dependencia de Comida"]

        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        const timeout = setTimeout(() => controllerRef.current.abort(), 10000)    

        setLoading(true)

        try {
            let reqs = await fetch(config.urlRootNode+'reports', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    scores: scores,
                    answers: answers,
                    questionId: questionId,
                    disorders: disorders,
                    patientId: patient
                }), signal
            })
            if(!reqs.ok) {
                throw new Error("Erro ao buscar o questionário")
            }
            let resp = await reqs.json()
            return resp
        } catch (error) {
            setLoading(false)
            Alert.alert('Erro', 'Erro de comunicação com o servidor - 500')
            throw new Error(error)
        } finally {
            clearTimeout(timeout)
            setLoading(false)
        }
    }

    const disorderToTableName = () => {
        if(disorderPrev == "Amor Patológico" && disorderNext == "DependenciaComida")
            return "Ciume Patologico"
        switch(disorderNext){
            case "Trico":
                return "Tricotilomania"
            case "Internet":
                return "Uso Indevido de Internet"
            case "AmorPatologico":
                return "Amor Patologico"
            case "CiumePatologico":
                return "Ciume Patologico"
            case "DependenciaComida":
                return "Dependencia de Comida"
            default:
                return disorderNext
        }
    }

    const disorderToButtonName = () => {
        if(disorderPrev == "Amor Patológico" && disorderNext == "DependenciaComida")
            return "Ciúme Patológico"
        switch(disorderNext){
            case "Clepto":
                return "Cleptomania"
            case "Jogo":
                return "Jogo Patológico"
            case "Trico":
                return "Tricotilomania"
            case "Hipersexualidade":
                return "Transtorno de Hipersexualidade"
            case "Internet":
                return "Transtorno por Uso Indevido de Internet"
            case "Escoriacao":
                return "Transtorno de Escoriação"
            case "Videogame":
                return "Transtorno do Videogame"
            case "Automutilacao":
                return "Transtorno de Automutilação"
            case "AmorPatologico":
                return "Amor Patológico"
            case "CiumePatologico":
                return "Ciúme Patológico"
            case "DependenciaComida":
                return "Dependência de Comida"
            default:
                return disorderNext
        }
    }

    async function nextDisorder(){
        const tableName = disorderToTableName()
        console.log(scores)
        console.log(answers)
        console.log(questionId)
        if(disorderNext != "Finish"){
            if(disorderPrev == "Amor Patológico" && disorderNext == "DependenciaComida"){
                const result = await queryDiagnosis('Ciume Patologico')
                const id = result.map((array) => array[0])
                let checked = []
                while(checked.length < result.length) checked.push(undefined)
                scores.push(['1', '1'])
                questionId.push(id)
                answers.push(checked)
                return navigation.push('ShowPartial', {user: user, patient: patient, 
                        lifetime: lifetime, past: past, answers: answers, scores: scores, 
                        questionId: questionId, disorderPrev: 'Ciúme Patológico', 
                        disorderNext: 'DependenciaComida'})
            }
            else
                return queryDiagnosis(tableName).then(result =>
                    navigation.navigate(disorderNext, {user: user, patient: patient, questions: result,
                        answers: answers, scores: scores, questionId: questionId}))
        }
    }
    
    const convertScores = (score) => {
        if(score == '1') return 'Ausente'
        else if(score == '2') return 'Subclínico'
        else return 'Presente'
    }

    const backDisorder = () => {
        scores.pop()
        navigation.goBack()
    }

    const toggleModal = () => setModalVisible(!modalVisible)

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <Modal animationType="fade" transparent={true} visible={loading}>
                <View style={styles.modalHeader}>
                    <View style={styles.modal}>
                        <ActivityIndicator size={"large"} color={"dodgerblue"} />
                        <Text style={{marginBottom: 10, color: 'black', fontSize: 18, marginTop: 15, textAlign: 'justify'}}>
                            { disorderNext != "Finish" ? "Carregando perguntas..." : "Salvando resultados..." }
                        </Text>
                    </View>
                </View>
            </Modal>
            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={toggleModal}>
                <View style={styles.modalHeader}>
                    <View style={styles.modal}>
                        <View>
                          <Text style={{marginBottom: 10, color: 'black', fontSize: 18, fontWeight: 'bold', textAlign: 'justify'}}>Tem certeza de que deseja concluir o questionário SCID?</Text>
                          <Text style={{marginBottom: 10, color: 'black', fontSize: 18, textAlign: 'justify'}}>Ao confirmar, as respostas serão armazenadas e você será redirecionado a um relatório simplificado com os scores do SCID.</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableHighlight style={[styles.buttonPrev, {marginBottom: 0}]} onPress={toggleModal}>
                              <Text style={{color: '#fff', fontSize: 15}}>Cancelar</Text>
                          </TouchableHighlight>
                          <TouchableHighlight style={[styles.buttonPrev, {backgroundColor: '#097969', marginBottom: 0}]} 
                                onPress={() => saveDiagnosis()
                                                .then(() => navigation.push('FinishSCID', {user: user, report: scores}))
                                                .catch((error) => console.error('Erro capturado: ' + error))}>
                              <Text style={{color: '#fff', fontSize: 15}}>Confirmar</Text>
                          </TouchableHighlight>
                        </View>
                    </View>
                </View>
          </Modal>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20}}>
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginLeft:20, padding: 10}} onPress={backDisorder}>
                <Image
                    source={require('./assets/back.png')}
                    style={{height: 30,
                    width: 30,
                    resizeMode: 'stretch'}}
                />
                </TouchableOpacity>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"TCIMApp"}</Text>
                <View style={{backgroundColor: '#87ceeb', borderRadius: 10, marginRight:20, width: 50, height: 50}}></View>
            </View>
            <View style={{alignItems: 'center', marginTop: 20, marginHorizontal: 20}}>
                <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>{"Resultado do "+disorderPrev}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10, marginBottom: 80}}>
                <View>
                    <View style={{backgroundColor: 'white', marginHorizontal: 20, marginTop: 25, borderRadius: 20}}>
                        <Text style={{color: '#000', fontSize: 20, textAlign:'justify', marginHorizontal: 20, marginVertical: 30}}>
                            {'Critério ao longo da vida: '+ convertScores(lifetime)}
                        </Text>
                        <Text style={{color: '#000', fontSize: 20, textAlign:'justify', marginHorizontal: 20, marginBottom: 30}}>
                            {'Critério Mês Passado: '+ convertScores(past)}
                        </Text>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 40}}> 
                        <TouchableOpacity style={styles.buttonNext} onPress={disorderNext != "Finish" ? nextDisorder : toggleModal}>
                            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>{
                            disorderNext != "Finish" ? "Ir para "+disorderToButtonName()
                                                    : "Finalizar SCID-TCIm"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        padding: 10,
        backgroundColor: '#097969',
        borderRadius: 10,
        marginHorizontal: 50
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 100, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 30,
        marginHorizontal: 25
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