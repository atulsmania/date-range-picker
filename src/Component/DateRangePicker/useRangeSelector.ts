import { useCallback, useMemo, useState } from "react";
import { DatePickerProps, DateRange } from "./types";

const getInitialDateRange = (date: DateRange) => {
  date.from?.setHours(0, 0, 0, 0);
  date.to?.setHours(0, 0, 0, 0);
  const from = date.from;
  const to = date.to;
  if (!from && !to) return {} as DateRange;
  if (!from) return { to } as DateRange;
  if (!to) return { from } as DateRange;
  if (from.getTime() > to.getTime()) return { from: to, to: from };
  return { from, to } as DateRange;
};

type RangeSelectorProps = Omit<DatePickerProps, "initialCalender">;

export const useRangeSelector = ({
  value,
  min,
  max,
  onChange,
}: RangeSelectorProps) => {
  const [dateRange, setDateRange] = useState(
    getInitialDateRange({ ...value } as DateRange)
  );

  const onDateSelect = useCallback(
    (date: Date) => {
      const newRange = getNewRange(date);
      setDateRange(newRange);
      if (onChange) onChange(newRange);
    },
    [dateRange]
  );

  const getNewRange = useCallback(
    (date: Date) => {
      date.setHours(0, 0, 0, 0);
      const dateMs = date.getTime();
      const fromMs = dateRange.from?.getTime();
      const toMs = dateRange.to?.getTime();

      let prev = { ...dateRange };

      if (dateMs === fromMs) {
        prev = { to: prev.to } as DateRange;
        return prev;
      }

      if (dateMs === toMs) {
        prev = { from: prev.from } as DateRange;
        return prev;
      }

      if (fromMs && toMs) {
        if (toMs - dateMs > dateMs - fromMs) {
          prev = { ...prev, from: date };
        } else {
          prev = { from: dateRange.from, to: date };
        }
      } else if (fromMs) {
        if (dateMs < fromMs) {
          prev = { from: date, to: dateRange.from };
        } else {
          prev = { ...dateRange, to: date };
        }
      } else {
        prev = { ...prev, from: date };
      }
      return prev;
    },
    [dateRange]
  );

  const isDateDisabled = (date: Date) => {
    min?.setHours(0, 0, 0, 0);
    max?.setHours(0, 0, 0, 0);
    if (min && date.getTime() < min.getTime()) return true;
    if (max && date.getTime() > max.getTime()) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    return (
      (date >= dateRange.from && date <= dateRange.to) ||
      date.getTime() === dateRange.from?.getTime() ||
      date.getTime() === dateRange.to?.getTime()
    );
  };

  const getDateState = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return {
      isDisabled: isDateDisabled(date),
      isSelected: isDateSelected(date),
    };
  };

  return { onDateSelect, dateRange, getDateState };
};
