#include <File.au3>
#include <MsgBoxConstants.au3>
#include <FileConstants.au3>
#include <WinAPIFiles.au3>
#include <Array.au3>

#pragma compile(Icon, '..\icon.ico')

$ParentDir = StringLeft(@scriptDir,StringInStr(@scriptDir,"\",0,-1)-1)
$BaseCMD = "node index.js"

#Run(@ComSpec & " /c " & $CMD, $ParentDir)
#RunWait(@ComSpec & " /c " & $CMD, $ParentDir, @SW_SHOW)

Func GetDir($sFilePath)
    If Not IsString($sFilePath) Then
        Return SetError(1, 0, -1)
    EndIf

    Local $FileDir = StringRegExpReplace($sFilePath, "\\[^\\]*$", "")

    Return $FileDir
EndFunc

For $i = 1 To $CmdLine[0]
   Local $filePath = $CmdLine[$i]
   If FileExists ($filePath) == 1 Then

    FileChangeDir ( GetDir($filePath) )

    Local $cmd = $BaseCMD &' "' & $filePath & '"'

	#MsgBox($MB_SYSTEMMODAL, $ParentDir, $cmd)

	Run($cmd, $ParentDir, @SW_MINIMIZE)

   EndIf
Next