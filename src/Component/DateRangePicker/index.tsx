import classNames from "classnames";
import Button from "@/Component/Button";
import { useCalender } from "@/Component/DateRangePicker/useCalender";
import ArrowIcon from "@/assets/Arrow.svg";
import CalenderCard from "@/Component/DateRangePicker/CalenderCard";
import { memo } from "react";
import { DatePickerProps } from "./types";

const DatePicker = (props: DatePickerProps) => {
  const {
    calender,
    currentDate,
    cycleCalender,
    isNextDisabled,
    isPrevDisabled,
  } = useCalender(props);

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  return (
    <CalenderCard>
      <CalenderCard.Header>
        <Button
          className={classNames({
            invisible: isPrevDisabled,
          })}
          onClick={() => cycleCalender(-1)}
        >
          <img className="rotate-180" src={ArrowIcon} alt="arrow-right" />
        </Button>
        <span className="px-4 text-center font-bold">{`${currentMonth} ${currentYear}`}</span>
        <Button
          className={classNames({
            invisible: isNextDisabled,
          })}
          onClick={() => cycleCalender(1)}
        >
          <img src={ArrowIcon} alt="arrow-left" />
        </Button>
      </CalenderCard.Header>
      <CalenderCard.Body>
        <CalenderCard.Week />
        {calender.map(
          (
            { isDisabled, onClick, isCurrentMonth, isSelected, date },
            index
          ) => (
            <CalenderCard.Date
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
            </CalenderCard.Date>
          )
        )}
      </CalenderCard.Body>
    </CalenderCard>
  );
};

export default memo(DatePicker);
