var map;
var data;
proj4.defs("EPSG:3857","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs");
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
async function GetMap() {
	try {
		response = await fetch(
			'./app/colegios.geojson'			
		);
		data = await response.json();
		data.features.forEach((element) => {
			element.geometry.coordinates = proj4(
				"EPSG:3857",
				"EPSG:4326",
				element.geometry.coordinates
			);
		});
	} catch (err) {
		console.log(err);
	}
	map = new Microsoft.Maps.Map("#myMap", {
		credentials:
			"AtzDh5axnUWYRw6zOgK5nqnd7S2C_f8Yij3gDZiRtTtmvleWFq01t5OX7YogblQi",
		center: new Microsoft.Maps.Location(4.60971, -74.08175),
		mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,
		zoom: 12,
	});
}
const select_sede = document.querySelectorAll(".sede");
select_sede.forEach((element) => {
	element.addEventListener("click", () => {updateMap(element.dataset.inputSede);});
});
document.querySelector(".colegios").addEventListener("click", () => {
	var sede;
	icono();
	select_sede.forEach(element =>
		element.checked? sede = element.dataset.inputSede:null
	);
	if(sede == undefined){return}
	updateMap(sede);
});
function updateMap(eleccion) {
	map.entities.clear();
	switch (eleccion) {
		case ('1'):
			document.querySelector(".colegios").checked?
				colegios(4.579561842518199, -74.15756434620194):
				goSede(4.579561842518199,-74.15756434620194,"Facultad Teconológica");
			document.body.style.backgroundImage = "url('./img/tecnologica.png')";
			break;
		case ('2'):
			document.querySelector(".colegios").checked?
				colegios(4.628253905986502, -74.06543145964815)
				: goSede(
						4.628253905986502,
						-74.06543145964815,
						"Facultad de Ingenieria"
				  );
			document.body.style.backgroundImage = "url('./img/sede40.png')";
			break;
		case ('3'):
			document.querySelector(".colegios").checked? 
				colegios(4.613461006109428, -74.06469022278243)
				: goSede(
						4.613461006109428,
						-74.06469022278243,
						"Facultad de Ciencias y Educación"
				  );
			document.body.style.backgroundImage = "url('./img/macarena.png')";
			break;
		case ('4'):
			document.querySelector(".colegios").checked? 
				colegios(4.597221679621991, -74.06459963085757)
				:goSede(
						4.597221679621991,
						-74.06459963085757,
						"Facultad de Medio Ambiente y Recursos Naturales"
				  );
			document.body.style.backgroundImage = "url('./img/vivero.png')";
			break;
		case ('5'):
			document.querySelector(".colegios").checked
				? colegios(4.638193858844783, -74.18616088852973)
				: goSede(4.638193858844783, -74.18616088852973, "Sede Porvenir");
			document.body.style.backgroundImage = "url('./img/porvenir.png')";
			break;
		case ('6'):
			document.querySelector(".colegios").checked
				? colegios(4.605211532854522, -74.08014224434929)
				: goSede(4.605211532854522, -74.08014224434929, "Facultad de Artes");
			document.body.style.backgroundImage = "url('./img/ASAB.png')";
			break;
		default:
			goSede(4.7078228876322425, -74.0727965182916,"Bogotá");
	}
}
function goSede(lat, lon, titulo) {
	var center = new Microsoft.Maps.Location(lat, lon);
	map.setView({
		center,
		zoom: 14,
		animate: true,
	});
	if (titulo == "Bogotá") {return;}
	var pushpin = new Microsoft.Maps.Pushpin(center, {
		title: titulo,
		subTitle: "Bogotá",
	});
	map.entities.push(pushpin);
}
function colegios(lat, lon) {
	Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath",async () => {
		const poly = await createPolygon(lat, lon);
		data.features.forEach((element) => {
			var loc = new Microsoft.Maps.Location(element.geometry.coordinates[1],element.geometry.coordinates[0]);
			Microsoft.Maps.SpatialMath.Geometry.intersects(loc,poly)?createPunshipInfobox(loc,element.properties.NOMBRE_EST,element.properties.DIRECCION):null;
		});
	});
	var pin = new Microsoft.Maps.Pushpin(
		new Microsoft.Maps.Location(lat,lon)
	);
	map.entities.push(pin);
	map.setView({zoom: 13,center: new Microsoft.Maps.Location(lat,lon),animate: true});
}
function icono(){
	const icon = document.getElementById("ojos_icon");
	if (document.querySelector(".colegios").checked) {
		icon.classList.remove("bi-eye-slash");
		icon.classList.add("bi-eye");
	} else {
		icon.classList.remove("bi-eye");
		icon.classList.add("bi-eye-slash");
	}
}
function createPolygon(lat, lon) {
	var promise; 
	promise = new Promise((resolve)=>{
		Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", () => {
			var path = Microsoft.Maps.SpatialMath.getRegularPolygon(
				new Microsoft.Maps.Location(lat, lon), //centro
				5, //radio en kilometros
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
			resolve(poly);
		});
	});
	return promise;
}
function createPunshipInfobox(loc, title, description) {
	var pin = new Microsoft.Maps.Pushpin(loc,{color: "red",});
	var infobox = new Microsoft.Maps.Infobox(loc,{title,description,visible: false});
	infobox.setMap(map);
	Microsoft.Maps.Events.addHandler(pin, "click", function () {
		infobox.setOptions({visible: true});
	});
	map.entities.push(pin);
}