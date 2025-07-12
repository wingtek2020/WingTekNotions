import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { useData } from "./../hooks/useData";
import { useTheme } from "./../hooks/useTheme";
import { useTranslation } from "./../hooks/useTranslation";

import Block from "./../components/Block";
import Button from "./../components/Button";
import Input from "./../components/Input";
import Image from "./../components/Image";
import Article from "./../components/Article";
import Text from "./../components/Text";

const RentalHeader = () => {
  const { t } = useTranslation();
  const { assets, gradients, sizes } = useTheme();

  return (
    <>
      <Block row flex={0} align="center" justify="space-around" marginVertical={sizes.m}>
        <Block flex={0}>
          <Button flex={0} gradient={gradients.primary} radius={sizes.socialRadius}>
            <Image source={assets.flight} radius={0} />
          </Button>
          <Text center marginTop={sizes.s} semibold>
            {t("rentals.flight")}
          </Text>
        </Block>
        <Block flex={0}>
          <Button flex={0} gradient={gradients.info} radius={sizes.socialRadius}>
            <Image source={assets.hotel} radius={0} />
          </Button>
          <Text center marginTop={sizes.s} semibold>
            {t("rentals.hotel")}
          </Text>
        </Block>
        <Block flex={0}>
          <Button flex={0} gradient={gradients.warning} radius={sizes.socialRadius}>
            <Image source={assets.train} radius={0} />
          </Button>
          <Text center marginTop={sizes.s} semibold>
            {t("rentals.train")}
          </Text>
        </Block>
        <Block flex={0}>
          <Button flex={0} gradient={gradients.dark} radius={sizes.socialRadius}>
            <Image source={assets.more} radius={0} />
          </Button>
          <Text center marginTop={sizes.s} semibold>
            {t("common.more")}
          </Text>
        </Block>
      </Block>
      <Block row flex={0} align="center" justify="space-between">
        <Text h5 semibold>{t("common.recommended")}</Text>
        <Button>
          <Text p primary semibold>{t("common.viewall")}</Text>
        </Button>
      </Block>
    </>
  );
};

const Rentals = ({ navigation }) => {
  const data = useData();
  const { t } = useTranslation();
  const { handleArticle } = data;
  const { colors, sizes } = useTheme();
  const [notFound, setNotFound] = useState(false);
  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  // Initialize recommendations list
  useEffect(() => {
    if (data?.recommendations) {
      setRecommendations(data.recommendations);
    }
  }, [data.recommendations]);

  const handleRental = useCallback(
    (article) => {
      handleArticle(article);
      navigation.navigate("Rental");
    },
    [handleArticle, navigation]
  );

  const handleSearch = useCallback(() => {
    setNotFound(true);
  }, []);

  return (
    <Block>
      {/* Search Input */}
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input
          search
          returnKeyType="search"
          placeholder={t("common.search")}
          onFocus={() => setNotFound(false)}
          onSubmitEditing={handleSearch}
          onChangeText={(text) => setSearch(text)}
        />
      </Block>

      {/* No Results Found */}
      {notFound && (
        <Block flex={0} padding={sizes.padding}>
          <Text p>
            {t("rentals.notFound1")} "<Text p bold>{search}</Text>" {t("rentals.notFound2")}
          </Text>
          <Text p marginTop={sizes.s}>{t("rentals.moreOptions")}</Text>
        </Block>
      )}

      {/* Rentals List */}
      <FlatList
        data={recommendations}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item?.id}`}
        ListHeaderComponent={<RentalHeader />}
        style={{ paddingHorizontal: sizes.padding }}
        contentContainerStyle={{ paddingBottom: sizes.l }}
        renderItem={({ item }) => <Article {...item} onPress={() => handleRental(item)} />}
      />
    </Block>
  );
};

export default Rentals;
