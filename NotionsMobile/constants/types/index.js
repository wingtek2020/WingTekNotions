import i18n from "i18n-js";
import { ImageSourcePropType } from "react-native";
import { CalendarBaseProps } from "react-native-calendars";
import THEME from "../theme";

export * from "./components";
export * from "../theme";

// User Object
export const IUser = {
  id: null,
  name: "",
  department: "",
  avatar: "",
  stats: {
    posts: 0,
    followers: 0,
    following: 0,
  },
  social: {
    twitter: "",
    dribbble: "",
  },
  about: "",
};

// Category Object
export const ICategory = {
  id: null,
  name: "",
};

// Article Options
export const IArticleOptions = {
  id: null,
  title: "",
  description: "",
  type: "room", // room | apartment | house
  sleeping: { total: 0, type: "sofa" },
  guests: 0,
  price: 0,
  user: IUser,
  image: "",
};

// Article Object
export const IArticle = {
  id: null,
  title: "",
  description: "",
  category: ICategory,
  image: "",
  location: {},
  rating: 0,
  user: IUser,
  offers: [],
  options: [],
  timestamp: 0,
  onPress: (event) => {},
};

// Product Object
export const IProduct = {
  id: null,
  title: "",
  description: "",
  image: "",
  timestamp: 0,
  linkLabel: "",
  type: "vertical", // vertical | horizontal
};

// Location Object
export const ILocation = {
  id: null,
  city: "",
  country: "",
};

// Basket Item Object
export const IBasketItem = {
  id: null,
  image: "",
  title: "",
  description: "",
  stock: false,
  price: 0,
  qty: 1,
  qtys: [],
  size: null,
  sizes: [],
};

// Basket Object
export const IBasket = {
  subtotal: 0,
  items: [],
  recommendations: [],
};

// Notification Object
export const INotification = {
  id: null,
  subject: "",
  message: "",
  read: false,
  business: false,
  createdAt: null,
  type: "notification", // Possible types
};

// Data Object
export const IUseData = {
  isDark: false,
  handleIsDark: (isDark) => {},
  theme: THEME,
  setTheme: (theme) => {},
  user: IUser,
  users: [],
  handleUser: (data) => {},
  handleUsers: (data) => {},
  basket: IBasket,
  handleBasket: (data) => {},
  following: [],
  setFollowing: (data) => {},
  trending: [],
  setTrending: (data) => {},
  categories: [],
  setCategories: (data) => {},
  recommendations: [],
  setRecommendations: (data) => {},
  articles: [],
  setArticles: (data) => {},
  article: IArticle,
  handleArticle: (data) => {},
  notifications: [],
  handleNotifications: (data) => {},
};

// Translation Object
export const ITranslate = {
  locale: "en",
  setLocale: (locale) => {},
  t: (scope, options) => i18n.t(scope, options),
  translate: (scope, options) => i18n.t(scope, options),
};

// Extras
export const IExtra = {
  id: null,
  name: "",
  time: "",
  image: ImageSourcePropType,
  saved: false,
  booked: false,
  available: false,
  onBook: () => {},
  onSave: () => {},
  onTimeSelect: (id) => {},
};

// Calendar Object
export const ICalendar = {
  ...CalendarBaseProps,
  dates: [],
  calendar: { start: 0, end: 0 },
  onClose: (calendar) => {},
};

