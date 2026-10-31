Add-Type -AssemblyName System.Drawing

$outDir = 'D:\BarberShop\public\images\certificates'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$W = 2000
$H = 1260
# White square stamped over by the live QR. Keep this in sync with src/data/certificates.js.
$script:Qr = @{ x = 1368; y = 688; size = 500 }

function Color-Rgb([int]$r, [int]$g, [int]$b) {
  [System.Drawing.Color]::FromArgb($r, $g, $b)
}

function Font-Of([string]$family, [single]$size, [System.Drawing.FontStyle]$style) {
  $font = New-Object System.Drawing.Font $family, $size, $style
  if ($font.Name -ne $family -and $font.FontFamily.Name -ne $family) {
    $font.Dispose()
    throw "Font not installed: $family"
  }
  return $font
}

function Pen-Of($color, [single]$width) {
  $pen = New-Object System.Drawing.Pen $color, $width
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  return $pen
}

function Points([single[]]$coords) {
  $list = New-Object 'System.Collections.Generic.List[System.Drawing.PointF]'
  for ($i = 0; $i -lt $coords.Length; $i += 2) {
    $list.Add((New-Object System.Drawing.PointF $coords[$i], $coords[$i + 1]))
  }
  return $list.ToArray()
}

function Measure-Tracked($g, [string]$text, $font, [single]$extra) {
  $format = [System.Drawing.StringFormat]::GenericTypographic
  $width = 0
  foreach ($ch in $text.ToCharArray()) {
    $width += $g.MeasureString([string]$ch, $font, (New-Object System.Drawing.PointF 0, 0), $format).Width + $extra
  }
  if ($text.Length -gt 0) { $width -= $extra }
  return $width
}

function Draw-Tracked($g, [string]$text, $font, $brush, [single]$x, [single]$y, [single]$extra) {
  $format = [System.Drawing.StringFormat]::GenericTypographic
  $cursor = $x
  foreach ($ch in $text.ToCharArray()) {
    $s = [string]$ch
    $g.DrawString($s, $font, $brush, $cursor, $y, $format)
    $cursor += $g.MeasureString($s, $font, (New-Object System.Drawing.PointF 0, 0), $format).Width + $extra
  }
}

function Draw-Centered($g, [string]$text, $font, $brush, [single]$y, [single]$centerX, [single]$maxWidth) {
  $use = $font
  $size = $g.MeasureString($text, $use)
  while ($size.Width -gt $maxWidth -and $use.Size -gt 16) {
    $use = Font-Of $use.FontFamily.Name ($use.Size - 2) $use.Style
    $size = $g.MeasureString($text, $use)
  }
  $g.DrawString($text, $use, $brush, ($centerX - ($size.Width / 2)), $y)
  return $size
}

function Draw-Wrapped($g, [string]$text, $font, $brush, [single]$y, [single]$centerX, [single]$maxWidth) {
  $words = $text -split '\s+'
  $line = ''
  $lines = New-Object System.Collections.Generic.List[string]
  foreach ($word in $words) {
    $test = if ($line) { "$line $word" } else { $word }
    if ($g.MeasureString($test, $font).Width -gt $maxWidth -and $line) {
      $lines.Add($line)
      $line = $word
    } else {
      $line = $test
    }
  }
  if ($line) { $lines.Add($line) }
  foreach ($item in $lines) {
    $size = Draw-Centered $g $item $font $brush $y $centerX $maxWidth
    $y += $size.Height - 6
  }
  return $y
}

