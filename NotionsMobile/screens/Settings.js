import React from "react";

import { useData } from "./../hooks/useData";
import { useTheme } from "./../hooks/useTheme";
import { useTranslation } from "./../hooks/useTranslation";

import Block from "./../components/Block";
import Button from "./../components/Button";
import Image from "./../components/Image";
import Text from "./../components/Text";
import Switch from "./../components/Switch";

const Settings = ({ navigation }) => {
  const { isDark, handleIsDark } = useData();
  const { t, locale, setLocale } = useTranslation();

  const { assets, colors, gradients, sizes } = useTheme();

  const isEN: boolean = locale === "en" ? true : false;

  return (
    <Block
      scroll
      padding={sizes.padding}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: sizes.xxl }}
    >
      {/* Settings */}
      <Block card padding={sizes.sm} marginBottom={sizes.sm}>
        <Block row align="center" marginBottom={sizes.m}>
          <Block
            flex={0}
            align="center"
            justify="center"
            radius={sizes.s}
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.primary}
          >
            <Image source={assets?.settings} color={colors.white} radius={0} />
          </Block>
          <Block>
            <Text semibold>{t("settings.recommended.title")}</Text>
            <Text size={12}>{t("settings.recommended.subtitle")}</Text>
          </Block>
        </Block>

        {/* Dark Mode Toggle */}
        <Block
          row
          align="center"
          justify="space-between"
          marginBottom={sizes.sm}
        >
          <Text>{t("settings.recommended.darkmode")}</Text>
          <Switch
            checked={isDark}
            onPress={(checked) => handleIsDark(checked)}
          />
        </Block>

        {/* Language Toggle */}
        <Block
          row
          align="center"
          justify="space-between"
          marginBottom={sizes.m}
        >
          <Text>{t("settings.recommended.language")} EN/FR</Text>
          <Switch
            checked={!isEN}
            onPress={(checked) => setLocale(checked ? "fr" : "en")}
          />
        </Block>

        <Block
          row
          align="center"
          justify="space-between"
          marginBottom={sizes.sm}
        >
          <Text>{t("settings.recommended.faceid")}</Text>
          <Switch checked />
        </Block>

        <Block row align="center" justify="space-between">
          <Text>{t("settings.recommended.autolock")}</Text>
          <Switch />
        </Block>

        {/* Notifications Settings */}
        <Button
          row
          align="center"
          justify="space-between"
          onPress={() => navigation.navigate("NotificationsSettings")}
        >
          <Text>{t("settings.recommended.notifications")}</Text>
          <Image
            source={assets.arrow}
            color={colors.icon}
            radius={0}
            height={18}
            width={10}
          />
        </Button>
      </Block>

      {/* Payment Settings */}
      <Block card padding={sizes.sm} marginBottom={sizes.sm}>
        <Block row align="center" marginBottom={sizes.s}>
          <Block
            flex={0}
            align="center"
            justify="center"
            radius={sizes.s}
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.primary}
          >
            <Image source={assets?.payment} color={colors.white} radius={0} />
          </Block>
          <Block>
            <Text semibold>{t("settings.payment.title")}</Text>
            <Text size={12}>{t("settings.payment.subtitle")}</Text>
          </Block>
        </Block>

        <Button row align="center" justify="space-between">
          <Text>{t("settings.payment.options")}</Text>
          <Image
            source={assets.arrow}
            color={colors.icon}
            radius={0}
            height={18}
            width={10}
          />
        </Button>
        <Button row align="center" justify="space-between">
          <Text>{t("settings.payment.giftcards")}</Text>
          <Image
            source={assets.arrow}
            color={colors.icon}
            radius={0}
            height={18}
            width={10}
          />
        </Button>
      </Block>

      {/* Privacy Settings */}
      <Block card padding={sizes.sm} marginBottom={sizes.sm}>
        <Block row align="center" marginBottom={sizes.s}>
          <Block
            flex={0}
            align="center"
            justify="center"
            radius={sizes.s}
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.primary}
          >
            <Image source={assets?.document} color={colors.white} radius={0} />
          </Block>
          <Block>
            <Text semibold>{t("settings.privacy.title")}</Text>
            <Text size={12}>{t("settings.privacy.subtitle")}</Text>
          </Block>
        </Block>

        <Button
          row
          align="center"
          justify="space-between"
          onPress={() => navigation.navigate("Agreement")}
        >
          <Text>{t("settings.privacy.agreement")}</Text>
          <Image
            source={assets.arrow}
            color={colors.icon}
            radius={0}
            height={18}
            width={10}
          />
        </Button>

        <Button
          row
          align="center"
          justify="space-between"
          onPress={() => navigation.navigate("Privacy")}
        >
          <Text>{t("settings.privacy.privacy")}</Text>
          <Image
            source={assets.arrow}
            color={colors.icon}
            radius={0}
            height={18}
            width={10}
          />
        </Button>

        <Button
          row
          align="center"
          justify="space-between"
          onPress={() => navigation.navigate("About")}
        >
          <Text>{t("settings.privacy.about")}</Text>
          <Image
            source={assets.arrow}
            color={colors.icon}
            radius={0}
            height={18}
            width={10}
          />
        </Button>
      </Block>
    </Block>
  );
};

export default Settings;
