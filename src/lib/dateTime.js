import moment from 'moment';

export const dateTypes = {
	dayMonthDate: 'DAY_MONTH_DATE',
	calendarDay: 'CALENDAR_DAY',
	calendarDayLower: 'CALENDAR_DAY_LOWER',
	time: 'TIME',
	dayMonthYearTime: 'DAY_MONTH_YEAR_TIME',
};

const calendarFormat = {
	sameDay: '[Today]',
	nextDay: '[Tomorrow]',
	lastDay: '[Yesterday]',
	nextWeek: 'MMM D',
	lastWeek: 'MMM D',
	sameElse: 'MMM D',
};

export function dateTime(value, format) {
	switch (format) {
		case dateTypes.dayMonthDate:
			return moment.unix(value).format('dddd, MMMM Do');
			break;
		case dateTypes.calendarDay:
			return moment
				.unix(value)
				.calendar(null, calendarFormat)
			break;
		case dateTypes.time:
			return moment
				.unix(value)
				.format('h:mma')
				.toUpperCase();
			break;
		case dateTypes.dayMonthYearTime:
			return moment.unix(value).format('dddd, MMMM Do h:mma');
			break;

		default:
			return moment
				.unix(value)
				.format('MMMM Do YYYY')
				.toUpperCase();
	}
}
