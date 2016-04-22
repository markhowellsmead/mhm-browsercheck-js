javascriptVersion1_1 = true;

// initialize global variables

var detectableWithVB = false;
var pluginFound = false;

function canDetectPlugins() {
	if( detectableWithVB || (navigator.plugins && navigator.plugins.length > 0) ) {
		return true;
	} else {
		return false;
	}
}

var winW = -1, winH = -1;

jQuery(window).resize(function(){
	jQuery('#windowWidth').html(jQuery(window).innerWidth()+' px');
	jQuery('#windowHeight').html(jQuery(window).innerHeight()+' px');
});

function getWindowSize(){
	if (document.body && document.body.offsetWidth){
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
    	document.documentElement &&
		document.documentElement.offsetWidth ) {
			winW = document.documentElement.offsetWidth;
			winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		winW = window.innerWidth;
		winH = window.innerHeight;
	}
}


function getWindowsOS(){
	// http://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx#PltToken
	if(navigator.appVersion.indexOf("Windows NT 10.")!=-1){
		return 'Windows 10';
	}else if(navigator.appVersion.indexOf("Windows NT 6.3")!=-1){
		return "Windows 8.1";
	}else if(navigator.appVersion.indexOf("Windows NT 6.2")!=-1){
		return "Windows 8";
	}else if(navigator.appVersion.indexOf("Windows NT 6.1")!=-1){
		return "Windows 7";
	}else if(navigator.appVersion.indexOf("Windows NT 6.0")!=-1){
		return "Windows Vista";
	}else if(navigator.appVersion.indexOf("Windows NT 5.2")!=-1){
		return "Windows Server 2003; Windows XP x64 Edition";
	}else if(navigator.appVersion.indexOf("Windows NT 5.1")!=-1){
		return "Windows XP";
	}else if(navigator.appVersion.indexOf("Windows NT 5.01")!=-1){
		return "Windows 2000, Service Pack 1 (SP1)";
	}else if(navigator.appVersion.indexOf("Windows NT 5.0")!=-1){
		return "Windows 2000";
	}else if(navigator.appVersion.indexOf("Windows NT 4.0")!=-1){
		return "Windows NT 4.0";
	}else if(navigator.appVersion.indexOf("Windows 98; Win 9x 4.90")!=-1){
		return "Windows Millennium Edition (Windows Me)";
	}else if(navigator.appVersion.indexOf("Windows 98")!=-1){
		return "Windows 98";
	}else if(navigator.appVersion.indexOf("Windows 95")!=-1){
		return "Windows 95";
	}else if(navigator.appVersion.indexOf("Windows CE")!=-1){
		return "Windows CE";
	}else{
		return "Windows OS, Version nicht bekannt";
	}
}


function detailedBrowserInfo(){
	var hoehe, breite, farbe, os, name, browser, sprache, cookiesok, javaok, returnString='';
	hoehe   = screen.height;
	breite  = screen.width;
	farbe   = screen.colorDepth;
	os	  	= navigator.platform;
	browser = navigator.appName;
	httpid  = navigator.userAgent;
	sprache = window.navigator.userLanguage || window.navigator.language;

	if(navigator.appVersion.indexOf("Windows ")!=-1){
		os = getWindowsOS();
	}else{
		os = navigator.platform;
	}

	getWindowSize();

	if(navigator.cookieEnabled == true)
	  cookiesok = 'allowed';
	else if(navigator.cookieEnabled == false)
	  cookiesok = "blocked";
	else
	  cookiesok = "Anfrage nicht unterstützt";

	if(navigator.javaEnabled && navigator.javaEnabled() == true)
	  javaok = "active";
	else if(!navigator.javaEnabled || (navigator.javaEnabled() == false))
	  javaok ="inactive";
	else
	  javaok = "Java is not supported";

	returnString += "<table class='mhm_browserinfo' border='0' width='100%'>";
	returnString += "<tr><th id='header1' class='thheader'>Information<\/th><th id='header2' class='thheader'>Answer<\/th><\/tr>";
	//returnString += "<tr><td class='header1' class='tblblankname'>Browser name<\/td><td class='header2' class='tblblankname'>" + browser + "<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblinename'>HTTP identification<\/td><td headers='header2' class='tblinename'>" + httpid + "<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblblankname'>Cookies<\/td><td headers='header2' class='tblblankname'>" + cookiesok + "<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblinename'>Javascript<\/td><td headers='header2' class='tblinename'>active<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblblankname'>Java<\/td><td headers='header2' class='tblblankname'>" + javaok + "<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblinename'>Operating system<\/td><td headers='header2' class='tblinename'>" + os + "<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblblankname'>Language<\/td><td headers='header2' class='tblblankname'>" + sprache + "<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblinename'>Screen width<\/td><td headers='header2' class='tblinename'>" + breite + " px<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblblankname'>Screen height<\/td><td headers='header2' class='tblblankname'>" + hoehe + " px<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblinename'>Browser window width<\/td><td id='windowWidth' headers='header2' class='tblinename'>" + winW + " px<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblblankname'>Browser window height<\/td><td id='windowHeight' headers='header2' class='tblblankname'>" + winH + " px<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblinename'>Colour depth<\/td><td headers='header2' class='tblinename'>" + farbe + " Bit<\/td><\/tr>";
	returnString += "<tr><td class='header1' class='tblinename'>WebGL support<\/td><td headers='header2' class='tblinename'>" + (hasWebGL()?'Yes':'No') + "<\/td><\/tr>";
	returnString += "<\/table>";
	
	return returnString;
}


