import React from 'react';

import {Header} from 'react-native-elements'
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
export default class Footer extends React.Component {
  render() {
    return (
      <View style={{height:100}}>
        <TouchableHighlight onPress={() => Linking.openURL('http://github.com/Barbe-Bleue')}>
          <Text>App created by Barbe-Bleue: </Text>
        </TouchableHighlight>

      </View>
    );
  }
}
