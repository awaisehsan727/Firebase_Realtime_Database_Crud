import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label,Button,Text } from 'native-base';
export default class FloatingLabelExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
          <Form>
            <Item floatingLabel last>
              <Label style={{textAlign:'center'}}>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label style={{textAlign:'center'}} >Password</Label>
              <Input />
            </Item>
            <View style={styles.ButtonVie}>
            <Button style={styles.Butn}  rounded><Text> Add Item </Text></Button>
            <Button style={styles.Butnr} rounded><Text> Remove Item </Text></Button>
            </View>
          </Form>
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
    marginTop:20,
    padding:20,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  Butn:
  {
    padding:10,
    width:130,
    backgroundColor:'green'
  },
  Butnr:
  {
    padding:10,
    width:130,
    backgroundColor:'red'
  }
});