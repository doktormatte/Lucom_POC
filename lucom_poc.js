function soap() {

	let respArray = new Array();
	let resp;

	let DOMParser = require("C:\\Users\\mm7731\\Downloads\\xmldom-master\\dom-parser.js").DOMParser;
	let parser = new DOMParser();

	let XMLHttpRequest = require("C:\\Users\\mm7731\\Downloads\\node-XMLHttpRequest-master\\lib\\XMLHttpRequest.js").XMLHttpRequest;
	let xmlhttp = new XMLHttpRequest();
	xmlhttp
			.open(
					'POST',
					'http://sapc54ms.sapms.fresenius.de:8027/sap/bc/srt/xip/sap/zzfnc_get_data_lucom/001/lucom_service/lucom_service_binding',
					false, 'mm7731', 'letmein');
	let sr = '<?xml version="1.0"?>'
			+ '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'
			+ '<SOAP-ENV:Body>'
			+ '<n1:get_client_dev xmlns="" xmlns:n1="http://fresenius-netcare.com/FNC/lucom/">'
			+ '<ID>0077</ID>' + '</n1:get_client_dev>' + '</SOAP-ENV:Body>'
			+ '</SOAP-ENV:Envelope>';

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				resp = xmlhttp.responseXML;

				let xmldoc = parser.parseFromString(xmlhttp.responseText,
						"application/xml");
				let nodeList = xmldoc.getElementsByTagName('devices');
				for (var i = 0; i < nodeList.length; i++) {
					let children = nodeList[i].childNodes;
					for (var j = 0; j < children.length; j++) {
						console.log(children[j].nodeName);
						console.log(children[j].textContent);
						console.log("\n");
					}
				}
				console.log(xmlhttp.responseText);
			} else {
				console.log("Error", xmlhttp.statusText);
			}
		}
	}
	xmlhttp.setRequestHeader('Content-Type', 'text/xml');
	xmlhttp
			.setRequestHeader('SOAPAction',
					'urn:sap--com:sprx:ep:cust:zfnc:zfnc_get_data_lucom:get_client_devRequest');
	xmlhttp.setRequestHeader('User-Agent', 'Axis/1.4');
	xmlhttp.send(sr);

}
soap();
