import DatePicker from "@/Component/DateRangePicker";
import { ChangeEvent, ComponentProps, useState } from "react";

type DateRange = {
  from: Date;
  to: Date;
};

const cardClassNames =
  "flex flex-col rounded-2xl p-6 gap-6 w-96 text-2xl text-slate-400 font-semibold font-mono bg-white shadow-lg";

const inputClassNames =
  "border-2 p-2 placeholder:italic font-thin flex items-center border-slate-400 rounded-lg";

const App = () => {
  const [dateRange, setDateRange] = useState({} as DateRange);
  const [from, setFrom] = useState<number>();
  const [to, setTo] = useState<number>();

  const handleMillisInput = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+evt.target.value)) {
    }
    setFrom(dateRange.from.getTime());
    setTo(dateRange.to.getTime());
  };

  return (
    <div className="h-screen bg-slate-100 flex items-center justify-center font-mono">
      <div className="flex justify-between items-center gap-12 max-w-6xl scale-125">
        <div>
          <DatePicker onChange={(dateRange) => setDateRange(dateRange)} />
        </div>
        <div className="flex flex-col justify-between gap-12">
          <span className="-mb-8 text-xl">Initial Date Input</span>
          <div className={cardClassNames}>
            <input
              type="date"
              className={inputClassNames}
              value={from}
              placeholder="{ from: dateInMillis }"
            />
            <input
              type="date"
              className={inputClassNames}
              value={to}
              placeholder="{ to: dateInMillis }"
            />
          </div>
          <span className="-mb-8 text-xl">Date Range</span>
          <DateVisualizer {...dateRange} />
        </div>
      </div>
    </div>
  );
};

const DateVisualizer = (date: DateRange) => {
  return (
    <div className={cardClassNames}>
      <span className="flex justify-between">
        from:{" "}
        <span className="font-light text-slate-700">
          {date.from ? date.from.toDateString() : "UnSelected"}
        </span>
      </span>
      <span className="flex justify-between">
        to:{" "}
        <span className="font-light text-slate-700">
          {date.to ? date.to.toDateString() : "UnSelected"}{" "}
        </span>
      </span>
    </div>
  );
};

const Input = (props: ComponentProps<"input">) => {
  return (
    <input
      className="border-2 p-2 placeholder:italic font-thin flex items-center border-slate-400 rounded-lg"
      type="text"
      {...props}
    />
  );
};

export default App;