function Draw-ShieldLogo($g, [single]$x, [single]$y, $gold, $ink, $cream) {
  $goldBrush = New-Object System.Drawing.SolidBrush $gold
  $inkBrush = New-Object System.Drawing.SolidBrush $ink
  $creamBrush = New-Object System.Drawing.SolidBrush $cream
  $w = 128
  $h = 150
  $g.FillPolygon($goldBrush, (Points @(
    $x, ($y + 28),
    ($x + $w), ($y + 28),
    ($x + $w - 2), ($y + 96),
    ($x + $w / 2), ($y + $h),
    2 + $x, ($y + 96)
  )))
  $inset = 7
  $g.FillPolygon($creamBrush, (Points @(
    ($x + $inset), ($y + 36),
    ($x + $w - $inset), ($y + 36),
    ($x + $w - $inset - 2), ($y + 96),
    ($x + $w / 2), ($y + $h - 10),
    ($x + $inset + 2), ($y + 96)
  )))
  $crown = Points @(
    ($x + 18), ($y + 30),
    ($x + 24), ($y + 8),
    ($x + 40), ($y + 24),
    ($x + 58), ($y + 0),
    ($x + 76), ($y + 22),
    ($x + 96), ($y + 2),
    ($x + 108), ($y + 24),
    ($x + 116), ($y + 10),
    ($x + 122), ($y + 30)
  )
  $g.FillPolygon($goldBrush, $crown)
  $g.FillRectangle($goldBrush, ($x + 16), ($y + 28), 108, 8)
  $g.FillEllipse($goldBrush, ($x + 54), ($y + 2), 10, 10)
  $cx = $x + 64
  $cy = $y + 78
  $g.FillEllipse($inkBrush, ($cx - 24), ($cy - 36), 48, 40)
  $g.FillEllipse($inkBrush, ($cx - 20), ($cy - 22), 40, 46)
  $g.FillEllipse($inkBrush, ($cx - 28), ($cy + 2), 56, 46)
  $g.FillRectangle($inkBrush, ($cx - 8), ($cy + 28), 16, 16)
}

function Star-Points([single]$cx, [single]$cy, [single]$outer, [single]$inner) {
  $list = New-Object 'System.Collections.Generic.List[System.Drawing.PointF]'
  for ($i = 0; $i -lt 10; $i++) {
    $radius = if ($i % 2 -eq 0) { $outer } else { $inner }
    $angle = -([Math]::PI / 2) + ($i * [Math]::PI / 5)
    $list.Add((New-Object System.Drawing.PointF ([single]($cx + $radius * [Math]::Cos($angle))), ([single]($cy + $radius * [Math]::Sin($angle)))))
  }
  return $list.ToArray()
}

function Draw-Scissors($g, $pen, [single]$x, [single]$y, [single]$s) {
  $g.DrawLine($pen, ($x + $s * 0.46), ($y + $s * 0.48), ($x + $s * 0.98), ($y + $s * 0.04))
  $g.DrawLine($pen, ($x + $s * 0.50), ($y + $s * 0.42), ($x + $s * 0.90), ($y + $s * 0.10))
  $g.DrawLine($pen, ($x + $s * 0.46), ($y + $s * 0.52), ($x + $s * 1.00), ($y + $s * 0.30))
  $g.DrawEllipse($pen, ($x + $s * 0.02), ($y + $s * 0.40), ($s * 0.30), ($s * 0.36))
  $g.DrawEllipse($pen, ($x + $s * 0.22), ($y + $s * 0.58), ($s * 0.30), ($s * 0.34))
  $g.FillEllipse((New-Object System.Drawing.SolidBrush $pen.Color), ($x + $s * 0.42), ($y + $s * 0.44), ($s * 0.10), ($s * 0.10))
}

function Draw-Comb($g, $pen, [single]$x, [single]$y, [single]$s) {
  $spine = New-Object System.Drawing.SolidBrush $pen.Color
  $g.FillRectangle($spine, ($x + $s * 0.18), ($y + $s * 0.16), ($s * 0.64), ($s * 0.13))
  $tooth = [Math]::Max(2.2, $pen.Width)
  $saved = $pen.Width
  $pen.Width = $tooth
  for ($i = 0; $i -lt 6; $i++) {
    $tx = $x + $s * 0.26 + ($i * $s * 0.09)
    $g.DrawLine($pen, $tx, ($y + $s * 0.28), $tx, ($y + $s * 0.84))
  }
  $pen.Width = $saved
  $spine.Dispose()
}

