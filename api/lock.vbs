On Error Resume Next
Set objShell = CreateObject("Wscript.Shell")
objShell.Run "%windir%\System32\rundll32.exe user32.dll,LockWorkStation"