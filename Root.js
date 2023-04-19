
import React, { useEffect, useState } from 'react';
import App from './App';
// import './translation/i18n'
import './src/screens/translation/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

const App = (async)  => {

const { t, i18n } = useTranslation();

const _callLangFunction = async() => {

  var langg = await AsyncStorage.getItem("language")
  i18n.changeLanguage(item)
  .then(() => console.log(langg))
    .then(async () => {
        await AsyncStorage.setItem("language", langg);
    })
    .catch(err);
}

useEffect(() => {
  _callLangFunction();
}, [])
      


return (
    <App />
  );
};
const full_app =  withTranslation()(App)
export default full_app;
// export default App;