function Draw-Head($g, $pen, [single]$x, [single]$y, [single]$s) {
  $g.DrawEllipse($pen, ($x + $s * 0.34), ($y + $s * 0.04), ($s * 0.32), ($s * 0.32))
  $g.DrawArc($pen, ($x + $s * 0.08), ($y + $s * 0.28), ($s * 0.84), ($s * 0.52), 0, 180)
}

function Draw-Beard($g, $pen, [single]$x, [single]$y, [single]$s) {
  $g.DrawEllipse($pen, ($x + $s * 0.37), ($y + $s * 0.06), ($s * 0.26), ($s * 0.24))
  $g.DrawArc($pen, ($x + $s * 0.22), ($y + $s * 0.20), ($s * 0.56), ($s * 0.62), 10, 160)
  $g.DrawLine($pen, ($x + $s * 0.28), ($y + $s * 0.48), ($x + $s * 0.40), ($y + $s * 0.26))
  $g.DrawLine($pen, ($x + $s * 0.72), ($y + $s * 0.48), ($x + $s * 0.60), ($y + $s * 0.26))
}

function Draw-Bottle($g, $pen, [single]$x, [single]$y, [single]$s) {
  $g.DrawRectangle($pen, ($x + $s * 0.42), ($y + $s * 0.12), ($s * 0.16), ($s * 0.12))
  $g.DrawRectangle($pen, ($x + $s * 0.30), ($y + $s * 0.26), ($s * 0.40), ($s * 0.56))
  $g.DrawLine($pen, ($x + $s * 0.30), ($y + $s * 0.40), ($x + $s * 0.70), ($y + $s * 0.40))
}

function Draw-People($g, $pen, [single]$x, [single]$y, [single]$s) {
  $g.DrawEllipse($pen, ($x + $s * 0.16), ($y + $s * 0.16), ($s * 0.22), ($s * 0.22))
  $g.DrawArc($pen, ($x + $s * 0.08), ($y + $s * 0.40), ($s * 0.38), ($s * 0.36), 200, 140)
  $g.DrawEllipse($pen, ($x + $s * 0.52), ($y + $s * 0.20), ($s * 0.20), ($s * 0.20))
  $g.DrawArc($pen, ($x + $s * 0.46), ($y + $s * 0.44), ($s * 0.34), ($s * 0.32), 200, 140)
}

function Draw-SkillIcon($g, [string]$icon, $pen, $brush, [single]$x, [single]$y, [single]$s) {
  switch ($icon) {
    'scissors' { Draw-Scissors $g $pen $x $y $s }
    'comb' { Draw-Comb $g $pen $x $y $s }
    'head' { Draw-Head $g $pen $x $y $s }
    'beard' { Draw-Beard $g $pen $x $y $s }
    'bottle' { Draw-Bottle $g $pen $x $y $s }
    'people' { Draw-People $g $pen $x $y $s }
    'star' { $g.FillPolygon($brush, (Star-Points ($x + $s * 0.5) ($y + $s * 0.52) ($s * 0.34) ($s * 0.14))) }
  }
}

function Draw-Skills($g, $skills, $navy, $gold) {
  $circle = New-Object System.Drawing.SolidBrush $navy
  $pen = Pen-Of $gold 2.6
  $star = New-Object System.Drawing.SolidBrush $gold
  $labelBrush = New-Object System.Drawing.SolidBrush $navy
  $labelFont = Font-Of 'Times New Roman' 13 ([System.Drawing.FontStyle]::Bold)
  $y = 348
  foreach ($skill in $skills) {
    $g.FillEllipse($circle, 54, $y, 78, 78)
    Draw-SkillIcon $g $skill.icon $pen $star 64 ($y + 12) 58
    $rect = New-Object System.Drawing.RectangleF 148, ($y + 16), 230, 58
    $g.DrawString($skill.label, $labelFont, $labelBrush, $rect)
    $y += 128
  }
}

