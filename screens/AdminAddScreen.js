import React, { useState,useEffect,useLayoutEffect } from 'react';
import { StyleSheet, Text, View,Image,TextInput, Button, KeyboardAvoidingView, ImageBackground,Keyboard } from 'react-native';
import {Ionicons,Entypo,FontAwesome,FontAwesome5,AntDesign} from "@expo/vector-icons"
import { auth } from '../firebase';
import firebase from "firebase";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const AdminScreen = ({navigation,route}) => {
  {/*
     au-dessous çe sont les states où on sauvgarde les valeurs
    */}
    const [bottleInfo,setBottleInfo]=useState([]);
    const [name,setName]=useState("");
    const [chateau,setChateau]=useState("");
    const [photoUrl,setPhotoUrl]=useState("");
    const [quality,setQuality]=useState("");
    const [taste1,setTaste1]=useState("");
    const [taste2,setTaste2]=useState("");
    const [taste3,setTaste3]=useState("");
    var tastes=[];
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
     au-dessous c'est la fonction qu'on ajoute avec les commentaires
    */}
    const addBottle = () => {
      if(name === "" || chateau === "" || photoUrl === "" || quality === "" || taste1 === "" || taste2 === "" || taste3 === ""){
          alert("Please fill all the fields");
          return;
      }
  
      let tastes = [taste1, taste2, taste3];
      Keyboard.dismiss();
  
      firebase
          .firestore()
          .collection("wineBottles")
          .doc(name)
          .set({
              chateau: chateau,
              image: photoUrl,
              name: name,
              rating: quality,
              tastes: tastes,
          }).then(() => {
              setName("");
              setChateau("");
              setPhotoUrl("");
              setQuality("");
              setTaste1("");
              setTaste2("");
              setTaste3("");
              alert("Bottle Added Successfully!");
          }).catch((error) => {
              alert(error.message);
          });
  }
      {/*
     au-dessous sont le saisie de text qu'on écrit au dedans les valeurs pour ajouter la bouteille de vin
    */}
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
        onChangeText={(text)=>setName(text.toLowerCase())}

      />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="wine-bottle" size={24} color="black" />
        <TextInput
        placeholder="Nom du Chateau"
        placeholderTextColor="#102F44"
        style={styles.textInput1}
        onChangeText={(text)=>setChateau(text.toLowerCase())}

      />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="wine-bottle" size={24} color="black" />
        <TextInput
        placeholder="URL Photo"
        placeholderTextColor="#102F44"
        style={styles.textInput1}
        onChangeText={(text)=>setPhotoUrl(text)}

      />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="wine-bottle" size={24} color="black" />
        <TextInput
        placeholder="Qualité"
        placeholderTextColor="#102F44"
        style={styles.textInput1}
        onChangeText={(text)=>setQuality(text)}

      />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="wine-bottle" size={24} color="black" />
        <TextInput
        placeholder="Saveur 1"
        placeholderTextColor="#102F44"
        style={styles.textInput1}
        onChangeText={(text)=>setTaste1(text.toLowerCase())}

      />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="wine-bottle" size={24} color="black" />
        <TextInput
        placeholder="Saveur 2"
        placeholderTextColor="#102F44"
        style={styles.textInput1}
        onChangeText={(text)=>setTaste2(text.toLowerCase())}

      />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="wine-bottle" size={24} color="black" />
        <TextInput
        placeholder="Saveur 3"
        placeholderTextColor="#102F44"
        style={styles.textInput1}
        onChangeText={(text)=>setTaste3(text.toLowerCase())}

      />
      </View>
      <TouchableOpacity title="add" style={styles.inputContainer} onPress={()=>addBottle()}>
      <AntDesign name="addfile" size={24} color="black" />
        <Text style={styles.textInput1}>Ajouter</Text>
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
