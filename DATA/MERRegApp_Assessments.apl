<ArcPad>
	<LAYER name="MERRegApp_Assessments">
		<SYMBOLOGY>
			<SIMPLELABELRENDERER visible="false" field="LINE" rotationfield="" expression="" language="">
				<TEXTSYMBOL fontcolor="Black" font="Arial" fontsize="8" vertalignment="bottom" rtl="false" fontstyle="regular">
				</TEXTSYMBOL>
			</SIMPLELABELRENDERER>
			<SIMPLERENDERER>
				<GROUPSYMBOL>
					<TRUETYPEMARKERSYMBOL character="40" font="ESRI Default Marker" fontsize="14"/>
					<TRUETYPEMARKERSYMBOL fontcolor="Green" character="33" font="ESRI Default Marker" fontsize="14"/>
				</GROUPSYMBOL>
			</SIMPLERENDERER>
		</SYMBOLOGY>
		<FORMS>
			<EDITFORM name="EDITFORM" caption="Edit Form" width="400" height="400" picturepagevisible="false" attributespagevisible="false" symbologypagevisible="false" geographypagevisible="false" required="true" tabsvisible="false" oncancel="Application.Timer.Enabled = true;">
				<PAGE name="PAGE1" caption="Page 1" sip="false" onsetactive="Applets( &quot;EditApplet&quot; ).Execute ( &quot;page_SetActive( ThisEvent.Object )&quot; );">
					<COMBOBOX name="cboLines" x="7" y="9" width="113" height="13" defaultvalue="" listtable="" listvaluefield="" listtextfield="" onvalidate="Applets( &quot;EditApplet&quot; ).Execute ( &quot;comboLinesValidate( ThisEvent )&quot;);" tooltip="" tabstop="true" border="false" sip="false" limittolist="false" sort="false" field="" fontsize="12"/>
					<IMAGEBOX name="Litter_M2" x="71" y="90" width="30" height="30" defaultvalue="&quot;M2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="true" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Litter_M1" x="113" y="90" width="30" height="30" defaultvalue="&quot;M1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Litter_P0" x="155" y="90" width="30" height="30" defaultvalue="&quot;P0.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Litter_P1" x="197" y="90" width="30" height="30" defaultvalue="&quot;P1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Litter_P2" x="239" y="90" width="30" height="30" defaultvalue="&quot;P2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<EDIT name="Litter_Score" x="277" y="90" width="50" height="30" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="false" border="true" sip="false" field="LITTER" backgroundcolor="White" fontsize="24" alignment="center">
					</EDIT>
					<LABEL name="Label1" x="5" y="98" width="32" height="12" caption="Litter" tooltip="" group="true" border="false" fontsize="9">
					</LABEL>
					<IMAGEBOX name="Inf_M2" x="71" y="124" width="30" height="30" defaultvalue="&quot;M2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="true" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Inf_M1" x="113" y="124" width="30" height="30" defaultvalue="&quot;M1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Inf_P0" x="155" y="124" width="30" height="30" defaultvalue="&quot;P0.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Inf_P1" x="197" y="124" width="30" height="30" defaultvalue="&quot;P1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Inf_P2" x="239" y="124" width="30" height="30" defaultvalue="&quot;P2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<EDIT name="inf_Score" x="277" y="124" width="50" height="30" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="false" border="true" sip="false" field="INFRASTRUCTURE" fontsize="24" alignment="center">
					</EDIT>
					<LABEL name="lblInf" x="5" y="134" width="57" height="12" caption="Infrastructure" tooltip="" group="true" border="false" fontsize="9">
					</LABEL>
					<IMAGEBOX name="VisImp_M2" x="71" y="157" width="30" height="30" defaultvalue="&quot;M2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="true" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="VisImp_M1" x="113" y="157" width="30" height="30" defaultvalue="&quot;M1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="VisImp_P0" x="155" y="157" width="30" height="30" defaultvalue="&quot;P0.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="VisImp_P1" x="197" y="157" width="30" height="30" defaultvalue="&quot;P1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="VisImp_P2" x="239" y="157" width="30" height="30" defaultvalue="&quot;P2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<EDIT name="VisImp_Score" x="277" y="157" width="50" height="30" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="false" border="true" sip="false" field="VISUAL" fontsize="24" alignment="center">
					</EDIT>
					<LABEL name="lblVisImp" x="5" y="169" width="55" height="12" caption="Visual Impact" tooltip="" group="true" border="false" fontsize="9">
					</LABEL>
					<IMAGEBOX name="Uphole_M2" x="71" y="190" width="30" height="30" defaultvalue="&quot;M2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="true" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Uphole_M1" x="113" y="190" width="30" height="30" defaultvalue="&quot;M1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Uphole_P0" x="155" y="190" width="30" height="30" defaultvalue="&quot;P0.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Uphole_P1" x="197" y="190" width="30" height="30" defaultvalue="&quot;P1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Uphole_P2" x="239" y="190" width="30" height="30" defaultvalue="&quot;P2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<LABEL name="lblUphole" x="5" y="204" width="57" height="12" caption="Uphole" tooltip="" group="true" border="false" fontsize="9">
					</LABEL>
					<LABEL name="lblLanImp" x="5" y="303" width="52" height="14" caption="Landscape" tooltip="" group="true" border="false" fontsize="9">
					</LABEL>
					<IMAGEBOX name="Image6" x="240" y="367" width="30" height="30" defaultvalue="&quot;Camera.jpg&quot;" clickaction="camera" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Landscape_M2" x="72" y="295" width="30" height="30" defaultvalue="&quot;M2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Landscape_M1" x="114" y="295" width="30" height="30" defaultvalue="&quot;M1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Landscape_P0" x="157" y="295" width="30" height="30" defaultvalue="&quot;P0.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Landscape_P1" x="199" y="295" width="30" height="30" defaultvalue="&quot;P1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Landscape_P2" x="240" y="295" width="30" height="30" defaultvalue="&quot;P2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Veg_M2" x="72" y="331" width="30" height="30" defaultvalue="&quot;M2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Veg_M1" x="115" y="331" width="30" height="30" defaultvalue="&quot;M1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Veg_P0" x="157" y="331" width="30" height="30" defaultvalue="&quot;P0.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Veg_P1" x="199" y="331" width="30" height="30" defaultvalue="&quot;P1.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="Veg_P2" x="240" y="331" width="30" height="30" defaultvalue="&quot;P2.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddScore( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<LABEL name="lblImpactVeg" x="5" y="338" width="50" height="15" caption="Vegetation" tooltip="" group="true" border="false" fontsize="9">
					</LABEL>
					<EDIT name="Landscape_Score" x="276" y="295" width="50" height="30" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddImpactScore( ThisEvent.Object, \&quot;Land\&quot; )&quot;);" tooltip="" tabstop="true" border="true" readonly="true" sip="false" field="" fontsize="24" alignment="center">
					</EDIT>
					<EDIT name="Veg_Score" x="276" y="331" width="50" height="30" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_AddImpactScore( ThisEvent.Object, \&quot;Veg\&quot; )&quot;);" tooltip="" tabstop="true" border="true" readonly="true" sip="false" field="" fontsize="24" alignment="center">
					</EDIT>
					<IMAGEBOX name="btnMicrophone" x="288" y="367" width="30" height="30" defaultvalue="&quot;microphone.jpg&quot;" clickaction="none" onclick="Application.Run(&quot;C:\\DSD_MERS\\CustomScripts\\SpeechRecog.bat&quot;);" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<BUTTON name="btnClear" x="124" y="366" width="50" height="30" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;clearForm( ThisEvent.Object )&quot;);" caption="CLEAR" tooltip="" tabstop="true" border="false" alignment="center">
					</BUTTON>
					<LABEL name="lblCompanyText" x="174" y="6" width="217" height="15" caption="" tooltip="" group="true" border="false" fontsize="12">
					</LABEL>
					<IMAGEBOX onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_ImpactChoice( ThisEvent.Object )&quot; );" name="btnDune" x="73" y="258" width="50" height="30" defaultvalue="&quot;DuneFields_N.JPG&quot;" clickaction="none" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="btnDune_S" x="73" y="258" width="50" height="30" defaultvalue="&quot;DuneFields_S.JPG&quot;" clickaction="none" onclick="Applets(&quot;EditApplet&quot;).Execute(&quot;changeVisibility( ThisEvent.Object )&quot;);" tooltip="" group="true" tabstop="false" border="false" field=""/>
					<IMAGEBOX name="btnFloodplain" x="154" y="259" width="50" height="30" defaultvalue="&quot;Floodplain_N.JPG&quot;" clickaction="none" onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_ImpactChoice( ThisEvent.Object )&quot; );" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="btnFloodplain_S" x="154" y="259" width="50" height="30" defaultvalue="&quot;Floodplain_S.JPG&quot;" clickaction="none" onclick="Applets(&quot;EditApplet&quot;).Execute(&quot;changeVisibility( ThisEvent.Object )&quot;);" tooltip="" group="true" tabstop="false" border="false" field=""/>
					<IMAGEBOX onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_ImpactChoice( ThisEvent.Object )&quot; );" name="btnGibber" x="234" y="259" width="50" height="30" defaultvalue="&quot;Gibber_N.JPG&quot;" clickaction="none" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="btnGibber_S" x="234" y="259" width="50" height="30" defaultvalue="&quot;Gibber_S.JPG&quot;" clickaction="none" onclick="Applets(&quot;EditApplet&quot;).Execute(&quot;changeVisibility( ThisEvent.Object )&quot;);" tooltip="" group="true" tabstop="false" border="false" field=""/>
					<IMAGEBOX onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;editForm_ImpactChoice( ThisEvent.Object )&quot; );" name="btnSaltlake" x="319" y="259" width="50" height="30" defaultvalue="&quot;SaltLake_N.JPG&quot;" clickaction="none" tooltip="" group="true" tabstop="false" border="false" field="">
					</IMAGEBOX>
					<IMAGEBOX name="btnSaltlake_S" x="319" y="259" width="50" height="30" defaultvalue="&quot;SaltLake_S.JPG&quot;" clickaction="none" onclick="Applets(&quot;EditApplet&quot;).Execute(&quot;changeVisibility( ThisEvent.Object )&quot;);" tooltip="" group="true" tabstop="false" border="false" field=""/>
					<EDIT name="Dune_Land" x="415" y="303" width="28" height="12" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="true" border="true" sip="false" field="DUNES_LAND">
					</EDIT>
					<EDIT name="Dune_Veg" x="415" y="339" width="28" height="12" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="true" border="true" sip="false" field="DUNES_VEG">
					</EDIT>
					<EDIT name="Floodplain_Land" x="455" y="303" width="28" height="12" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="true" border="true" sip="false" field="FLOODPLAIN_LAND">
					</EDIT>
					<EDIT name="Floodplain_Veg" x="455" y="339" width="28" height="12" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="true" border="true" sip="false" field="FLOODPLAIN_VEG">
					</EDIT>
					<EDIT name="Gibber_Veg" x="495" y="338" width="28" height="13" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="true" border="true" sip="false" field="GIBBER_VEG">
					</EDIT>
					<EDIT name="Gibber_Land" x="495" y="303" width="28" height="12" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="true" border="true" sip="false" field="GIBBER_LAND">
					</EDIT>
					<EDIT name="SaltLake_Land" x="533" y="303" width="28" height="12" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="true" border="true" sip="false" field="SALTLAKE_LAND">
					</EDIT>
					<EDIT name="lblAssessor" x="417" y="20" width="80" height="12" defaultvalue="" tooltip="" tabstop="true" border="true" sip="false" field="ASSESSOR">
					</EDIT>
					<DATETIME name="Date1" x="419" y="44" width="80" height="14" defaultvalue="" tooltip="" tabstop="true" border="true" sip="false" field="ASSESSORDATE">
					</DATETIME>
					<EDIT name="txtNotes" x="5" y="48" width="323" height="35" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot;);" onsetfocus="Applets( &quot;EditApplet&quot; ).Execute ( &quot;showKeyBoard()&quot;);" tooltip="" tabstop="true" border="true" sip="false" field="NOTES" fontsize="12" multiline="true" vscroll="true">
					</EDIT>
					<EDIT name="Uphole_Score" x="277" y="190" width="50" height="30" defaultvalue="" onchange="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoArray( [ThisEvent.Object.Name, ThisEvent.Object.Text] )&quot; );" tooltip="" tabstop="false" border="true" sip="false" field="UPHOLE" fontsize="24" alignment="center">
					</EDIT>
					<EDIT name="SaltLake_Veg" x="533" y="338" width="28" height="12" defaultvalue="" tooltip="" tabstop="true" border="false" sip="false" field="" color="White" backgroundcolor="0,128,192"/>
					<LABEL name="lblName" x="174" y="26" width="217" height="15" caption="" tooltip="" group="true" border="false" fontsize="12"/>
					<EDIT name="lblPhotolink" x="525" y="20" width="190" height="12" defaultvalue="" tooltip="" tabstop="true" border="true" sip="false" field="PHOTOLINK"/>
					<BUTTON onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;undoValues( ThisEvent.Object )&quot;);" name="btnUndo" x="179" y="366" width="50" height="30" caption="UNDO" tooltip="" tabstop="true" border="false" alignment="center"/>
					<BUTTON onclick="ThisEvent.Object.Parent.Controls(&quot;txtNotes&quot;).Text=&quot;&quot;;" name="clearText" x="337" y="49" width="30" height="30" caption="X" tooltip="" tabstop="true" border="false" fontsize="24" alignment="center"/>
					<IMAGEBOX onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;getHelpFile(ThisEvent.Object, \&quot;Litter\&quot;)&quot; );" name="Litter_Help" x="337" y="90" width="29" height="29" defaultvalue="&quot;Question.jpg&quot;" clickaction="none" tooltip="" tabstop="false" border="false" field=""/>
					<IMAGEBOX onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;getHelpFile(ThisEvent.Object, \&quot;Infrastructure\&quot;)&quot; );" name="hlpInf" x="337" y="126" width="29" height="29" defaultvalue="&quot;Question.jpg&quot;" clickaction="none" tooltip="" tabstop="false" border="false" field=""/>
					<IMAGEBOX onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;getHelpFile(ThisEvent.Object, \&quot;Visual\&quot;)&quot; );" name="hlpVisImp" x="337" y="159" width="29" height="29" defaultvalue="&quot;Question.jpg&quot;" clickaction="none" tooltip="" tabstop="false" border="false" field=""/>
					<IMAGEBOX onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;getHelpFile(ThisEvent.Object, \&quot;Uphole\&quot;)&quot; );" name="hlpVegImp" x="337" y="191" width="29" height="29" defaultvalue="&quot;Question.jpg&quot;" clickaction="none" tooltip="" tabstop="false" border="false" field=""/>
					<IMAGEBOX onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;getSurfaceHelpFile(ThisEvent.Object, \&quot;Surface\&quot;)&quot; );" name="Landscape_Help" x="338" y="295" width="29" height="29" defaultvalue="&quot;Question.jpg&quot;" clickaction="none" tooltip="" tabstop="false" border="false" field=""/>
					<IMAGEBOX onclick="Applets( &quot;EditApplet&quot; ).Execute ( &quot;getSurfaceHelpFile(ThisEvent.Object, \&quot;Veg\&quot;)&quot; );" name="Veg_Help" x="338" y="332" width="29" height="29" defaultvalue="&quot;Question.jpg&quot;" clickaction="none" tooltip="" tabstop="false" border="false" field=""/>
					<BUTTON name="btnOK" x="9" y="366" width="50" height="30" caption="OK" tooltip="" tabstop="true" border="false" backgroundcolor="White" alignment="center"/>
					<BUTTON name="btnCancel" x="65" y="366" width="50" height="30" onclick="ThisEvent.Object.Parent.Parent.Close();" caption="CANCEL" tooltip="" tabstop="true" border="false" backgroundcolor="White" alignment="center"/>
				</PAGE>
			</EDITFORM>
		</FORMS>
		<METADATA/>
		<QUERY where=""/>
		<SYSTEMOBJECTS>
			<MAP onfeatureadded="Applets( &quot;EditApplet&quot; ).Execute ( &quot;onFeatureAdded( ThisEvent.Bookmark, ThisEvent.Object )&quot; );"/>
		</SYSTEMOBJECTS>
	</LAYER>
	<SCRIPT src="Layer1.js" language="JScript"/>
</ArcPad>
