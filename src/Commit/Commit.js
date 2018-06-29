import React from 'react';
import axios from 'axios';

// StyleSheet for commit component
import styles from './Style'

import {
  Text,
  View,
  Image,
  TouchableHighlight,
  Linking,
  Button,
} from 'react-native';


export default class Commit extends React.Component {

  constructor(){
    super();
    this.state = {
      res: []
    }
  }

  // éxécution avant affichage
  componentDidMount() {
    axios.get('https://api.github.com/repos/torvalds/linux/commits')
    .then( (response) => {

        // init variables
        var avatar,m,message,date,newDate;

        // on boucle sur tous les commits
        for(let data of response.data) {

          // format date
          date = new Date(data.commit.author.date);
          newDate = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();

          // extract first line from commit msg
          m = data.commit.message;
          message = m.substring(0, m.indexOf('\n'));

          // get avatar url
          if(data.committer){
            avatar = data.committer.avatar_url;
          } else {
            avatar = data.author.avatar_url;
          }

          // All infos
          var infos = {
            user: data.commit.author.name,
            date: newDate,
            avatar: avatar,
            message: message,
            sha: data.sha,
            url: data.html_url
          }

          // On reprend le tableau à l'origine, et ajout du nouvel item
          this.setState({res: [...this.state.res, infos]});
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  renderInfos() {
    // .map = looper sur les items
    // item = un des items (key => value)
    return this.state.res.map((item) => {
      return (
        <View key={item.sha} style={styles.container}>

          {/* element cliquable*/}
          <TouchableHighlight onPress={() => Linking.openURL(item.url)}>
            <Image style={styles.image} source={{uri: item.avatar}}/>
          </TouchableHighlight>

          {/* infos user*/}
          <Text style={styles.infos}>
            <Text style={styles.user}>{item.user}</Text>
            <Text style={styles.date}> : {item.date}</Text>
          </Text>

          {/* commit message*/}
          <Text style={styles.msg}>{item.message}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <View>
        {this.renderInfos()}
      </View>
    );
  }
}
