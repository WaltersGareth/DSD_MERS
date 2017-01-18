var tempX = "0";
var tempY = "0";
var tempUserName = "";

var objFile;
var objNewExpressionsXmlFile;
var objFunctionsXMLDoc;

var mapLayerName = "MERRegApp_Assessments";
var mapLayer = Map.Layers(mapLayerName);

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
				tempUserName =  updaters.Fields(1).Value;
				
				Application.UserProperties("region") = updaters.Fields(4).Value;

				Map.CenterAtXY ( updaters.Fields(2).Value, updaters.Fields(3).Value);
				Map.EditLayer.Forms("FORM2").Show();
				//var addResult = Map.AddFeatureXY(updaters.Fields(2).Value, updaters.Fields(3).Value, true);
				/*
				if (!addResult){
					Application.MessageBox (ThisEvent.Name  + " - You can't open/add another point while you have the form open");
				}
				*/
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

function photoLink(objPage){
	var dateStamp = new Date();
	objPage.Controls("lblPhotolink").text = Application.UserProperties("LINE") + "_" + dateStamp.getTime();
	Application.UserProperties ("PhotoID") = objPage.Controls("lblPhotolink").text;
}

function resetPage( objPage ){
	Applets( "EditApplet" ).Execute ( "getSurveyDetails()" );
	objPage.Controls("lblAssessor").text = tempUserName;
	objPage.Controls("lblCompanyText").text ="COMPANY: " + Application.UserProperties("OPERATOR");
	objPage.Controls("lblName").text ="NAME: " + Application.UserProperties("NAME");
}

