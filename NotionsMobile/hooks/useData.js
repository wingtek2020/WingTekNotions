import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import Storage from "@react-native-async-storage/async-storage";
import { USERS, FOLLOWING, TRENDING, CATEGORIES, ARTICLES, RECOMMENDATIONS, BASKET, NOTIFICATIONS } from "../constants/mocks";
import { light, dark } from "../constants";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(light);
  const [user, setUser] = useState(USERS[0]);
  const [basket, setBasket] = useState(BASKET);
  const [users, setUsers] = useState(USERS);
  const [following, setFollowing] = useState(FOLLOWING);
  const [trending, setTrending] = useState(TRENDING);
  const [categories, setCategories] = useState(CATEGORIES);
  const [recommendations, setRecommendations] = useState(RECOMMENDATIONS);
  const [articles, setArticles] = useState(ARTICLES);
  const [article, setArticle] = useState({});
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const getIsDark = useCallback(async () => {
    try {
      const isDarkJSON = await Storage.getItem("isDark");
      setIsDark(isDarkJSON ? JSON.parse(isDarkJSON) : false);
    } catch (error) {
      console.error("Error fetching theme preference", error);
    }
  }, []);

  const handleIsDark = useCallback((payload) => {
    setIsDark(payload);
    Storage.setItem("isDark", JSON.stringify(payload));
  }, []);

  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  useEffect(() => {
    setTheme(isDark ? dark : light);
  }, [isDark]);

  const contextValue = {
    isDark,
    handleIsDark,
    theme,
    setTheme,
    user,
    users,
    setUsers,
    setUser,
    basket,
    setBasket,
    following,
    setFollowing,
    trending,
    setTrending,
    categories,
    setCategories,
    recommendations,
    setRecommendations,
    articles,
    setArticles,
    article,
    setArticle,
    notifications,
    setNotifications,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

// ✅ Correct Exports

export const useData = () => useContext(DataContext); // Default export for `useData`
