import React from 'react';
import Commit from './src/Commit/Commit'
import Head from './src/Header/Header'
import Footer from './src/Footer/Footer'
import styles from'./Style'
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
