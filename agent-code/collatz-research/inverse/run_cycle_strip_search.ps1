$source = Join-Path $PSScriptRoot 'CycleStripSearch.cs'
$output = Join-Path $PSScriptRoot 'CycleStripSearch.exe'
Add-Type -Path $source -ReferencedAssemblies System.Numerics -OutputAssembly $output -OutputType ConsoleApplication
& $output @args
