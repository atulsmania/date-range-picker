import classNames from "classnames";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarCard = ({
  children,
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(
        classNames(
          "font-mono min-w-fit text-lg tracking-wide select-none",
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

const CalendarCardHeader = ({
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

const CalendarCardWeek = ({
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

const CalendarWeekDaysLayout = ({
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

const CalendarCardDate = ({
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

CalendarCard.Date = CalendarCardDate;
CalendarCard.Body = CalendarWeekDaysLayout;
CalendarCard.Week = CalendarCardWeek;
CalendarCard.Header = CalendarCardHeader;
export default CalendarCard;
