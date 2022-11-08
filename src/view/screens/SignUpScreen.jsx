import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  ActivityIndicator, 
  Alert,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { useMutation, gql } from '@apollo/client';
import { styles } from '../styles/ShoppingList.styles';

const SIGN_UP_MUTATION = gql`
mutation signUp($email: String!, $password: String!, $name: String!) {
  signUp(input: {email: $email, password: $password, name: $name}){
    token
    user {
      id
      name
      email
    }
  }
}
`;

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  //const navigation = useNavigation();

  // mutation[0] : A function to trigger the mutation
  // mutation[1] : result object 
  //    { data,error, loading }
  const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);

  if (error) {
    Alert.alert('Error signing up. Try again')
  }

  if (data) {
    // save token
    AsyncStorage
      .setItem('token', data.signUp.token)
      .then(() => {
        // redirect home
        navigation.navigate('ShoppingList')
      })
  }

  const onSubmit = () => {
    signUp({variables: { name, email, password }})
  }

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
    <View style={{ padding: 20, marginTop: 30}}>
      <Text style={styles.welcomeText}>Sign Up</Text>
      <TextInput 
        placeholder="name"
        value={name}
        onChangeText={setName}
        style={{
          color: 'black',
          fontSize: 18,
          width: '100%',
          marginVertical: 25, 
        }}
      />

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
        style={{ 
          backgroundColor: '#000000',
          height: 50,
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        {loading && <ActivityIndicator />}
        <Text 
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            Sign up
        </Text>
      </Pressable>

      <Pressable
        disabled={loading}
        onPress={() => { navigation.navigate('SignIn')} } 
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
            Already Have an account? Sign in
        </Text>
      </Pressable>
    </View>
    </ImageBackground>
  )
}

export default SignUpScreen;
