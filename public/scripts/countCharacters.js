/**
 {
    "id":"1",
    "tag":"CountText",
    "name":"Count Characters",
    "description":"统计文本中的字符数",
 }
 **/

const lodash = myRequire("lodash.min.js");
new Function(lodash)();

const main = (state) => {
  return {
    type: "SUCCESS",
    content: `共计 ${_.size(state)} 个字符`,
  };
};
