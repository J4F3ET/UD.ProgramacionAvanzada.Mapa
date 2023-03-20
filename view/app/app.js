function updateMap(sede) {
	const a = document.body.style.backgroundImage;
	switch (sede) {
		case 1:
			GetMap(4.579561842518199, -74.15756434620194, 17);
			document.body.style.backgroundImage =
				"url('./view/img/tecnologica.jpg')";
			break;
		case 2:
			GetMap(4.628253905986502, -74.06543145964815, 17);
			document.body.style.backgroundImage = "url('./view/img/sede40.jpg')";
			break;
		case 3:
			GetMap(4.613461006109428, -74.06469022278243, 17);
			document.body.style.backgroundImage =
				"url('./view/img/macarena.jfif')";
			break;
		case 4:
			GetMap(4.597221679621991, -74.06459963085757, 17);
			document.body.style.backgroundImage =
				"url('./view/img/vivero.jpg')";
			break;
		case 5:
			GetMap(4.638193858844783, -74.18616088852973, 17);
			document.body.style.backgroundImage =
				"url('./view/img/porvenir.jpg')";
			break;
		case 6:
			GetMap(4.605211532854522, -74.08014224434929, 17);
			document.body.style.backgroundImage =
				"url('./view/img/ASAB.jfif')";
			break;
		default:
			GetMap(4.579561842518199, -74.15756434620194, 11);	
	}
}; 
function GetMap(cordenada1, cordenada2,acercamiento) {
	var map = new Microsoft.Maps.Map("#myMap", {
		center: new Microsoft.Maps.Location(cordenada1, cordenada2),
		zoom: acercamiento,
	});
}
/*
(4.579561842518199, -74.15756434620194,17);" Tecnologica
(4.628253905986502, -74.06543145964815,17);" La 40
(4.613461006109428, -74.06469022278243,17);" Macarena
(4.597221679621991, -74.06459963085757,17);" Vivero
(4.638193858844783, -74.18616088852973,17);" Porvenir
(4.605211532854522, -74.08014224434929,17);" Asab
*/