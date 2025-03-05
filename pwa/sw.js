console.log('Estoy en el sw Este es nuevo');

const CACHE_NAME= "V1_cache_PWA ";

//ficehros que se estaran guardando en la aplicacion que se van a ver offline

var urlsToCache = [

'/images/favicon.png',
'/images/favicon(11).png',
'/images/favicon(10).png',
'/images/favicon(9).png',
'/images/favicon(8).png',
'/images/favicon(7).png',
'/images/favicon(6).png',
'/images/favicon(5).png',
'/images/favicon(4).png',
'/images/favicon(3).png',
'/images/favicon(2).png',
'/images/favicon(1).png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierta');
                return cache.addAll(urlsToCache)
                    .then(() =>{
                        self.skipWaiting();
                    });
            })
            .catch(err=>{
                console.log("No se ha cargado la cache", err);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Eliminando caché antigua:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );

    self.addEventListener('fetch',e=>{
        e.respondWith(
            caches.match(e.request)
                .then(res=>{
                    if(res){
                        return res;
                    }
                    return fetch(e.request);
                })
        )
    })
});