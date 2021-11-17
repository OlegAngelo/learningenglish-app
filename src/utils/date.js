import { DateTime } from 'luxon';
import moment from 'moment';

export const formattedDateBy = (format, date) => {
  const d = format === 'ISO' ? DateTime.fromISO(date).setZone('Asia/Tokyo') : DateTime.fromSQL(date).setZone('Asia/Tokyo');
  return d.toFormat('y/M/d HH:mm');
}

export const formattedDate = (date) => {
  const d = DateTime.fromISO(date).setZone('Asia/Tokyo');
  return d.toFormat('y/M/d');
}

export const formattedTime = (date) => {
  const d = DateTime.fromISO(date).setZone('Asia/Tokyo');
  return d.toFormat('HH:mm');
};

export const formatToDateTime = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');
export const formatToDate = (date) => moment(date).format('YYYY-MM-DD');
export const formatToTime = (date) => moment(date).format('HH:mm');

export const formatDateByElapse = (date) => {
  const formattedDate = formatToDateTime(date);
  const elapseDate = DateTime.fromFormat(formattedDate, 'yyyy-LL-dd HH:mm:ss').toFormat(
    'yyyy/LL/dd  HH:mm'
  );
  return `${elapseDate} 〜　配信予定`;
};
