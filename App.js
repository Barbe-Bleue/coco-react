import React from 'react';
import styles from'./Style'
import Head from './src/Header/Header'
import Commit from './src/Commit/Commit'
import Footer from './src/Footer/Footer'
import {
  View,
  ScrollView,
  StyleSheet, Text
} from 'react-native';

export default class App extends React.Component {

  render() {
    return (
      <View>
        <Head/>
        <ScrollView style={styles.container}>
          <Commit/>
        </ScrollView>
        <Footer/>
      </View>
    );
  }
}
