$ErrorActionPreference = 'Stop'
$source = Get-Content -Raw -Encoding UTF8 public/locales/de.json | ConvertFrom-Json
$entries = @($source.PSObject.Properties)
foreach ($language in @('en','tr','pl','ro','sq','es','fr','el','uk','bg','it')) {
  $output = [ordered]@{}
  for ($i = 0; $i -lt $entries.Count; $i += 8) {
    $batch = @($entries[$i..([Math]::Min($i+7,$entries.Count-1))])
    $query = ($batch | ForEach-Object { $_.Value.Replace("`n",' ') }) -join "`n"
    $uri = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=' + $language + '&dt=t&q=' + [Uri]::EscapeDataString($query)
    $response = Invoke-RestMethod -Uri $uri
    $translated = (($response[0] | ForEach-Object { $_[0] }) -join '') -split "`n"
    if ($translated.Count -ne $batch.Count) { throw "Wrong count $language $i" }
    for ($j = 0; $j -lt $batch.Count; $j++) { $output[$batch[$j].Name] = $translated[$j].Trim() }
  }
  $json = $output | ConvertTo-Json -Depth 4
  [IO.File]::WriteAllText((Join-Path (Get-Location) "public/locales/$language.json"), $json, [Text.UTF8Encoding]::new($false))
  Write-Output "$language complete"
}
