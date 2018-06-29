import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableHighlight,
  Linking,
  AppRegistry ,
  Button,
  NavigatorIOS,
  StatusBar
} from 'react-native';
import {Avatar} from 'react-native-elements'

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
        <View key={item.sha} style={div.container}>

          {/* element cliquable*/}
          <TouchableHighlight onPress={() => Linking.openURL(item.url)}>
            <Image style={div.image} source={{uri: item.avatar}}/>
          </TouchableHighlight>

          {/* infos user*/}
          <Text style={div.infos}>
            <Text style={div.user}>{item.user}</Text>
            <Text style={div.date}> : {item.date}</Text>
          </Text>

          {/* commit message*/}
          <Text style={div.msg}>{item.message}</Text>
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

// StyleSheet for commit component
const div = StyleSheet.create({
  container: {
    marginTop:10,
    borderBottomWidth: 3,
    borderColor: "#444",
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    width: 70,
    height:70,
    borderColor: "white",
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 70 / 2
  },
  user: {
    fontWeight: "bold",
    color: "#4aede5",
  },
  date : {
    color: "#4aed94",
  },
  infos: {
    textAlign: "center",
    fontSize: 20,
  },
  msg :{
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 10,
    marginBottom: 15,
  }
});
