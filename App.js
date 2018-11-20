import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index.style';

const IS_ANDROID = Platform.OS === 'android';

export default class example extends Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 1,
            entries: []
        };
        fetch('https://hack.cielsoft.me/api/device/iot')
      .then(res => res.json())
      .then((json) =>{
        json.data.map((ob)=>{
          var obj = {
            title: ob.iot_name,
            subtitle: ob.iot_desc,
            illustration: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Arduino_Uno_-_R3.jpg/220px-Arduino_Uno_-_R3.jpg'
        };
        this.setState({
          entries : this.state.entries.concat(obj)
        });
        console.log(this.state.entries)
        })
      });
    }
    
      
    
    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }


    render () {
      const { slider1ActiveSlide } = this.state;

        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    <ScrollView
                      style={styles.scrollview}
                      scrollEventThrottle={200}
                      directionalLockEnabled={true}
                    >
                          <View style={styles.exampleContainer}>
                          <Text style={styles.title}>Sensor selection</Text>
                          <Carousel
                            ref={c => this._slider1Ref = c}
                            data={this.state.entries}
                            renderItem={this._renderItemWithParallax}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            hasParallaxImages={true}
                            firstItem={1}
                            inactiveSlideScale={0.94}
                            inactiveSlideOpacity={0.7}
                            // inactiveSlideShift={20}
                            containerCustomStyle={styles.slider}
                            contentContainerCustomStyle={styles.sliderContentContainer}
                            loop={true}
                            loopClonesPerSide={2}
                            autoplay={false}
                            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                          />
                          <Pagination
                            dotsLength={this.state.entries.length}
                            activeDotIndex={slider1ActiveSlide}
                            containerStyle={styles.paginationContainer}
                            dotColor={'rgba(255, 255, 255, 0.92)'}
                            dotStyle={styles.paginationDot}
                            inactiveDotColor={colors.black}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            carouselRef={this._slider1Ref}
                            tappableDots={!!this._slider1Ref}
                          />
                          </View>
                      
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}