function Draw-ToolCluster($g, $gold) {
  $pen = Pen-Of $gold 3.6
  $state = $g.Save()
  $g.TranslateTransform(1710, 455)
  $g.RotateTransform(-16)
  Draw-Scissors $g $pen -70 -70 190
  $g.Restore($state)

  $state = $g.Save()
  $g.TranslateTransform(1848, 545)
  $g.RotateTransform(4)
  Draw-Comb $g $pen -36 -64 150
  $g.Restore($state)

  $state = $g.Save()
  $g.TranslateTransform(1595, 590)
  $g.RotateTransform(14)
  Draw-Scissors $g $pen -16 -48 130
  $g.Restore($state)
}

$people = @(
  @{
    file = 'firoz-idrish.png'
    name = 'Firoz Idrish'
    heading = 'OF ACHIEVEMENT'
    course = 'HAIR STYLING & GROOMING COURSE'
    summary = 'This course was conducted at Crownora Barber Academy, Pakistan and covers advanced hairstyling techniques, modern grooming and professional client care.'
    skills = @(
      @{ icon = 'scissors'; label = "HAIRSTYLING`nTECHNIQUES" },
      @{ icon = 'comb'; label = "STYLING`nMETHODS" },
      @{ icon = 'head'; label = "MODERN`nGROOMING" },
      @{ icon = 'star'; label = "CLIENT CARE`n& CONSULTATION" }
    )
    nationality = 'India'
    passport = 'AL330777'
    dob = '01-01-1996'
    issued = '13 May 2026'
    certId = 'CBA-2026-0001'
  },
  @{
    file = 'mohd-tanveer.png'
    name = 'Mohd Tanveer Mohamad Mehtab Salmani'
    heading = 'OF COMPLETION'
    course = "BEARD & MEN'S GROOMING COURSE"
    summary = 'This course was conducted at Crownora Barber Academy, Pakistan and focuses on beard styling, facial grooming, skincare and professional client consultation.'
    skills = @(
      @{ icon = 'beard'; label = "BEARD`nSTYLING" },
      @{ icon = 'head'; label = "FACIAL`nGROOMING" },
      @{ icon = 'bottle'; label = "SKINCARE`nBASICS" },
      @{ icon = 'people'; label = "CLIENT`nCONSULTATION" }
    )
    nationality = 'India'
    passport = 'AL055177'
    dob = '27-10-2004'
    issued = '12 Jun 2026'
    certId = 'CBA-2026-0002'
  },
  @{
    file = 'naveed-ahmad.png'
    name = 'Naveed Ahmad Muhammad Rasheed Rajput'
    heading = 'OF ACHIEVEMENT'
    course = 'HAIR STYLING & GROOMING COURSE'
    summary = 'This course was conducted at Crownora Barber Academy, Pakistan and covers advanced hairstyling techniques, modern grooming and professional client care.'
    skills = @(
      @{ icon = 'scissors'; label = "HAIRSTYLING`nTECHNIQUES" },
      @{ icon = 'comb'; label = "STYLING`nMETHODS" },
      @{ icon = 'head'; label = "MODERN`nGROOMING" },
      @{ icon = 'star'; label = "CLIENT CARE`n& CONSULTATION" }
    )
    nationality = 'Pakistan'
    passport = 'WL1178591'
    dob = '21-11-1999'
    issued = '16 May 2026'
    certId = 'CBA-2026-0003'
  },
  @{
    file = 'naved-ali.png'
    name = 'Naved Ali Sikander'
    heading = 'OF COMPLETION'
    course = "BEARD & MEN'S GROOMING COURSE"
    summary = 'This course was conducted at Crownora Barber Academy, Pakistan and focuses on beard styling, facial grooming, skincare and professional client consultation.'
    skills = @(
      @{ icon = 'beard'; label = "BEARD`nSTYLING" },
      @{ icon = 'head'; label = "FACIAL`nGROOMING" },
      @{ icon = 'bottle'; label = "SKINCARE`nBASICS" },
      @{ icon = 'people'; label = "CLIENT`nCONSULTATION" }
    )
    nationality = 'India'
    passport = 'AD843576'
    dob = '12-12-2000'
    issued = '27 Oct 2026'
    certId = 'CBA-2026-0004'
  }
)

