import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Calendar as RNCalendar, LocaleConfig } from "react-native-calendars";
import useTheme from "../hooks/useTheme";
import useTranslation from "../hooks/useTranslation";


const Calendar = ({ onClose, ...props }) => {
  const { colors, fonts } = useTheme();
  const { t, locale } = useTranslation();
  const [dates, setDates] = useState(props.dates || {});
  const [calendar, setCalendar] = useState({ start: 0, end: 0 });

  // Handle marked dates
  const handleDates = useCallback(
    (calendar) => {
      if (!calendar.start || !calendar.end) return;

      const datesRange = dayjs(calendar.end).diff(
        dayjs(calendar.start),
        "days"
      );

      const markedDates = Array.from({ length: datesRange }, (_, i) => {
        const date = dayjs(calendar.start)
          .add(i + 1, "day")
          .format("YYYY-MM-DD");

        return {
          [date]: {
            startingDay: false,
            endingDay: i + 1 === datesRange,
            color: String(colors.primary),
          },
        };
      }).reduce(
        (list, entry) => ({ ...list, ...entry }),
        {
          [dayjs(calendar.start).format("YYYY-MM-DD")]: {
            startingDay: true,
            color: String(colors.primary),
          },
        }
      );

      setDates(markedDates);
    },
    [colors.primary]
  );

  // Handle calendar selection
  const handleCalendar = useCallback(
    (value) => {
      let newCalendar = { ...calendar };

      if (newCalendar.start === 0) {
        newCalendar.start = value.timestamp;
      } else if (newCalendar.start && newCalendar.end) {
        newCalendar.start = value.timestamp;
        newCalendar.end = 0;
      } else {
        newCalendar.end = value.timestamp;
      }

      setCalendar(newCalendar);
      handleDates(newCalendar);

      if (newCalendar.start && newCalendar.end) {
        onClose?.(newCalendar);
      }
    },
    [calendar, handleDates, onClose]
  );

  // Initialize marked dates
  useEffect(() => {
    if (props?.calendar) {
      handleDates(props.calendar);
    }
  }, [handleDates, props.calendar]);

  // Set calendar locale based on app language
  LocaleConfig.locales.fr = {
    today: t("dates.today"),
    dayNames: t("dates.dayNames"),
    dayNamesShort: t("dates.dayNamesShort"),
    monthNames: t("dates.monthNames"),
    monthNamesShort: t("dates.monthNamesShort"),
  };
  LocaleConfig.defaultLocale = locale;

  return (
    <RNCalendar
      key={locale}
      firstDay={1}
      markingType="period"
      markedDates={dates}
      current={dayjs().format("YYYY-MM-DD")}
      minDate={dayjs().format("YYYY-MM-DD")}
      onDayPress={(day) => handleCalendar(day)}
      theme={{
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        textSectionTitleColor: String(colors.white),
        arrowColor: String(colors.white),
        monthTextColor: String(colors.white),
        dayTextColor: String(colors.white),
        todayTextColor: String(colors.white),
        textDisabledColor: String(colors.gray),
        selectedDayTextColor: String(colors.white),
        selectedDayBackgroundColor: String(colors.primary),
        textDayFontFamily: fonts.text,
        textMonthFontFamily: fonts.text,
        textDayHeaderFontFamily: fonts.text,
      }}
      {...props}
    />
  );
};

export default Calendar;
