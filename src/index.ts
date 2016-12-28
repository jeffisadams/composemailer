import { App } from './app/index';
let [a, b, manifest, ...dest] = process.argv

let app = new App(manifest, dest);
app.bootstrap();
