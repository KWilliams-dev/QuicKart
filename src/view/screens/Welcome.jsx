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

const {width, height} = Dimensions.get('window');

const COLORS = {black: '#000'};

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

const Slide = ({item}) => {
  if(item.image){ 
    return (
      <View style={{alignItems: 'center'}}>
        <Image
            source={item?.image}
            style={{height: '75%', width, resizeMode: 'contain'}}
        />
        <View>
          <Text style={styles.welcomeText}>{item?.title}</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View style={{alignItems: 'center', margin: 50, marginTop: 80, justifyContent: 'space-evenly', height: '100%'}}>
          <Text style={[styles.welcomeText]}>{item?.title}</Text>
      </View>
    )
  }
};

const Information = () => {

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.information}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.information}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold'}}>Team QuickKart</Text>
            <Text style={styles.modalText}>This app is the result of an idea from Sasa Mitrovich that landed in the hands of six awesome engineers who built the foundations.
              Abdullahi Munye (Data Modeler), Khamilah Nixon (Documentation Lead), Kyle Williams (Code Architect), Joe Nsengiyumva (Testing Lead),
              Raven Gardner (UI/UX Lead), Alan Oliver Santiesteban (Team Manager)</Text>
            <Button
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.bottomButton}
            >
             <Text style={styles.bottomText}>OK</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <Button
        icon="information-outline"
        onPress={() => setModalVisible(true)}
      >
      </Button>
    </View>
  );
};

export const Welcome = ({navigation}) => {

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  }
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
            {/* Render indicator */}
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
  
          {/* Render buttons */}
          <View style={{marginBottom: 30}}>
            {currentSlideIndex == slides.length - 1 ? (
                <Button onPress={() => navigation.navigate('ShoppingList')} style={styles.bottomButton}
                mode='contained'
                title = "START SHOPPING">
                <Text style={styles.bottomText} variant='headlineMedium'>START SHOPPING</Text></Button>   
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
        <ImageBackground source={require('../assets/welcomeBG.png')} style={styles.backgroundImage}>

        <SafeAreaView style={styles.container}>
            <Information/>
            <FlatList 
               ref={ref}
               onMomentumScrollEnd={updateCurrentSlideIndex}
               contentContainerStyle={{height: height * 0.55}}
               showsHorizontalScrollIndicator={false}
               showsVerticalScrollIndicator={false}
               horizontal={true}
               data={slides}
               pagingEnabled
               renderItem={({item}) => <Slide item={item} />}
            />
            <Footer/>
        </SafeAreaView>

        </ImageBackground>
    );
};

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