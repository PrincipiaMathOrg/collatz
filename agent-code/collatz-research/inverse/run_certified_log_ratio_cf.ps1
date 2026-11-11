$source = Join-Path $PSScriptRoot 'CertifiedLogRatioCF.cs'
$output = Join-Path $PSScriptRoot 'CertifiedLogRatioCF.exe'
Add-Type -Path $source -ReferencedAssemblies System.Numerics -OutputAssembly $output -OutputType ConsoleApplication
& $output @args
