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
  Button,
  NavigatorIOS,
  StatusBar
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
          <TouchableHighlight onPress={() => Linking.openURL(item.url)}>
            <Text>
              <Image style={div.image} source={{uri: item.avatar}}/>
                <Text>
                  <Text style={div.user}>{item.user}</Text>
                  <Text style={div.date}> : {item.date}</Text></Text>

            </Text>

          </TouchableHighlight>
          <Text style={div.msg}>{item.message}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <View>
      <ScrollView>
        {this.renderInfos()}
      </ScrollView>
    </View>
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
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5
  },
  image: {
    width: 60,
    height:70,
  },
  user: {
    fontWeight: "bold",
    color: "#17597a"
  },
  date : {
    color: "#900e2e"
  },
  msg :{
    fontWeight: "bold",
    fontSize: 17
  }
});
