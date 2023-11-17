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
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
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
  const [showPassword, setShowPassword] = useState(false);

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

  // For Sign Up Image
  const logoImageWidth = 110; // Adjust this value as needed
  const logoImageHeight = 100; 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
      <View style={{ padding: 20, marginTop: 30}}>
      <View style={{ alignItems: 'center', marginBottom: 1 }}>
          <ImageBackground
            source={require('../assets/signup.png')}
            style={{ width: logoImageWidth, height: logoImageHeight, resizeMode: 'contain' }}
          />
      </View>

      <Text style={styles.welcomeText}>Sign Up</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <AntDesign name="user" size={24} color="black" />
        <TextInput 
          placeholder="name"
          value={name}
          onChangeText={setName}
          style={{
            color: 'black',
            fontSize: 18,
            width: '100%',
            marginVertical: 25, 
            marginLeft: 10
          }}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput 
          placeholder="example@example.com"
          value={email}
          onChangeText={setEmail}
          style={{
            color: 'black',
            fontSize: 18,
            width: '100%',
            marginVertical: 25,
            marginLeft: 10 
          }}
        />
      </View>

      <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
          <Feather name="lock" size={24} color="black" />
          <TextInput 
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{
              color: 'black',
              fontSize: 18,
              width: '100%',
              marginVertical: 25, 
              marginLeft: 10
            }}
          />

          {/* Eye icon to toggle password visibility */}
          <Pressable onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10, top: 22 }}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" />
          </Pressable>
      </View>

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

      {/* For the "or" horizontal line (ReAnn) */}
      <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 15,
            marginTop: 50,
            marginBottom: 5
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
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            Already Have an account?{' '} 
            <Text style={{ textDecorationLine: 'underline' }}>Sign In</Text>
        </Text>
      </Pressable>
    </View>
    </ImageBackground>
  )
}

export default SignUpScreen;
