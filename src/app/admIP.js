//importa modulo OS para obtener informacion de red
import os from "os";
export function ethernetIP() {
	const interfaces = os.networkInterfaces();
	const ethInterfaces = interfaces.eth0 || interfaces.Ethernet; //Dependiendo de que sistema operativo se este usando

	if (ethInterfaces) {
		const activeInterface = ethInterfaces.find(
			//find buscara en la array ifaces, la interfaz que cumpla con las condiciones
			(iface) =>
				iface.family === "IPv4" &&
				!iface.internal &&
				iface.mac !== "00:00:00:00:00:00"
		);
		if (activeInterface) {
			return activeInterface.address;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
export function ethernet2IP() {
	const interfaces = os.networkInterfaces();
	const ethInterfaces2 = interfaces.wlan0 || interfaces["Ethernet 2"]; //Dependiendo de que sistema operativo se este usando
	if (ethInterfaces2) {
		const activeInterface2 = ethInterfaces2.find(
			//find buscara en la array ifaces, la interfaz que cumpla con las condiciones
			(iface) =>
				iface.family === "IPv4" &&
				!iface.internal &&
				iface.mac !== "00:00:00:00:00:00"
		);
		if (activeInterface2) {
			return activeInterface2.address;
		} else {
			return false;
		}
	}
}
