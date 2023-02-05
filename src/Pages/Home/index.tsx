import { useState } from "react";
import DatePicker from "@/Component/DateRangePicker";
import Controls from "@/Pages/Home/Controls";
import RangeVisualizer from "@/Pages/Home/RangeVisualizer";

type DateRange = Partial<Record<"from" | "to", Date>>;

const cardClassNames =
  "flex flex-col rounded-2xl p-4 gap-4 w-96 text-2xl text-slate-400 font-semibold font-mono bg-white shadow-lg";

const Home = () => {
  const [dateRange, setDateRange] = useState({} as DateRange);

  const handleRangeChange = (range: Partial<DateRange>) => {
    setDateRange({ ...dateRange, ...range });
  };

  return (
    <div className="h-screen bg-slate-100 gap-10 flex flex-col items-center justify-center font-mono">
      <Title />
      <div className="flex justify-between items-center gap-4 max-w-7xl bg-neutral-300 p-32 px-40 rounded-md shadow-2xl">
        <DatePicker
          min={new Date("2022-01-05")}
          max={new Date("2022-12-12")}
          onChange={(dateRange) => setDateRange(dateRange)}
          value={dateRange}
        />
        <div className="flex flex-col justify-between gap-6">
          <RangeVisualizer dateRange={dateRange} className={cardClassNames} />
          <Controls
            range={dateRange}
            setRange={handleRangeChange}
            className={cardClassNames}
          />
          <PageControls />
        </div>
      </div>
    </div>
  );
};

const Title = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-6xl font-bold text-slate-700">Date Range Picker</h1>
      <h2 className="text-2xl font-semibold text-slate-500">
        A simple date range picker component
      </h2>
    </div>
  );
};

const Icon = ({ path }: { path: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-slate-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="" />
    </svg>
  );
};

const PageControls = () => {
  return (
    <div className={cardClassNames}>
      <Icon path="" />
      <Icon path="" />
    </div>
  );
};

export default Home;
