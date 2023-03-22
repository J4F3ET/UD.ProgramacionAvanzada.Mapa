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
		case 7:
			GetMap(4.579561842518199, -74.15756434620194, 17,'Facultad Teconológica Colegios');
			document.body.style.backgroundImage =
				"url('./view/img/tecnologica.png')";
			break;
		default:
			GetMap(4.7078228876322425, -74.0727965182916, 11, "Bogotá");	
	}
}; 
function GetMap(cordenada1, cordenada2, acercamiento, titulo) {
	var loc = new Microsoft.Maps.Location(4.579474508287231, -74.15752865417089);
	var map = new Microsoft.Maps.Map("#myMap", {
		credentials:
			"AtzDh5axnUWYRw6zOgK5nqnd7S2C_f8Yij3gDZiRtTtmvleWFq01t5OX7YogblQi",
		center: loc,
		zoom: acercamiento,
	});
	if (titulo == "Bogotá") {return;}
	var pushpin = new Microsoft.Maps.Pushpin(loc, {
		title: titulo,
		subTitle: "Bogotá",
		color: "red",
	});
	map.entities.push(pushpin);
}

function maps() {
	var map;
	map = new Microsoft.Maps.Map("#myMap", {
		credentials:
			"AtzDh5axnUWYRw6zOgK5nqnd7S2C_f8Yij3gDZiRtTtmvleWFq01t5OX7YogblQi",
		center: new Microsoft.Maps.Location(4.579474508287231, -74.15752865417089),
		zoom: 12,
	});

	//Load the spatial math module
	Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", function () {
		//Create a circle with a given radius around the center location
		var center = map.getCenter();
		var radius = 5000; // en metros
		var vertices = 100; // número de lados del polígono
		var path = Microsoft.Maps.SpatialMath.getRegularPolygon(
			center,
			radius,
			vertices,
			Microsoft.Maps.SpatialMath.Meters
		);
		var poly = new Microsoft.Maps.Polygon(path, {
			fillColor: new Microsoft.Maps.Color(100, 0, 102, 204),
			strokeColor: new Microsoft.Maps.Color(200, 0, 51, 153),
			strokeThickness: 2,
		});

		map.entities.push(poly);

		//Add a pushpin at the center location.
		var pin = new Microsoft.Maps.Pushpin(center);
		map.entities.push(pin);
	});
}



