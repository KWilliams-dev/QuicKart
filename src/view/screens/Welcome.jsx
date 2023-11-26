import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  FlatList,
  Dimensions,
  Image,
  StyleSheet
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from '../styles/ShoppingList.styles';

const { width, height } = Dimensions.get('window'); // Gets the width and height of the screen

// Slides that display images and text for onboarding
const slides = [
  {
    id: '1',
    title: 'Find Your \nQuickest \nRoute \nEverytime \nYou Shop!'
  },
  {
    id: '2',
    image: require('../assets/apple.png'),
    title: 'Input a list \nof items...'
  },
  {
    id: '3',
    image: require('../assets/cards.png'),
    title: '... and we’ll \nlead the \nway!'
  }
]

/**
 * Renders the images and text defined in the slides variable.
 * If there is an image return the image and the text.
 * If there is not an image return the text only.
 *
 */
const Slide = ({ item }) => {
  if (item.image) {
    return (
      // The View component allows the UI to render on the screen.
      // The Image component allows us to render the image on the screen.
      // The Text component allows us to render the text on the screen.
      <View style={{ alignItems: 'center' }}>
        <Image
          source={item?.image}
          // Image takes up 70% of the window for the slides.
          style={{ height: '70%', width, margin: -8, resizeMode: 'contain' }}
        />
        <View style={{ marginTop: -85, height: '80%' }}>
          <Text style={styles.welcomeText}>{item?.title}</Text>
        </View>
      </View>
    )
  } else {
    return (
      // Text takes up all the space in the window for the slides.
      // Changing margin top to 55 fixed the clipping issue within welcome screen one.
      <View style={{ alignItems: 'center', margin: 65, marginTop: 50, justifyContent: 'space-evenly', height: '90%' }}>
        <Text style={[styles.welcomeText]}>{item?.title}</Text>
      </View>
    )
  }
};

/**
 * Functional component for Welcome screen
 */
export const Welcome = ({ navigation }) => {

  // useState which updates the slide that is rendered on the screen.
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef(); // Helps us not cause multiple re-renders due to useState.

  // Updates the current slide based off 'id' in slides variable
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  }

  // Functional component that allows us to go to the next slide.
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset }); // Allows us to go to the next slide without a re-render.
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }

  // Functional component that represents the 'skip' button.
  const skip = () => {
    // Allows the user to skip to the last slide.
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  }

  // Functional component for the footer which are the three lines that let you know which slide you're on.
  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          alignItems: 'center', // Center buttons vertically
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 60,
          }}>
          {/* The indicator for the three circles */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                welcomeStyles.circleIndicator,
                {
                  backgroundColor: currentSlideIndex === index ? '#50A060' : 'black',
                  width: currentSlideIndex === index ? 25 : 25,
                  borderColor: currentSlideIndex === index ? '#50A060' : 'black'
                },
              ]}
            />
          ))}
        </View>

        {/* Shows the buttons */}
        <View style={{ marginLeft: 10, marginBottom: 30 }}>
          {/* Ternary operator which is basically an if-else statement */}
          {/* If the current slide is the last slide then display the button that navigates to the shopping list page */}
          {/* Else: display the skip and next buttons  */}
          {currentSlideIndex == slides.length - 1 ? (
            <Button onPress={() => navigation.navigate('SignIn')} style={styles.bottomButton}
              mode='contained'
              title="SIGN IN">
              <Text style={styles.bottomText} variant='headlineMedium'>SIGN IN</Text></Button>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <Button
                style={[
                  styles.bottomButton
                ]}
                mode='contained'
                onPress={skip}>
                <Text
                  style={[
                    styles.bottomText
                  ]}
                  variant='headlineMedium'>
                  SKIP
                </Text>
              </Button>
              <View style={{ width: 15 }} />
              <Button
                onPress={goToNextSlide}
                style={styles.bottomButton}
                mode='contained'>
                <Text
                  style={[
                    styles.bottomText
                  ]}
                  variant='headlineMedium'>
                  NEXT
                </Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    // The ImageBackground allows us to add a background image to the screen.
    // Background-image was deprecated.
    <ImageBackground source={require('../assets/welcomeBG2.png')} style={styles.backgroundImage}>

      {/* SafeAreaView component renders everything that was created onto the phone screen */}
      <SafeAreaView style={styles.container}>
        {/* places information, a flatlist (scrollable list) for the slides, and the footer (the black lines) */}
        <FlatList
          ref={ref} // renders once but allows us to see different views given by useState hooks
          onMomentumScrollEnd={updateCurrentSlideIndex} // allows us to scroll left and right
          contentContainerStyle={{ height: height * 0.80 }} // takes up 80% of the screen
          showsHorizontalScrollIndicator={false} // will not see the horizontal scroll bar
          showsVerticalScrollIndicator={false} // will not see the vertical scroll bar
          horizontal={true} // can scroll left and right
          data={slides} // data rendered on flatlist comes from info in slides variable
          pagingEnabled // allows the slides to "stick" when you scroll; comment this out to see the difference 
          renderItem={({ item }) => <Slide item={item} />}
        />
        <Footer />
      </SafeAreaView>

    </ImageBackground>
  );
};

// Variable for some styling on this page.
const welcomeStyles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  circleIndicator: {
    height: 25,
    width: 25,
    borderRadius: 20, // Makes the indicators circles.
    marginHorizontal: 30,
    borderWidth: 1,
  },
});
