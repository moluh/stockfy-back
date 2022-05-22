import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export class getDiffDates {
    currentTime() {
        return dayjs().utcOffset()
    }

    actualDate() {
        // return dayjs.utc().format();
        return dayjs().format() //.utc().local()
    }

    yesterday() {
        return dayjs().utc().local().subtract(1, 'day')
    }

    monthAgo() {
        return dayjs().utc().local().subtract(1, 'month')
    }

    weekAgo() {
        return dayjs().subtract(7, 'day')
    }
}
