param(
    [int]$Limit = 10000,
    [int]$MaxDepth = 8
)

$source = Join-Path $PSScriptRoot 'SlopeGapSearch.cs'
Add-Type -Path $source -ReferencedAssemblies 'System.Numerics.dll'
[SlopeGapSearch]::Main(@("$Limit", "$MaxDepth"))
