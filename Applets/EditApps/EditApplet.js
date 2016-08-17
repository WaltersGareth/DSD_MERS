var tempX = "0";
var tempY = "0";

var objFile;
var objNewExpressionsXmlFile;
var objFunctionsXMLDoc;

var mapLayerName = "MERRegApp_Assessments";
var mapLayer = Map.Layers(mapLayerName);

function loadXmlDom(){
	objNewExpressionsXmlFile = Application.CreateAppObject("file");
	objFile = "C:\\DSD_MERS\\Configs\\tempValues.xml";
	objFunctionsXMLDoc = new ActiveXObject('Microsoft.XMLDOM');
	objFunctionsXMLDoc.load( objFile );
}

function initiateTimer(){
	Application.Timer.interval = 500;
	Application.Timer.enabled = true;
}

function getTimer(){

	var dsTemp = Application.CreateAppObject("DataSource");
	dsTemp.Open("C:\\DSD_MERS\\DATA\\TempValues.axf");

	if ( dsTemp.IsOpen ) {
		var updaters = dsTemp.Execute("SELECT [userName], [newGeometryX], [newGeometryY], [region] FROM [TEMPVALUES];");
	
		if (updaters){
			updaters.MoveFirst();

			if ( !updaters.Fields(2).Value ){
				return;
			}

			if (tempX !== updaters.Fields(2).Value && tempY !== updaters.Fields(3).Value ){
				Console.print ("should be unique...");
				Application.Timer.Enabled = false;
				tempX = updaters.Fields(2).Value;
				tempY = updaters.Fields(3).Value;

				Console.print (tempX + ", " + tempY);

				Map.CenterAtXY ( updaters.Fields(2).Value, updaters.Fields(3).Value);
				var addResult = Map.AddFeatureXY(updaters.Fields(2).Value, updaters.Fields(3).Value, true);

				if (!addResult){
					Application.MessageBox (ThisEvent.Name  + " - You can't open/add another point while you have the form open");
				}
			}
		
		}
		else {
			Application.Messagebox(":(");
		}
	}

	dsTemp.Close();
}

function getSurveyDetails() {

	var result = Map.Layers("Seismic Lines").Records.findNearestXY(tempX, tempY);

	if ( result ){
		//Console.print("testing...");
		Map.Layers("Seismic Lines").Records.Bookmark = result;
		Application.UserProperties("LINE") = Map.Layers("Seismic Lines").Records.Fields("LINE").value;
		Application.UserProperties("SURVEY") = Map.Layers("Seismic Lines").Records.Fields("SURVEY").value;
		Application.UserProperties("NAME") = Map.Layers("Seismic Lines").Records.Fields("NAME").value;
		Application.UserProperties("OPERATOR") = Map.Layers("Seismic Lines").Records.Fields("OPERATOR").value;
	}
	else {
		Application.MessageBox ("There are no surveys in the results.", apOkOnly)
	}
}

function setLastValidGpsFix(){
	if ( GPS.IsValidFix ) {
		Application.UserProperties("gpsX") = GPS.X;
		Application.UserProperties("gpsY") = GPS.Y;
	}
}

function setEditing(){
	Application.Timer.Enabled = true;
}

/**********************************************************************/
//EDITFORM CODE
/**********************************************************************/

//GLOBAL Variables
var scoreJSON = {"M2":-2, "M1":-1, "P0":0, "P1":1, "P2":2};
var g_ImpactButton = "";
var g_undoFilter = "";

function editForm_AddScore( objControl ) {
	objControl.Parent.Controls(objControl.name.substring(0, objControl.name.length -2) + "Score").Text = scoreJSON[objControl.name.substring(objControl.name.length -2)];
}

function editForm_AddImpactScore( objControl, landType ){
	if (pageLoaded){
		if ( g_ImpactButton !== "" ) {
			var txtBox = g_ImpactButton + "_" + landType;
			objControl.Parent.Controls(txtBox).Text = objControl.text;
		}
		else {
			Application.MessageBox ( "Select an impact type", apOkOnly, "WARNING!");
		}
	}
}

