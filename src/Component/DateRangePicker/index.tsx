import classNames from "classnames";
import Button from "@/Component/Button";
import { useCalender } from "@/Component/DateRangePicker/useCalender";
import ArrowIcon from "@/assets/Arrow.svg";
import CalenderCard from "@/Component/DateRangePicker/CalenderCard";
import { memo } from "react";

type DateRange = {
  from: Date;
  to: Date;
};

type DatePickerProps = {
  onChange?: (dateRange: DateRange) => void;
  min?: Date;
  max?: Date;
  value?: Partial<DateRange>;
  defaultValue?: Partial<DateRange>;
};

const DatePicker = (props: DatePickerProps) => {
  const { calender, currentDate, cycleCalender, onDateClick } =
    useCalender(props);

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  return (
    <CalenderCard>
      <CalenderCard.Header>
        <Button onClick={() => cycleCalender(-1)}>
          <img className="rotate-180" src={ArrowIcon} alt="arrow-right" />
        </Button>
        <span className="px-4 text-center font-bold">{`${currentMonth} ${currentYear}`}</span>
        <Button onClick={() => cycleCalender(1)}>
          <img src={ArrowIcon} alt="arrow-left" />
        </Button>
      </CalenderCard.Header>
      <CalenderCard.Body>
        <CalenderCard.Week />
        {calender.map(
          ({ disabled, isCurrentMonth, isSelected, date }, index) => (
            <CalenderCard.Date
              key={index}
              onClick={() => !disabled && onDateClick(date)}
              className={classNames("cursor-pointer", {
                "cursor-not-allowed": disabled,
                "hover:bg-slate-100": !disabled && !isSelected,
                "transition-colors duration-200": isCurrentMonth,
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
