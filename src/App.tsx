import DatePicker from "@/Component/DateRangePicker";
import { useState } from "react";
import Controls from "./Pages/Home/Controls";
import RangeVisualizer from "./Pages/Home/RangeVisualizer";

type DateRange = {
  from: Date;
  to: Date;
};

const cardClassNames =
  "flex flex-col rounded-2xl p-6 gap-4 w-96 text-2xl text-slate-400 font-semibold font-mono bg-white shadow-lg";

const App = () => {
  const [dateRange, setDateRange] = useState({} as DateRange);

  const handleRangeChange = (range: Partial<DateRange>) => {
    setDateRange({ ...dateRange, ...range });
  };

  return (
    <div className="h-screen bg-slate-100 flex items-center justify-center font-mono">
      <div className="flex justify-between items-center gap-12 max-w-6xl">
        <div>
          <DatePicker
            min={new Date("2022-01-05")}
            max={new Date("2022-12-12")}
            onChange={(dateRange) => setDateRange(dateRange)}
            value={dateRange}
          />
        </div>
        <div className="flex flex-col justify-between gap-12">
          <RangeVisualizer dateRange={dateRange} className={cardClassNames} />
          <Controls setRange={handleRangeChange} className={cardClassNames} />
        </div>
      </div>
    </div>
  );
};

export default App;
