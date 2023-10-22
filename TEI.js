import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import { RadioButton } from 'react-native-paper'
import config from './config/config.json'

export default function TEI({route, navigation}){

    const { patient, questions } = route.params
    
    const [checked, setChecked] = useState([])
    const [questionInd, setQuestionInd] = useState(0)
    const [answers, setAnswers] = useState([])
    const [sectionInd, setSectionInd] = useState(0)
    const [sectionScores, setSectionScores] = useState([])
    const [input, setInput] = useState()
    const qtdQuestions = [3, 3, 1, 1, 4, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1]

    function radioButton(questionInd, direction){
        const margin = direction == 'row' ? 10 : 0
        return(
                <>
                <View style={{flexDirection: direction, alignItems: 'center', justifyContent:'center', marginTop: 5}}>
                    <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: margin, marginHorizontal: 20}}>
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
                        <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold'}}>1 - Não</Text>
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
                        <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold'}}>3 - Sim</Text>
                    </View>
                </View>
                </>
    )}

    function radioButton3Items(questionInd, options, color, direction){
        const actualDirection = direction ? direction : 'row'
        const actualColor = color ? color : '#000'
        return(
                <>
                <View style={{flexDirection: actualDirection, alignItems: 'center', justifyContent:'center', marginTop: 10}}>
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
                        <Text style={{color: actualColor, fontSize: 17, fontWeight: 'bold'}}>{options[0]}</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10, marginHorizontal: 20}}>
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
                        <Text style={{color: actualColor, fontSize: 17, fontWeight: 'bold'}}>{options[1]}</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20, marginHorizontal: 20}}>
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
                        <Text style={{color: actualColor, fontSize: 17, fontWeight: 'bold'}}>{options[2]}</Text>
                    </View>
                </View>
                </>
    )}

    const textQuestion = (questionSection) => {
        return questions[questionSection][0]+" - "+questions[questionSection][1]
    }

    function questionsK1(){
        return(
            <>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                    {radioButton(questionInd, 'row')}
            </View>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
                    {radioButton(questionInd+1, 'row')}
            </View>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd+2)}</Text>
                    {radioButton(questionInd+2, 'row')}
            </View>
            </>
    )}

    function questionsKTEIB(){
        return(<>
            <View style={styles.containerKTEIB}>
                    <Text style={styles.textKTEIB}>{textQuestion(questionInd)}</Text>
                    {radioButton(questionInd, 'column')}
            </View>
            <View style={styles.containerKTEIB}>
                    <Text style={styles.textKTEIB}>{textQuestion(questionInd+1)}</Text>
                    {radioButton(questionInd+1, 'column')}
            </View>
            <View style={styles.containerKTEIB}>
                    <Text style={styles.textKTEIB}>{textQuestion(questionInd+2)}</Text>
                    {radioButton(questionInd+2, 'column')}
            </View>
            <View style={styles.containerKTEIB}>
                    <Text style={styles.textKTEIB}>{textQuestion(questionInd+3)}</Text>
                    {radioButton(questionInd+3, 'column')}
            </View>
            </>
        )
    }

    function questionKTEIB5(){
        return(<>
            <View style={{backgroundColor: 'white', borderRadius: 20, marginTop: 10, flexDirection: 'row'}}>
                    <Text style={styles.textKTEIB}>{textQuestion(questionInd)}</Text>
                    {radioButton(questionInd, 'column')}
            </View>
            <View style={{backgroundColor: 'white', borderRadius: 20, marginTop: 10, flexDirection: 'row'}}>
                    <Text style={styles.textKTEIB}>{textQuestion(questionInd+1)}</Text>
                    {radioButton(questionInd+1, 'column')}
            </View>
            </>        
        )
    }

    function questionsK3_1(disorders, visible){
            return(<>
            {visible && <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                As explosões aconteceram somente...</Text>
            </View>}
                <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        {radioButton(questionInd, 'row')}
                        <Text style={styles.textObs}>{disorders[0]}</Text>
                </View>
                <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
                        {radioButton(questionInd+1, 'row')}
                        <Text style={styles.textObs}>{disorders[1]}</Text>
                </View>
            </>)
    }

    function showQuestion(){
        switch(questionInd+1){
            case 1:
                return (<><View style={{marginTop: 20}}>{questionsK1()}</View></>)
            case 4:
                return (
                    <>
                        <View style={styles.containerQuestion}>
                                <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold', marginHorizontal: 20, marginVertical: 10, textAlign: 'justify'}}>
                                    Você já perdeu o controle ao ponto de...</Text>
                        </View>
                        {questionsK1()}
                    </>)
            case 7:
                return (<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        {radioButton3Items(questionInd, ['1 - Não', '2 - Talvez', '3 - Sim'])}
                    </View>
                </>)
            case 8:
                return (<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        {radioButton3Items(questionInd, ['1 - Não', '2 - Talvez', '3 - Sim'])}
                        <Text style={styles.textObs}>1 - Ações agressivas planejadas ou sob controle do paciente</Text>
                        <Text style={styles.textObs}>3 - Ações agressivas sem controle</Text>
                    </View>
                </>)
            case 9:
                return (<><View style={{flex: 1, marginTop: 10}}>{questionsKTEIB()}</View></>)
            case 13:
                return(<><View style={{flex: 1, marginTop: 20}}>{questionKTEIB5()}</View></>)
            case 15:
                return (<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textObs}>Averiguação com o paciente</Text>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        {radioButton(questionInd, 'row')}
                    </View>
                </>)
            case 16:
                return(<>
                    {questionsK3_1(['3 – Depressão recorrente','3 – Mania ou Hipomania'], true)}
                </>)
            case 18:
                return(<>
                    {questionsK3_1(['3 – Transtorno Disruptivo da Desregulação do Humor','3 – Síndrome psicótica'], true)}
                </>)
            case 20:
                return(<>
                    {questionsK3_1(['3 – Trauma craniano','3 – Síndrome demencial'], true)}
                </>)
            case 22:
                return(<>
                    {questionsK3_1(['3 – Intoxicação exógena','3 – Transtornos de adaptação'], true)}
                </>)
            case 24:
                return(<>
                    {questionsK3_1(['3 – Transtorno antissocial de personalidade','3 – Transtorno borderline de personalidade'], false)}
                </>)
            case 26:
                return(<>
                <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        {radioButton(questionInd, 'row')}
                </View></>)
            case 27:
                return(<>
                    <View style={styles.containerQuestion}>
                        <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                            {radioButton3Items(questionInd, ['1 - Leve', '2 - Moderado', '3 - Grave'], '#00009c')}
                            <Text style={styles.textObs}>
                            1 - Poucos (se alguns) sintomas excedendo aqueles necessários para o diagnóstico presente, e os sintomas resultam em não mais do que um 
                            comprometimento menor seja social ou no desempenho ocupacional.</Text>
                            <Text style={styles.textObs}>
                            2 - Sintomas ou comprometimento funcional entre “leve” e “grave” estão presentes.</Text>
                            <Text style={styles.textObs}>
                            3 - Vários sintomas excedendo aqueles necessários para o diagnóstico, ou vários sintomas particularmente graves estão presentes, 
                            ou os sintomas resultam em comprometimento social ou ocupacional notável.</Text>
                    </View></>)
            case 28:
                return(<>
                    <View style={styles.containerQuestion}>
                        <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                            {radioButton3Items(questionInd, ['4 – Remissão parcial', '5 – Remissão total', '6 – História prévia'], '#00009c', 'column')}
                    </View></>)
            case 29:
                return(<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        <TextInput style={styles.input}
                        onChangeText={setInput}
                        value={input}
                        placeholder='Meses'
                        placeholderTextColor='grey'/>
                    </View></>)
            case 30:
                return(<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        <TextInput style={styles.input}
                        onChangeText={setInput}
                        value={input}
                        placeholder='Anos de idade'
                        placeholderTextColor='grey'/>
                        <Text style={styles.textObs}>
                        Observação: codificar 99 se desconhecida</Text>
                    </View>
                    </>)
            default:
                console.log("Error")
        }
    }

    async function saveDiagnosis(lifetime, past) {

        let reqs = await fetch(config.urlRootNode+'reports', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lifetime: lifetime,
                past: past,
                disorder: 'TEI',
                patientId: patient
            })
        })
        let resp = await reqs.json()
        return resp
    }

    const plusQuestion = () => {
        console.log(patient)
        let success = true
        let nextSection = questionInd + qtdQuestions[sectionInd]

        if(questionInd == 3){
            if(checked[2] == '1' && checked[5] == '1') {
                success = false
                saveDiagnosis('1', '1').then(
                    navigation.navigate('Clepto', {patient: patient, questions: []}))
            }
            else{
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[0] = '3'
                    return newArr
                })
        }}

        if(questionInd == 6){
            if(checked[6] == '1') console.log('cleptomania')
            else{
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[1] = checked[nextSection-1]
                    return newArr
                })
        }}

        if(questionInd == 7){
            if(checked[7] == '1') console.log('cleptomania')
            else{
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[2] = checked[nextSection-1]
                    return newArr
                })
        }}

        if(questionInd == 8){
            if(checked[8] == '1' && checked[9] == '1' && checked[10] == '1' && checked[11] == '1' && checked[12] == '1') console.log('cleptomania')
            else{
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[3] = '3'
                    return newArr
                })
        }}

        if(questionInd == 14){
            if(checked[14] == '1') console.log('cleptomania')
            else{
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[4] = '3'
                    return newArr
                })
        }}

        if(questionInd == 15 || questionInd == 17 || questionInd == 19 || questionInd == 21){
            if(checked[questionInd] == '3' || checked[questionInd+1] == '3') console.log('K8')
        }
        
        if(questionInd == 23){
            if(checked[questionInd] == '3' || checked[questionInd+1] == '3') console.log('K8')
            else{
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[5] = '3'
                    return newArr
                })
                if(sectionScores[1] == '2' || sectionScores[2] == '2') console.log('K8')
                else if(sectionScores[0] == '3' || sectionScores[1] == '3' || sectionScores[2] == '3' || 
                    sectionScores[3] == '3' || sectionScores[4] == '3') console.log('Clínico')
                else console.log('cleptomania')
            }
        }

        if(questionInd == 25){
            if(checked[questionInd] == '1') console.log('K7')
            else {}
        }

        if(questionInd+1 == 29 && parseInt(input) > 0 && parseInt(input) < 100) {
            checked[nextSection-1] = input
            setInput('')
        }

        for(let i=0; i<nextSection; i++) success = success && checked[i]
        console.log(questionInd)
        console.log(sectionScores)
        if(success){
            console.log(checked)
            let copy = answers.concat()
            copy[questionInd] = checked
            setAnswers(copy)
            setQuestionInd(nextSection)
            setSectionInd(sectionInd+1)
        }
    }

    const minusQuestion = () => {
        if(questionInd == 0){
            navigation.goBack()
        }
        if(checked){
            setQuestionInd(questionInd - qtdQuestions[sectionInd-1])
            setSectionInd(sectionInd-1)
        }
    }

    useEffect(() => {
        showQuestion()
    }, [questionInd])
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
              <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd <= 24 ? "Transtorno Explosivo Intermitente (TEI)" : "Cronologia do TEI"}</Text>
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
        marginHorizontal: 20, 
        marginTop: 20
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
        fontSize: 15, 
        textAlign:'justify', 
        fontWeight: 'bold', 
        marginVertical: 15, 
        marginHorizontal: 20
    }
})