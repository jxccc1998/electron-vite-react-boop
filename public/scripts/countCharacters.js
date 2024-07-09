/**
 {
		"name":"Count Characters",
		"description":"Count the number of characters.",
	}
 **/

const lodash = myRequire('lodash.min.js');
new Function(lodash)();

export const main = (state) => {
    return {
        type: 'SUCCESS',
        content: `共计 ${_.size(state)} 个字符`,
    }
}