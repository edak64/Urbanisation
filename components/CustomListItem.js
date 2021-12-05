import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
const CustomListItem = ({ id, email, message, timestamp }) => {
  const [info, setInfo] = useState([]);
  const fetchFonts = () => {
    return Font.loadAsync({
    'cinzel': require('../assets/Cinzel/static/Cinzel-Medium.ttf'),
    });
    };
    {/*
     au-dessous c'est la composant que j'ai crée qui est un ListItem pour les commentaire chaque commentaire aura ce format
    */}
  return (
    
    <ListItem
      key={id}
      bottomDivider
      style={{borderColor:"#6d071a"}}
    >
      <ListItem.Content>
        <ListItem.Title style={{ fontFamily: "cinzel", marginTop: 10 }}>
          {email}
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontFamily: "cinzel", marginTop: 10 }}
        >{message}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
