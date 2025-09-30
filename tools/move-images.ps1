# PowerShell helper to move common images into the new assets folders
# Run this from the repository root (where index.html is located):
# powershell -ExecutionPolicy Bypass -File .\tools\move-images.ps1

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
# assume repository root is the parent of the tools directory (one level up from the script)
$root = Split-Path -Parent $scriptDir
Write-Host "Script directory: $scriptDir"
Write-Host "Repository root: $root"

$moves = @(
    @{ srcs = @('Dragonfly_HeaderBackground.jpg'); dst = 'assets/images/header-backgrounds/Dragonfly_HeaderBackground.jpg' },
    @{ srcs = @('Dragonfly_Background1.jpg'); dst = 'assets/images/header-backgrounds/Dragonfly_Background1.jpg' },
    @{ srcs = @('Dragonfly_Background2.jpg'); dst = 'assets/images/header-backgrounds/Dragonfly_Background2.jpg' },
    @{ srcs = @('NASA_logo.png'); dst = 'assets/images/experiences/NASA_logo.png' },
    @{ srcs = @('WSS___dur25p0_q50.gif'); dst = 'assets/images/experiences/WSS___dur25p0_q50.gif' },
    # accept multiple possible profile filename variations
    @{ srcs = @('JAsiatico_Profile.JPG','JAsiatico_Profile.jpg'); dst = 'assets/images/experiences/JAsiatico_Profile.jpg' }
)

foreach($entry in $moves){
    $moved = $false
    foreach($name in $entry.srcs){
        $src = Join-Path $root $name
        if(-not (Test-Path $src)){
            continue
        }
        $dst = Join-Path $root $entry.dst
        $dstDir = Split-Path -Parent $dst
        if(-not (Test-Path $dstDir)){
            New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
        }
        try{
            Move-Item -Path $src -Destination $dst -Force
            Write-Host "Moved $src -> $dst" -ForegroundColor Green
            $moved = $true
            break
        } catch {
            Write-Host "Failed to move $src -> $dst : $_" -ForegroundColor Red
        }
    }
    if(-not $moved){
        # none of the candidate source names were found
        $names = $entry.srcs -join ', '
        Write-Host "Source not found (any of): $names" -ForegroundColor Yellow
    }
}

Write-Host "Done. If some files were not moved, check the file names and run the script again."