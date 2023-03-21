function updateMap(sede) {
	const a = document.body.style.backgroundImage;
	switch (sede) {
		case 1:
			GetMap(4.579561842518199, -74.15756434620194, 17,'Facultad Teconológica');
			document.body.style.backgroundImage =
				"url('./view/img/tecnologica.png')";
			break;
		case 2:
			GetMap(4.628253905986502, -74.06543145964815, 17,'Facultad de Ingenieria');
			document.body.style.backgroundImage = "url('./view/img/sede40.png')";
			break;
		case 3:
			GetMap(
				4.613461006109428,
				-74.06469022278243,
				17,
				"Facultad de Ciencias y Educación"
			);
			document.body.style.backgroundImage =
				"url('./view/img/macarena.png')";
			break;
		case 4:
			GetMap(
				4.597221679621991,
				-74.06459963085757,
				17,
				"Facultad de Medio Ambiente y Recursos Naturales"
			);
			document.body.style.backgroundImage =
				"url('./view/img/vivero.png')";
			break;
		case 5:
			GetMap(4.638193858844783, -74.18616088852973, 17,'Sede Porvenir');
			document.body.style.backgroundImage =
				"url('./view/img/porvenir.png')";
			break;
		case 6:
			GetMap(4.605211532854522, -74.08014224434929, 17,'Facultad de Artes');
			document.body.style.backgroundImage =
				"url('./view/img/ASAB.png')";
			break;
		default:
			GetMap(4.7078228876322425, -74.0727965182916, 11, "Bogotá");	
	}
}; 
function GetMap(cordenada1, cordenada2,acercamiento, titulo) {
	var map = new Microsoft.Maps.Map("#myMap", {
		center: new Microsoft.Maps.Location(cordenada1, cordenada2),
		zoom: acercamiento,
	});
	if(titulo == 'Bogotá'){return}
	var pushpin = new Microsoft.Maps.Pushpin(
		new Microsoft.Maps.Location(cordenada1, cordenada2),
		{
			title: titulo,
			subTitle: "Bogotá",
			color: "red",
		}
	);

	map.entities.push(pushpin);
}