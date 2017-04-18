var mapOpened = false;
var editType;

var updaters;

var pointCount = 0;

function map_OpenUserLoginForm( eventObj ) {
	deleteFeatures();

	Applets("DSD").Forms("userLoginForm").show();
}


function deleteFeatures(){
	var objRecords = Map.Layers("tempPoint").Records;

	pointCount = objRecords.RecordCount;

	if ( objRecords.RecordCount > 0 ) {
		objRecords.MoveFirst();
		do {
			objRecords.Delete();
			objRecords.MoveNext();
		}
		while ( !objRecords.EOF );
	}

	objRecords.Pack();
}

function userLoginForm_SaveUser( objPage ) {
	var userName = objPage.Controls("cboUser").Value;
	var regionName = objPage.Controls("cboRegion").Value;
	
	Application.UserProperties("userName") = userName;
	Application.UserProperties("regionName") = regionName;

	//ADD DATASOURCE CODE TO UPDATE TEMPVALUES TABLE
		var dsTemp = Application.CreateAppObject("DataSource");
		dsTemp.Open("C:\\DSD_MERS\\DATA\\TempValues.axf");

		if ( dsTemp.IsOpen ) {
			updaters = dsTemp.Execute("SELECT [userName], [newGeometryX], [newGeometryY], [region] FROM [TEMPVALUES];");

			if (updaters){
				var deleters = dsTemp.Execute("DELETE FROM [TEMPVALUES];");
				var insertrs = dsTemp.Execute("INSERT INTO [TEMPVALUES] (userName, region) VALUES ('" + userName + "', '" + regionName +"');");
			}
		}

		dsTemp.Close();


	//Update Bookmark
	
	var xmldoc = new ActiveXObject('Microsoft.XMLDOM');
	xmldoc.load(Map.FilePath);

	var bs = xmldoc.selectNodes("//BOOKMARKS/BOOKMARK");

	var rect = Application.CreateAppObject("Rectangle");

	if (bs.length == 0){
		Application.MessageBox("There is no bookmark");
	}
	else
	{

		for ( var b = 0; b < bs.length; b++ ) {
			 if (bs.item(b).getAttribute("name") == regionName) {
				rect.left = bs.item(b).getAttribute("minx");
				rect.bottom = bs.item(b).getAttribute("miny");
				rect.right = bs.item(b).getAttribute("maxx");
				rect.top = bs.item(b).getAttribute("maxy");
				Map.extent = rect;
				Application.userProperties("bookmarkExtent") = [rect.left, rect.bottom, rect.right, rect.top]
				Application.MessageBox ( Application.userProperties("bookmarkExtent") );
			}
		}
	}

	mapOpened = true;

	Application.Run ("C:\\DSD_MERS\\ArcPad Apps\\" + regionName + ".lnk");
	
	Toolbars("MapTools").item("modepan").click();
}

function userLoginFrom_ValidateUser(){
	if ( !ThisEvent.Object.Value ){
		ThisEvent.Result = false;
		ThisEvent.MessageText = "Please select an employee from the list to login and continue."
		ThisEvent.MessageType = apOkOnly;
	}
}

function userLoginForm_ValidateRegion(){
	if ( !ThisEvent.Object.Value ){
		ThisEvent.Result = false;
		ThisEvent.MessageText = "Please select a region to work in."
		ThisEvent.MessageType = apOkOnly;
	}
}

function LoginForm_OnQueryCancel(){
	Application.MessageBox("You must select a user to continue.",apOkOnly,"Not selected");
	ThisEvent.Result = false;
}

function setGeometryForFeature( objEvent ){
	var tx;
	var ty;

	if ( objEvent.Name == "OnPointerUp"){
		tx = Map.PointerX;
		ty = Map.PointerY;
	}
	else {
		if ( GPS.isValidFix ){
			tx = GPS.X;
			ty = GPS.Y;
		}
		else {
			Application.MessageBox( "There is no GPS fix at the moment" ) 
		}
	}

	if( tx ) {
		addCoordsToTempValues(tx, ty);
		
		Map.AddFeatureXY(tx, ty, false);

		Application.Timer.Interval = 5000;
		Application.Timer.Enabled = true;

		Map.Scale = 50000;
	}
}

function addCoordsToTempValues(xValue, yValue){


		var dsTemp = Application.CreateAppObject("DataSource");
		dsTemp.Open("C:\\DSD_MERS\\DATA\\TempValues.axf");

		if ( dsTemp.IsOpen ) {
			updaters = dsTemp.Execute("SELECT [userName], [newGeometryX], [newGeometryY], [region] FROM [TEMPVALUES];");
		
			if (updaters){
				var insertrs = dsTemp.Execute("UPDATE [TEMPVALUES] SET newGeometryX = " + xValue +", newGeometryY = " + yValue +";");
			}
		}

		dsTemp.Close();

}


function getBookmarkExtent(exArray){
	var rect = Application.CreateAppObject("Rectangle");

	rect.left = exArray[0];
	rect.bottom = exArray[1];
	rect.right = exArray[2];
	rect.top = exArray[3];
	Map.extent = rect;
}

//search Tools

function loadLines( objEvent ) {
	var ds = Map.Layers("Seismic Lines").DataSource;

	if ( ds.IsOpen ) {
		var pRS = ds.Execute ("select line from lines where province like '%" + Application.UserProperties("regionName") + "%';");

		if (pRS != null) {
			pRS.MoveFirst();
			while (!pRS.EOF) {
				  objEvent.Controls("lstLines").AddItem (pRS.Bookmark, pRS.Fields("Line").Value);
				  pRS.MoveNext();
			}
		}
	}
}

function selectLines( objEvent ) {
	Map.Select(Map.Layers("Seismic Lines"), objEvent.Value);
}

function checkEditingStatus() {
		//Console.print ("Starting checkEditStatus");

		var dsTemp = Application.CreateAppObject("DataSource");
		dsTemp.Open("C:\\DSD_MERS\\DATA\\TempValues.axf");

		var insertrs;

		if (GPS.IsValidFix) {
			//Applets( "CommonApplet" ).Execute ( "setTempValue( \"newGeometryX\",  GPS.X )");
			//Applets( "CommonApplet" ).Execute ( "setTempValue( \"newGeometryY\",  GPS.Y )");
			insertrs = dsTemp.Execute("UPDATE [TEMPVALUES] SET newGeometryX = " + GPS.X +", newGeometryY = " + GPS.Y +";");
		}

		dsTemp.Close();
}

function copyFeaturesFromAXF(){

	var dsTemp = Application.CreateAppObject("DataSource");
	dsTemp.Open("C:\\DSD_MERS\\DATA\\AXFs\\" + Application.UserProperties("regionName") + "\\SDE_DEFAULT_CSDLP_world.axf");

	if (dsTemp.IsOpen) {
		var rs = dsTemp.OpenLayer("MASTER.MERRegApp_Assessments");

		if (rs.RecordCount > pointCount) {
			deleteFeatures();

			if (rs.RecordCount > 1) {
				rs.MoveFirst();
				while(!rs.EOF){
					Map.AddFeatureXY (parseFloat(rs.Fields("SHAPE_X").value), parseFloat(rs.Fields("SHAPE_Y").value), false);
					rs.MoveNext();
				}
			}
		}
		else {
			//Application.Messagebox ("There are no features to copy");
		}
	}
	else {
		Application.MessageBox ( "Couldn't open the MERREGAPP Datasource", apOkOnly)
	}


	dsTemp.Close();
}
