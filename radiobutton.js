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
import { RadioButton } from 'react-native-paper'
import config from './config/config.json'

export default function RadioButtonHorizontal(props){

    const { direction, checked, questionInd, setChecked } = props
    const margin = direction == 'row' ? 10 : 0

    return (
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
    )
}
