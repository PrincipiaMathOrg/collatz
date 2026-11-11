param(
    [int]$Limit = 1000000,
    [int]$MaxDepth = 200
)

$source = Join-Path $PSScriptRoot 'InverseFiberScan.cs'
Add-Type -Path $source
[InverseFiberScan]::Main(@("$Limit", "$MaxDepth"))
