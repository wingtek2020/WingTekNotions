import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useData } from "./../hooks/useData";
import { useTheme } from "./../hooks/useTheme";

import Block from "./../components/Block";
import Button from "./../components/Button";
import Article from "./../components/Article";
import Text from "./../components/Text";

const Articles = ({ navigation }) => {
  const data = useData();
  const { colors, gradients, sizes } = useTheme();

  const [selected, setSelected] = useState(null);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  // Initialize articles & categories
  useEffect(() => {
    if (data?.articles && data?.categories) {
      setArticles(data.articles || []);
      setCategories(data.categories || []);
      setSelected(data.categories.length > 0 ? data.categories[0] : null);
    }
  }, [data]);

  // Update articles when category changes
  useEffect(() => {
    if (!selected) return;

    const category = data?.categories?.find((cat) => cat?.id === selected?.id);
    const newArticles = data?.articles?.filter(
      (article) => article?.category?.id === category?.id
    );

    setArticles(newArticles || []);
  }, [data, selected]);

  return (
    <Block>
      {/* Categories List */}
      <Block color={colors.card} row flex={0} paddingVertical={sizes.padding}>
        <Block
          scroll
          horizontal
          renderToHardwareTextureAndroid
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: -sizes.padding, y: 0 }}
        >
          {categories?.map((category) => {
            const isSelected = category?.id === selected?.id;
            return (
              <Button
                radius={sizes.m}
                marginHorizontal={sizes.s}
                key={`category-${category?.id}`}
                onPress={() => setSelected(category)}
                gradient={gradients?.[isSelected ? "primary" : "light"]}
              >
                <Text
                  p
                  bold={isSelected}
                  white={isSelected}
                  black={!isSelected}
                  transform="capitalize"
                  marginHorizontal={sizes.m}
                >
                  {category?.name}
                </Text>
              </Button>
            );
          })}
        </Block>
      </Block>

      {/* Articles List */}
      <FlatList
        data={articles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `article-${item?.id || index}`}
        style={{ paddingHorizontal: sizes.padding }}
        contentContainerStyle={{ paddingBottom: sizes.l }}
        renderItem={({ item }) => <Article {...item} />}
      />
    </Block>
  );
};

export default Articles;
