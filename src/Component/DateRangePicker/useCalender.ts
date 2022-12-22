import { useCallback, useMemo, useState } from "react";
import { DatePickerProps, InitialCalenderPage } from "./types";
import { useRangeSelector } from "./useRangeSelector";

const setInitialDate = (initialCalender?: InitialCalenderPage) => {
  const dt = new Date();
  dt.setHours(0, 0, 0, 0);
  if (!initialCalender) return dt;
  dt.setMonth(initialCalender.month);
  dt.setFullYear(initialCalender.year);
  return dt;
};

export const useCalender = ({
  initialCalender,
  ...restProps
}: DatePickerProps) => {
  const [currentDate, setCurrentDate] = useState(
    setInitialDate(initialCalender)
  );
  const { getDateState, dateRange, onDateSelect } = useRangeSelector(restProps);

  const calender = useMemo(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dayOnFirstOfMonth = new Date(year, month, 1).getDay();

    const days = Array.from({ length: 42 }, (_, i) => {
      const day = i + 1 - dayOnFirstOfMonth;
      const date = new Date(year, month, day, 0, 0, 0, 0) as Date;
      const isCurrentMonth = date.getMonth() === month;
      const { isDisabled, isSelected } = getDateState(date);

      const onClick = () => {
        if (isDisabled) return;
        onDateSelect(date);
        if (isCurrentMonth) return;
        date.setHours(0, 0, 0, 0);
        setCurrentDate(date);
      };

      return {
        date,
        onClick,
        isDisabled,
        isSelected,
        isCurrentMonth,
      };
    });

    return days;
  }, [currentDate, dateRange]);

  const isPrevDisabled = useMemo(() => {
    return calender.some((curr, index) => {
      if (calender[index - 1]?.isDisabled && !curr.isDisabled) return true;
      return false;
    });
  }, [calender]);

  const isNextDisabled = useMemo(() => {
    return calender.some((curr, index) => {
      if (calender[index + 1]?.isDisabled && !curr.isDisabled) return true;
      return false;
    });
  }, [calender]);

  const cycleCalender = useCallback(
    (offset: number | { month?: number; year?: number }) => {
      const dt = new Date(currentDate);
      if (typeof offset === "number") {
        if (offset >= 0 && isNextDisabled) return;
        if (offset < 0 && isPrevDisabled) return;
        dt.setMonth(currentDate.getMonth() + offset);
      } else {
        dt.setMonth(currentDate.getMonth() + (offset.month || 0));
        dt.setFullYear(currentDate.getFullYear() + (offset.year || 0));
      }
      setCurrentDate(dt);
    },
    [currentDate]
  );

  return {
    currentDate,
    calender,
    cycleCalender,
    dateRange,
    isNextDisabled,
    isPrevDisabled,
  };
};
