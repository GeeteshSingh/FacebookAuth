import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import * as Facebook from 'expo-facebook'

export default function App() {
  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '491430748841493'
      })
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile']
        })
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        )
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`)
      } else {
        type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up Using Facebook!</Text>
      <Button
        title='LogIn'
        iconPosition='right'
        icon={{
          name: 'arrow-right',
          size: 20,
          color: 'black'
        }}
        onPress={logIn}
      />

      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
