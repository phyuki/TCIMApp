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

export default function RadioButton3Items(props){

    const { questionInd, options, color, direction, checked, setChecked } = props
    const actualDirection = direction ? direction : 'row'
    const actualColor = color ? color : '#000'

    return (
        <View style={{flexDirection: actualDirection, alignItems: 'center', justifyContent:'center', marginTop: 10}}>
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10, marginHorizontal: 15}}>
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
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10, marginHorizontal: 15}}>
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
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 10, marginHorizontal: 15}}>
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
    )
}