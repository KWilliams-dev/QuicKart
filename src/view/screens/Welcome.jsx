import React, { useState} from 'react';
import { 
  SafeAreaView, 
  View, 
  ImageBackground, 
  FlatList, 
  Dimensions,
  Modal, 
  Image ,
  StyleSheet
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from '../styles/ShoppingList.styles';

// gets the width and height of the screen
const {width, height} = Dimensions.get('window');

// variable for colors needed; can do this in welcomeStyles as well
const COLORS = {black: '#000'};

// slides that display images and text for onboarding
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
    title: '... and we’ll \nlead the way!'
  }
]

/**
 * renders the images and text defined in the slides variable
 * if there is an image return the image and the text 
 * if there is not an image return the text only
 *
 */
const Slide = ({item}) => {
  if(item.image){ 
    return (
      // the View component allows the UI to render on the screen
      // the Image component allows us to render the image on the screen
      // the Text component allows us to render the text on the screen
      <View style={{alignItems: 'center'}}>
        <Image
            source={item?.image}
            // image takes up 75% of the window for the slides
            style={{height: '65%', width, resizeMode: 'contain'}} // changing height to 65% fixed the clipping issue in welcome screens 2 & 3
        />
        <View>
          <Text style={styles.welcomeText}>{item?.title}</Text>
        </View>
      </View>
    )
  } else {
    return (
      // text takes up all the space in the window for the slides
      // changing margin top to 55 fixed the clipping issue within welcome screen one.
      <View style={{alignItems: 'center', margin: 50, marginTop: 55, justifyContent: 'space-evenly', height: '90%'}}>
          <Text style={[styles.welcomeText]}>{item?.title}</Text>
      </View>
    )
  }
};

/**
 * this functional component is the 'i' icon on the screen at the top right
 * holds the information from the original home screen
*/
const Information = () => { // Get rid of this (REANN)
  // useState for the popup window (Modal)
  // useState is a react hook that allows us to add React state to this functional component
  // is the modal visible yes or no? initially the answer is no
  const [modalVisible, setModalVisible] = useState(false);
  return (
    /**  Modal is a component that allows us to create custom "pop-up" windows
     * using animationType prop for that smooth sliding effect
     * transparent prop gives the window a transparent background
     * when user clicks the 'i' icon the useState of modalVisible is set to true (can see window)
     * 
     */
    <View style={styles.information}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        {/* This is the info inside the pop-up window */}
        <View style={styles.information}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold'}}>Team QuickKart</Text>
            <Text style={styles.modalText}>This app is the result of an idea from Sasa Mitrovich that landed in the hands of six awesome engineers who built the foundations.
              Abdullahi Munye (Data Modeler), Khamilah Nixon (Documentation Lead), Kyle Williams (Code Architect), Joe Nsengiyumva (Testing Lead),
              Raven Gardner (UI/UX Lead), Alan Oliver Santiesteban (Team Manager)</Text>
              {/* when user clicks 'OK' the pop-up window disapeers */}
            <Button
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.bottomButton}
            >
             <Text style={styles.bottomText}>OK</Text>
            </Button>
          </View>
        </View>
      </Modal>
      {/* When the user clicks the information 'i' icon the popup window is shown */}
      <Button
        icon="information-outline"
        onPress={() => setModalVisible(true)}
      >
      </Button>
    </View>
  );
};

/**
 * functional component for Welcome screen
 */
export const Welcome = ({navigation}) => {
  // useState which updates the slide that is rendered on the screen
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef(); // helps us not cause multiple re-renders due to useState
  // updates the current slide based off 'id' in slides variable
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  }

  // functional component that allows us to go to the next slide
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset}); // allows us to go to the next slide without a re-render
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }

  // functional component that represents the 'skip' button
  const skip = () => {
    // allows the user to skip to the last slide
    const lastSlideIndex = slides.length - 1; 
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  }

  // functional component for the footer which are the three lines that let you know which slide you're on
  const Footer = () => {
      return (
        <View
          style={{
            height: height * 0.25,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          {/* Indicator container */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {/* The indicator/ the three black lines */}
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  welcomeStyles.indicator,
                  currentSlideIndex == index && {
                    backgroundColor: COLORS.black,
                    width: 25,
                  },
                ]}
              />
            ))}
          </View>
  
          {/* Shows the buttons */}
          <View style={{marginBottom: 30}}>
            {/* Ternary operator which is basically an if-else statement */}
            {/* If the current slide is the last slide then display the button that navigates to the shopping list page */}
            {/* Else: display the skip and next buttons  */}
            {currentSlideIndex == slides.length - 1 ? (
                <Button onPress={() => navigation.navigate('SignIn')} style={styles.bottomButton}
                mode='contained'
                title = "SIGN IN">
                <Text style={styles.bottomText} variant='headlineMedium'>SIGN IN</Text></Button>   
            ) : (
              <View style={{flexDirection: 'row'}}>
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
                <View style={{width: 15}} />
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
        
    return(
      // the ImageBackground allows us to add a background image to the screen
      // background-image was deprecated
        <ImageBackground source={require('../assets/welcomeBG.png')} style={styles.backgroundImage}>

        {/* SafeAreaView component renders everything that was created onto the phone screen */}
        <SafeAreaView style={styles.container}>
          {/* places information, a flatlist (scrollable list) for the slides, and the footer (the black lines) */}
            <Information/>
            <FlatList 
               ref={ref} // renders once but allows us to see different views given by useState hooks
               onMomentumScrollEnd={updateCurrentSlideIndex} // allows us to scroll left and right
               contentContainerStyle={{height: height * 0.55}} // takes up 55% of the screen
               showsHorizontalScrollIndicator={false} // will not see the horizontal scroll bar
               showsVerticalScrollIndicator={false} // will not see the vertical scroll bar
               horizontal={true} // can scroll left and right
               data={slides} // data rendered on flatlist comes from info in slides variable
               pagingEnabled // allows the slides to "stick" when you scroll; comment this out to see the difference 
               renderItem={({item}) => <Slide item={item} />}
            />
            <Footer/>
        </SafeAreaView>

        </ImageBackground>
    );
};

// variable for some styling on this page
const welcomeStyles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'black',
    marginHorizontal: 3,
    borderRadius: 2,
  },
});