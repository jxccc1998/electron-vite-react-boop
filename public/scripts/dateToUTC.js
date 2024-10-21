/**
 {
    "tag":"TransTime",
    "name":"Date to utc",
    "description":"时间转换",
 }
 **/
function main (){
  let string = state;

  let parsedDate = Date.parse(string);

  if (isNaN(parsedDate)) {
    parsedDate = new Date(parseInt(string * 1000));
  } else {
    parsedDate = new Date(parsedDate);
  }

  let out = parsedDate.toUTCString();

  if (out === "Invalid Date") {
    return { type: "ERROR", content: "无效的日期格式" };
  }

  return out;
}