function editForm_ImpactChoice( objButton, fromFunction ){
	switch (objButton.name) {
		case "btnDune":
			vegImpactVisibility(objButton);
			g_ImpactButton = "Dune";
			break;
		case "btnFloodplain":
			vegImpactVisibility(objButton);
			g_ImpactButton = "Floodplain";
			break;
		case "btnGibber":
			vegImpactVisibility(objButton);
			g_ImpactButton = "Gibber";
			break;
		case "btnSaltlake":
			vegImpactVisibility(objButton);
			g_ImpactButton = "Saltlake";
			break;
		case "btnSwalesSandplains":
			vegImpactVisibility(objButton);
			g_ImpactButton = "SwalesSandplains";
			break;
		case "btnLimestoneplains":
			vegImpactVisibility(objButton);
			g_ImpactButton = "Limestoneplains";
			break;
		case "btnGypcrete":
			vegImpactVisibility(objButton);
			g_ImpactButton = "Gypcrete";
			break;
	}

	findExistingValue(g_ImpactButton, objButton);

	changeVisibility( objButton, fromFunction );
}

function changeVisibility( objButton, fromFunction ) {
	if (!fromFunction) {
		//objButton.Parent.Controls( "btn" + g_ImpactButton ).visible = !objButton.Parent.Controls( "btn" + g_ImpactButton ).visible;
		objButton.Parent.Controls( "btn" + g_ImpactButton + "_S" ).visible = !objButton.Parent.Controls( "btn" + g_ImpactButton + "_S").visible;
		objButton.Parent.Controls( "btn" + g_ImpactButton ).visible = !objButton.Parent.Controls( "btn" + g_ImpactButton + "_S" ).visible;
	}

	for ( var i = 1; i <= objButton.Parent.Controls.Count; i++ ){

		var name = objButton.Parent.Controls(i).Name.substring( 0, objButton.Parent.Controls(i).Name.length -2 );
		var nameSuffix = objButton.Parent.Controls(i).Name.substring( objButton.Parent.Controls(i).Name.length -2 );

		if ( objButton.Name.substring(0, 3) === "btn" && name.substring(3) !== g_ImpactButton && nameSuffix === "_S") {
			objButton.Parent.Controls(i).Visible = false;
			objButton.Parent.Controls(name).Visible = true;
		}
	}
}

function vegImpactVisibility(objButton) {

	if (objButton.name === "btnSaltlake") {
		objButton.Parent.Controls ("Veg_M2").Visible = false;
		objButton.Parent.Controls ("Veg_M1").Visible = false;
		objButton.Parent.Controls ("Veg_P0").Visible = false;
		objButton.Parent.Controls ("Veg_P1").Visible = false;
		objButton.Parent.Controls ("Veg_P2").Visible = false;
		objButton.Parent.Controls ("Veg_Score").Visible = false;
		objButton.Parent.Controls ("Veg_Help").Visible = false;
		objButton.Parent.Controls ("lblImpactVeg").Visible = false;
	}
	else {
		objButton.Parent.Controls ("Veg_M2").Visible = true;
		objButton.Parent.Controls ("Veg_M1").Visible = true;
		objButton.Parent.Controls ("Veg_P0").Visible = true;
		objButton.Parent.Controls ("Veg_P1").Visible = true;
		objButton.Parent.Controls ("Veg_P2").Visible = true;
		objButton.Parent.Controls ("Veg_Score").Visible = true;
		objButton.Parent.Controls ("Veg_Help").Visible = true;
		objButton.Parent.Controls ("lblImpactVeg").Visible = true;
	}
}

function findExistingValue(buttonName, objEvent){

	if ( objEvent.Parent.Controls(buttonName + "_Land").text !== "" ) {
		objEvent.Parent.Controls("Landscape_Score").Text = objEvent.Parent.Controls(buttonName + "_Land").text;
	}
	else {
		objEvent.Parent.Controls("Landscape_Score").Text = "";
	}	

	if ( objEvent.Parent.Controls(buttonName + "_Veg").text !== "" ) {
		objEvent.Parent.Controls("Veg_Score").Text = objEvent.Parent.Controls(buttonName + "_Veg").text;
	}
	else {
		objEvent.Parent.Controls("Veg_Score").Text = "";
	}
}

var pageLoaded = false;

