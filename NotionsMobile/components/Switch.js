import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Platform, StyleSheet } from 'react-native';

import * as Haptics from 'expo-haptics';

import { useTheme } from './../hooks/useTheme';
console.log("useTheme: ", useTheme);

const Switch = ({
  id = 'Switch',
  checked = false,
  thumbColor = 'white',
  activeFillColor,
  inactiveFillColor,
  duration = 250,
  thumbStyle,
  switchStyle,
  style,
  onPress,
  haptic = true,
  ...props
}) => {
  const [isChecked, setChecked] = useState(checked);
  const { colors, sizes } = useTheme();
  const activeColor = activeFillColor || colors.switchOn;
  const inactiveColor = inactiveFillColor || colors.switchOff;

  const animation = useRef(new Animated.Value(isChecked ? 28 : 2)).current;

  console.log("animation: ", animation);

  const handleToggle = useCallback(() => {
    setChecked(!isChecked);
    if (onPress) {
      onPress(!isChecked);
    }

    /* Haptic feedback on press */
    if (haptic) {
      Haptics.selectionAsync();
    }
  }, [isChecked, haptic, onPress]);

  useEffect(() => {
    Animated.timing(animation, {
      duration,
      useNativeDriver: false,
      toValue: isChecked ? 28 : 2,
    }).start();
  }, [isChecked, animation, duration]);

  /* Update local state for isChecked when checked prop is updated */
  useEffect(() => {
    if (isChecked !== checked) {
      setChecked(checked);
    }
  }, [isChecked, checked]);

  const bgColor = animation.interpolate({
    inputRange: [2, 28],
    outputRange: [String(inactiveColor), String(activeColor)],
  });

  const switchStyles = StyleSheet.flatten([
    {
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: bgColor,
      height: sizes.switchHeight,
    },
    switchStyle,
  ]);

  const thumbStyles = StyleSheet.flatten([
    thumbStyle,
    {
      width: sizes.switchThumb,
      height: sizes.switchThumb,
      backgroundColor: thumbColor,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: sizes.shadowOffsetWidth,
        height: sizes.shadowOffsetHeight,
      },
      shadowOpacity: sizes.shadowOpacity,
      shadowRadius: sizes.shadowRadius,
      elevation: sizes.elevation,
      borderRadius: sizes.switchThumb / 2,
      transform: [{ translateX: animation }],
    },
  ]);

  const containerStyles = StyleSheet.flatten([
    style,
    {
      overflow: 'hidden',
      width: sizes.switchWidth,
      height: sizes.switchHeight,
      borderRadius: sizes.switchHeight,
    },
  ]);

  // Generate component testID or accessibilityLabel based on Platform.OS
  const switchID = Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };
console.log("switchID: ", switchID);
  return (
    <Pressable
      {...switchID}
      hitSlop={sizes.s}
      onPress={handleToggle}
      style={containerStyles}
      {...props}
    >
      <Animated.View style={switchStyles}>
        <Animated.View style={thumbStyles} />
      </Animated.View>
    </Pressable>
  );
};

export default React.memo(Switch);
