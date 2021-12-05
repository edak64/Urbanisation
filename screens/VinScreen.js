import React,{useState,useEffect,useLayoutEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Keyboard, KeyboardAvoidingView,Image } from 'react-native'
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import {Ionicons,AntDesign} from '@expo/vector-icons'
import firebase from "firebase";
import CustomListItem from '../components/CustomListItem';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
const VinScreen = ({navigation,route}) => {
  {/*
     au-dessous çe sont les states où on sauvgarde les valeurs
    */}
    const [bottleInfo,setBottleInfo]=useState([]);
    const [input,setInput]=useState("");
    const [comments,setComments]=useState([]);
    {/*
     au-dessous ç'est la fonction pour chercher le font choisie
    */}
    const fetchFonts = () => {
        return Font.loadAsync({
        'cinzel': require('../assets/Cinzel/static/Cinzel-Medium.ttf'),
        });
        };
        {/*
     au-dessous ç'est la fonction pour chercher les info de la bouteille de vin
    */}
    useEffect(() => {
        fetchFonts();
    const unsubscribe =firebase
      .firestore()
      .collection("wineBottles")
      .where("name", "==", route.params.nomBouteille)
      .get().then(((snapshot) => {
        setBottleInfo(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }));
    return unsubscribe;
  }, []);
  {/*
     au-dessous ç'est la fonction pour chercher les commentaires sur la bouteille de vin
    */}
  useEffect(()=>{
    const unsubscribe =firebase
      .firestore()
      .collection("wineBottles")
      .doc(route.params.nomBouteille)
      .collection("comments")
      .get()
      .then(((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }))
      return unsubscribe;
  },[]);
  {/*
     au-dessous ç'est la fonction pour créer l'entête de la page
    */}
  useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: ()=> null,
      title: "Bouteille",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.nomBouteille}
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#6d071a', //Set Header color
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 30,
          }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  {/*
     au-dessous ç'est la fonction pour ajouter un commentaire à une bouteille de vin et la sauvgarder dans la base de données
    */}
  const postComment = () => {
    Keyboard.dismiss();
    firebase
      .firestore()
      .collection("wineBottles")
      .doc(route.params.nomBouteille)
      .collection("comments")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
      });
    setInput("");
  };
    return (
        <KeyboardAvoidingView style={{flex:1}}>
        <ScrollView>
        <View>
        {/*
     au-dessous on affiche les infos de la bouteille de vin
    */}
        {bottleInfo.map(({ data: { image} }) => (
            <Image style={{
            alignSelf: 'center',
            height: 150,
            width: 150,
            borderWidth: 1,
            borderRadius: 75,
        marginTop:20}} source={{ uri: image }} />
          ))}</View>
          <View style={styles.view1}>
        <Text style={styles.textstyle}>Nom du Chateau : </Text>
          {bottleInfo.map(({ id, data: {chateau} }) => (
            <Text style={styles.textstyle}>{chateau}</Text>
          ))}</View>
          <View style={styles.view1}>
        <Text style={styles.textstyle}>qualité : </Text>
          {bottleInfo.map(({ id, data: {rating} }) => (
            <Text style={styles.textstyle}>{rating}</Text>
          ))}<Text style={styles.textstyle}>/10</Text></View>
          <View style={styles.view1}>
        <Text style={styles.textstyle}>les saveurs: </Text>
          {bottleInfo.map(({ id, data: {tastes} }) => (
            <Text style={styles.textstyle}>
            {tastes.map((t,index)=>(
                <Text style={styles.textstyle} key={index}>{t}, </Text>
            ))}
            </Text>
          ))}</View>
          {/*
     au-dessous on affiche les commentaires sur la bouteille de vin dans les customListItem qu'on  crée
    */}
          {comments.map(({ id, data: {email,message,timestamp} }) => (
            <CustomListItem
              key={id}
              id={id}
              email={email}
              message={message}
              timestamp={timestamp}
            />
          ))}</ScrollView>
          <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={postComment}
                placeholder="Écrire un Commentaire"
                style={styles.textInput}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={postComment}>
                <Ionicons name="send" size={24} color="#CE2029" />
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        
    )
}

export default VinScreen

const styles = StyleSheet.create({
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
