/**
 {
  "tag":"CountText",
  "name":"Timestamp To Datetime",
  "description":"格式化时间戳",
 }
 **/

const main = (timestamp) => {
  return dayjs(parseInt(timestamp)).format("YYYY-MM-DD HH:mm:ss");
};
