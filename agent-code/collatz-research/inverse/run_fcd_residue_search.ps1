$source = Join-Path $PSScriptRoot 'FcdResidueSearch.cs'
$output = Join-Path $PSScriptRoot 'FcdResidueSearch.exe'
Add-Type -Path $source -ReferencedAssemblies System.Numerics -OutputAssembly $output -OutputType ConsoleApplication
& $output @args
