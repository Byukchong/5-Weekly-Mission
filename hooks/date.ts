import moment from 'moment';

// 날짜 형식을 변경하는 함수 new Date -> 2024.05.07
export const formatDate = (dateString: Date) => {
  const date = moment(dateString);
  return date.format('YYYY.MM.DD');
};

// 폴더 업로드 시간에 따른 표현식 구현 함수
export const generateTimeText = (createdAt: Date) => {
  const timeDiff = moment().diff(moment(createdAt), 'minutes');

  if (timeDiff < 2) {
    return '1 minute ago';
  }
  if (timeDiff <= 59) {
    return `${timeDiff} minutes ago`;
  }
  if (timeDiff < 60 * 24) {
    const hours = Math.floor(timeDiff / 60);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  if (timeDiff <= 60 * 24 * 30) {
    const days = Math.floor(timeDiff / (60 * 24));
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  if (timeDiff <= 60 * 24 * 30 * 31) {
    const months = Math.floor(timeDiff / (60 * 24 * 30));
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  const years = Math.floor(timeDiff / (60 * 24 * 30 * 12));
  return years === 1 ? '1 year ago' : `${years} years ago`;
};
