import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Login from './login.js';
import Cadastro from './cadastro.js';

export default class MenuCadastro extends Component{

    state = {
        textInput: <Login />,
        margin: true
    }

    setLogin = () =>{
        this.setState({textInput: <Login />, margin: true})
    }

    setCadastrar = () =>{
        this.setState({textInput: <Cadastro />, margin: false})
    }

    showMargin = (show) =>{
        if(show) return(<View style={{marginTop: 40, marginBottom: 80}}/>)
    }

    render(){
        return(
            <>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 20}}>
                    <TouchableOpacity style={{alignItems: 'center'}} title='Login' onPress={this.setLogin}>
                        <Text style={{color: '#000', fontSize: 25}}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: 'center'}} title='Cadastrar' onPress={this.setCadastrar}>
                        <Text style={{color: '#000', fontSize: 25}}>Cadastro</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewLogin}>
                    {this.state.textInput}
                </View>
                {this.showMargin(this.state.margin)}
            </View>
            </>
        )
    }

}

const styles = StyleSheet.create({
    viewLogin:{
        alignItems: 'center', 
        borderRadius: 10, 
        marginTop: 20,
        marginHorizontal: 20, 
        backgroundColor: 'white'
    },
    buttonLogin:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 150, 
        backgroundColor: '#084d6e',
        borderRadius: 10,
        marginVertical: 20
    },
    input: {
      marginTop: 20,
      marginBottom: 20,
      textShadowColor: '#000',
      color: '#000',
      borderBottomWidth: 1,
      borderColor: 'grey',
      backgroundColor: '#fff',
      fontSize: 18,
      width: 300
    }
});