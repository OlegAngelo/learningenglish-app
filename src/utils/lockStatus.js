import moment from 'moment';
import { DURATION_LOCK } from '../config/lockInPeriod.json'

export const lockStatus = (date) => {
    const minute = moment().diff(moment(date), 'minutes');

    if(!date && !minute) {
        return {
            isLock: false,
            minutesAgo: 'N/A',
            minutesLeft: 'N/A',
        }
    }

    return {
        isLock: minute < DURATION_LOCK,
        minutesAgo: minute,
        minutesLeft: minute > DURATION_LOCK ? 0 : (DURATION_LOCK - minute),
    };
};
