param([int]$MaxLength = 25)

$source = Join-Path $PSScriptRoot 'FrontierSearch.cs'
Add-Type -Path $source -ReferencedAssemblies 'System.Numerics.dll'
[FrontierSearch]::Main(@("$MaxLength"))