/*function pluginabfrage()
{
   document.writeln("<table border='0' width='100%' summary='Browser Plug scan'>");
     document.writeln("<tr><th id='header1' class='thheader'>Plugin<\/th><th id='header2' class='thheader'>Beschreibung<\/th><\/tr>");
     for(var i=0; i<navigator.plugins.length; i++)
     {
       document.writeln("<tr>");
       if(i == 0) {
         document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 1) {
         document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 2) {
         document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 3) {
         document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 4) {
         document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 5) {
         document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 6) {
         document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 7) {
         document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 8) {
         document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 9) {
         document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 10) {
         document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 11) {
         document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 12) {
         document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 13) {
         document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 14) {
         document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 15) {
         document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 16) {
         document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 17) {
         document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 18) {
         document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
       if(i == 19) {
         document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
	         if(navigator.plugins[i].name == "nppdf.so")
           document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
	         else
           document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
           document.writeln("<\/tr>");
       }
     }
	if(i == 0)
	{
	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>MediaPlayer<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('MediaPlayer.MediaPlayer.1'))
	      document.writeln("Microsoft MediaPlayer Plugin existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
   document.writeln("<td class='header1' class='tblinename'>Silverlight<\/td>");
	   document.writeln("<td headers='header2' class='tblinename'>");
	   if(detectActiveXControl('AgControl.AgControl'))
	      document.writeln("Microsoft Silverlight existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>WUWebControl class<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('SoftwareDistribution.WebControl.1'))
	      document.writeln("Windows Update Web Control existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>MUWebControl class<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('SoftwareDistribution.MicrosoftUpdateWebControl'))
	      document.writeln("Microsoft Update Web Control existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
   document.writeln("<td class='header1' class='tblinename'>XML DOM Document<\/td>");
	   document.writeln("<td headers='header2' class='tblinename'>");
	   if(detectActiveXControl('Microsoft.FreeThreadedXMLDOM.1.0'))
	      document.writeln("Microsoft Free Threaded XML DOM Document existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
   document.writeln("<td class='header1' class='tblblankname'>XML HTTP<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('Microsoft.XMLHTTP.1.0'))
	      document.writeln("Microsoft XML HTTP existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
   document.writeln("<td class='header1' class='tblinename'>XML Schema Cache<\/td>");
	   document.writeln("<td headers='header2' class='tblinename'>");
	   if(detectActiveXControl('Msxml2.XMLSchemaCache.3.0'))
	      document.writeln("Microsoft XML Schema Cache existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
   document.writeln("<td class='header1' class='tblblankname'>XML Data Source Object<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('Microsoft.XMLDSO.1.0'))
	      document.writeln("Microsoft XML Data Source Object existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
   document.writeln("<td class='header1' class='tblinename'>XSL Template<\/td>");
	   document.writeln("<td headers='header2' class='tblinename'>");
	   if(detectActiveXControl('Msxml2.XSLTemplate.3.0'))
	      document.writeln("Microsoft XSL Template existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
   document.writeln("<td class='header1' class='tblblankname'>ieframe.dll<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('Shell.UIHelper.1'))
	      document.writeln("Microsoft Shell UI Helper existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
   document.writeln("<td class='header1' class='tblinename'>tdc.ocx control<\/td>");
	   document.writeln("<td headers='header2' class='tblinename'>");
	   if(detectActiveXControl('TDCCtl.TDCCtl.1'))
	      document.writeln("Microsoft Tabular Data Control ActiveX existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>RMGetLicense class<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('DRM.GetLicense.1'))
	      document.writeln("Microsoft DRM ActiveX Network Object existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");

	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblinename'>Adobe PDF Reader<\/td>");
	   document.writeln("<td headers='header2' class='tblinename'>");
	   if(detectActiveXControl('PDF.PdfCtrl.4'))
	      document.writeln("Adobe Systems Inc. Adobe PDF Reader existing");
	   else if(detectActiveXControl('PDF.PdfCtrl.5'))
	      document.writeln("Adobe Systems Inc. Adobe PDF Reader existing");
	   else if(detectActiveXControl('PDF.PdfCtrl.6'))
	      document.writeln("Adobe Systems Inc. Adobe PDF Reader existing");
	   else if(detectActiveXControl('AcroPDF.PDF.1'))
	      document.writeln("Adobe Systems Inc. Adobe PDF Reader existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>Adobe SVG-Viewer<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('Adobe.SVGCtl'))
	      document.writeln("Acrobat SVG-Viewer Plugin existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");

	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblinename'>QuickTime<\/td>");
	   document.writeln("<td headers='header2' class='tblinename'>");
	   if(detectActiveXControl('QuickTimeCheckObject.QuickTimeCheck.1'))
	      document.writeln("Apple Inc. QuickTime Plugin existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");
	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>iTunesDetector class<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('ITDetector.iTunesDetector'))
	      document.writeln("Apple Inc. ITDetector Module existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");

	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblinename'>Sun Java Konsole<\/td>");
	   document.writeln("<td headers='header2' class='tblinename'>");
	   if(detectActiveXControl('JavaPlugin'))
	      document.writeln("Sun Java Console existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");

	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>Shockwave Director<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('SWCtl.SWCtl'))
	      document.writeln("Shockwave Director Plugin existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");

   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblinename'>Shockwave Flash Object<\/td>");
	   document.writeln("<td headers='header2' class='tblinename'>");
	   if(detectActiveXControl('ShockwaveFlash.ShockwaveFlash.1'))
	      document.writeln("Shockwave Flash Plugin existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");

	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>Real Player<\/td>");
	   document.writeln("<td headers='header2' class='tblblankname'>");
	   if(detectActiveXControl('rmocx.RealPlayer G2 Control'))
	      document.writeln("Real Player Plugin existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");

	   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblinename'>MathPlayer<\/td>");
	   document.writeln("<td headers='header2' class='tblinename'>");
	   if(detectActiveXControl('MathPlayer.Behavior.1'))
	      document.writeln("MathPlayer Plugin existing");
	   else
	      document.writeln("- - -");
	   document.writeln("<\/td>");
	   document.writeln("<\/tr>");

	}
    document.writeln("<\/table>");
}
*/



