import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SectionList,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
  StatusBar,
  FlatList,
  ScrollView
} from 'react-native';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'
import { RadioButton } from 'react-native-paper';

const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.titleItem, {color: textColor}]}>{item}</Text>
    </TouchableOpacity>
);

export default function ExibirRelatorio({route, navigation}){

    const { user, patient, report, type } = route.params
    
    const [reportId, setReportId] = useState()
    const [reportData, setReportData] = useState()
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>SCIDApp</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>Relatórios</Text>
              <Text style={{color: '#000', marginTop: 40, fontSize: 22, fontWeight: 'bold'}}>{'Paciente: '+patient}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                {console.log(report)}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.goBack()}>
                    <Text style={{color: '#fff', fontSize: 18}}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        height: 400,
        width: 300
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'black',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: 20
    },
    item: {
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1
    },
    titleItem: {
        fontSize: 20,
    },
    header: {
        fontSize: 32,
        color: 'white'
    },
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 120, 
        backgroundColor: '#097969',
        borderRadius: 10,
        marginTop: 40,
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 120, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginTop: 40,
        marginRight: 30
      },
})