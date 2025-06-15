# Download OpenMoji PNG icons used by MiniTools Universe
$ErrorActionPreference = 'Stop'
$assets = @{
    'index-wrench.png' = '1F527'
    'index-wrench-512.png' = '1F527'
    'age-calculator-cake.png' = '1F382'
    'base64-encoder-keyboard.png' = '1F524'
    'basic-calculator-emoji.png' = '1F9EE'
    'bmi-calculator-scale.png' = '2696-FE0F'
    'bmr-calculator-fire.png' = '1F525'
    'body-fat-calculator-bicep.png' = '1F4AA'
    'loan-bank.png' = '1F3E6'
    'circle-area-calculator-circle.png' = '2B55'
    'compound-interest-chart.png' = '1F4B9'
    'countdown-timer-hourglass.png' = '23F3'
    'csv-to-json-bookmark.png' = '1F4D1'
    'currency-converter-money.png' = '1F4B1'
    'date-diff-calendar.png' = '1F4C6'
    'dice-die.png' = '1F3B2'
    'discount-label.png' = '1F3F7-FE0F'
    'fraction-calculator-briefcase.png' = '1F4BC'
    'fuel-cost-calculator-pump.png' = '26FD'
    'graphing-calculator-chart.png' = '1F4C8'
    'json-formatter-braces.png' = '7B-7D'
    'markdown-editor-pencil.png' = '1F4DD'
    'palette.png' = '1F3A8'
    'percentage-calculator-bars.png' = '1F4CA'
    'pomodoro-timer-tomato.png' = '1F345'
    'scientific-calculator-triangle.png' = '1F4D0'
    'simple-interest-calculator-moneybag.png' = '1F4B0'
    'stopwatch.png' = '23F1-FE0F'
    'temperature-converter-thermometer.png' = '1F321-FE0F'
    'time-zone-converter-clock.png' = '1F551'
    'tip-calculator-money.png' = '1F4B5'
    'triangle-area-calculator-triangle.png' = '1F53A'
    'unit-converter-cycle.png' = '1F504'
    'uuid-generator-id.png' = '1F194'
}
$smallBase = 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/72x72'
$largeBase = 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/618x618'
if(!(Test-Path 'assets')){ New-Item 'assets' -ItemType Directory | Out-Null }
foreach($name in $assets.Keys){
    $code = $assets[$name]
    $url = if($name -like '*-512.png'){ "$largeBase/$code.png" } else { "$smallBase/$code.png" }
    Write-Host "Downloading $name from $url"
    Invoke-WebRequest -Uri $url -OutFile "assets/$name"
}
