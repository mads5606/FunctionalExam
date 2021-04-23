import * as fc from "fast-check";
import {OrbitCommands} from "../src/OrbitCommands";
import {OrbitModel} from "../src/OrbitModel";
import {OrbitImpl} from "../src/Orbit";

const server = {
    host: "localhost",
    port: 8085,
};

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
    await fc.assert(
        fc.asyncProperty(fc.commands(OrbitCommands, 100), async (cmds) => {
            const s = () => ({model: new OrbitModel(), real: new OrbitImpl(validUsers)});
            await fc.asyncModelRun(s, cmds);
        }),
        {numRuns: 1, endOnFailure: true, verbose: true}
    );
}, 20000);
