import React, { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

import { useData } from "./../hooks/useData";
import { useTheme } from "./../hooks/useTheme";
import { useTranslation } from "./../hooks/useTranslation";

import * as regex from "./../constants/regex";

import Block from "./../components/Block";
import Button from "./../components/Button";
import Image from "./../components/Image";
import Text from "./../components/Text";
import Checkbox from "./../components/Checkbox";
import Input from "./../components/Input";

const isAndroid = Platform.OS === "android";

const Register = ({ navigation }) => {
  const { isDark } = useData();
  const { t } = useTranslation();
  
  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });

  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    password: "",
    agreed: false,
  });

  const { assets, colors, gradients, sizes } = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({ ...state, ...value }));
    },
    [setRegistration]
  );

  const handleSignUp = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registration data */
      console.log("handleSignUp", registration);
    }
  }, [isValid, registration]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{ zIndex: 0 }}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}
          >
            <Button row flex={0} justify="flex-start" onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{ rotate: "180deg" }]}
              />
              <Text p white marginLeft={sizes.s}>
                {t("common.goBack")}
              </Text>
            </Button>

            <Text h4 center white marginBottom={sizes.md}>
              {t("register.title")}
            </Text>
          </Image>
        </Block>

        {/* Register Form */}
        <Block keyboard behavior={!isAndroid ? "padding" : "height"} marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block flex={0} radius={sizes.sm} marginHorizontal="8%" shadow={!isAndroid}>
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}
            >
              <Text p semibold center>
                {t("register.subtitle")}
              </Text>

              {/* Social Buttons */}
              <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <Button outlined gray shadow={!isAndroid}>
                  <Image source={assets.facebook} height={sizes.m} width={sizes.m} color={isDark ? colors.icon : undefined} />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image source={assets.apple} height={sizes.m} width={sizes.m} color={isDark ? colors.icon : undefined} />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image source={assets.google} height={sizes.m} width={sizes.m} color={isDark ? colors.icon : undefined} />
                </Button>
              </Block>

              {/* Divider */}
              <Block row flex={0} align="center" justify="center" marginBottom={sizes.sm} paddingHorizontal={sizes.xxl}>
                <Block flex={0} height={1} width="50%" end={[1, 0]} start={[0, 1]} gradient={gradients.divider} />
                <Text center marginHorizontal={sizes.s}>{t("common.or")}</Text>
                <Block flex={0} height={1} width="50%" end={[0, 1]} start={[1, 0]} gradient={gradients.divider} />
              </Block>

              {/* Form Inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t("common.name")}
                  placeholder={t("common.namePlaceholder")}
                  success={Boolean(registration.name && isValid.name)}
                  danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({ name: value })}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t("common.email")}
                  keyboardType="email-address"
                  placeholder={t("common.emailPlaceholder")}
                  success={Boolean(registration.email && isValid.email)}
                  danger={Boolean(registration.email && !isValid.email)}
                  onChangeText={(value) => handleChange({ email: value })}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t("common.password")}
                  placeholder={t("common.passwordPlaceholder")}
                  onChangeText={(value) => handleChange({ password: value })}
                  success={Boolean(registration.password && isValid.password)}
                  danger={Boolean(registration.password && !isValid.password)}
                />
              </Block>

              {/* Checkbox Terms */}
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  marginRight={sizes.sm}
                  checked={registration?.agreed}
                  onPress={(value) => handleChange({ agreed: value })}
                />
                <Text paddingRight={sizes.s}>
                  {t("common.agree")}
                  <Text
                    semibold
                    onPress={() => {
                      Linking.openURL("https://www.creative-tim.com/terms");
                    }}
                  >
                    {t("common.terms")}
                  </Text>
                </Text>
              </Block>

              {/* Signup Button */}
              <Button
                onPress={handleSignUp}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}
              >
                <Text bold white transform="uppercase">
                  {t("common.signup")}
                </Text>
              </Button>

              {/* Signin Button */}
              <Button primary outlined shadow={!isAndroid} marginVertical={sizes.s} marginHorizontal={sizes.sm} onPress={() => navigation.navigate("Login")}>
                <Text bold primary transform="uppercase">
                  {t("common.signin")}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Register;
