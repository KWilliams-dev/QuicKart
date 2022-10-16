import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export const SplashScreen = () => {
    
  const [text, setText] = useState('');
  const [animate, setAnimate] = useState(true);


  useEffect(() => {
      setTimeout(() => {
          setText("Connecting...");
          setAnimate(false);
      }, 6000);
  })

   return(
    <View style={styles.activityI}>
            <ActivityIndicator animating={animate} 
                color="red" size="large" />
            <Text style={styles.text}>{text}</Text>
        </View>
   )
}

const styles = StyleSheet.create({
  activityI: {
      alignContent: "center",
      margin: 50
  },
  text: {
      fontSize: 30,
      fontWeight: "bold"
  }
})