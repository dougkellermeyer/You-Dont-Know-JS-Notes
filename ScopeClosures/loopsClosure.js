for (var i=1; i<=5; i++) {
	(function(){
		setTimeout( function timer(){
			console.log( i ); // 6 6 6 6 6 
		}, i*3000);
	})();
}

//IIFE version, giving each timeout function callback its own per-iteration scope

for (var ii=1; ii<=5; ii++) {
	(function(){
		var j = ii;
		setTimeout( function timer(){
			console.log( j ); //1 2 3 4 5 
		}, j*500 );
	})();
}