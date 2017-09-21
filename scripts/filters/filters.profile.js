profile.filter('longTitle', function(){

	return function(text, length) {
		if (text.length > length) {
			return text.slice(0, length)+'...';
		}else {
			return text;
		}
	}
});

// FIRST LETTER BIG REST SMALL
profile.filter('formatText', function(){

	return function(text) {
		return text.slice(0,1).toUpperCase() + text.slice(1).toLowerCase();
	}
});