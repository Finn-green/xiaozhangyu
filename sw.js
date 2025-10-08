const CACHE_NAME = 'octopus-jet-v1';
// 我们只缓存主页面，因为您的所有资源都在一个HTML文件中。
const urlsToCache = [
  './index.html' // 或者如果您的URL是根目录，也可以用 '/'
];

// 监听 'install' 事件，当Service Worker首次安装时触发
self.addEventListener('install', event => {
  // 等待缓存操作完成后再完成安装
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 监听 'fetch' 事件，拦截所有网络请求
self.addEventListener('fetch', event => {
  event.respondWith(
    // 1. 尝试从缓存中查找匹配的请求
    caches.match(event.request)
      .then(response => {
        // 2. 如果在缓存中找到了，直接返回缓存的响应
        if (response) {
          return response;
        }
        // 3. 如果缓存中没有，则发起网络请求
        return fetch(event.request);
      })
  );
});
