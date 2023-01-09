import { useCallback, useMemo, useState } from "react";
import { DatePickerProps, DateRange } from "./types";

const getInitialDateRange = (date: DateRange) => {
  const from = date.from;
  const to = date.to;
  from?.setHours(0, 0, 0, 0);
  to?.setHours(0, 0, 0, 0);
  if (!from && !to) return {};
  if (!from) return { to };
  if (!to) return { from };
  if (from.getTime() > to.getTime()) return { from: to, to: from };
  return { from, to };
};

export const useRangeSelector = ({
  value,
  min,
  max,
  onChange,
}: DatePickerProps) => {
  const [dateRange, setDateRange] = useState(getInitialDateRange({ ...value }));

  useMemo(() => {
    setDateRange(getInitialDateRange({ ...value }));
  }, [value]);

  const onDateSelect = useCallback(
    (date: Date) => {
      const newRange = getNewRange(date);
      setDateRange(newRange);
      onChange?.(newRange);
    },
    [dateRange]
  );

  const getNewRange = useCallback(
    (date: Date) => {
      date.setHours(0, 0, 0, 0);
      const dateMs = date.getTime();
      const fromMs = dateRange.from?.getTime();
      const toMs = dateRange.to?.getTime();

      let prev: DateRange = { ...dateRange };

      if (dateMs === fromMs) {
        prev = { from: prev.to };
        return prev;
      }

      if (dateMs === toMs) {
        prev = { from: prev.from };
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
    if (!dateRange.from && !dateRange.to) return false;
    if (!dateRange.from) return date.getTime() === dateRange.to?.getTime();
    if (!dateRange.to) return date.getTime() === dateRange.from?.getTime();
    return date >= dateRange.from && date <= dateRange.to;
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
