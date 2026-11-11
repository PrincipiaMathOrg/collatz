param(
    [int]$EndpointLimit = 199,
    [int]$MaxDepth = 5,
    [int]$MaxLetter = 8
)

$source = Join-Path $PSScriptRoot 'TotalExponentOrderSearch.cs'
Add-Type -Path $source -ReferencedAssemblies 'System.Numerics.dll'
[TotalExponentOrderSearch]::Main(@("$EndpointLimit", "$MaxDepth", "$MaxLetter"))
