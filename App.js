import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native'
import * as firebase from 'firebase'
import { firebaseConfig } from './Config'
import { Container, Header, Content, Form, Item, Input, Label, Button, ListItem, List,Body,Title } from 'native-base';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends Component {
  state = {
    Username: '',
    Password: '',
    Mylist: []
  }
  componentDidMount() {
    const myitem = firebase.database().ref().child('User');
    myitem.on("value", datasnap => {
      if (datasnap.val()) {
        this.setState({ Mylist: Object.values(datasnap.val()) })
      }
      // console.log(Object.values(datasnap.val()))
    })
  }
  Saveitem() {
    const myitem = firebase.database().ref().child('User');
    myitem.push().set({
      Username: this.state.Username,
      Password: this.state.Password,
      time: Date.now()
    })
    this.setState({
      Username: '',
      Password: ''
    })
  }
  removeitem() {
    firebase.database().ref("User").remove()
    this.setState({ Mylist: [{ Username: 'Removed Succussfully' }] })
  }
  render() {
    console.log(this.state)
    const data = this.state.Mylist.map(Item => {
      return (
        <ListItem style={{ justifyContent: 'space-between' }}>
          <Text>{Item.Username}</Text>
          <Text>{new Date(Item.time).toDateString()}</Text>
        </ListItem>
      )
    })
    return (
      <View style={styles.container}>
        <Header>
          <Body>
            <Title style={{justifyContent:'center',
          textAlign:'center',alignSelf: "center"}}>Firebase_ Crud</Title>
          </Body>
        </Header>
        <Form>
          <Item floatingLabel last>
            <Label style={{ textAlign: 'center' }}>Username</Label>
            <Input
              value={this.state.Username}
              onChangeText={(Username) => this.setState({
                Username
              })} />
          </Item>
          <Item floatingLabel last>
            <Label style={{ textAlign: 'center' }} >Password</Label>
            <Input value={this.state.Password}
              onChangeText={(Password) => this.setState({
                Password
              })} />
          </Item>
          <View style={styles.ButtonVie}>
            <Button style={styles.Butn} onPress={() => this.Saveitem()} rounded><Text>    Add Item </Text></Button>
            <Button style={styles.Butnr} rounded onPress={() => this.removeitem()}><Text> Remove Item </Text></Button>
          </View>
        </Form>
        <ScrollView>
          <List>
            {data}
          </List>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ButtonVie:
  {
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Butn:
  {
    padding: 10,
    width: 100,
    backgroundColor: 'green',

  },
  Butnr:
  {
    padding: 10,
    width: 100,
    backgroundColor: 'red'
  }
});