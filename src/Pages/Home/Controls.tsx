import { DateRange } from "@/Component/DateRangePicker/types";
import classNames from "classnames";
import { HTMLAttributes, useState } from "react";

type ControlsProps = HTMLAttributes<HTMLDivElement> & {
  setRange: (range: Partial<DateRange>) => void;
};

const Controls = ({ setRange, ...restProps }: ControlsProps) => {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const inputClassNames =
    "rounded p-2 gap-6 text-xl text-slate-400 bg-slate-100 uppercase";

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
    setRange({ from: new Date(e.target.value) });
  };
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
    setRange({ to: new Date(e.target.value) });
  };

  return (
    <div {...restProps}>
      <input
        className={inputClassNames}
        onChange={handleFromChange}
        value={fromDate}
        type="date"
      />
      <input
        className={inputClassNames}
        onChange={handleToChange}
        value={toDate}
        type="date"
      />
    </div>
  );
};

export default Controls;
