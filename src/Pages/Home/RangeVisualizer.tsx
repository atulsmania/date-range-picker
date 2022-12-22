import { DateRange } from "@/Component/DateRangePicker/types";
import { HTMLAttributes } from "react";

type RangeVisualizerProps = HTMLAttributes<HTMLDivElement> & {
  dateRange: DateRange;
};

const RangeVisualizer = ({ dateRange, ...restProps }: RangeVisualizerProps) => {
  return (
    <div {...restProps}>
      <span className="flex justify-between">
        from:{" "}
        <span className="font-light text-slate-700">
          {dateRange.from ? dateRange.from.toDateString() : "UnSelected"}
        </span>
      </span>
      <span className="flex justify-between">
        to:{" "}
        <span className="font-light text-slate-700">
          {dateRange.to ? dateRange.to.toDateString() : "UnSelected"}{" "}
        </span>
      </span>
    </div>
  );
};
export default RangeVisualizer;
