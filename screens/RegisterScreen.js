
import React, { useState,useLayoutEffect } from 'react'
import { StyleSheet, Text, View,Image,TextInput, Button, KeyboardAvoidingView,ImageBackground,TouchableOpacity } from 'react-native'
import firebase from "firebase";
import {Entypo,Ionicons,FontAwesome} from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler';
const RegisterScreen = ({navigation}) => {
  {/*
     au-dessous çe sont les states où on sauvgarde les valeurs
    */}
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [repeatedPassword,setRepPassword] = useState("");
    const [name,setName] = useState("");
{/*
     au-dessous ç'est la fonction pour s'enregistrer
    */}
    const register = () =>{
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              name,
              email,
            });
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  {/*
     au-dessous ç'est la fonction pour créer l'entête de la page
    */}
    useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: ()=> null,
        title: "Register",
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
        headerTitle: () => (
          <View
            style={{
              flex:1 ,
              flexDirection: "row",
              alignItems: "center",
              justifyContent:'center',
            }}
          >
          <Text style={{fontWeight:'bold',fontSize:20,color:'white',marginLeft:'10%'}}>Register</Text>
          </View>
        ),
        headerStyle: {
          backgroundColor: '#6d071a',
          borderBottomLeftRadius:40,
          borderBottomRightRadius:40,
        },
      });
    }, [navigation]);
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground
        style={styles.WineBottle}
        source = {require("../assets/wineSpill.jpg")}>
        <ScrollView>
        <View style={{alignItems: 'center',
        flex: 1,
        justifyContent: 'center'}}>
        <View style={styles.firstInputContainer}>
        <Ionicons name="person" size={20} color="black" />
        <TextInput
        placeholder="Prénom"
        placeholderTextColor="#102F44"
        style={styles.textInput}
        onChangeText={(text)=>setName(text)}
      />
      </View>
      <View style={styles.inputContainer}>
        <Entypo name="email" size={20} color="black" />
        <TextInput
        placeholder="Email"
        placeholderTextColor="#102F44"
        style={styles.textInput}
        onChangeText={(text)=>setEmail(text)}
      />
      </View>
      <View style={styles.inputContainer}>
      <Ionicons name="lock-closed" size={20} color="#102F44" />
      <TextInput
            secureTextEntry
            placeholder="Mot de Passe"
            placeholderTextColor="#102F44"
            style={styles.textInput}
            onChangeText={(text)=>setPassword(text)}
          />
          </View>
          <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="#102F44" />
          <TextInput
                secureTextEntry
                placeholder="Mot de Passe"
                placeholderTextColor="#102F44"
                style={styles.textInput}
                onChangeText={(text)=>setRepPassword(text)}
              />
              </View>
        <TouchableOpacity title="register" onPress={()=>register()} style={styles.inputContainer}>
        <Entypo name="add-user" size={24} color="black" />
        <Text style={styles.textInput}>Enregister</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Login" style={styles.inputContainer} onPress={()=>navigation.navigate("Login")}>
        <FontAwesome name="sign-in" size={24} color="black" />
        <Text style={styles.textInput}>Login</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
       },
       WineBottle:{
        flex: 1,
        resizeMode: 'cover',
        height: '100%',
        width: '100%'
      },   
      firstInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 55,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderTopColor: "#102F44",
        borderRightColor: "#102F44",
        borderBottomColor: "#102F44",
        borderLeftColor: "#102F44",
        paddingVertical: 5,
        marginTop: 50,
        marginBottom: 10,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 55,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderColor: "#102F44",
        borderRadius: 5,
        borderTopColor: "#102F44",
        borderRightColor: "#102F44",
        borderBottomColor: "#102F44",
        borderLeftColor: "#102F44",
        paddingVertical: 5,
        marginTop: 15,
        marginBottom: 10,
      },
    textInput: {
        textAlign: "center",
        width: "100%",
        paddingHorizontal: 10,
        color: "#102F44",
        fontSize: 15,
      },
    textInput: {
        textAlign: "center",
        width: "100%",
        paddingHorizontal: 10,
        color: "#102F44",
        fontSize: 15,
      },
})
