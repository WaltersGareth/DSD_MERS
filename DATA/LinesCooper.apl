<ArcPad>
	<LAYER>
		<METADATA/>
		<QUERY where=""/>
		<SYMBOLOGY>
			<SIMPLELABELRENDERER visible="false" field="NAME" rotationfield="" expression="" language="">
				<TEXTSYMBOL fontcolor="Black" font="MS Shell Dlg" fontsize="7" rtl="false" fontstyle="regular">
				</TEXTSYMBOL>
			</SIMPLELABELRENDERER>
			<SIMPLERENDERER>
				<COMPLEXLINESYMBOL width="0.8"/>
			</SIMPLERENDERER>
		</SYMBOLOGY>
		<FORMS>
			<IDENTIFYFORM name="IDENTIFYFORM" caption="Identify Form" width="250" height="250" picturepagevisible="false" attributespagevisible="false" symbologypagevisible="false" geographypagevisible="false" required="true" tabsvisible="false">
				<PAGE name="PAGE1" caption="Page 1" sip="false">
					<EDIT name="Edit1" x="46" y="46" width="158" height="13" defaultvalue="" tooltip="" tabstop="true" border="false" readonly="true" sip="false" field="SURVEY" fontsize="12"/>
					<EDIT name="Edit2" x="46" y="102" width="158" height="13" defaultvalue="" tooltip="" tabstop="true" border="false" readonly="true" sip="false" field="LINE" fontsize="13"/>
					<LABEL name="lblSurvey" x="45" y="22" width="201" height="19" caption="Survey" tooltip="" group="true" border="false" fontsize="12"/>
					<LABEL name="lblLineID" x="45" y="79" width="197" height="16" caption="Line ID" tooltip="" group="true" border="false" fontsize="12"/>
				</PAGE>
			</IDENTIFYFORM>
		</FORMS>
		<FIND>
			<QUERYBUILDER>
				<QUERYFRAGMENT field="*" operator="*=*" value="gps test clear" fragmentoperator="AND"/>
			</QUERYBUILDER>
		</FIND>
	</LAYER>
	<SCRIPT src="Layer1.js" language="JScript"/>
</ArcPad>
