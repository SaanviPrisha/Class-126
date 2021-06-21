import React from 'react';
import { StyleSheet, View } from 'react-native';
import SendAPI from './screens/sendAPI'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SendAPI />
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
