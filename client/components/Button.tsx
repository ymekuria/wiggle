import React, { useEffect, useState, useContext, Children } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import PressableOpacity, { PressableOpacityProps } from './PressableOpacity';

type ButtonProps = PressableOpacityProps;

const Button: React.FC<ButtonProps> = (props) => {
  const { style, children, ...otherProps } = props;
  return (
    <PressableOpacity {...otherProps}>
      <View style={[style, styles.buttonStyle]}>{children}</View>
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    // margin: 20,
    flexDirection: 'row',

    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(247,236,250,.3)'
  }
});

export default Button;
