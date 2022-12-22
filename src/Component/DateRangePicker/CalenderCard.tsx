import classNames from "classnames";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalenderCard = ({
  children,
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(
        classNames(
          "font-mono w-full max-w-sm text-lg tracking-wide select-none",
          "bg-white rounded-2xl shadow-lg p-6 space-y-2 cursor-default"
        ),
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

const CalenderCardHeader = ({
  children,
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge("flex items-center justify-between", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

const CalenderCardWeek = ({
  className,
  ...restProps
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <>
      {days.map((day, index) => (
        <span
          className={twMerge("p-2 text-slate-500 rounded-sm ", className)}
          key={index}
          {...restProps}
        >
          {day}
        </span>
      ))}
    </>
  );
};

const CalenderWeekDaysLayout = ({
  children,
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(
        "grid grid-cols-7 text-center font-semibold gap-2",
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

const CalenderCardDate = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={twMerge("p-2 text-slate-500 rounded-sm ", className)}
      {...restProps}
    >
      {children}
    </span>
  );
};

CalenderCard.Date = CalenderCardDate;
CalenderCard.Body = CalenderWeekDaysLayout;
CalenderCard.Week = CalenderCardWeek;
CalenderCard.Header = CalenderCardHeader;
export default CalenderCard;
