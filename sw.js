const CACHE = 'shuati-v3'
const URLS = ['index.html', 'manifest.json',
  'lib/vue.global.prod.js',
  'lib/vant.min.js',
  'lib/vant.css',
  'lib/xlsx.full.min.js',
  'lib/mammoth.browser.min.js'
]

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)))
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))))
  self.clients.claim()
})

self.addEventListener('fetch', e => {
  if (e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    )
  }
})