function page_SetActive( objPage ){
	Applets( "EditApplet" ).Execute ( "getSurveyDetails()" );
	objPage.Controls("lblAssessor").text = Application.UserProperties("userName");
//	objPage.Controls("lblLineText").text = Application.UserProperties("LINE");
//	objPage.Controls("lblSurveyText").text = Application.UserProperties("SURVEY");
	objPage.Controls("lblCompanyText").text ="COMPANY: " + Application.UserProperties("OPERATOR");
	objPage.Controls("lblName").text ="NAME: " + Application.UserProperties("NAME");
	objPage.Controls("txtNotes").text ="";

	var dateStamp = new Date();
	objPage.Controls("lblPhotolink").text = Application.UserProperties("LINE") + "_" + dateStamp.getTime();
	Application.UserProperties ("PhotoID") = objPage.Controls("lblPhotolink").text;

	switch (Application.UserProperties("region")){
		case ("Cooper"):
			objPage.Controls("btnDune_S").visible = false;
			objPage.Controls("btnFloodplain_S").visible = false;
			objPage.Controls("btnGibber_S").visible = false;
			objPage.Controls("btnSaltlake_S").visible = false;
			break;
		case ("Officer"):
			objPage.Controls("btnDune_S").visible = false;
			objPage.Controls("btnSwalesSandplains_S").visible = false;
			objPage.Controls("btnLimestoneplains_S").visible = false;
			objPage.Controls("btnGypcrete_S").visible = false;
			objPage.Controls("btnSaltlake_S").visible = false;
			break;
		case ("Otway"):
			objPage.Controls("btnDune_S").visible = false;
			objPage.Controls("btnSwalesSandplains_S").visible = false;
			objPage.Controls("btnLimestoneplains_S").visible = false;
			objPage.Controls("btnGypcrete_S").visible = false;
			objPage.Controls("btnSaltlake_S").visible = false;
			break;
		case ("Arckaringa"):
			objPage.Controls("btnDune_S").visible = false;
			objPage.Controls("btnSwalesSandplains_S").visible = false;
			objPage.Controls("btnLimestoneplains_S").visible = false;
			objPage.Controls("btnGypcrete_S").visible = false;
			objPage.Controls("btnSaltlake_S").visible = false;
			break;
	}

	for ( var i = 1; i <= objPage.Controls.Count; i++ ){
		if ( objPage.Controls(i).Type === "EDIT" &&  objPage.Controls(i).Name.substring(0,3) !== "lbl" ){
			if (!fromUndo) {
				undoArray ( [objPage.Controls(i).Name, objPage.Controls(i).Text] );
			}

			fromUndo = false;
		}
	}

	var ds = Map.Layers("Seismic Lines").DataSource;
	if ( ds.IsOpen ) {
		var sqlStr = "SELECT [LINE] FROM [SeismicLines] WHERE [SURVEY] = '" + Application.UserProperties("SURVEY") + "';" ;
		var pRS = ds.Execute( sqlStr );

		if ( pRS !== null) {

            while (!pRS.EOF) {
                objPage.Controls("cboLines").AddItem(pRS.Fields(1).Value, pRS.Fields(1).Value);

				if ( pRS.Fields(1).Value == Application.UserProperties("LINE") ){
					var bk = pRS.Bookmark; 
				}
                pRS.MoveNext();
            }

		}
		ds.close();

		objPage.Controls("cboLines").ListIndex = bk;
	}	

	for ( var r = 1; r <= objPage.Controls.Count; r++ ){
		if ( objPage.Controls(r).Name.substring(0,3) == "btn" && objPage.Controls(r).Name.substring(objPage.Controls(r).Name.length -2) == "_S"){
			var btn = objPage.Controls(r).Name.substring(0,objPage.Controls(r).Name.length -2) ;
			objPage.Controls(r).visible = true;
			editForm_ImpactChoice( objPage.Controls(btn) );
			break;
		}
	}	

	pageLoaded = true;
}


function clearForm(objEvent){
	for ( var i = 1; i <= objEvent.Parent.Controls.Count; i++ ){
		if ( objEvent.Parent.Controls(i).Type === "EDIT" &&  objEvent.Parent.Controls(i).Name.substring(0,3) !== "lbl" ){
			objEvent.Parent.Controls(i).Text = "";
		}
	}

	objPage = objEvent.Parent;

	for ( var r = 1; r <= objPage.Controls.Count; r++ ){
		if ( objPage.Controls(r).Name.substring(0,3) == "btn" && objPage.Controls(r).Name.substring(objPage.Controls(r).Name.length -2) == "_S"){
			var btn = objPage.Controls(r).Name.substring(0,objPage.Controls(r).Name.length -2) ;
			objPage.Controls(r).visible = true;
			editForm_ImpactChoice( objPage.Controls(btn), "clearForm" );
			break;
		}
	}
}

