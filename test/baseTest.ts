import * as fc from "fast-check";
import {OrbitCommands} from "../src/OrbitCommands";
import {OrbitModel} from "../src/OrbitModel";
import {OrbitImpl} from "../src/Orbit";

const server = {
    host: "localhost",
    port: 8085,
};

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

// describe("GET Test", () => {
//   it("/file/list?userId=${USER_ID}", async () =>
//     await fc.assert(
//       fc.asyncProperty(fc.integer(0, 200), async (USER_ID) => {
//           // console.log(USER_ID);
//           // console.log(validUsers.includes(USER_ID));
//           if (validUsers.includes(USER_ID)) {
//               await throwIfHttpFailed(
//                   getRequest(
//                       server,
//                       `/file/list?userId=${encodeURIComponent(USER_ID)}`
//                   )
//               );
//           } else {
//               await throwIfNotEmpty(
//                   getRequest(
//               server,
//                 `/file/list?userId=${encodeURIComponent(USER_ID)}`
//             )
//           );
//         }
//       }),
//         {timeout: 20000, numRuns: 90}
//     ));
// });


test('model test', async () => {
    const outputUp = execSync('docker-compose up -d --force-recreate', {encoding: 'utf-8'});  // the default is 'buffer'
    // console.log('Output up was:\n', outputUp);
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
    const outputDown = execSync('docker-compose down', {encoding: 'utf-8'});  // the default is 'buffer'
    // console.log('Output down was:\n', outputDown);
    sleep(5000);
}, 20000);
