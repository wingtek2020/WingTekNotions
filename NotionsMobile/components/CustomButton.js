import React , {useCallback} from 'react';
import {
  ViewStyle,
  Vibration,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text
} from 'react-native';

const CustomButton = ({ title, onPress, bgColor = "#007BFF", textColor = "#FFF" }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;