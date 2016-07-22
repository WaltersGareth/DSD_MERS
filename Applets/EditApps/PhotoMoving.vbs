Option Explicit
Dim newLocation
newLocation = "C:\DSD_MERS\Attachments\" & Application.UserProperties("region") & "\"
Dim objID


Sub MoveImages()

Dim pFile, arrFileNames, strCurrFileName
Set pFile = Application.CreateAppObject("File")

Dim origLocation
origLocation = "C:\DSD_MERS\DATA\AXFs\" & Application.UserProperties("region") & "_WGS\"

Dim findString
findString = origLocation & "2*.jpg"

arrFileNames = pFile.FindFiles( findString )
Dim counter
counter = 0

If IsArray(arrFileNames) Then

	Dim ds
	Set ds = Map.EditLayer.DataSource

	For Each strCurrFileName in arrFileNames
		counter = counter + 1

		Dim newfile, justFile
		newFile = newLocation & Application.UserProperties("PhotoID") & "_" & counter & ".jpg"
		justFile = Application.UserProperties("PhotoID") & "_" & counter & ".jpg"
		Dim origFile
		origFile = origLocation & strCurrFileName

		Dim sqlStr
		objID = -( int( Timer + (rnd * 100) ) )

		sqlStr = "INSERT INTO [MERREGAPP_PHOTOATTACHMENTS] (OBJECTID, PHOTOLINK, FILENAME, HYPERLINK, AXF_STATUS, AXF_TIMESTAMP) VALUES ( " & objID &  ", '" & Application.UserProperties("PhotoID") & "', '" & justFile & "', '" & newFile & "', 1, GETDATE() );"

		If ds.IsOpen Then
			ds.Execute sqlStr
		End If

		Call pFile.Move (origFile, newFile)
		
	Next

	ds.Close

End If
End Sub

Sub MoveVoiceRecordings()

Dim pFile, arrFileNames, strCurrFileName
Set pFile = Application.CreateAppObject("File")

Dim origLocation
origLocation = "C:\UserData\Music\Audio Recordings\"

Dim findString
findString = origLocation & "Audio*.mp3"

arrFileNames = pFile.FindFiles( findString )
Dim counter
counter = 0

If IsArray(arrFileNames) Then

	Dim ds
	Set ds = Map.EditLayer.DataSource

	For Each strCurrFileName in arrFileNames
		counter = counter + 1

		Dim newfile, justFile
		newFile = newLocation & Application.UserProperties("PhotoID") & "_" & counter & ".mp3"
		justFile = Application.UserProperties("PhotoID") & "_" & counter & ".mp3"
		Dim origFile
		origFile = origLocation & strCurrFileName

		Dim sqlStr
		objID = -( int( Timer + (rnd * 100) ) )

		sqlStr = "INSERT INTO [MERREGAPP_PHOTOATTACHMENTS] (OBJECTID, PHOTOLINK, FILENAME, HYPERLINK, AXF_STATUS, AXF_TIMESTAMP) VALUES ( " & objID &  ", '" & Application.UserProperties("PhotoID") & "', '" & justFile & "', '" & newFile & "', 1, GETDATE() );"

		If ds.IsOpen Then
			ds.Execute sqlStr
		End If

		Call pFile.Move (origFile, newFile)
		
	Next

	ds.Close

End If

End Sub
