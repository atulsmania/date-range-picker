# Date Range Picker

A Date Range Picker component made with Reactjs (hooks) and tailwind.

## Run Locally

Clone the project

```bash
  git clone https://github.com/atulsmania/date-range-picker.git
```

```bash
  cd date-range-picker
  npm install
  npm run dev
```

## Screenshots

![App Screenshot](https://i.ibb.co/KL48M4X/image.png)

## Usage/Examples

```javascript
import DatePicker from "@/Component/DateRangePicker";

type DateRange = Partial<Record<"from" | "to", Date>>;

function App() {
  const [dateRange, setDateRange] = useState({} as DateRange);

  const handleRangeChange = (range: DateRange) => {
    setDateRange({ ...dateRange, ...range });
  };

  return (
    <DatePicker
      min={new Date("2022-01-05")}
      max={new Date("2022-12-12")}
      onChange={(dateRange) => setDateRange(dateRange)}
      value={dateRange}
      //  {...restProps}
    />
  )
}
```

or just use the `useCalender` hook to implement own UI

```javascript
import { useCalender } from "@/Component/DateRangePicker/useCalender";

function App() {
  const {
    calender,
    currentDate,
    cycleCalender,
    isNextDisabled,
    isPrevDisabled,
  } = useCalender(props);

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  return <CustomDateRangePicker>// your code</CustomDateRangePicker>;
}
```
