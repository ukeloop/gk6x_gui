import {precacheAndRoute} from 'workbox-precaching/precacheAndRoute';
import {registerRoute} from 'workbox-routing';
import {NetworkFirst, CacheFirst} from 'workbox-strategies';

const processedManifest = (self.__WB_MANIFEST || []).filter(entry => {
    return !entry.url.match(/\.(html|json|txt)(\?.+)?$/);
});

precacheAndRoute(processedManifest);

registerRoute(
    new RegExp('\/(\\?.+)?$'),
    new NetworkFirst()
);

registerRoute(
    new RegExp('\\.(html|css|js|json|jpe?g|png|gif|webp|svg)(\\?.+)?$'),
    new NetworkFirst()
);

registerRoute(
    new RegExp('\\.(woff|woff2|eot|ttf)(\\?.+)?$'),
    new CacheFirst()
);