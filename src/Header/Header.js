import React from 'react';
import {Header} from 'react-native-elements'

export default class Head extends React.Component {
  render() {
return(
        <Header
          centerComponent={{ text: 'LAST COMMITS', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
    );
  }
}
