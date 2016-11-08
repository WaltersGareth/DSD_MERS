Option Explicit
Dim newLocation
Dim objID

Sub MoveImages()
Console.print "about to run moving images..."

Dim pFile, arrFileNames, strCurrFileName
Set pFile = Application.CreateAppObject("File")

Dim origLocation, httpLocation
origLocation = "C:\DSD_MERS\DATA\AXFs\" & Application.UserProperties("region") & "\"
newLocation = "C:\DSD_MERS\Attachments\" & Application.UserProperties("region") & "\"
httpLocation = "http://dsd-mer-reg-app.s3.amazonaws.com/"
Console.print origLocation

Console.print newLocation

Dim findString
findString = origLocation & "2*.jpg"

arrFileNames = pFile.FindFiles( findString )
Dim counter
counter = 0

If IsArray(arrFileNames) Then
Console.print "in the array..."
	Dim ds
	Set ds = Map.EditLayer.DataSource

	For Each strCurrFileName in arrFileNames
		counter = counter + 1

		Dim newfile, justFile, httpFile

		Console.print newLocation

		newFile = newLocation & Application.UserProperties("PhotoID") & "_" & counter & ".jpg"
		httpFile = httpLocation & Application.UserProperties("PhotoID") & "_" & counter & ".jpg"

		justFile = Application.UserProperties("PhotoID") & "_" & counter & ".jpg"
		Dim origFile
		origFile = origLocation & strCurrFileName

		Dim sqlStr
		objID = -( int( Timer + (rnd * 100) ) )

		sqlStr = "INSERT INTO [MERREGAPP_PHOTOATTACHMENTS] (OBJECTID, PHOTOLINK, FILENAME, HYPERLINK, AXF_STATUS, AXF_TIMESTAMP) VALUES ( " & objID &  ", '" & Application.UserProperties("PhotoID") & "', '" & justFile & "', '" & httpFile & "', 1, GETDATE() );"

		Console.print sqlStr
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
