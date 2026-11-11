$source = Join-Path $PSScriptRoot 'FcdLowTauTargetSearch.cs'
$output = Join-Path $PSScriptRoot 'FcdLowTauTargetSearch.exe'
Add-Type -Path $source -ReferencedAssemblies System.Numerics -OutputAssembly $output -OutputType ConsoleApplication
& $output @args
