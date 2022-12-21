import { useCallback, useState } from "react";
import { DatePickerProps, DateRange } from "./types";

const getInitialDateRange = (date: DateRange) => {
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
      date.setHours(0, 0, 0, 0);
      const dateMs = date.getTime();
      const fromMs = dateRange.from?.getTime();
      const toMs = dateRange.to?.getTime();

      if (dateMs === fromMs) {
        setDateRange((prev) => ({ to: prev.to } as DateRange));
        return;
      }

      if (dateMs === toMs) {
        setDateRange((prev) => ({ from: prev.from } as DateRange));
        return;
      }

      if (fromMs && toMs) {
        if (toMs - dateMs > dateMs - fromMs) {
          setDateRange((prev) => ({ ...prev, from: date }));
        } else {
          setDateRange({ from: dateRange.from, to: date });
        }
      } else if (fromMs) {
        if (dateMs < fromMs) {
          setDateRange({ from: date, to: dateRange.from });
        } else {
          setDateRange({ ...dateRange, to: date });
        }
      } else {
        setDateRange((prev) => ({ ...prev, from: date }));
      }
    },
    [dateRange]
  );

  const disableDate = (date: Date) => {
    if (min && date.getTime() < min.getTime()) return true;
    if (max && date.getTime() > max.getTime()) return true;
    return false;
  };

  // const onDateSelect = useCallback((date: Date) => {
  //   if (disableDate(date)) return;
  //   updateDateRange(date);
  // }, []);

  const isDateSelected = (date: Date) => {
    return (
      (date >= dateRange.from && date <= dateRange.to) ||
      date.getTime() === dateRange.from?.getTime() ||
      date.getTime() === dateRange.to?.getTime()
    );
  };

  return { onDateSelect, isDateSelected, dateRange, disableDate };
};
