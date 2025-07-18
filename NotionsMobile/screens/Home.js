import React, { useCallback, useState, useEffect } from "react";

import { useData } from "./../hooks/useData";
import { useTranslation } from "./../hooks/useTranslation";
import { useTheme } from "./../hooks/useTheme";

import Button from "./../components/Button";
import Image from "./../components/Image";
import Text from "./../components/Text";
import Block from "./../components/Block";
import Input from "./../components/Input";
import Product from "./../components/Product";

import * as SecureStore from "expo-secure-store";

const Home = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const { following, trending } = useData();
  const [products, setProducts] = useState(following);
  const { assets, colors, fonts, gradients, sizes } = useTheme();

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("ravelry_token");
    };

    loadToken(); // Call the async function inside useEffect
  }, []);

  const handleProducts = useCallback(
    (tab) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts]
  );

  return (
    <Block>
      {/* search input */}
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t("common.search")} />
      </Block>

      {/* toggle products list */}
      <Block
        row
        flex={0}
        align="center"
        justify="center"
        color={colors.card}
        paddingBottom={sizes.sm}
      >
        <Button onPress={() => handleProducts(0)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 0 ? "primary" : "secondary"]}
            >
              <Image source={assets.extras} color={colors.white} radius={0} />
            </Block>
            <Text p font={fonts?.[tab === 0 ? "medium" : "normal"]}>
              {t("home.following")}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button onPress={() => handleProducts(1)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 1 ? "primary" : "secondary"]}
            >
              <Image
                radius={0}
                color={colors.white}
                source={assets.documentation}
              />
            </Block>
            <Text p font={fonts?.[tab === 1 ? "medium" : "normal"]}>
              {t("home.trending")}
            </Text>
          </Block>
        </Button>
      </Block>

      {/* products list */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.l }}
      >
        <Block row wrap="wrap" justify="space-between" marginTop={sizes.sm}>
          {products?.map((product) => (
            <Product {...product} key={`card-${product?.id}`} />
          ))}
        </Block>
      </Block>
    </Block>
  );
};

export default Home;
