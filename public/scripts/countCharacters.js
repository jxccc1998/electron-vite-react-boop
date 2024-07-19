/**
 {
    "tag":"CountText",
    "name":"Count Characters",
    "description":"统计文本中的字符数",
 }
 **/

const main = (state) => {
  return {
    type: "SUCCESS",
    content: `共计 ${_.size(state)} 个字符`,
  };
};
