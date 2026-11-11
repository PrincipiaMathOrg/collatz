param(
    [UInt64]$Seed = 837799,
    [int]$MaxDepth = 195
)

$source = Join-Path $PSScriptRoot 'StationaryExposureCertificate.cs'
Add-Type -Path $source
[StationaryExposureCertificate]::Main(@("$Seed", "$MaxDepth"))
