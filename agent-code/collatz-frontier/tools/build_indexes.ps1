param(
    [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..')).Path
)

$ErrorActionPreference = 'Stop'

$frontierRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$researchRoot = Join-Path $RepoRoot 'agent-code\collatz-research'
$auditRoot = Join-Path $RepoRoot 'agent-code\collatz-audit-bundle'
$dataRoot = Join-Path $frontierRoot 'data'

New-Item -ItemType Directory -Force -Path $dataRoot | Out-Null

function Get-RelativePath([string]$BasePath, [string]$TargetPath) {
    $base = [System.IO.Path]::GetFullPath($BasePath).TrimEnd('\') + '\'
    $target = [System.IO.Path]::GetFullPath($TargetPath)
    $baseUri = [Uri]::new($base)
    $targetUri = [Uri]::new($target)
    return [Uri]::UnescapeDataString($baseUri.MakeRelativeUri($targetUri).ToString()).Replace('\', '/')
}

function Get-Title([string]$Path) {
    $line = Get-Content -LiteralPath $Path | Where-Object { $_ -match '^#\s+(.+)$' } | Select-Object -First 1
    if ($line -match '^#\s+(.+)$') { return $Matches[1].Trim() }
    return [System.IO.Path]::GetFileNameWithoutExtension($Path)
}

function Get-Field([string[]]$Lines, [string]$Name) {
    $escaped = [regex]::Escape($Name)
    foreach ($line in $Lines) {
        if ($line -match "^\*\*${escaped}:\*\*\s*(.+)$") { return $Matches[1].Trim() }
        if ($line -match "^${escaped}:\s*(.+)$") { return $Matches[1].Trim() }
    }
    return $null
}

function Get-StatusExcerpt([string[]]$Lines) {
    $direct = Get-Field $Lines 'Status'
    if ($direct) { return $direct }

    for ($i = 0; $i -lt $Lines.Count; $i++) {
        if ($Lines[$i] -match '^##\s+(Status|Outcome|Conclusion)\s*$') {
            $parts = [System.Collections.Generic.List[string]]::new()
            for ($j = $i + 1; $j -lt $Lines.Count; $j++) {
                $candidate = $Lines[$j].Trim()
                if ($candidate -match '^#') { break }
                if ($candidate.Length -eq 0) {
                    if ($parts.Count -gt 0) { break }
                    continue
                }
                $parts.Add($candidate)
            }
            if ($parts.Count -gt 0) { return ($parts -join ' ') }
        }
    }
    return $null
}

function Get-Branch([string]$Name) {
    if ($Name -match '^cycle_one_drop_') { return 'cycle/one-drop' }
    if ($Name -match '^(cycle_|isolated_)') { return 'cycle/general' }
    if ($Name -match '^(q2_|fcd_|corner_flux_)') { return 'first-crossing/FCD' }
    if ($Name -match '^(divergence_|sync_|hsci_|padic_|async_)') { return 'divergence/synchronization' }
    if ($Name -match '^inverse_fiber') { return 'stationary-inverse-fiber' }
    if ($Name -match '^transition_entropy') { return 'shared-transition-complexity' }
    if ($Name -match '^negative_supercritical') { return 'negative-shadow/barrier' }
    return 'cross-branch'
}

function Get-ConsolidatedItem([int]$Round, [string]$Name) {
    if ($Name -eq 'cycle_full_boundary_winding.md') { return 'THM-CYCLE-BOUNDARY-WIND-01' }
    if ($Name -eq 'cycle_full_boundary_winding_attack_2026-08-26.md') { return 'OPEN-CYCLE-WIND-01' }
    if ($Name -eq 'cycle_boundary_anchored_lattice_attack_2026-08-26.md') { return 'THM-CYCLE-SHADOW-01' }
    if ($Name -eq 'divergence_dual_tail_companion.md') { return 'THM-DIV-DUAL-TAIL-01' }
    if ($Name -eq 'divergence_companion_charge_rounding.md') { return 'THM-DIV-CHARGE-01' }
    if ($Name -eq 'q2_one_corner_complete.md') { return 'THM-FCD-ONECORNER-01' }
    if ($Name -eq 'q2_two_corner_complete.md') { return 'THM-FCD-TWOCORNER-01' }
    if ($Name -eq 'q2_three_corner_complete.md') { return 'THM-FCD-THREECORNER-01' }
    if ($Name -eq 'q2_four_corner_complete.md') { return 'THM-FCD-FOURCORNER-01' }
    if ($Name -eq 'q2_corner_growth.md') { return 'THM-FCD-CORNERGROWTH-01' }
    if ($Name -eq 'q2_terminal_preserving_flux.md') { return 'THM-FCD-TERMINAL-FLUX-01' }
    if ($Name -eq 'q2_sharp_corner_growth.md') { return 'THM-FCD-SHARP-CORNERGROWTH-01' }
    if ($Name -eq 'q2_parity_flux_compression.md') { return 'NOGO-FCD-TERMINAL-PARITY-01' }
    if ($Name -eq 'q2_centered_filter_reduction.md') { return 'NOGO-FCD-CENTERED-FILTER-01' }
    if ($Name -eq 'q2_exactness_lifted_packet_container.md') { return 'THM-FCD-PACKET-LIFT-01' }
    if ($Round -ge 95 -and $Round -le 97) { return 'THM-CYCLE-SINGLECLASS-01' }
    if ($Round -eq 98 -or $Round -eq 100) { return 'NOGO-CYCLE-UNIVERSAL-01' }
    if ($Round -eq 99) { return 'THM-DIV-RETURN-01' }
    if ($Name -match '^cycle_one_drop_') { return 'THM-ONEDROP-01' }
    if ($Name -match '^(cycle_|isolated_)') { return 'THM-CYCLE-REDUCE-01' }
    if ($Name -match '^(q2_|fcd_|corner_flux_)') { return 'THM-FCD-REDUCE-01' }
    if ($Name -match '^(divergence_|sync_|hsci_|padic_|async_)') { return 'THM-DIV-RETURN-01' }
    if ($Name -match '^inverse_fiber') { return 'THM-FIBER-EQUIV-01' }
    if ($Name -match '^transition_entropy') { return 'THM-DIV-TRANSITION-01' }
    if ($Name -match '^negative_supercritical') { return 'CERT-TARGET1-01' }
    return 'THM-AFFINE-01'
}

function Get-Disposition([int]$Round, [string]$Name) {
    if ($Round -ge 95) { return 'post-master-frontier-refinement' }
    if ($Name -match 'no_go') { return 'method-ceiling' }
    if ($Name -match '(complete|solve|cutoff)') { return 'closed-subresult' }
    return 'historical-research-step'
}

function Get-EvidenceReferences([string]$Path, [string]$Text) {
    $items = [System.Collections.Generic.List[object]]::new()
    $seen = @{}
    $patterns = @(
        '\]\(([^)]+\.(?:js|cs|cpp|py|ps1|out|csv|sha256|lean))\)',
        '`([^`]+\.(?:js|cs|cpp|py|ps1|out|csv|sha256|lean))`'
    )
    foreach ($pattern in $patterns) {
        foreach ($match in [regex]::Matches($Text, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
            $raw = $match.Groups[1].Value.Split('#')[0]
            if ($raw -match '^(https?|doi):') { continue }
            if ($seen.ContainsKey($raw)) { continue }
            $seen[$raw] = $true
            $resolved = Join-Path (Split-Path $Path -Parent) $raw
            if (-not (Test-Path -LiteralPath $resolved) -and $raw -notmatch '[/\\]' -and $script:artifactByName.ContainsKey($raw.ToLowerInvariant())) {
                $candidates = @($script:artifactByName[$raw.ToLowerInvariant()])
                if ($candidates.Count -eq 1) { $resolved = $candidates[0] }
            }
            $items.Add([ordered]@{
                reference = $raw.Replace('\', '/')
                resolved_path = Get-RelativePath $RepoRoot $resolved
                exists = Test-Path -LiteralPath $resolved
            })
        }
    }
    return $items.ToArray()
}

$excluded = @('MASTER_PROOF_SKELETON.md', 'PROOF_LEDGER.md')
$script:artifactByName = @{}
foreach ($artifact in Get-ChildItem -LiteralPath @($researchRoot, $auditRoot) -Recurse -File) {
    $key = $artifact.Name.ToLowerInvariant()
    if (-not $script:artifactByName.ContainsKey($key)) { $script:artifactByName[$key] = [System.Collections.Generic.List[string]]::new() }
    $script:artifactByName[$key].Add($artifact.FullName)
}
$roundFiles = Get-ChildItem -LiteralPath $researchRoot -File -Filter '*.md' |
    Where-Object { $_.Name -notin $excluded } |
    Sort-Object CreationTime, Name

if ($roundFiles.Count -lt 100) {
    throw "Expected at least the 100 reconstructed substantive root Markdown notes; found $($roundFiles.Count)."
}

$master = Get-Item -LiteralPath (Join-Path $researchRoot 'MASTER_PROOF_SKELETON.md')
$rounds = [System.Collections.Generic.List[object]]::new()
for ($i = 0; $i -lt $roundFiles.Count; $i++) {
    $file = $roundFiles[$i]
    $lines = Get-Content -LiteralPath $file.FullName
    $text = $lines -join "`n"
    $round = $i + 1
    $evidenceRefs = @(Get-EvidenceReferences $file.FullName $text)
    $rounds.Add([ordered]@{
        round_id = ('R{0:D3}' -f $round)
        chronology_rank = $round
        chronology_basis = 'filesystem CreationTime; reconstructed because source notes contain no round identifier'
        source_path = Get-RelativePath $RepoRoot $file.FullName
        source_ctime_local = $file.CreationTime.ToString('yyyy-MM-ddTHH:mm:ss')
        source_mtime_local = $file.LastWriteTime.ToString('yyyy-MM-ddTHH:mm:ss')
        title = Get-Title $file.FullName
        declared_date = Get-Field $lines 'Date'
        declared_mode = Get-Field $lines 'Mode'
        status_excerpt = Get-StatusExcerpt $lines
        branch = Get-Branch $file.Name
        disposition = Get-Disposition $round $file.Name
        consolidated_item = Get-ConsolidatedItem $round $file.Name
        later_than_master = $round -ge 95
        sha256 = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
        evidence_references = $evidenceRefs
    })
}

$roundData = [ordered]@{
    schema_version = 1
    generated_at = (Get-Date).ToString('o')
    chronology_warning = "R001-R$('{0:D3}' -f $roundFiles.Count) are reconstructed by sorting the $($roundFiles.Count) substantive root Markdown notes by filesystem CreationTime, with filename as a deterministic tie-breaker. They are labels for this catalog, not recovered authorial metadata."
    excluded_root_markdown = $excluded
    master_mtime_local = $master.LastWriteTime.ToString('yyyy-MM-ddTHH:mm:ss')
    count = $rounds.Count
    rounds = $rounds
}
$roundData | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath (Join-Path $dataRoot 'rounds.json') -Encoding utf8

$roundMd = [System.Collections.Generic.List[string]]::new()
$lastRoundId = 'R{0:D3}' -f $roundFiles.Count
$roundMd.Add("# Reconstructed R001-$lastRoundId index")
$roundMd.Add('')
$roundMd.Add("There are $($roundFiles.Count) substantive root-level Markdown research notes after excluding ``MASTER_PROOF_SKELETON.md`` and ``PROOF_LEDGER.md``. The notes do not contain round numbers. The identifiers below are therefore reconstructed by sorting filesystem ``CreationTime`` and using the filename as a deterministic tie-breaker. They are catalog labels, not recovered authorial metadata.")
$roundMd.Add('')
$roundMd.Add('The `Consolidates into` column points to the canonical result ledger; it does not claim that every historical note proved that result. A `method-ceiling` row records a useful failure or insufficiency.')
$roundMd.Add('')
$roundMd.Add('| ID | Local creation timestamp | Branch | Disposition | Source | Consolidates into |')
$roundMd.Add('|---|---|---|---|---|---|')
foreach ($row in $rounds) {
    $fileName = Split-Path $row.source_path -Leaf
    $link = "../collatz-research/$fileName"
    $flag = if ($row.later_than_master) { ' (post-master)' } else { '' }
    $roundMd.Add("| $($row.round_id) | $($row.source_ctime_local)$flag | $($row.branch) | $($row.disposition) | [$fileName]($link) | $($row.consolidated_item) |")
}
$roundMd.Add('')
$roundMd.Add('Machine-readable metadata, status excerpts, hashes, and detected certificate references are in [`data/rounds.json`](data/rounds.json).')
$roundMd | Set-Content -LiteralPath (Join-Path $frontierRoot 'round_index.md') -Encoding utf8

function Get-Role([System.IO.FileInfo]$File) {
    $relative = Get-RelativePath $RepoRoot $File.FullName
    if ($relative -match '/prior_certificates/') { return 'historical-certificate-not-in-trust-boundary' }
    if ($relative -match '/certificates/' -or $relative -match '/cycles/' -or $relative -match '/inverse/' -or $relative -match '/sync/') {
        if ($File.Extension -in @('.js', '.cs', '.cpp', '.py', '.ps1', '.lean')) { return 'code-or-formal-artifact' }
        if ($File.Extension -in @('.out', '.csv', '.sha256')) { return 'certificate-output-or-manifest' }
    }
    if ($File.Extension -in @('.md', '.tex', '.txt')) { return 'prose-source' }
    if ($File.Extension -eq '.pdf') { return 'rendered-document' }
    return 'supporting-artifact'
}

$inventory = [System.Collections.Generic.List[object]]::new()
foreach ($corpus in @(
    [ordered]@{ name = 'collatz-research'; root = $researchRoot },
    [ordered]@{ name = 'collatz-audit-bundle'; root = $auditRoot }
)) {
    foreach ($file in Get-ChildItem -LiteralPath $corpus.root -Recurse -File | Sort-Object FullName) {
        $inventory.Add([ordered]@{
            corpus = $corpus.name
            path = Get-RelativePath $RepoRoot $file.FullName
            role = Get-Role $file
            extension = $file.Extension.ToLowerInvariant()
            size_bytes = $file.Length
            mtime_local = $file.LastWriteTime.ToString('yyyy-MM-ddTHH:mm:ss')
            sha256 = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
        })
    }
}

$duplicateGroups = $inventory | Group-Object sha256 | Where-Object Count -gt 1 | ForEach-Object {
    [ordered]@{ sha256 = $_.Name; paths = @($_.Group.path) }
}

$inventoryData = [ordered]@{
    schema_version = 1
    generated_at = (Get-Date).ToString('o')
    counts = [ordered]@{
        total = $inventory.Count
        collatz_research = @($inventory | Where-Object corpus -eq 'collatz-research').Count
        collatz_audit_bundle = @($inventory | Where-Object corpus -eq 'collatz-audit-bundle').Count
    }
    duplicate_content_groups = @($duplicateGroups)
    files = $inventory
}
$inventoryData | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $dataRoot 'file_inventory.json') -Encoding utf8

function Test-HashManifest([string]$ManifestPath, [string]$BasePath) {
    $results = [System.Collections.Generic.List[object]]::new()
    foreach ($line in Get-Content -LiteralPath $ManifestPath) {
        if ($line.Trim().Length -eq 0 -or $line.TrimStart().StartsWith('#')) { continue }
        if ($line -notmatch '^([0-9a-fA-F]{64})\s+\*?(.+)$') {
            $results.Add([ordered]@{ entry = $line; status = 'unparsed' })
            continue
        }
        $expected = $Matches[1].ToLowerInvariant()
        $entry = $Matches[2].Trim().Replace('/', '\')
        $target = Join-Path $BasePath $entry
        if (-not (Test-Path -LiteralPath $target)) {
            $results.Add([ordered]@{ entry = $entry.Replace('\', '/'); status = 'missing'; expected = $expected })
            continue
        }
        $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant()
        $results.Add([ordered]@{
            entry = $entry.Replace('\', '/')
            status = if ($actual -eq $expected) { 'verified' } else { 'mismatch' }
            expected = $expected
            actual = $actual
        })
    }
    return @($results)
}

$manifestRuns = @(
    [ordered]@{
        manifest = 'agent-code/collatz-audit-bundle/certificates/SHA256SUMS'
        base = 'agent-code/collatz-audit-bundle/certificates'
        results = Test-HashManifest (Join-Path $auditRoot 'certificates\SHA256SUMS') (Join-Path $auditRoot 'certificates')
    },
    [ordered]@{
        manifest = 'agent-code/collatz-research/cycles/certificate_hashes.sha256'
        base = 'agent-code/collatz-research/cycles'
        results = Test-HashManifest (Join-Path $researchRoot 'cycles\certificate_hashes.sha256') (Join-Path $researchRoot 'cycles')
    },
    [ordered]@{
        manifest = 'agent-code/collatz-research/RESEARCH_MANIFEST.sha256'
        base = '.'
        results = Test-HashManifest (Join-Path $researchRoot 'RESEARCH_MANIFEST.sha256') $RepoRoot
    }
)

$manifestData = [ordered]@{
    schema_version = 1
    generated_at = (Get-Date).ToString('o')
    note = 'This checks only that present files match recorded hashes. It does not rerun programs or validate mathematical claims.'
    manifests = $manifestRuns
}
$manifestData | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $dataRoot 'manifest_check.json') -Encoding utf8

Write-Output "Wrote $($rounds.Count) reconstructed rounds and $($inventory.Count) source-file inventory records."
