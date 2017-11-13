import { App } from './app/';
import { argv } from 'process';

let [a, b, manifest, ...dest] = argv

let app = new App(manifest, dest);
app.bootstrap();
