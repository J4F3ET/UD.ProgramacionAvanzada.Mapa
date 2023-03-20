function GetMap(cordenada1, cordenada2,acercamiento) {
	var map = new Microsoft.Maps.Map("#myMap", {
		center: new Microsoft.Maps.Location(cordenada1, cordenada2),
		zoom: acercamiento,
	});
}
