$source = Join-Path $PSScriptRoot 'FcdDecompositionSearch.cs'
$output = Join-Path $PSScriptRoot 'FcdDecompositionSearch.exe'
Add-Type -Path $source -ReferencedAssemblies System.Numerics -OutputAssembly $output -OutputType ConsoleApplication
& $output @args
