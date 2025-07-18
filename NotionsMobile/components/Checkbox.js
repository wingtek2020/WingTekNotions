import React, { useCallback, useState } from "react";
import { Platform, Pressable } from "react-native";
import * as Haptics from "expo-haptics";

import { useTheme } from "./../hooks/useTheme";
import Block from "./../components/Block";
import Image from "./../components/Image";

const Checkbox = ({ onPress, haptic = true, id = "Checkbox", ...props }) => {
  const { colors, icons, sizes } = useTheme();
  const [checked, setChecked] = useState(false);

  const handlePress = useCallback(() => {
    setChecked((prev) => !prev);
    if (onPress) {
      onPress(!checked);
    }

    // Haptic feedback on selection
    if (haptic) {
      Haptics.selectionAsync();
    }
  }, [checked, haptic, onPress]);

  // Generate accessibility identifier
  const checkboxID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <Pressable {...checkboxID} hitSlop={sizes.s} onPress={handlePress}>
      <Block
        flex={0}
        align="center"
        justify="center"
        gray={!checked}
        outlined={!checked}
        width={sizes.checkboxWidth}
        height={sizes.checkboxHeight}
        radius={sizes.checkboxRadius}
        gradient={checked ? colors.checkbox : undefined}
        {...props}
      >
        {checked && (
          <Image
            source={icons.check}
            color={colors.checkboxIcon}
            width={sizes.checkboxIconWidth}
            height={sizes.checkboxIconHeight}
          />
        )}
      </Block>
    </Pressable>
  );
};

export default React.memo(Checkbox);
