import React from 'react';
import { View, Image, TextInput, Text,  TouchableOpacity, StyleSheet } from 'react-native';


export default function SignIn(){
    return(
        <View style={styles.container} >
            <Image
                style={styles.logo} 
                source={require("../../assets/logo.png")}
                />

            <View style={styles.inputContainer} >
                <TextInput
                    placeholder='Digite seu email'
                    style={styles.input}
                    placeholderTextColor="#f0f0f0"
                />

                <TextInput 
                    placeholder='Digite sua senha'
                    style={styles.input}
                    placeholderTextColor="#f0f0f0"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText} >Entrar</Text>
                </TouchableOpacity>
            </View>

        </View>

        
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: "#1d1d2e",
    },
    logo:{
        marginBottom: 18
    },
    inputContainer:{
        width: '95%',
        alignItems:"center",
        justifyContent: "center",
        paddingVertical: 34,
        paddingHorizontal: 14
    },
    input:{
        width: "95%",
        height: 40,
        marginBottom: 12,
        borderRadius: 4,
        backgroundColor: "#101026",
        paddingHorizontal: 8,
        color: "#fff"

    },
    button:{
        width: "95%",
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#101026"
    }

  })