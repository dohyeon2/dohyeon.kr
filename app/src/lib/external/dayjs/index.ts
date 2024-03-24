import dayjs from "dayjs";
import "dayjs/locale/ko";
import tz from "dayjs/plugin/timezone";

const day = dayjs;
day.locale("ko");
day.extend(tz);

export { day };
