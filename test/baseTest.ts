import * as fc from "fast-check";
import {OrbitCommands} from "../src/OrbitCommands";
import {OrbitModel} from "../src/OrbitModel";
import {OrbitImpl} from "../src/Orbit";

// https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript
const execSync = require('child_process').execSync;

// https://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

const validUsers = [100, 101, 102];

test('model test', async () => {
    execSync('docker-compose up -d --force-recreate', {encoding: 'utf-8'});
    sleep(5000);
    let i = 1;
    await fc.assert(
        fc.asyncProperty(fc.commands(OrbitCommands, 100), async (cmds) => {
            const s = () => ({
                model: new OrbitModel(),
                real: new OrbitImpl(validUsers, {host: "localhost", port: (18080 + i)})
            });
            await fc.asyncModelRun(s, cmds);
            i++;
        }),
        {numRuns: 3, endOnFailure: true, verbose: true}
    );
    execSync('docker-compose down', {encoding: 'utf-8'});
    sleep(5000);
}, 20000);
