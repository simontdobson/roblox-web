Set wshShell=CreateObject("WScript.Shell" )
Set args = WScript.Arguments
regKeySuffix=args(0)
value=args(1)
dailyAllowance=wshShell.RegWrite( "HKEY_CURRENT_CONFIG\RobloxDailyAllowance\minutes" & regKeySuffix, value )
WScript.Echo dailyAllowance