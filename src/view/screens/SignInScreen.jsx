import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, Alert, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, gql } from '@apollo/client';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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


const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION);

  useEffect(() => {
    if (error) {
      Alert.alert('Invalid credentials, try again');
    }
  }, [error])

  if (data) {
    // Save token
    AsyncStorage
      .setItem('token', data.signIn.token)
      .then(() => {
        // Redirect home
        navigation.navigate('ShoppingList')
      })
  }

  const onSubmit = () => {
    signIn({ variables: { email, password } })
  }

  // For Sign In Image
  const logoImageWidth = 120; // Adjust this value as needed
  const logoImageHeight = 110;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
      <View style={{ padding: 20, marginTop: 30 }}>
        <View style={{ alignItems: 'center', marginBottom: 1 }}>
          <ImageBackground
            source={require('../assets/signin.png')}
            style={{ width: logoImageWidth, height: logoImageHeight, resizeMode: 'contain' }}
          />
        </View>

        <Text style={styles.welcomeText}>Sign In</Text>

        {/* Envelope icon  */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <MaterialCommunityIcons name="email-outline" size={24} color="black" />
          <TextInput
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            style={{ color: 'black', fontSize: 18, width: '100%', marginVertical: 25, marginLeft: 10 }}
          />
        </View>

        {/* Lock icon  */}
        <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <Feather name="lock" size={24} color="black" />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{ color: 'black', fontSize: 18, width: '100%', marginVertical: 25, marginLeft: 10 }}
          />

          {/* Eye icon to toggle password visibility */}
          <Pressable onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10, top: 22 }}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" />
          </Pressable>
        </View>

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

          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            Sign In
          </Text>
        </Pressable>

        <Pressable
          style={{
            height: 30,
            borderRadius: 5,
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
            Forgot Password?
          </Text>
        </Pressable>

        {/* For the "or" horizontal line */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 15,
            marginTop: 40,
            marginBottom: 20
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              flex: 1,
              marginRight: 10,
            }}
          />
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 15,
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              borderColor: 'black',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>OR</Text>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              flex: 1,
              marginLeft: 10,
            }}
          />
        </View>

        <Pressable
          onPress={() => { navigation.navigate('SignUp') }}
          style={{
            height: 50,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}>
            New here?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  )
}

export default SignInScreen
