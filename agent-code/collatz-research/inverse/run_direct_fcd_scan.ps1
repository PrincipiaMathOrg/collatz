$source = Join-Path $PSScriptRoot 'DirectFcdScan.cs'
$output = Join-Path $PSScriptRoot 'DirectFcdScan.exe'
Add-Type -Path $source -ReferencedAssemblies System.Numerics -OutputAssembly $output -OutputType ConsoleApplication
& $output @args
