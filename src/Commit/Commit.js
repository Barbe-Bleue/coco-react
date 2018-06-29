import React from 'react';
import axios from 'axios';
import { Button } from 'react-native-elements'
// StyleSheet for commit component
import styles from './Style'

import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image,
  TouchableHighlight,
  Linking,
  StyleSheet
} from 'react-native';


export default class Commit extends React.Component {

  constructor(){
    super();
    this.state = {
      res: [],
      refreshing: false
    }
    this.sortByName = this.sortByName.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
  }

  // when pull to refresh
  _onRefresh = () => {
    this.setState({refreshing: true, res:[]});
    this.fetchData();
  }

  // execute before display
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    // get all commits
    axios.get('https://api.github.com/repos/torvalds/linux/commits')
    .then( (response) => {

        // init variables
        var avatar,m,message,date,newDate;

        // loop on all commits
        for(let data of response.data) {
          // format date
          date = new Date(data.commit.author.date);
          newDate = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();

          // extract first line from commit msg
          m = data.commit.message;
          message = m.substring(0, m.indexOf('\n'));

          // get avatar url
          if(data.author !== null){
            avatar = data.author.avatar_url;
          } else {
            // default avatar
            avatar = "https://cdn0.iconfinder.com/data/icons/octicons/1024/mark-github-128.png";
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

          // get the array at the origin and adds an element
          this.setState({res: [...this.state.res, infos]});
        }
        this.setState({refreshing: false});
      }).catch(function (error) {
        console.log(error);
      });
  }

  // sort function
  sortByProperty(property) {
    return function (x, y) {
      return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
  }

  sortByName() {
    this.setState({
      res: this.state.res.sort(this.sortByProperty('user'))
    });
  }
  sortByDate() {
    this.setState({
      res: this.state.res.sort(this.sortByProperty('date'))
    });
  }

  renderInfos() {
    // .map = loop on items
    // item = one of the items (key => value)
    return this.state.res.map((item) => {
      return (
        <View key={item.sha} style={styles.container}>

          {/* touchable element */}
          <TouchableHighlight onPress={() => Linking.openURL(item.url)}>
            <Image style={styles.image} source={{uri: item.avatar}}/>
          </TouchableHighlight>

          {/* user infos*/}
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
      <View style={styles.sortContainer}>
        <View style={styles.buttonContainer}>
        <Button
          large
          icon={{name: 'sort-up', type: 'font-awesome'}}
          onPress={this.sortByName}
          title="Trier par nom"
          backgroundColor="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
    </View>
      <View style={styles.buttonContainer}>
      <Button
          large
          icon={{name: 'sort-up', type: 'font-awesome'}}
        onPress={this.sortByDate}
        title="Trier par date"
        backgroundColor="#841584"
        accessibilityLabel="Learn more about this purple button"
        />
    </View>
    </View>
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        {this.renderInfos()}

      </ScrollView>
    </View>
    );
  }
}
