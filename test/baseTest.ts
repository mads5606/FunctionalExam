import * as fc from "fast-check";
import {getRequest, throwIfHttpFailed, throwIfNotEmpty} from "../src/http";

const server = {
  host: "localhost",
  port: 8085,
};

const validUsers = [100, 101, 102];

describe("GET Test", () => {
  it("/file/list?userId=${USER_ID}", async () =>
    await fc.assert(
      fc.asyncProperty(fc.integer(0, 200), async (USER_ID) => {
        console.log(USER_ID);
        console.log(validUsers.includes(USER_ID));
        if (validUsers.includes(USER_ID)) {
            await throwIfHttpFailed(
                getRequest(
                    server,
                    `/file/list?userId=${encodeURIComponent(USER_ID)}`
                )
            );
        } else {
          await throwIfNotEmpty(
            getRequest(
              server,
                `/file/list?userId=${encodeURIComponent(USER_ID)}`
            )
          );
        }
      }),
        {timeout: 200, numRuns: 90}
    ));
});
