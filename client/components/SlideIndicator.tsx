import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';

type SlideIndicatorProps = {
  data: [];
  scrollX: Animated.Value;
  width: number;
};

const SlideIndicator: React.FC<SlideIndicatorProps> = ({
  data,
  scrollX,
  width
}) => {
  const renderIndicator = () => {
    return data.map((_, index) => {
      const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width
      ];
      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.4, 0.8],
        extrapolate: 'clamp'
      });

      return (
        <Animated.View
          key={`indicator-${index}`}
          style={[styles.indicatorsStyle, { transform: [{ scale }] }]}
        />
      );
    });
  };

  return (
    <View style={styles.indicatorContainerStyle}>{renderIndicator()}</View>
  );
};

const styles = StyleSheet.create({
  indicatorContainerStyle: {
    position: 'absolute',
    bottom: 150,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  indicatorsStyle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    margin: 10
  }
});

export default SlideIndicator;
