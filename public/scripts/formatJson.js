/**
{
   "tag":"JsonFormat",
   "name":"Format JSON",
   "description":"转换文本的json内容",
}
 **/

function main () {
  try {
    return JSON.stringify(JSON.parse(state), null, 2);
  } catch {
    return { type: "ERROR", content: "JSON不合法" };
  }
}
