

var map;
function updateMap(sede) {
	const a = document.body.style.backgroundImage;
	switch (sede) {
		case 1:
			GetMap(
				4.579561842518199,
				-74.15756434620194,
				17,
				"Facultad Teconológica"
			);
			document.body.style.backgroundImage = "url('./view/img/tecnologica.png')";
			break;
		case 2:
			GetMap(
				4.628253905986502,
				-74.06543145964815,
				17,
				"Facultad de Ingenieria"
			);
			document.body.style.backgroundImage = "url('./view/img/sede40.png')";
			break;
		case 3:
			GetMap(
				4.613461006109428,
				-74.06469022278243,
				17,
				"Facultad de Ciencias y Educación"
			);
			document.body.style.backgroundImage = "url('./view/img/macarena.png')";
			break;
		case 4:
			GetMap(
				4.597221679621991,
				-74.06459963085757,
				17,
				"Facultad de Medio Ambiente y Recursos Naturales"
			);
			document.body.style.backgroundImage = "url('./view/img/vivero.png')";
			break;
		case 5:
			GetMap(4.638193858844783, -74.18616088852973, 17, "Sede Porvenir");
			document.body.style.backgroundImage = "url('./view/img/porvenir.png')";
			break;
		case 6:
			GetMap(4.605211532854522, -74.08014224434929, 17, "Facultad de Artes");
			document.body.style.backgroundImage = "url('./view/img/ASAB.png')";
			break;
		case 7:
			GetMap(
				4.579561842518199,
				-74.15756434620194,
				17,
				"Facultad Teconológica Colegios"
			);
			document.body.style.backgroundImage = "url('./view/img/tecnologica.png')";
			break;
		default:
			GetMap(4.7078228876322425, -74.0727965182916, 11, "Bogotá");
	}
}
function GetMap(cordenada1, cordenada2, acercamiento, titulo) {
	var loc = (map = new Microsoft.Maps.Map("#myMap", {
		credentials:
			"AtzDh5axnUWYRw6zOgK5nqnd7S2C_f8Yij3gDZiRtTtmvleWFq01t5OX7YogblQi",
		center: new Microsoft.Maps.Location(4.60971, -74.08175),
		zoom: acercamiento,
	}));
	
}
function puntos() {
	if (titulo == "Bogotá") {
		return;
	}
	var pushpin = new Microsoft.Maps.Pushpin(loc, {
		title: titulo,
		subTitle: "Bogotá",
		color: "red",
	});
	map.entities.push(pushpin);
};
function maps() {
	proj4.defs(
		"EPSG:3857",
		"+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs"
	);
	proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
	//Carga el modulo para crear un poligono de 5 km de radio alrededor del centro del mapa
	Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", async function () {
		const listaColegios = document.querySelector("#lista_colegios");
		listaColegios.setAttribute("hidden", false);
		var path = Microsoft.Maps.SpatialMath.getRegularPolygon(
			new Microsoft.Maps.Location(4.579474508287231, -74.15752865417089), //centro
			5, //radio en metros
			100, //numero de lados del poligono
			Microsoft.Maps.SpatialMath.DistanceUnits.Kilometers
		);
		var poly = new Microsoft.Maps.Polygon(path, {
			fillColor: new Microsoft.Maps.Color(100, 0, 102, 204),
			strokeColor: new Microsoft.Maps.Color(200, 0, 51, 153),
			strokeThickness: 2,
		});
		//agrega el poligono al mapa
		map.entities.push(poly);
		try {
			// Obtener los datos de los colegios del la siguiente pagina
			// Obtener los datos de los colegios del la siguiente pagina
			const response = await fetch(
				"https://datosabiertos.bogota.gov.co/dataset/d451b52f-e30c-43b3-9066-3a7816638fea/resource/4a6462ef-fa2e-4acf-96db-8521c65371e8/download/colegios_2022_09.geojson"
			);
			const data = await response.json();
			const coordinates = [];
			data.features.forEach(
				(element) =>
					(element.geometry.coordinates = proj4(
						"EPSG:3857",
						"EPSG:4326",
						element.geometry.coordinates
					))
			);
			data.features.forEach((element) => {
				const location = new Microsoft.Maps.Location(
					element.geometry.coordinates[1],
					element.geometry.coordinates[0]
				);
				if (Microsoft.Maps.SpatialMath.Geometry.intersects(location, poly)) {
					const pin = new Microsoft.Maps.Pushpin(location);
					map.entities.push(pin);
					document.querySelector;
				}
			});
		} catch (err) {
			console.log(err);
		}
		map.setView({
			zoom: 13,
			center: new Microsoft.Maps.Location(
				4.579474508287231,
				-74.15752865417089
			),
			animate: true,
		});
	});
	//agrega un pushpin(punto) en la tecno
	var pin = new Microsoft.Maps.Pushpin(
		new Microsoft.Maps.Location(4.579474508287231, -74.15752865417089)
	);
	map.entities.push(pin);
	map.setView({
		zoom: 13,
		center: new Microsoft.Maps.Location(4.579474508287231, -74.15752865417089),
		animate: true,
	});
}
/*					
*/
