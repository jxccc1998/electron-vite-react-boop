/**
 {
    "tag":"CountText",
    "name":"Count Characters",
    "description":"统计文本中的字符数",
 }
 **/

function main() {
  return {
    type: "SUCCESS",
    content: `共计 ${_.size(state)} 个字符`,
  }
}
