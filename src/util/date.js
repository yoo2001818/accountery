// Usually this would be done using moment.js - but let's be simple for now

function pad(input, letters) {
  return ('00000000' + input).slice(-letters);
}

export function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dateStr = [
    pad(date.getFullYear(), 4),
    pad(date.getMonth() + 1, 2),
    pad(date.getDate(), 2),
  ].join('-');
  let weekStr = '일월화수목금토'[date.getDay()];
  return dateStr + ' (' + weekStr + ')';
}
