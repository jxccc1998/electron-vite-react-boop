/**
 {
 "id":313,
 "name":"Hex to RGB",
 "description":"Convert color in hexadecimal to RGB.",
 "tag":"ColorTrans"
 }
 **/

const main = (state) => {
  const R = hexToR(state);
  const G = hexToG(state);
  const B = hexToB(state);

  return R.toString()
    .concat(",")
    .concat(G.toString())
    .concat(",")
    .concat(B.toString());
};

function hexToR(h) {
  return parseInt(cutHex(h).substring(0, 2), 16);
}
function hexToG(h) {
  return parseInt(cutHex(h).substring(2, 4), 16);
}
function hexToB(h) {
  return parseInt(cutHex(h).substring(4, 6), 16);
}
function cutHex(h) {
  return h.charAt(0) == "#" ? h.substring(1, 7) : h;
}
