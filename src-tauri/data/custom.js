window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});document.addEventListener('contextmenu',function(e){const target=e.target;const isInput=target.tagName==='INPUT'||target.tagName==='TEXTAREA';const isContentEditable=target.isContentEditable;if(!isInput&&!isContentEditable){e.preventDefault()}});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}
const { invoke } = window.__TAURI__.core

if ('__TAURI__' in window) {
    await invoke('download_file', {
        url: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
        savePath: 'test.png',
        fileId: 'test',
    })
}
const { listen } = window.__TAURI__.event

listen('download_progress', (event: any) => {
    downloadProgress.value = Number(
        ((event.payload.downloaded / event.payload.total) * 100).toFixed(2)
    )
})
const { writeTextFile } = window.__TAURI__.fs
//or import { writeTextFile } from '@tauri-apps/plugin-fs';

const contents = JSON.stringify({ notifications: true })
await writeTextFile('pakeplus.json', contents, {
    baseDir: BaseDirectory.Download,
})
console.log(contents)
// Prints string to the console
window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
