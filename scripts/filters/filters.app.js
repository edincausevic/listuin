

app.filter('addTagIcon', ['$sce', function($sce){

 	return function(text) {
		
 		var tagsArray = text.split(',');
 		var tagsWithIcon = [];

 		for(var i = 0; i < tagsArray.length; i++) {
 		  tagsWithIcon.push(' <i class="fa fa-tag"></i> '+tagsArray[i]);
 		}

 		var tagsString = tagsWithIcon.join(); 
 		var tags = tagsString.replace(/,/g, ' ');
 		return $sce.trustAsHtml(tags);
 	}
 }]);

