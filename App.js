import React from 'react';
import Commit from './src/Commit/Commit'
import {
  View,
  StyleSheet
} from 'react-native';
export default class App extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Commit/>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#ED4A52'
  },
});
