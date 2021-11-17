import { formattedDate, formattedTime } from '../../../../../../../utils/date';

/**
 * 
 * @param {Number} rate 
 * @param {Number} total 
 * @returns string
 * 
 * Only return the formatted rate
 */
export const rate = (rate, total) => total ? `${rate}%` : '-';

/**
 * 
 * @param {Date} date 
 * @returns string
 * 
 * Only return the formatted date
 */
export const date = (date) => date ? formattedDate(date) : '';

/**
 * 
 * @param {Date} date 
 * @returns string
 * 
 * Only return the formatted time
 */
export const time = (date) => date ? formattedTime(date) : '';
