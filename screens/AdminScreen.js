import React, { useState,useEffect,useLayoutEffect } from 'react';
import { StyleSheet, Text, View,Image,TextInput, Button, KeyboardAvoidingView, ImageBackground } from 'react-native';
import {Ionicons,Entypo,FontAwesome,FontAwesome5,AntDesign} from "@expo/vector-icons"
import { auth } from '../firebase';
import firebase from "firebase";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const AdminScreen = ({navigation,route}) => {
  {/*
     au-dessous çe sont les states où on sauvgarde les valeurs
    */}
    const [bottleInfo,setBottleInfo]=useState([]);
    const [wineBottle,setWineBottle]=useState("");
     {/*
     au-dessous ç'est la fonction pour créer l'entête de la page
    */}
    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: ()=> null,
          title: "Admin",
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
            <Text style={{fontWeight:'bold',fontSize:20,color:'white',marginLeft:'10%'}}>Admin Page</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#6d071a',
            borderBottomLeftRadius:40,
            borderBottomRightRadius:40,
          },
        });
      }, [navigation]);
     
 {/*
     au-dessous ç'est la fonction pour éffacer la bouteille choisie
    */}
      const deleteDoc = async () =>{
        if(wineBottle !== "") {
          await firebase.firestore().collection('wineBottles').doc(wineBottle).delete();
        } else {
          console.log("No wine bottle specified.");
        }
      }
    return (
        <KeyboardAvoidingView style={{flex:1}}>
        <ImageBackground
        style={styles.WineBottle}
        source = {require("../assets/wineSpill.jpg")}>
        <ScrollView> 
        <View style={styles.inputContainer}>
        <FontAwesome5 name="wine-bottle" size={24} color="black" />
        <TextInput
        placeholder="Nom de la Bouteille"
        placeholderTextColor="#102F44"
        style={styles.textInput1}
        onChangeText={(text)=>setWineBottle(text.toLowerCase())}

      />
      </View>
        <TouchableOpacity title="delete" style={styles.inputContainer} onPress={()=>deleteDoc()}>
        <AntDesign name="delete" size={24} color="black" />
        <Text style={styles.textInput1}>Effacer</Text>
        </TouchableOpacity>
        <TouchableOpacity title="delete" style={styles.inputContainer} onPress={()=>navigation.navigate("AdminAdd")}>
        <AntDesign name="addfile" size={24} color="black" />
        <Text style={styles.textInput1}>Ajouter une Bouteille</Text>
        </TouchableOpacity>
          </ScrollView>
          </ImageBackground>
          </KeyboardAvoidingView>
    )
}

export default AdminScreen

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
  inputContainer1: {
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
    width: '100%',
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
textInput1: {
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 10,
    color: "#102F44",
    fontSize: 15,
  },
  error: {
    color: "red",
    fontFamily: "Regular",
    fontSize: 15,
    textAlign: "center",
    marginTop: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  textstyle:{
    fontFamily:'cinzel',
    justifyContent:'flex-start',
    flexShrink:1,
  },
  footer: {
    justifyContent: 'flex-end',
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  view1:{
    justifyContent: 'flex-start',
    flexDirection: "row",
    padding: 15,
  },
})
