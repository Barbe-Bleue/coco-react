import React from 'react';
import axios from 'axios'
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableHighlight,
  Linking,
  AppRegistry ,
  Button
} from 'react-native';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      res: []
    }
  }
  componentDidMount() {
    axios.get('https://api.github.com/repos/torvalds/linux/commits')
    .then( (response) => {
        var user,avatar,m,message,url,date,newDate;
        var infos;
        for(let data of response.data) {
          console.log(data.html_url);
          date = new Date(data.commit.author.date);
          newDate = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
          m = data.commit.message;
          message = m.substring(0, m.indexOf('\n'));
          if(data.committer){
            avatar = data.committer.avatar_url;
          } else {
            avatar = data.author.avatar_url;
          }
          var infos = {
            user: data.commit.author.name,
            date: newDate,
            avatar: avatar,
            message: message,
            sha: data.sha,
            url: data.html_url
          }
          this.setState({res: [...this.state.res, infos]});
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  renderInfos() {
    // .map = looper sur les items
    // item = un des items (key => value)
    return this.state.res.slice(0,10).map((item) => {
      return (
        <View key={item.sha} style={div.container}>
          <TouchableHighlight onPress={() =>
             Linking.openURL(item.url)} >
            <Image style={{width: 50, height: 50}} source={{uri: item.avatar}}/>
          </TouchableHighlight>
          <Text style={{fontWeight: 'bold'}}>{item.user} : {item.date}</Text>
          <Text>{item.message}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderInfos()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const div = StyleSheet.create({
  container: {
    backgroundColor: '#cde7eb',
    marginTop:10,
    borderWidth: 2
  },
});
