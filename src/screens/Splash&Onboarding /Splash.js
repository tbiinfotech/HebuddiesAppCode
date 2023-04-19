import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation, withTranslation, Trans } from 'react-i18next';

import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

const Splash = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [login, setLogin] = useState("");
  useEffect(() => {
    
    user();
  }, [useCallback]);
  const user = async () => {
    var login1 = await AsyncStorage.getItem("logged");
    setLogin(login1);
    if (login1 == "true") {
      navigation.navigate("MyTabs");
    } else {
      setTimeout(() => {
        navigation.navigate("SwiperScreen");
      }, 3000);
    }
  };
  return (
    <View style={SplashStyle.MainContainer}>
      <ImageBackground
        style={SplashStyle.ImageBackground}
        source={require("../../asset/Splash.png")}
      >
        <Image
          style={SplashStyle.logoimg}
          resizeMode="contain"
          source={require("../../asset/Logo.png")}
        />
      </ImageBackground>
    </View>
  );
};

export default Splash;
const SplashStyle = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  ImageBackground: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoimg: {
    height: "50%",
    width: "50%",
  },
});