import moment from 'moment';

export const formatDate = (isoDateString) => {
    const vietnamTime = moment.utc(isoDateString).utcOffset(7);

    const dayOfWeek = vietnamTime.format('dddd');
    const time = vietnamTime.format('HH:mm');
    const dayOfMonth = vietnamTime.format('DD/MM/YYYY');

    return `${dayOfWeek}, ${time} ${dayOfMonth}`;
}
