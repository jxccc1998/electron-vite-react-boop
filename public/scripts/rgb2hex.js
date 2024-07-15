/**
 {
 "id":"4",
 "tag":"TransColor",
 "name":"Rgb to hex",
 "description":"转换颜色",
 }
 **/

export const main = (state) => {
    const rgb = state;
    const rgbArray = rgb.includes(",") ? rgb.split(",") : rgb.split(" ");

    if (rgbArray.length !== 3) return { type: 'ERROR', content: "无效的颜色格式"}

    let hex = "#";

    try {
        rgbArray.forEach(c => {
            hex += parseInt(c).toString(16);
        });
    }
    catch (error) {
        return { type: 'ERROR', content: error.message}
    }
    return hex.toUpperCase();
}