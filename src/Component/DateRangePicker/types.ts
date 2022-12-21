export type DateRange = {
  from: Date;
  to: Date;
};

export type InitialCalenderPage = {
  month: number;
  year: number;
};

export type DatePickerProps = {
  onChange?: (dateRange: DateRange) => void;
  min?: Date;
  max?: Date;
  value?: Partial<DateRange>;
  initialCalender?: InitialCalenderPage;
};
