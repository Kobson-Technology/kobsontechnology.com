Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\Kobson Technology\Desktop\Kobson School Pay\kobsontechnology.com\public\images\logo.jpg"
$outputPath = "C:\Users\Kobson Technology\Desktop\Kobson School Pay\kobsontechnology.com\public\images\logo.png"

if (-not (Test-Path $inputPath)) {
    Write-Host "Input file not found."
    exit 1
}

$image = [System.Drawing.Bitmap]::FromFile($inputPath)
$image.MakeTransparent([System.Drawing.Color]::White)

$image.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$image.Dispose()

Write-Host "Logo converted and saved to $outputPath"