function onFeatureAdded( objEvent ){


	Map.Layers(mapLayerName).Records.Bookmark = Map.SelectionBookmark;
	var ds = 	Map.Layers(mapLayerName).DataSource;

	if ( ds.IsOpen ) {
		if ( GPS.IsValidFix ) {
			ds.execute("UPDATE [" + mapLayerName + "] SET SHAPE_X = " + GPS.X + ", SHAPE_Y = " + GPS.Y + " WHERE AXF_OBJECTID = " + Map.SelectionBookmark + ";");
		}
		else if ( Application.UserProperties("gpsX") && Application.UserProperties("gpsY") ) {
			ds.execute("UPDATE [" + mapLayerName + "] SET SHAPE_X = " + Application.UserProperties("gpsX") + ", SHAPE_Y = " + Application.UserProperties("gpsY") + " WHERE AXF_OBJECTID = " + Map.SelectionBookmark + ";");
		}
		ds.Close();
	}

	//The jScript version of FindFiles isn't working. This will execute the script as a single VBscript.
	Applets("PhotosApplet").Execute("Call MoveImages()");
	Applets("PhotosApplet").Execute("Call MoveVoiceRecordings()");

	Application.ExecuteCommand("clearSelected");
	Map.Refresh();

	var addResult;
	if ( GPS.IsValidFix ) {
		addResult = Map.AddFeatureXY(GPS.X, GPS.Y);
	}
	else {
 		addResult = Map.AddFeatureXY( Application.UserProperties("gpsX"), Application.UserProperties("gpsY") );
	}

	if (!addResult){
		Application.MessageBox (ThisEvent.Name  + " - You can't open/add another point while you have the form open");
	}

	Application.Timer.Enabled = true;

}

var undoArr = [];
var fromUndo = false

function undoArray(objItem) {
	undoArr.push( objItem );
}

function undoValues(objEvent) {
	if ( objEvent.Parent.Controls( undoArr[undoArr.length-1][0] ).Text == undoArr[undoArr.length-1][1] ){
		undoArr.pop()
	}
	Console.print ("undoing..." + undoArr[undoArr.length-1][0] + ", " + undoArr[undoArr.length-1][1] ); 
	objEvent.Parent.Controls( undoArr[undoArr.length-1][0] ).Text = undoArr[undoArr.length-1][1];
	fromUndo = true;
	undoArr.pop();
}

function getHelpFile(objEvent, type) {
var file = Application.CreateAppObject("file")
	
	try {
		var filePath = "C:\\DSD_MERS\\Help\\" + Application.UserProperties("region") + "\\PET - " + Application.UserProperties("region") + " - " + type + ".pdf";
		if (!file.exists(filePath)) {
			throw "JACK! You haven't loaded the help file correctly."
		}
		else {
			Application.Run ("C:\\DSD_MERS\\Help\\" + Application.UserProperties("region") + "\\PET - " + Application.UserProperties("region") + " - " + type + ".pdf");
		}
	}
	catch(err) {
		Application.Messagebox (err, apOKOnly)
	}
}

function getSurfaceHelpFile(objEvent, landscape) {
	Application.Run ("C:\\DSD_MERS\\Help\\" + Application.UserProperties("region") + "\\PET - " + Application.UserProperties("region") + " - " + g_ImpactButton + " - " + landscape + ".pdf");
}

function comboLinesValidate( objEvent ){
	var objPage = objEvent.Object.Parent;
	
	if ( !ThisEvent.Object.Value ) {
		for ( var i = 1; i < objPage.Controls.Count; i++ ) {
			var l = objPage.Controls(i).name.length - 5;
			if ( objPage.Controls(i).Name.substring( objPage.Controls(i).name.length - 5,  objPage.Controls(i).name.length) === "Score" && objPage.Controls(i).Text > "" ){
					ThisEvent.Result = false;
					ThisEvent.MessageText = "You must select a line if you have scores below";
					break;
			}
		}
	}
}

function showKeyBoard(){
	Application.Run ("C:\\Program Files\\Common Files\\microsoft shared\\ink\\TabTip.exe");
}
