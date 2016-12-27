import { App } from './app/index';
let [a, b, manifest, origin, ...dest] = process.argv

let app = new App(manifest, origin, dest);
app.bootstrap();
