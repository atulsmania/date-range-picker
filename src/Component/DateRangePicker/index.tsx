import { memo } from "react";
import classNames from "classnames";
import Button from "@/Component/Button";
import { useCalendar } from "@/Component/DateRangePicker/useCalendar";
import ArrowIcon from "@/assets/Arrow.svg";
import CalendarCard from "@/Component/DateRangePicker/CalendarCard";
import { DatePickerProps } from "@/Component/DateRangePicker/types";

const DatePicker = (props: DatePickerProps) => {
  const {
    calendar,
    currentDate,
    cycleCalendar,
    isNextDisabled,
    isPrevDisabled,
  } = useCalendar(props);

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  return (
    <CalendarCard>
      <CalendarCard.Header>
        <Button
          className={classNames({
            invisible: isPrevDisabled,
          })}
          onClick={() => cycleCalendar(-1)}
        >
          <img className="rotate-180" src={ArrowIcon} alt="arrow-right" />
        </Button>
        <span className="px-4 text-center font-bold">{`${currentMonth} ${currentYear}`}</span>
        <Button
          className={classNames({
            invisible: isNextDisabled,
          })}
          onClick={() => cycleCalendar(1)}
        >
          <img src={ArrowIcon} alt="arrow-left" />
        </Button>
      </CalendarCard.Header>
      <CalendarCard.Body>
        <CalendarCard.Week />
        {calendar.map(
          (
            { isDisabled, onClick, isCurrentMonth, isSelected, date },
            index
          ) => (
            <CalendarCard.Date
              key={index}
              onClick={onClick}
              className={classNames("cursor-pointer", {
                "cursor-not-allowed text-slate-300": isDisabled,
                "hover:bg-slate-100": !isDisabled && !isSelected,
                "transition-colors": isCurrentMonth,
                "text-slate-300": !isCurrentMonth && !isSelected,
                "bg-slate-300": !isCurrentMonth && isSelected,
                "bg-slate-700 text-slate-50 shadow-lg":
                  isCurrentMonth && isSelected,
              })}
            >
              {date.getDate()}
            </CalendarCard.Date>
          )
        )}
      </CalendarCard.Body>
    </CalendarCard>
  );
};

export default memo(DatePicker);
