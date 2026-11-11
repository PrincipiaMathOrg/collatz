param(
    [int]$Limit = 99,
    [int]$MaxDepth = 4
)

$source = Join-Path $PSScriptRoot 'FormulaCheck.cs'
Add-Type -Path $source -ReferencedAssemblies 'System.Numerics.dll'
[FormulaCheck]::Main(@("$Limit", "$MaxDepth"))