function page_SetActive( objPage ){

	objPage.Controls("txtNotes").text ="";

	resetPage( objPage )
	photoLink( objPage );

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
		var sqlStr = "SELECT [LINE] FROM [MERREGAPPSEISMICLINES] WHERE [SURVEY] = '" + Application.UserProperties("SURVEY") + "';" ;
   		Console.print (sqlStr)
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
	//Applets("PhotosApplet").Execute("Call MoveVoiceRecordings()");

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

	//objPage.Controls("cboLines").Clear()

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

function addFeatureFromForm( objEvent ){
	var objPage = objEvent.object.Parent;
	var objControls = objPage.Controls;


	if ( GPS.IsValidFix ) {
		tempX = GPS.X;
		tempY = GPS.Y;
	}

	var randomNumber = Math.random();
	randomNumber = parseInt(randomNumber * 10000) * -1;

	var d = new Date(); //2016-07-21 03:58:07
	var formattedDate = d.getFullYear() + "-" + ( Number(d.getMonth()) + 1 ) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();


	var sqlFields = "OBJECTID, LINE, ASSESSOR, ASSESSORDATE, INFRASTRUCTURE, VISUAL, UPHOLE, LITTER";

	var INFRASTRUCTURE;
	if ( objControls("inf_Score").Value ){ INFRASTRUCTURE = objControls("inf_Score").Value }
	else { INFRASTRUCTURE = null };

	var VISUAL;
	if ( objControls("VisImp_Score").Value ){ VISUAL = objControls("VisImp_Score").Value }
	else { VISUAL = null };

	var UPHOLE;
	if ( objControls("Uphole_Score").Value ){ UPHOLE = objControls("Uphole_Score").Value }
	else { UPHOLE = null };

	var LITTER;
	if ( objControls("Litter_Score").Value ){ LITTER = objControls("Litter_Score").Value }
	else { LITTER = null };

	var sqlValues = 	randomNumber + ", " +
						"'" + objControls("cboLines").Value + "', " +
						"'" + tempUserName + "', " +
						"'" + formattedDate + "', " +

						INFRASTRUCTURE + ", " +
						VISUAL + ", " +
						UPHOLE + ", " +
						LITTER + ", ";

	switch (Application.UserProperties("region")){
		case ("Cooper"):
			var DUNES_VEG;
			if ( objControls("Dune_Veg").Value ){ DUNES_VEG = objControls("Dune_Veg").Value }
			else { DUNES_VEG = null };

			var DUNES_LAND;
			if ( objControls("Dune_Land").Value ){ DUNES_LAND = objControls("Dune_Land").Value }
			else { DUNES_LAND = null };

			var FLOODPLAIN_VEG;
			if ( objControls("Floodplain_Veg").Value ){ FLOODPLAIN_VEG = objControls("Floodplain_Veg").Value }
			else { FLOODPLAIN_VEG = null };

			var FLOODPLAIN_LAND;
			if ( objControls("Floodplain_Land").Value ){ FLOODPLAIN_LAND = objControls("Floodplain_Land").Value }
			else { FLOODPLAIN_LAND = null };

			var GIBBER_VEG;
			if ( objControls("Gibber_Veg").Value ){ GIBBER_VEG = objControls("Gibber_Veg").Value }
			else { GIBBER_VEG = null };

			var GIBBER_LAND;
			if ( objControls("Gibber_Land").Value ){ GIBBER_LAND = objControls("Gibber_Land").Value }
			else { GIBBER_LAND = null };

			var SALTLAKE_LAND;
			if ( objControls("SaltLake_Land").Value ){ SALTLAKE_LAND = objControls("SaltLake_Land").Value }
			else { SALTLAKE_LAND = null };
		
			sqlFields = sqlFields + ", DUNES_VEG, DUNES_LAND, FLOODPLAIN_VEG, FLOODPLAIN_LAND, GIBBER_VEG, GIBBER_LAND, SALTLAKE_LAND";
			sqlValues = sqlValues + 
						DUNES_VEG + ", " +
						DUNES_LAND + ", " +
						FLOODPLAIN_VEG + ", " +
						FLOODPLAIN_LAND + ", " +
						GIBBER_VEG + ", " +
						GIBBER_LAND + ", " +
						SALTLAKE_LAND + ", ";
			break;

		case ("Officer"):

			var SWALESSANDPLAINS_LAND;
			if ( objControls("SWALESSANDPLAINS_LAND").Value ){ SWALESSANDPLAINS_LAND = objControls("SWALESSANDPLAINS_LAND").Value }
			else { SWALESSANDPLAINS_LAND = null };  

			var SWALESSANDPLAINS_VEG;
			if ( objControls("SWALESSANDPLAINS_VEG").Value ){ SWALESSANDPLAINS_VEG = objControls("SWALESSANDPLAINS_VEG").Value }
			else { SWALESSANDPLAINS_VEG = null }; 

			var LIMESTONEPLAINS_LAND; 
			if ( objControls("LIMESTONEPLAINS_LAND").Value ){ LIMESTONEPLAINS_LAND = objControls("LIMESTONEPLAINS_LAND").Value }
			else { LIMESTONEPLAINS_LAND = null }; 

			var LIMESTONEPLAINS_VEG;
			if ( objControls("LIMESTONEPLAINS_VEG").Value ){ LIMESTONEPLAINS_VEG = objControls("LIMESTONEPLAINS_VEG").Value }
			else { LIMESTONEPLAINS_VEG = null };  

			var SALTLAKE_LAND;
			if ( objControls("SaltLake_Land").Value ){ SALTLAKE_LAND = objControls("SaltLake_Land").Value }
			else { SALTLAKE_LAND = null };

			var GYPCRETE_LAND; 
			if ( objControls("GYPCRETE_LAND").Value ){ GYPCRETE_LAND = objControls("GYPCRETE_LAND").Value }
			else { GYPCRETE_LAND = null }; 

			var GYPCRETE_VEG; 
			if ( objControls("GYPCRETE_VEG").Value ){ GYPCRETE_VEG = objControls("GYPCRETE_VEG").Value }
			else { GYPCRETE_VEG = null }; 

			var CAMPSITE; 
			if ( objControls("CAMPSITE").Value ){ CAMPSITE = objControls("CAMPSITE").Value }
			else { CAMPSITE = null }; 

		 	sqlFields = sqlFields + ", SALTLAKE_LAND, SWALESSANDPLAINS_LAND, SWALESSANDPLAINS_VEG, LIMESTONEPLAINS_LAND, LIMESTONEPLAINS_VEG, GYPCRETE_LAND, GYPCRETE_VEG, CAMPSITE";

			sqlValues = sqlValues +
						SALTLAKE_LAND + ", " +
						SWALESSANDPLAINS_LAND + ", " +
						SWALESSANDPLAINS_VEG + ", " +
						LIMESTONEPLAINS_LAND + ", " +
						LIMESTONEPLAINS_VEG + ", " +
						GYPCRETE_LAND + ", " +
						GYPCRETE_VEG + ", " +
						CAMPSITE + ", " ;

			break;

		case ("Arckaringa"):
			var DUNES_VEG;
			if ( objControls("Dune_Veg").Value ){ DUNES_VEG = objControls("Dune_Veg").Value }
			else { DUNES_VEG = null };

			var DUNES_LAND;
			if ( objControls("Dune_Land").Value ){ DUNES_LAND = objControls("Dune_Land").Value }
			else { DUNES_LAND = null };

			var FLOODPLAIN_VEG;
			if ( objControls("Floodplain_Veg").Value ){ FLOODPLAIN_VEG = objControls("Floodplain_Veg").Value }
			else { FLOODPLAIN_VEG = null };

			var FLOODPLAIN_LAND;
			if ( objControls("Floodplain_Land").Value ){ FLOODPLAIN_LAND = objControls("Floodplain_Land").Value }
			else { FLOODPLAIN_LAND = null };

			var MOONPLAINS_LAND;
			if ( objControls("MOONPLAINS_LAND").Value ){ MOONPLAINS_LAND = objControls("MOONPLAINS_LAND").Value }
			else { MOONPLAINS_LAND = null }; 

			var SALTLAKE_LAND;
			if ( objControls("SaltLake_Land").Value ){ SALTLAKE_LAND = objControls("SaltLake_Land").Value }
			else { SALTLAKE_LAND = null };

			var STONYPLAINS_LAND;
			if ( objControls("STONYPLAINS_LAND").Value ){ STONYPLAINS_LAND = objControls("STONYPLAINS_LAND").Value }
			else { STONYPLAINS_LAND = null }; 

			var STONYPLAINS_VEG; 
			if ( objControls("STONYPLAINS_VEG").Value ){ STONYPLAINS_VEG = objControls("STONYPLAINS_VEG").Value }
			else { STONYPLAINS_VEG = null }; 

			var BREAKAWAYS_LAND;
			if ( objControls("BREAKAWAYS_LAND").Value ){ BREAKAWAYS_LAND = objControls("BREAKAWAYS_LAND").Value }
			else { BREAKAWAYS_LAND = null }; 

			var BREAKAWAYS_VEG; 
			if ( objControls("BREAKAWAYS_VEG").Value ){ BREAKAWAYS_VEG = objControls("BREAKAWAYS_VEG").Value }
			else { BREAKAWAYS_VEG = null }; 

			var WETLANDS_LAND;
			if ( objControls("WETLANDS_LAND").Value ){ WETLANDS_LAND = objControls("WETLANDS_LAND").Value }
			else { WETLANDS_LAND = null }; 

			sqlFields = sqlFields + "DUNES_VEG, DUNES_LAND, FLOODPLAIN_VEG, FLOODPLAIN_LAND, SALTLAKE_LAND, WETLANDS_LAND, MOONPLAINS_LAND, BREAKAWAYS_LAND, BREAKAWAYS_VEG, STONYPLAINS_LAND, STONYPLAINS_VEG";

			sqlValues = sqlValues +
						DUNES_VEG + ", " +
						DUNES_LAND + ", " +
						FLOODPLAIN_VEG + ", " +
						FLOODPLAIN_LAND + ", " +
						SALTLAKE_LAND + ", " +
						WETLANDS_LAND + ", " +
						MOONPLAINS_LAND + ", " +
						BREAKAWAYS_LAND + ", " +
						BREAKAWAYS_VEG + ", " +
						STONYPLAINS_LAND + ", " +
						STONYPLAINS_VEG + ", ";					

			break;

		case ("Otway"):

			var LANDSURFACE;
			if ( objControls("LANDSURFACE").Value ){ LANDSURFACE = objControls("LANDSURFACE").Value }
			else { LANDSURFACE = null }; 

			var NATIVEVEG_COMMUNITIES; 
			if ( objControls("NATIVEVEG_COMMUNITIES").Value ){ NATIVEVEG_COMMUNITIES = objControls("NATIVEVEG_COMMUNITIES").Value }
			else { NATIVEVEG_COMMUNITIES = null }; 

			var NATIVEVEG_SPECIES; 
			if ( objControls("NATIVEVEG_SPECIES").Value ){ NATIVEVEG_SPECIES = objControls("NATIVEVEG_SPECIES").Value }
			else { NATIVEVEG_SPECIES = null }; 

			var NONNATIVEVEG_AGIIMPACT; 
			if ( objControls("NONNATIVEVEG_AGIIMPACT").Value ){ NONNATIVEVEG_AGIIMPACT = objControls("NONNATIVEVEG_AGIIMPACT").Value }
			else { NONNATIVEVEG_AGIIMPACT = null }; 

			sqlFields = sqlFields + "NATIVEVEG_COMMUNITIES, NATIVEVEG_SPECIES, NONNATIVEVEG_AGIIMPACT, LANDSURFACE";

			sqlValues = sqlValues +
						NATIVEVEG_COMMUNITIES + ", " +
						NATIVEVEG_SPECIES + ", " +
						NONNATIVEVEG_AGIIMPACT + ", " +
						CAMPSITE + ", " +
						LANDSURFACE + ", " ;						

			break;
	}

	sqlFields = sqlFields + ", NOTES, CREATED_USER, CREATED_DATE, LAST_EDITED_USER, LAST_EDITED_DATE, SURVEY, PHOTOLINK, SHAPE_X, SHAPE_Y, AXF_TIMESTAMP, AXF_STATUS"

	sqlValues = sqlValues +
				"'" + objControls("txtNotes").Value + "', " +

				"'PETENG', " +
				"'" + formattedDate + "', " +
				"'PETENG', " +
				"'" + formattedDate + "', " +

				"'" + Application.UserProperties("SURVEY") + "', " +
				"'" + objControls("lblPhotolink").Value + "', " +
				tempX + ", " +
				tempY + ", " +
				"'" + formattedDate + "', " +
				1;

	var sqlString = "INSERT INTO " +  mapLayerName + " (" + sqlFields + ") VALUES (" + sqlValues + ");";
	
	var txtFile = Application.CreateAppObject("file");
	txtFile.Open("c:\\temp\\fieldsLog.txt", 2);
	txtFile.Write(sqlString);
	txtFile.Close();

	var ds = 	Map.Layers(mapLayerName).DataSource;

	if ( ds.IsOpen ) {
		var result = ds.Execute( sqlString );
	}

	Applets("PhotosApplet").Execute("Call MoveImages()");

	ds.Close();	

//check for new coordinates?

Map.Extent = Map.EditLayer.Extent;
Map.Refresh();

//reset the page
photoLink( objPage );
getSurveyDetails();
resetPage( objPage );

}

function showKeyBoard(){
	Application.Run ("C:\\Program Files\\Common Files\\microsoft shared\\ink\\TabTip.exe");
}
