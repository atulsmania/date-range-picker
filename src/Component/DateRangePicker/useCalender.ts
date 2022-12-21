import { useCallback, useMemo, useState } from "react";
import { useRangeSelector } from "./useRangeSelector";

type InitialCalenderPage = {
  month: number;
  year: number;
};

const setInitialDate = (initialCalender?: InitialCalenderPage) => {
  const dt = new Date();
  if (!initialCalender) return dt;
  dt.setMonth(initialCalender.month);
  dt.setFullYear(initialCalender.year);
  return dt;
};

export const useCalender = (initialCalender?: InitialCalenderPage) => {
  const [currentDate, setCurrentDate] = useState(
    setInitialDate(initialCalender)
  );
  const { isDateSelected, dateRange, onDateSelect } = useRangeSelector();

  const onDateClick = (date: Date) => {
    onDateSelect(date);
    if (date.getMonth() === currentDate.getMonth()) return;
    date.setHours(0, 0, 0, 0);
    setCurrentDate(date);
  };

  const calender = useMemo(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dayOnFirstOfMonth = new Date(year, month, 1).getDay();

    const days = Array.from({ length: 42 }, (_, i) => {
      const day = i + 1 - dayOnFirstOfMonth;
      const date = new Date(year, month, day, 0, 0, 0, 0) as Date;

      return {
        date,
        isSelected: isDateSelected(date),
        isCurrentMonth: date.getMonth() === month,
      };
    });

    return days;
  }, [currentDate, dateRange]);

  const cycleCalender = useCallback(
    (offset: number | { month?: number; year?: number }) => {
      const newDate = new Date(currentDate);
      newDate.setHours(0, 0, 0, 0);
      if (typeof offset === "number") {
        newDate.setMonth(currentDate.getMonth() + offset);
      } else {
        newDate.setMonth(offset.month || currentDate.getMonth());
        newDate.setFullYear(offset.year || currentDate.getFullYear());
      }
      setCurrentDate(newDate);
    },
    [currentDate]
  );

  return { currentDate, calender, cycleCalender, dateRange, onDateClick };
};
