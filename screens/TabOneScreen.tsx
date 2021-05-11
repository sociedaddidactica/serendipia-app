import * as React from 'react';
import { StyleSheet, Image, TextInput } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
//import { Card } from 'react-native-elements';
import { Container, Content, Form, Item, Input, Button } from 'native-base';

export default function TabOneScreen() {
  return (
    <><View style={styles.container}>
        <Image source={require('../assets/images/icons/impulsate-blanc.png')} style={styles.image} />
        <Text style={styles.title}>Registro</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Container style={styles.container2}>
          <Content>
            <Form>
              <Item>
                <Input placeholder="Username" />
              </Item>
              <Item>
                <Input placeholder="E-mail" />
              </Item>
              <Item>
                <Input placeholder="Password" secureTextEntry={true}/>
              </Item>
              <Item>
                <Input placeholder="Repeat Password" secureTextEntry={true}/>
              </Item>
              <Button style={styles.button}>
                <Text>Registrate</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#36A'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
   //marginBottom: 0
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    flex: 1,
    width: 300,
    height: undefined,
    resizeMode: 'contain',
    //marginTop:-100,
  },
  container2:{
    height: '110%',
    width: '80%',
    borderRadius: 20,
    //justifyContent: 'center'
  },
  button: {
    alignSelf: 'center',
    margin: '4%',
    borderRadius: 10,
    paddingHorizontal:5
  }
// npm ERR! Errors were found in your package-lock.json, run  npm install  to fix them.
// npm ERR!     Missing: @expo/vector-icons@^10.0.0
// npm ERR!     Missing: expo-asset@~8.2.0
// npm ERR!     Missing: expo-constants@~9.2.0
// npm ERR!     Missing: expo-font@~8.3.0
// npm ERR!     Missing: expo-linking@^1.0.1
// npm ERR!     Missing: react-native@https://github.com/expo/react-native/archive/sdk-39.0.4.tar.gz
// npm ERR!     Missing: react-native-safe-area-context@3.1.4
});
