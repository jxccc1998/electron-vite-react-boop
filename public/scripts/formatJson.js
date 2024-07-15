/**
{
   "id":"3",
   "tag":"JsonFormat",
   "name":"Format JSON",
   "description":"转换文本的json内容",
}
 **/

const main = (state) => {
    return JSON.stringify(JSON.parse(state), null, 2)
}