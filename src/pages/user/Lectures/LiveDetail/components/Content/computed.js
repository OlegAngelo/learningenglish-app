import { formatDateByElapse, formatToTime } from '../../../../../../utils/date';
import lectureTypes from '../../../../../../config/lectureTypes.json';

export const displayDateTime = ({ details, type }) => {
  const { ON_LIVE } = lectureTypes;
  let text = formatDateByElapse(details?.start_at);

  if (type === ON_LIVE)
    text = `${formatToTime(details?.start_at)}配信開始 ${formatToTime(
      details?.end_at
    )}終了予定`;
  return text;
};
