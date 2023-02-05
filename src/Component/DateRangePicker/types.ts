export type DateRange = Partial<Record<"from" | "to", Date>>;

export type MinMaxRange = Partial<Record<"min" | "max", Date>>;

export type DatePickerProps = {
  onChange?: (dateRange: DateRange) => void;
  min?: Date;
  max?: Date;
  value?: DateRange;
};
