import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import contacts from './contacts';
import fotos from './fotos';
//para navegar entre pantallas hay que quitar export default  y dejar solo function App() {...
//export default function App() {
function App(props) {
  const [contador, setContador] = useState(0);
  const contar = () => { setContador(anterior => anterior + 1) }
  const descontar = function () { setContador(anterior => anterior - 1) }
  return (
    <View style={styles.container}>
      <View><Text>Sistema de manejo de pantallas</Text></View>
      <View>
        <Text>Contador: {contador}</Text>
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: 'coral' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={contar}
        >
          <Text style={styles.text}>Contar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={descontar}
        >
          <Text style={styles.text}>Descontar</Text>
        </TouchableOpacity>

      </View>
      <View style={{ flexDirection: 'row', backgroundColor: 'coral' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Somos', {
            edad: 41,
            nombre:'john Doe',
            salario: 2500000
          })}
        >
          <Text style={styles.text}>Quienes somos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.button}
        onPress={() => props.navigation.navigate('Contactenos',)}
        >
          <Text style={styles.text}>Contactenos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.button}
        onPress={() => props.navigation.navigate('Fotos',)}
        >
          <Text style={styles.text}>Fotos</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

class Qsomos extends React.Component {
  /*Características de la pantalla como título - header*/
  static navigationOptions = {
    title: 'Quienes somos',
    headerStyle: {
      backgroundColor: 'orange',
    },
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    const { navigation } = this.props;
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Quienes Somos como titulo</Text>
        <Button
          title="Ir a Inicio"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Text>
          Edad: {JSON.stringify(navigation.getParam('edad', 'NO-Edad'))}
          {/* itemId: {navigation.getParam('itemId', 'NO-ID')} */}
        </Text>
        <Text>
          Nombre: {navigation.getParam('nombre', 'No llegó nombre')}
          {/* otherParam: {JSON.stringify(navigation.getParam('otherParam', 'default value'))} */}
        </Text>
        <Text>
          Salario: {navigation.getParam('salario', '0') * 2}
        </Text>
      </View>
    );
  }
}

// Pila de pantallas

const RootStack = createStackNavigator(
  {
    Home: App,
    Somos: Qsomos,
    Contactenos:contacts,
    Fotos:fotos,
    /*Contacts: Contactus,
    Photos: Photos,
    CUs: CUs,*/
    
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App1 extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// fin pila de pantallas


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7fffd4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  text: {
    color: 'blue',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center'

  },
});
