import React, { useLayoutEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useHeaderHeight } from "@react-navigation/elements";
import { useTheme } from "./../hooks/useTheme";

import Button from "./../components/Button";
import Image from "./../components/Image";
import Text from "./../components/Text";
import Block from "./../components/Block";
import Input from "./../components/Input";
import Switch from "./../components/Switch";
import Modal from "./../components/Modal";

// Buttons Example
const Buttons = () => {
  const [showModal, setModal] = useState(false);
  const [quantity, setQuantity] = useState("01");
  const { assets, colors, gradients, sizes } = useTheme();
  if (!gradients || !sizes || !colors || !assets) {
    return <Text>Error: Theme values not loaded</Text>; // Prevents crashing
  }
  
  return (
    <Block paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        Buttons
      </Text>
      <Block>
        {Object.keys(gradients).map((key, index) => (
          <Button
            key={index}
            flex={1}
            gradient={gradients[key]}
            marginBottom={sizes.base}
          >
            <Text white bold transform="uppercase">
              {key}
            </Text>
          </Button>
        ))}
      </Block>
      <Block row justify="space-between" marginBottom={sizes.base}>
        <Button
          flex={1}
          row
          gradient={gradients.dark}
          onPress={() => setModal(true)}
        >
          <Block
            row
            align="center"
            justify="space-between"
            paddingHorizontal={sizes.sm}
          >
            <Text white bold transform="uppercase" marginRight={sizes.sm}>
              {quantity}
            </Text>
            <Image
              source={assets.arrow}
              color={colors.white}
              transform={[{ rotate: "90deg" }]}
            />
          </Block>
        </Button>
        <Button flex={1} gradient={gradients.dark} marginHorizontal={sizes.s}>
          <Text white bold transform="uppercase" marginHorizontal={sizes.s}>
            Delete
          </Text>
        </Button>
        <Button gradient={gradients.dark}>
          <Text white bold transform="uppercase" marginHorizontal={sizes.sm}>
            Save for later
          </Text>
        </Button>
      </Block>
      <Modal visible={showModal} onRequestClose={() => setModal(false)}>
        <FlatList
          keyExtractor={(item, index) => `quantity-${item}-${index}`}
          data={["01", "02", "03", "04", "05"]}
          renderItem={({ item }) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                setQuantity(item);
                setModal(false);
              }}
            >
              <Text p white semibold transform="uppercase">
                {item}
              </Text>
            </Button>
          )}
        />
      </Modal>
    </Block>
  );
};

// Typography Example
const Typography = () => {
  const { sizes } = useTheme();

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        Typography
      </Text>
      <Block>
        {[1, 2, 3, 4, 5].map((num) => (
          <Text key={num} h={num}>{`Heading ${num}`}</Text>
        ))}
        <Text p>Paragraph</Text>
        <Text marginBottom={sizes.xs}>Text</Text>
      </Block>
    </Block>
  );
};

// Inputs Example
const Inputs = () => {
  const { colors, sizes } = useTheme();

  return (
    <Block
      color={colors.card}
      marginTop={sizes.m}
      paddingTop={sizes.m}
      paddingHorizontal={sizes.padding}
    >
      <Text p semibold marginBottom={sizes.s}>
        Inputs
      </Text>
      <Block>
        {["Regular", "Search", "Success", "Error", "Disabled"].map(
          (placeholder, index) => (
            <Input
              key={index}
              placeholder={placeholder}
              marginBottom={sizes.sm}
            />
          )
        )}
      </Block>
    </Block>
  );
};

// Switch Example
const Switches = () => {
  const { colors, sizes } = useTheme();
  console.log("colors in profile", colors);
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(false);

  return (
    <Block
      color={colors.card}
      paddingVertical={sizes.m}
      paddingHorizontal={sizes.padding}
    >
      <Text p semibold marginBottom={sizes.s}>
        Switches
      </Text>
      {[switch1, switch2].map((switchState, index) => (
        <Block
          key={index}
          row
          flex={0}
          align="center"
          justify="space-between"
          marginTop={index ? sizes.s : 0}
        >
          <Text>Switch is {switchState ? "ON" : "OFF"}</Text>
          <Switch
            checked={switchState}
            onPress={(checked) =>
              index === 0 ? setSwitch1(checked) : setSwitch2(checked)
            }
          />
        </Block>
      ))}
    </Block>
  );
};

// Social Example
const Social = () => {
const { sizes } = useTheme();
console.log("sizes in profile", sizes);

  return (
    <Block paddingVertical={sizes.m} paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        Social
      </Text>
      <Block row justify="space-evenly">
        {["facebook", "twitter", "dribbble"].map((platform, index) => (
          <Button key={index} social={platform} />
        ))}
      </Block>
    </Block>
  );
};

// Cards Example
const Cards = () => {
  const { assets, colors, gradients, sizes } = useTheme();

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        Cards
      </Text>
      <Block card row>
        <Image
          resizeMode="contain"
          source={assets?.card1}
          style={{ height: 114 }}
        />
        <Block padding={sizes.s} justify="space-between">
          <Text p>Adventures - Multi-day trips with meals and stays.</Text>
          <TouchableOpacity>
            <Block row align="center">
              <Text p semibold marginRight={sizes.s} color={colors.link}>
                Read Article
              </Text>
              <Image source={assets.arrow} color={colors.link} />
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

// Components Example

const Components = ({ navigation }) => {
  const { assets, sizes } = useTheme();

  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          radius={0}
          resizeMode="cover"
          width={sizes.width}
          height={headerHeight}
          source={assets.header}
        />
      ),
    });
  }, [assets.header, navigation, sizes.width, headerHeight]);

  return (
    <Block safe>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: sizes.padding }}
      >
        <Block>
          <Buttons />
          <Cards />
        </Block>
      </Block>
    </Block>
  );
};

export default Components;
