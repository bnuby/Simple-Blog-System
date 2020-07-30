import { parseISO, format } from "date-fns";
import { FunctionComponent } from "react";

interface DateProps {
  dateString: string;
  dateFormat?: string;
}

const Date: FunctionComponent<DateProps> = ({
  dateString,
  dateFormat,
}: DateProps) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>{format(date, dateFormat as string)}</time>
  );
};

Date.defaultProps = {
  dateFormat: "LLL d, yyyy",
};

export default Date;
