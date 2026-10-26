import fs from 'node:fs'
import path from 'node:path'

const dir = 'public/images/home'
fs.mkdirSync(dir, { recursive: true })

const files = [
  ['https://www.nordicbtc.ae/wp-content/uploads/2025/09/Untitled-design2.mp4', 'hero.mp4'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-1-1.jpg', 'story.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2024/10/433975829_18074726812468954_4769481163258271689_n.jpg', 'ig-1.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2024/10/463137143_18093806878468954_2351080066590889631_n.jpg', 'ig-2.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2024/10/462443719_18093255811468954_8823066746350027554_n.jpg', 'ig-3.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2024/10/461088555_18091888948468954_8846802534928243375_n.jpg', 'ig-4.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2024/10/448346655_18081695710468954_5779979044425434889_n.jpg', 'ig-5.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2024/10/448889729_18082432006468954_5935133663690191904_n.jpg', 'ig-6.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2024/10/450202947_18083852161468954_4782591872943593921_n.jpg', 'ig-7.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2024/10/438302514_18079689550468954_3836317228780870209_n.jpg', 'ig-8.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/1-1.jpg', 'campus-1.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/2-1.jpg', 'campus-2.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/3.jpg', 'campus-3.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/4.jpg', 'campus-4.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/5.jpg', 'campus-5.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/6.jpg', 'campus-6.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/7.jpg', 'campus-7.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/8.jpg', 'campus-8.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/9.jpg', 'campus-9.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/10.jpg', 'campus-10.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-1.jpg', 'campus-11.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-2.jpg', 'campus-12.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-3.jpg', 'campus-13.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-4.jpg', 'campus-14.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-5.jpg', 'campus-15.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-6.jpg', 'campus-16.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-7.jpg', 'campus-17.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-8.jpg', 'campus-18.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-9.jpg', 'campus-19.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Untitled-10.jpg', 'campus-20.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/Last.jpg', 'campus-21.jpg'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/MADI.png', 'partner-madi.png'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2022/01/CIAA.png', 'partner-ciaa.png'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2021/12/7.png', 'partner-7.png'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2021/12/6.png', 'partner-6.png'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2021/12/5.png', 'partner-5.png'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2021/12/2.png', 'partner-2.png'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2021/12/1.png', 'partner-1.png'],
  ['https://www.nordicbtc.ae/wp-content/uploads/2024/10/govtod-dubahjhda.png', 'partner-dha.png'],
]

for (const [url, name] of files) {
  const dest = path.join(dir, name)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log('keep', name)
    continue
  }
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } })
  if (!response.ok) {
    console.log('fail', response.status, name)
    continue
  }
  const bytes = Buffer.from(await response.arrayBuffer())
  fs.writeFileSync(dest, bytes)
  console.log('saved', name, bytes.length)
}
