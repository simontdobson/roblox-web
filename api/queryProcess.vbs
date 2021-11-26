Option Explicit
    Dim objWMIService, colProcess, objProcess
    set objWMIService = GetObject("winmgmts:" _
    & "{impersonationLevel=impersonate}!\\" _ 
    & ".\root\cimv2")
    Set colProcess = objWMIService.ExecQuery _
    ("Select * from Win32_Process Where Name = 'RobloxPlayerBeta.exe'")
	if (colProcess.count = 0) then
	else 
      For Each objProcess in colProcess
	    WScript.Echo objProcess.ProcessId
      Next
	end if
