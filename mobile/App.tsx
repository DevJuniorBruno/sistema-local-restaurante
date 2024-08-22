import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/index';

export default function App() {
  return (
    <NavigationContainer>

      <SafeAreaView style={styles.container}  >
        <StatusBar  barStyle="light-content" translucent={false} />
      </SafeAreaView>
    
      <Routes/>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#1d1d2e"
  }
})