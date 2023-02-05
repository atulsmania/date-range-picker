import { DateRange } from "@/Component/DateRangePicker/types";
import { HTMLAttributes } from "react";

type ControlsProps = HTMLAttributes<HTMLDivElement> & {
  setRange: (range: Partial<DateRange>) => void;
  range: Partial<DateRange>;
};

const dateToShortString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

const Controls = ({ range, setRange, ...restProps }: ControlsProps) => {
  const inputClassNames =
    "rounded p-2 gap-6 text-xl text-slate-400 bg-slate-100 uppercase";

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange({ from: new Date(e.target.value) });
  };
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange({ to: new Date(e.target.value) });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-500">Value Controls</h2>
      <div {...restProps}>
        <input
          className={inputClassNames}
          onChange={handleFromChange}
          value={range.from ? dateToShortString(range.from) : ""}
          type="date"
        />
        <input
          className={inputClassNames}
          onChange={handleToChange}
          value={range.to ? dateToShortString(range.to) : ""}
          type="date"
        />
      </div>
    </div>
  );
};

export default Controls;
