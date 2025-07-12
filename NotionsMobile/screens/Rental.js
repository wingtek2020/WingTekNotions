import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";

import { useData } from "./../hooks/useData";
import { useTheme } from "./../hooks/useTheme";
import { useTranslation } from "./../hooks/useTranslation";

import Block from "./../components/Block";
import Button from "./../components/Button";
import Image from "./../components/Image";
import Product from "./../components/Product";
import Text from "./../components/Text";

const Rental = () => {
  const { article } = useData();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { gradients, sizes } = useTheme();
  const [optionId, setOptionId] = useState(0);

  // Initialize optionId with the first option
  useEffect(() => {
    if (article?.options?.length > 0) {
      setOptionId(article.options[0].id);
    }
  }, [article]);

  const CARD_WIDTH = sizes.width - sizes.s;
  const hasSmallScreen = sizes.width < 414; // iPhone 11
  const SNAP_OFFSET = CARD_WIDTH - (hasSmallScreen ? 28 : 19) + sizes.s;

  return (
    <Block
      scroll
      nestedScrollEnabled
      paddingVertical={sizes.padding}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: sizes.padding * 1.5 }}
    >
      {/* Carousel Items */}
      <Block
        scroll
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="center"
        scrollEventThrottle={16}
        snapToInterval={SNAP_OFFSET}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          const optionIndex = Math.round(
            Number(nativeEvent?.contentOffset?.x) / sizes.width
          );
          const option = article?.options?.[optionIndex];
          if (option) setOptionId(option.id);
        }}
      >
        {article?.options?.map((option, index) => (
          <Block
            width={CARD_WIDTH - sizes.sm}
            marginLeft={index === 0 ? sizes.sm : 0}
            key={`article-${article?.id}-option-${option?.id}`}
          >
            <Image shadow height={261} width={CARD_WIDTH - sizes.md} source={{ uri: option?.image }} />
            <Block marginTop={sizes.sm} paddingHorizontal={sizes.s}>
              <Block row flex={0} marginBottom={sizes.s}>
                <Text p transform="capitalize">
                  {option?.type} • {t("common.guests", { count: option?.guests })} •{" "}
                  {option?.sleeping?.total} {option?.sleeping?.type}
                </Text>
              </Block>
              <Text h4 marginBottom={sizes.s}>{option?.title}</Text>
              <Text p lineHeight={26}>{option?.description}</Text>
            </Block>
          </Block>
        ))}
      </Block>

      {/* Rental Recommendations */}
      <Block paddingHorizontal={sizes.sm} marginTop={sizes.sm}>
        <Button
          gradient={gradients.primary}
          onPress={() => navigation.navigate("Booking", { optionId })}
        >
          <Text white bold transform="uppercase">{t("rentals.availability")}</Text>
        </Button>

        {/* Interested Offers */}
        <Block>
          <Text h5 marginTop={sizes.m} semibold paddingHorizontal={sizes.s}>
            {t("rentals.interested")}:
          </Text>
          <Block row wrap="wrap" justify="space-between" marginTop={sizes.sm}>
            {article?.offers?.map((offer) => (
              <Product key={`offer-${offer?.id}`} {...offer} linkLabel={t("rentals.viewoffer")} />
            ))}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Rental;
