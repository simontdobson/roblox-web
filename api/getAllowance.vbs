Set wshShell=CreateObject("WScript.Shell" )
Set args = WScript.Arguments
regKeySuffix=args(0)
dailyAllowance=wshShell.RegRead( "HKEY_CURRENT_CONFIG\RobloxDailyAllowance\minutes" & regKeySuffix)
WScript.Echo dailyAllowance