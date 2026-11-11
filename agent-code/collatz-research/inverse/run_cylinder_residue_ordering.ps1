$source = Join-Path $PSScriptRoot 'CylinderResidueOrdering.cs'
$output = Join-Path $PSScriptRoot 'CylinderResidueOrdering.exe'
Add-Type -Path $source -ReferencedAssemblies System.Numerics -OutputAssembly $output -OutputType ConsoleApplication
& $output @args
