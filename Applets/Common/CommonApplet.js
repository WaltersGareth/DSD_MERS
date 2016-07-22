//Global Variables
var objFile;
var objNewExpressionsXmlFile;
var objFunctionsXMLDoc;
var objLockFile;
var lockFile;

function loadXmlDom(){
	objNewExpressionsXmlFile = Application.CreateAppObject("file");
	objFile = "C:\\DSD_MERS\\Configs\\tempValues.xml";
	objFunctionsXMLDoc = new ActiveXObject('Microsoft.XMLDOM');
	objFunctionsXMLDoc.load( objFile );
}

function clearGeometry(){
	if(objFunctionsXMLDoc.parseError.errorCode != 0)
	{
		Application.MessageBox ( "There was error accessing the file.");
	}
	else
	{
	    var nodeExp = objFunctionsXMLDoc.selectSingleNode("//VALUES");
		nodeExp.setAttribute(newGeometryX, 99999);	
		nodeExp.setAttribute(newGeometryY, 99999);	
	}
}

function setTempValue(key, value){
	if (!objFile.exists) {
		objNewExpressionsXmlFile.Open(objFile, 2);
		objNewExpressionsXmlFile.WriteLine("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		objNewExpressionsXmlFile.WriteLine("<DSD>");
		objNewExpressionsXmlFile.WriteLine("<VALUES/>");
		objNewExpressionsXmlFile.WriteLine("</DSD>");
		objNewExpressionsXmlFile.Close();
	}

	if(objFunctionsXMLDoc.parseError.errorCode != 0)
	{
		Application.MessageBox ( "There was error accessing the file.");
	}
	else
	{
	    var nodeExp = objFunctionsXMLDoc.selectSingleNode("//VALUES");
		nodeExp.setAttribute(key, value);
		objFunctionsXMLDoc.save(objFile);
	}
}

function getTempValue(key) {
	if(objFunctionsXMLDoc.parseError.errorCode != 0)
	{
		Application.MessageBox ( "There was error accessing the file while reading the XML.");
	}
	else
	{
	    var nodeExp = objFunctionsXMLDoc.selectSingleNode("//VALUES");
		return nodeExp.getAttribute(key);
	}
}

function getEditStatus() {
	if(objFunctionsXMLDoc.parseError.errorCode != 0)
	{
		Application.MessageBox ( "There was error accessing the file while reading the XML.");
	}
	else
	{
	    var nodeExp = objFunctionsXMLDoc.selectSingleNode("//VALUES");
		return nodeExp.getAttribute("editing");
	}
}
