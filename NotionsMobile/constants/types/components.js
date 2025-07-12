import * as React from "react";
import {
  Animated,
  Block,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

/* Button Component */
export const Button = ({
  id,
  round,
  rounded,
  flex,
  radius,
  color,
  gradient,
  primary,
  secondary,
  tertiary,
  gray,
  black,
  white,
  light,
  dark,
  danger,
  warning,
  success,
  info,
  row,
  align,
  justify,
  height,
  width,
  outlined,
  shadow,
  social,
  position,
  right,
  left,
  top,
  bottom,
  haptic,
  vibrate,
  vibrateRepeat,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity style={[{ backgroundColor: color, borderRadius: radius }, styles.button]} {...props}>
      {children}
    </TouchableOpacity>
  );
};

/* Checkbox Component */
export const Checkbox = ({ id, checked, haptic, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.checkbox, style]} onPress={() => onPress && onPress(!checked)}>
      {checked ? <Text>✔</Text> : null}
    </TouchableOpacity>
  );
};

/* Image Component */
export const ImageComponent = ({
  id,
  avatar,
  shadow,
  background,
  rounded,
  radius,
  color,
  transform,
  style,
  children,
  ...props
}) => {
  return (
    <Image style={[{ borderRadius: radius, tintColor: color, transform }, style]} {...props}>
      {background ? children : null}
    </Image>
  );
};

/* Input Component */
export const Input = ({
  id,
  color,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  danger,
  warning,
  success,
  info,
  search,
  disabled,
  label,
  icon,
  children,
  style,
  ...props
}) => {
  return (
    <TextInput
      style={[
        { borderColor: color, backgroundColor: white ? "#fff" : "transparent" },
        styles.input,
        style,
      ]}
      placeholderTextColor={gray ? "#a5a5a5" : "#000"}
      editable={!disabled}
      {...props}
    />
  );
};

/* Modal Component */
export const ModalComponent = ({ id, children, style, ...props }) => {
  return (
    <Modal style={[styles.modal, style]} {...props}>
      {children}
    </Modal>
  );
};

/* Switch Component */
export const SwitchComponent = ({ id, checked, style, thumbColor, activeFillColor, inactiveFillColor, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        { backgroundColor: checked ? activeFillColor : inactiveFillColor },
        styles.switch,
        style,
      ]}
      onPress={() => onPress && onPress(!checked)}
    >
      <View style={[styles.switchThumb, { backgroundColor: thumbColor }]} />
    </TouchableOpacity>
  );
};

/* Text Component */
export const TextComponent = ({
  id,
  center,
  gradient,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  danger,
  warning,
  success,
  info,
  color,
  opacity,
  size,
  weight,
  font,
  bold,
  semibold,
  start,
  end,
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  align,
  transform,
  lineHeight,
  right,
  left,
  top,
  bottom,
  position,
  children,
  style,
  ...props
}) => {
  return (
    <Text style={[{ color, fontSize: size, fontWeight: weight }, styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

/* Default Styles */
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  switch: {
    width: 40,
    height: 20,
    borderRadius: 10,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  switchThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  text: {
    fontSize: 14,
    color: "#000",
  },
});

