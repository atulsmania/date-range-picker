import { useCallback, useState } from "react";

type DateRange = {
  from: Date;
  to: Date;
};

export const useRangeSelector = () => {
  const [dateRange, setDateRange] = useState({} as DateRange);

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

  const isDateSelected = (date: Date) => {
    return (
      (date >= dateRange.from && date <= dateRange.to) ||
      date.getTime() === dateRange.from?.getTime() ||
      date.getTime() === dateRange.to?.getTime()
    );
  };

  return { onDateSelect, isDateSelected, dateRange };
};
