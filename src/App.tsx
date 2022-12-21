import DatePicker from "@/Component/DateRangePicker";
import { useState } from "react";

type DateRange = {
  from: Date;
  to: Date;
};

const cardClassNames =
  "flex flex-col rounded-2xl p-6 gap-6 w-96 text-2xl text-slate-400 font-semibold font-mono bg-white shadow-lg";

const App = () => {
  const [dateRange, setDateRange] = useState({} as DateRange);

  return (
    <div className="h-screen bg-slate-100 flex items-center justify-center font-mono">
      <div className="flex justify-between items-center gap-12 max-w-6xl">
        <div>
          <DatePicker
            min={new Date("2022-01-01")}
            max={new Date("2022-12-31")}
            onChange={(dateRange) => setDateRange(dateRange)}
          />
        </div>
        <div className="flex flex-col justify-between gap-12">
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

export default App;
