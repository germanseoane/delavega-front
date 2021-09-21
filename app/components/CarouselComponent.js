import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import appColors from "../styles/appColors";

const width = Dimensions.get("window").width;

const CarouselComponent = ({ images }) => {
  const [imageActive, setImageActive] = useState(0);

  const renderItem = ({ item }) => {
    return <Image style={styles.image} source={{ uri: item }} />;
  };

  return (
    <>
      <Carousel
        layout="default"
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setImageActive(index)}
        autoplay={true}
        loop
      />
      <Pagination
        dotsLength={images.length}
        dotStyle={{ backgroundColor: appColors.primary }}
        activeDotIndex={imageActive}
        animatedDuration={0.6}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: width,
    height: 200,
  },
});

export default CarouselComponent;
