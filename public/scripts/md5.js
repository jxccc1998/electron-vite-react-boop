/**
 {
    "name":"MD5 Checksum",
    "description":"十六进制计算文本的校验和",
    "tag":"Md5"
 }
 **/

const main = (state) => {
  const MD5 = new Hashes.MD5();
  return MD5.hex(state);
};