$cream = Color-Rgb 250 246 237
$navy = Color-Rgb 15 30 58
$gold = Color-Rgb 186 146 72
$ink = Color-Rgb 20 32 56
$muted = Color-Rgb 92 98 108

foreach ($person in $people) {
  $bmp = New-Object System.Drawing.Bitmap $W, $H
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear($cream)

  $navyBrush = New-Object System.Drawing.SolidBrush $navy
  $goldBrush = New-Object System.Drawing.SolidBrush $gold
  $inkBrush = New-Object System.Drawing.SolidBrush $ink
  $mutedBrush = New-Object System.Drawing.SolidBrush $muted

  $g.FillPolygon($navyBrush, (Points @(0, 0, 390, 0, 0, 300)))
  $slash = Pen-Of $gold 18
  $g.DrawLine($slash, 292, 18, 18, 236)
  $slashThin = Pen-Of $gold 3
  $g.DrawLine($slashThin, 330, 18, 56, 250)

  $panel = Points @(1548, 248, 2000, 168, 2000, 1260, 1188, 1260, 1368, 690)
  $g.FillPolygon($navyBrush, $panel)
  $edge = Pen-Of $gold 8
  $g.DrawLines($edge, (Points @(1548, 248, 1368, 690, 1188, 1260)))

  Draw-ToolCluster $g $gold

  $sloganState = $g.Save()
  $g.TranslateTransform(1904, 1172)
  $g.RotateTransform(-90)
  $sloganFont = Font-Of 'Segoe Script' 22 ([System.Drawing.FontStyle]::Bold)
  $g.DrawString('Better Barbers Brighter Futures', $sloganFont, $goldBrush, 0, 0)
  $g.Restore($sloganState)

  $outer = Pen-Of $navy 16
  $inner = Pen-Of $gold 3
  $g.DrawRectangle($outer, 10, 10, ($W - 20), ($H - 20))
  $g.DrawRectangle($inner, 30, 30, ($W - 60), ($H - 60))

  Draw-ShieldLogo $g 58 44 $gold $ink $cream
  $brand = Font-Of 'Times New Roman' 26 ([System.Drawing.FontStyle]::Bold)
  $brandSmall = Font-Of 'Times New Roman' 16 ([System.Drawing.FontStyle]::Bold)
  $place = Font-Of 'Times New Roman' 12 ([System.Drawing.FontStyle]::Bold)
  Draw-Tracked $g 'CROWNORA' $brand $inkBrush 292 62 1.6
  Draw-Tracked $g 'BARBER ACADEMY' $brandSmall $inkBrush 292 100 1.2
  Draw-Tracked $g 'PAKISTAN' $place $goldBrush 292 130 2.4

  $meta = Font-Of 'Times New Roman' 16 ([System.Drawing.FontStyle]::Regular)
  $metaBold = Font-Of 'Times New Roman' 16 ([System.Drawing.FontStyle]::Bold)
  $g.DrawString('Certificate No.', $meta, $mutedBrush, 1288, 52)
  $g.DrawString($person.certId, $metaBold, $inkBrush, 1454, 52)
  $g.DrawString('Issue Date', $meta, $mutedBrush, 1288, 82)
  $g.DrawString($person.issued, $metaBold, $inkBrush, 1454, 82)

  $center = 860
  $title = Font-Of 'Times New Roman' 68 ([System.Drawing.FontStyle]::Bold)
  [void](Draw-Centered $g 'CERTIFICATE' $title $inkBrush 168 $center 860)
  $rule = Pen-Of $gold 2
  $g.DrawLine($rule, 470, 272, 680, 272)
  $sub = Font-Of 'Times New Roman' 26 ([System.Drawing.FontStyle]::Bold)
  [void](Draw-Centered $g $person.heading $sub $goldBrush 250 $center 480)
  $g.DrawLine($rule, 1040, 272, 1250, 272)

  $kicker = Font-Of 'Times New Roman' 16 ([System.Drawing.FontStyle]::Regular)
  [void](Draw-Centered $g 'THIS CERTIFIES THAT' $kicker $mutedBrush 312 $center 640)

  $nameFont = Font-Of 'Edwardian Script ITC' 78 ([System.Drawing.FontStyle]::Regular)
  $nameSize = Draw-Centered $g $person.name $nameFont $inkBrush 328 $center 900
  $lineY = 328 + $nameSize.Height - 18
  $lineHalf = [Math]::Min(280, ($nameSize.Width / 2) + 10)
  $g.DrawLine($rule, ($center - $lineHalf), $lineY, ($center + $lineHalf), $lineY)

  $body = Font-Of 'Times New Roman' 18 ([System.Drawing.FontStyle]::Regular)
  [void](Draw-Centered $g 'has successfully completed the' $body $inkBrush ($lineY + 16) $center 760)
  $courseFont = Font-Of 'Times New Roman' 26 ([System.Drawing.FontStyle]::Bold)
  $courseSize = Draw-Centered $g $person.course $courseFont $inkBrush ($lineY + 52) $center 820
  $summaryFont = Font-Of 'Times New Roman' 17 ([System.Drawing.FontStyle]::Regular)
  $afterSummary = Draw-Wrapped $g $person.summary $summaryFont $inkBrush ($lineY + 52 + $courseSize.Height + 6) $center 760

  $factFont = Font-Of 'Times New Roman' 16 ([System.Drawing.FontStyle]::Bold)
  $facts = @(
    "Nationality  $($person.nationality)",
    "Passport No.  $($person.passport)",
    "Date of Birth  $($person.dob)"
  )
  $gap = 36
  $widths = @()
  $total = 0
  foreach ($fact in $facts) {
    $width = $g.MeasureString($fact, $factFont).Width
    $widths += $width
    $total += $width
  }
  $total += $gap * ($facts.Count - 1)
  $cursor = $center - ($total / 2)
  for ($i = 0; $i -lt $facts.Count; $i++) {
    $g.DrawString($facts[$i], $factFont, $inkBrush, $cursor, ($afterSummary + 8))
    $cursor += $widths[$i] + $gap
  }

  Draw-Skills $g $person.skills $navy $gold

  $sign = Font-Of 'Segoe Script' 24 ([System.Drawing.FontStyle]::Bold)
  $role = Font-Of 'Times New Roman' 13 ([System.Drawing.FontStyle]::Regular)
  $g.DrawLine($rule, 150, 1084, 430, 1084)
  $g.DrawString('Ayesha Khan', $sign, $inkBrush, 176, 1036)
  $g.DrawString('Training Director', $role, $mutedBrush, 214, 1100)
  $g.DrawLine($rule, 520, 1084, 820, 1084)
  $g.DrawString('Ahmed Khan', $sign, $inkBrush, 560, 1036)
  $g.DrawString('Academic Head', $role, $mutedBrush, 598, 1100)

  $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $g.FillRectangle($white, $script:Qr.x, $script:Qr.y, $script:Qr.size, $script:Qr.size)

  $path = Join-Path $outDir $person.file
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Output "$($person.file) $($bmp.Width)x$($bmp.Height)"
  $g.Dispose()
  $bmp.Dispose()
}

Write-Output "QR $($script:Qr.x),$($script:Qr.y),$($script:Qr.size)"
