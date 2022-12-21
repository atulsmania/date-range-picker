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
        isCurrentMonth,
        onClick,
        isDisabled,
        isSelected,
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

  return { currentDate, calender, cycleCalender, dateRange };
};
