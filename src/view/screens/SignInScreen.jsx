import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, Alert, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, gql } from '@apollo/client';
import { styles } from '../styles/ShoppingList.styles';

const SIGN_IN_MUTATION = gql`
mutation signIn($email: String!, $password: String!) {
  signIn(input: { email: $email, password: $password}) {
    token
    user {
      id
      name
      email
    }
  }
}
`;


const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //const navigation = useNavigation();

  const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION);

  useEffect(() => {
    if (error) {
      Alert.alert('Invalid credentials, try again');
    }
  }, [error])

  if (data) {
    // save token
    AsyncStorage
      .setItem('token', data.signIn.token)
      .then(() => {
        // redirect home
        navigation.navigate('ShoppingList')
      })
  }

  const onSubmit = () => {
    signIn({ variables: { email, password }})
  }

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
    <View style={{ padding: 20, marginTop: 30 }}>
    <Text style={styles.welcomeText}>Sign In</Text>
      <TextInput 
        placeholder="aoliver14@ggc.edu"
        value={email}
        onChangeText={setEmail}
        style={{
          color: 'black',
          fontSize: 18,
          width: '100%',
          marginVertical: 25, 
        }}
      />

      <TextInput 
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          color: 'black',
          fontSize: 18,
          width: '100%',
          marginVertical: 25, 
        }}
      />
      <Pressable 
        onPress={onSubmit} 
        disabled={loading}
        style={{ 
          backgroundColor: '#000000',
          height: 50,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        <Text 
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            Sign In
        </Text>
      </Pressable>

      <Pressable 
        onPress={() => {console.warn('navigate'); navigation.navigate('SignUp')}} 
        style={{ 
          height: 50,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        <Text 
          style={{
            color: '#e33062',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            New here? Sign up
        </Text>
      </Pressable>
    </View>
    </ImageBackground>
  )
}

export default SignInScreen
