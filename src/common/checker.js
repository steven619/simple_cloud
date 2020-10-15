module.exports = {
	error:'',
	isJSON : (str)=>{
		if (typeof str == 'string') {
			try {
				var obj=JSON.parse(str);
				if(typeof obj == 'object' && obj ){
					return true;
				}else{
					return false;
				}
			} catch(e) {
				console.log('error：'+str+'!!!'+e);
				return false;
			}
		}
	},
	isNumber : (checkVal)=>{
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
		return reg.test(checkVal);
	}
}
