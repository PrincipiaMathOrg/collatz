$source = Join-Path $PSScriptRoot 'FcdTauMitm.cs'
$output = Join-Path $PSScriptRoot 'FcdTauMitm.exe'
Add-Type -Path $source -ReferencedAssemblies System.Numerics -OutputAssembly $output -OutputType ConsoleApplication
& $output @args
