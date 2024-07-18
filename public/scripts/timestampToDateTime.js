/**
 {
 "id":"5",
 "tag":"CountText",
 "name":"Count Characters",
 "description":"统计文本中的字符数",
 }
 **/

const dayjs = myRequire("dayjs.min.js");
const dayjsFunc = new Function(dayjs + " return dayjs;")();
const main = (timestamp) => {
  return dayjsFunc(parseInt(timestamp)).format("YYYY-MM-DD HH:mm:ss");
};
