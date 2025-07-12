import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
/** @typedef {import('./../types/ravelry').Pattern} Pattern */

import { useTranslation } from "./../hooks/useTranslation";
import { useTheme } from "./../hooks/useTheme";

import { RAVELRY_USERNAME, RAVELRY_PASSWORD } from "@env";

import Button from "./../components/Button";
import Image from "./../components/Image";
import Text from "./../components/Text";
import Block from "./../components/Block";
import Input from "./../components/Input";
import base64 from "base-64";

const RavelryScarfPatterns = () => {
  /** @type {[Pattern[], Function]} */
  const [patterns, setPatterns] = useState([]);
  const [search, setSearch] = useState(""); // search input
  const [loading, setLoading] = useState(true);
  const { assets, colors, fonts, gradients, sizes } = useTheme();
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  const fetchPatterns = async (query = "cowl") => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.ravelry.com/patterns/search.json?query=${encodeURIComponent(
          query
        )}&availability=free`,
        {
          headers: {
            Authorization:
              "Basic " +
              base64.encode(RAVELRY_USERNAME + ":" + RAVELRY_PASSWORD),
          },
        }
      );
      const data = await response.json();
      setPatterns(data.patterns || []);
    } catch (error) {
      console.error("Error fetching patterns:", error);
      setPatterns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatterns();
  }, []);

  const handleProducts = (index) => {
    setTab(index);
    // Placeholder for product toggle logic
  };

  const handleSearch = () => {
    console.log("Search initiated with query:", search);
    fetchPatterns(search.trim() || "scarf");
  };

  const handleClearSearch = () => {
    setSearch("");
    fetchPatterns("scarf");
  };
  // Filter based on search input
  const filteredPatterns = patterns.filter((pattern) =>
    pattern.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Block scroll padding={sizes.sm}>
      <Block flex={0} width="100%" padding={sizes.padding} marginBottom={sizes.sm} color={colors.card}>
        <Input
          flex
          search
          placeholder={t("common.search")}
          value={search}
          onChangeText={setSearch}
        />
        </Block>
        <Block row align="center" justify="flex-end">
        <Button onPress={handleSearch} marginLeft={sizes.sm}>
          <Text>{t("common.search")}</Text>
        </Button>

        <Button onPress={handleClearSearch} marginLeft={sizes.sm}>
          <Text>{t("common.clear")}</Text>
        </Button>
      </Block>

      {/* Pattern List */}
      {filteredPatterns.map((pattern) => (
        <Block key={pattern.id} card marginBottom={sizes.sm} padding={sizes.sm}>
          <Image
            source={{ uri: pattern.first_photo?.medium_url }}
            resizeMode="cover"
            style={{ height: 150, borderRadius: sizes.radius }}
          />
          <Text h5 marginTop={sizes.s}>
            {pattern.name}
          </Text>
          <Text p gray>
            {pattern.designer?.name}
          </Text>
        </Block>
      ))}

      {/* Tabs (Following/Trending) */}
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
    </Block>
  );
};

export default RavelryScarfPatterns;
