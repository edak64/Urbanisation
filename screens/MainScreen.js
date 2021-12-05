import React,{useState,useEffect,useLayoutEffect} from 'react'
import { Button, StyleSheet, Text, View,Platform,Image,TextInput, KeyboardAvoidingView, Animated, TouchableOpacity } from 'react-native'
import firebase from "firebase";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {MaterialCommunityIcons,MaterialIcons,Ionicons,Entypo,FontAwesome} from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
require("firebase/firebase-storage");
const MainScreen = ({navigation}) => {
  {/*
     au-dessous ce sont les states où on remplit les valeurs qu'on veut
    */}
    const defaultImage= require("../assets/LoginRegisterBG.jpeg");
    const [pickedImagePath, setPickedImagePath] = useState("");
    const [hasCameraPermission, setHasCameraPermission] = useState("");
    const [hasGalleryPermission, setHasGalleryPermission] = useState("");
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const [ocrText,setOcrText] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    const [nomVin,setNomVin]= useState("");
    const [uploading, setUploading] = useState(false);
    {/*
     au-dessous c'est L'URL pour demander de l'API de faire un OCR où k est la variable URL de l'image
    */}
    const originURL ="https://apitest2ndjs.herokuapp.com/ssd?k=";
    const fetchFonts = () => {
      return Font.loadAsync({
      'cinzel': require('../assets/Cinzel/static/Cinzel-Medium.ttf'),
      });
      };
      useEffect(()=>{
        fetchFonts();
      });
    const storage = firebase.storage();
    {/*
     au-dessous c'est la fonctions pour demander les permissions de camera et de galerie
    */}
    useEffect(() => {
      (async () => {
        const cameraStatus = await Camera.requestPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === "granted");
  
        const galleryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === "granted");
      })();
    }, []);
     {/*
     au-dessous c'est la fonction pour envoyer l'image a firebase pour la créer un URL
    */}
    const uploadImage = async () => {
    const response = await fetch(pickedImagePath);
    const blob = await response.blob();
        const task = firebase.storage().ref().child("images/").put(blob);
        storage.ref('images/').getDownloadURL()
  .then((url) => {
    setImageUrl(url);
    console.log("it is",url);
    savePostData(url);
    getImagePublicUrl();
  });

      };
      {/*
     au-dessous c'est la fonction pour envoyer l'URL à firestore
    */}
      const savePostData = (downloadURL) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            photoOcr: downloadURL,
          })
          .then(function () {
            setUploading(false);
          });
      };
      {/*
     au-dessous c'est la fonction pour chercher l'url de l'image
    */}
      const getImagePublicUrl = () => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((snapshot)=>{
            console.log("wliwli",snapshot.data().photoOcr);
          });
      };
      {/*
     au-dessous c'est la fonction pour déclancher l'ocr
    */}
      const getOCRFromApiAsync = async () => {
        uploadImage();
        try {
          const newImageURL = originURL + imageUrl;
          console.log("full url",newImageURL);
          const response = await fetch(
            newImageURL
          );
          const json = await response.text();
          console.log(json);
          setOcrText(json);
        } catch (error) {
          console.error(error);
          setOcrText("ok");
        }
      };
      {/*
     au-dessous c'est la fonction pour prendre une photo
    */}
      const  takePicture = async () => {
        if (camera) {
            camera.takePictureAsync().then((data)=>{
                console.log(data.uri);
                setPickedImagePath(data.uri)
            });
        }else{
            setPickedImagePath("false");
        }
     };
     {/*
     au-dessous c'est la fonction pour se déconnecter
    */}
     const signOut = () =>{
      firebase.auth().signOut().then(navigation.navigate('Login'));
     }
     {/*
     au-dessous c'est la fonction pour choisir une image de la galerie
    */}
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
          setPickedImagePath(result.uri);
        }
        await uploadImage();
      }
      {/*
     au-dessous ç'est la fonction pour créer l'entête de la page
    */}
      useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: ()=> null,
          title: "Main Page",
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
            <FontAwesome name="sign-out" size={40} color="white" style={{marginLeft:'10%'}} onPress={()=>signOut()}/>
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
        <KeyboardAvoidingView style={styles.container}>
        <ScrollView>

            <TextInput style={styles.input}  onChangeText={(text)=>setNomVin(text.toLowerCase())} />
            <View style={styles.cameraContainer}>
            {/*
     au-dessous c'est le composant de la camera active
    */}
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio={"1080p"}
          >
            <View style={{ width: "100%", alignSelf: "center" }}>
            <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color="white"
            style={styles.flipCamera}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />

            </View>
            <View
              style={{ width: "100%", alignSelf: "center", marginTop: 350 }}
            >
              
            <MaterialCommunityIcons
            style={styles.recordButton}
            name="panorama-fisheye"
            size={70}
            color="white"
            onPress={() => takePicture()}
          />
              
            </View>
          </Camera>
        </View>
        <Text style={{textAlign:'center'}}>{ocrText}</Text>
        <TextInput style={styles.input} placeholder='Changer le Résultat ...'  onChangeText={(text)=>setNomVin(text.toLowerCase())} />
        </ScrollView>
        <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.5} >
        <Entypo
            name="folder-images"
            size={40}
            color="white"
            onPress={()=>pickImage()}
            style={{marginRight:'25%'}}
          />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} >
          <MaterialCommunityIcons name="ocr" size={40}  color="white" onPress={()=>getOCRFromApiAsync()} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={{marginLeft:'25%'}} >
          <FontAwesome name="search" size={40} color="white" onPress={()=>navigation.navigate('BouteillePage',{nomBouteille:nomVin})} />
          </TouchableOpacity>
      </View>
        </KeyboardAvoidingView>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
       },
    button1:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    textstyle:{
      alignItems:'center',
      fontFamily:'cinzel',
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: "#20232a",
      backgroundColor: "#6d071a",
      color: "white",
      textAlign: "center",
      fontSize: 15,
      fontWeight: "bold",
      width: '100%',
    },
    text1:{
      alignItems:'center',
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: "#20232a",
      backgroundColor: "#6d071a",
      color: "#20232a",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
    },
    ImagePicker:{
      color: 'black',
      width: '50%',
    },
    buttonView:{
      width: 100,
      height: 100,
      textAlign: 'center',
      flexDirection:'row', 
      alignItems:'center', 
      justifyContent:'center'
        },
    WineBottle:{
        resizeMode: "center",
        height: 200,
        width: 400
    },
    fixedRatio: {
      flex:1,
      aspectRatio: 4/6,
      alignSelf: "center",
      marginTop:'5%',
    },
    recordButton: {
      alignSelf: "center",
      zIndex: 100,
    },
    flipCamera: {
      zIndex: 99,
      marginTop: 20,
      marginLeft: 40,
      alignSelf: "flex-start",
    },
    cameraContainer: {
      alignItems:'center',
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      padding: 15,
      margin: "auto",
      backgroundColor:'#6d071a',
      borderTopRightRadius:40,
      borderTopLeftRadius:40,
      alignItems:'center'
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
})