var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
 browserName = "Opera";
 fullVersion = nAgt.substring(verOffset+6);
 if ((verOffset=nAgt.indexOf("Version"))!=-1)
   fullVersion = nAgt.substring(verOffset+8);
}
// In Edge, the true version is after "Edge"
else if ((verOffset=nAgt.indexOf("Edge"))!=-1) {
 browserName = "Microsoft Edge";
 fullVersion = nAgt.substring(verOffset+5);
}
// In Yandex, the true version is after "YaBrowser"
else if ((verOffset=nAgt.indexOf("YaBrowser"))!=-1) {
 browserName = "Yandex";
 fullVersion = nAgt.substring(verOffset+10);
}
// In Firefox, the true version is after "Firefox"
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
 browserName = "Mozilla Firefox";
 fullVersion = nAgt.substring(verOffset+8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
 browserName = "Microsoft Internet Explorer";
 fullVersion = nAgt.substring(verOffset+5);
}
else if ((verOffset=nAgt.indexOf("; rv:"))!=-1) {
 browserName = "Microsoft Internet Explorer";
 var pattern = new RegExp('; rv:([0-9\.]+)');
 fullVersion = nAgt.match(pattern, '$1');
 fullVersion = fullVersion[1];
}else if ((verOffset=nAgt.indexOf("Edge/"))!=-1){
 browserName = "Microsoft Internet Explorer";
 var pattern = new RegExp('Edge/([0-9\.]+)');
 fullVersion = nAgt.match(pattern, '$1');
 fullVersion = fullVersion[1];
}
// In Chrome, the true version is after "Chrome"
else if ((verOffset=nAgt.indexOf("Vivaldi"))!=-1) {
 browserName = "Vivaldi";
 fullVersion = nAgt.substring(verOffset+8);
}
// In Chrome, the true version is after "Chrome"
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
 browserName = "Google Chrome";
 fullVersion = nAgt.substring(verOffset+7);
}
// In Safari, the true version is after "Safari" or after "Version"
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
 browserName = "Safari";
 fullVersion = nAgt.substring(verOffset+7);
 if ((verOffset=nAgt.indexOf("Version"))!=-1)
   fullVersion = nAgt.substring(verOffset+8);
}
// In most other browsers, "name/version" is at the end of userAgent
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) )
{
 browserName = nAgt.substring(nameOffset,verOffset);
 fullVersion = nAgt.substring(verOffset+1);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}
// trim the fullVersion string at semicolon/space if present
if ((ix=fullVersion.indexOf(';'))!=-1) fullVersion=fullVersion.substring(0,ix);
if ((ix=fullVersion.indexOf(' '))!=-1) fullVersion=fullVersion.substring(0,ix);

majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
 fullVersion  = ''+parseFloat(navigator.appVersion);
 majorVersion = parseInt(navigator.appVersion,10);
}


function basicBrowserInfo(){
	return browserName+' (version '+fullVersion+')';
}

function hasWebGL() {
	try { gl = canvas.getContext("webgl"); }
	catch (x) { gl = null; }
	if (gl === null) {
	    try { gl = canvas.getContext("experimental-webgl"); glExperimental = true; }
	    catch (x) { gl = null; }
	}
	if(gl) { return true; }
	else if ("WebGLRenderingContext" in window) { return true; } // not a best way, as you're not 100% sure, so you can change it to false
	else { return false; }
}