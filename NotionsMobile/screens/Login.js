import React, { useState, useCallback, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';
import { View, TextInput, StyleSheet, Alert, Platform } from "react-native";
import CustomButton from "./../components/CustomButton";
import Button from "./../components/Button";
import Image from "./../components/Image";
import Text from "./../components/Text";
import Block from "./../components/Block";
import Input from "./../components/Input";

import { useTheme } from "./../hooks/useTheme";
import { useData } from "./../hooks/useData";

import { useNavigation } from "@react-navigation/native";

import * as regex from "./../constants/regex";
import { useTranslation } from "./../hooks/useTranslation";

import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";

import {
  useAuthRequest,
  makeRedirectUri,
  exchangeCodeAsync,
} from "expo-auth-session";

const API_KEY = Constants.expoConfig.extra.API_KEY;
const BASE_URL = Constants.expoConfig.extra.BASE_URL;
const RavKey = Constants.expoConfig.extra.RavKey;

const discovery = {
  authorizationEndpoint: Constants.expoConfig.extra.authorizationEndpoint,
  tokenEndpoint: Constants.expoConfig.extra.tokenEndpoint,
  revocationEndpoint: Constants.expoConfig.extra.revocationEndpoint,
};

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { assets, colors, gradients, sizes } = useTheme();
  const { isDark } = useData();
  const isAndroid = Platform.OS === "android";

  const [accessToken, setAccessToken] = useState(null);

  const CLIENT_ID = RavKey;
  const REDIRECT_URI = makeRedirectUri({
    scheme: "WingTekNotions",
  });

  const RAVELRY_REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: RAVELRY_REDIRECT_URI,
      scopes: [], // Add scopes if needed
      responseType: "code",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleTokenExchange(code);
    }
  }, [response]);

  async function handleTokenExchange(code) {
    const tokenResponse = await exchangeCodeAsync(
      {
        clientId: CLIENT_ID,
        clientSecret: "ATjltXpNPDPh0H2zylt1iYxf2Uy4K6v6ASBcYldg",
        code,
        redirectUri: "exp://10.1.10.107:8081",
      },
      discovery
    );

    const token = tokenResponse.accessToken;

    if (token) {
      await SecureStore.setItemAsync('ravelry_token', token); // 🔐 Securely store it
      setAccessToken(token); // optionally set in state
      navigation.navigate('Home');
    }
   
  }

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    agreed: false,
  });

  const [login, setLoginData] = useState({
    email: "",
    password: "",
    agreed: false,
  });

  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleChange = useCallback(
    (value) => {
      setLoginData((state) => ({ ...state, ...value }));
    },
    [setLoginData]
  );

  const handleSignIn = useCallback(() => {
    /** send/save registratin data */
  }, [login]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(login.email),
      password: regex.password.test(login.password),
      agreed: login.agreed,
    }));
  }, [login, setIsValid]);


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
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}
            >
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{ rotate: "180deg" }]}
              />
              <Text p white marginLeft={sizes.s}>
                {t("goBack")}
              </Text>
            </Button>

            <Text h4 center white marginBottom={sizes.md}>
              {t("welcome")}
            </Text>
          </Image>
        </Block>
        {/* login form */}
        <Block
          keyboard
          marginTop={-(sizes.height * 0.2 - sizes.l)}
          behavior={!isAndroid ? "padding" : "height"}
        >
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            // disabled shadow on Android due to blur overlay + elevation issue
            shadow={!isAndroid}
          >
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
                {t("subtitle")}
              </Text>
              {/* social buttons */}
              <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.facebook}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.apple}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.google}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => promptAsync()}
                >
                  <Image
                    source={assets.ravelry}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
              </Block>
              <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}
              >
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[1, 0]}
                  start={[0, 1]}
                  gradient={gradients.divider}
                />
                <Text center marginHorizontal={sizes.s}>
                  {t("or")}
                </Text>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[0, 1]}
                  start={[1, 0]}
                  gradient={gradients.divider}
                />
              </Block>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  label={t("email")}
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  keyboardType="email-address"
                  placeholder={t("email")}
                  success={Boolean(login.email && isValid.email)}
                  danger={Boolean(login.email && !isValid.email)}
                  onChangeText={(value) => handleChange({ email: value })}
                />
                <Input
                  secureTextEntry
                  label={t("password")}
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  placeholder={t("password")}
                  onChangeText={(value) => handleChange({ password: value })}
                  success={Boolean(login.password && isValid.password)}
                  danger={Boolean(login.password && !isValid.password)}
                />
              </Block>
              {/* checkbox terms */}
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
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
              <Button
                onPress={handleSignIn}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}
              >
                <Text bold white transform="uppercase">
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Login;
