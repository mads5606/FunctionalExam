const http = require("http");

const asyncHttp = (options, payload) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        resolve({
          data: Buffer.concat(chunks).toString("utf8"),
          status: res.statusCode,
        });
      });
      req.on("error", reject);
    });
    if (payload) req.write(JSON.stringify(payload));
    req.end();
  });
};

const asyncHttpUpload = (options, payload) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        resolve({
          data: Buffer.concat(chunks).toString("utf8"),
          status: res.statusCode,
        });
      });
      req.on("error", reject);
    });
    if (payload) req.write(payload);
    req.end();
  });
};

const builOptionsForUri = (server, uri) => ({
  host: server.host,
  port: server.port,
  path: uri,
  headers: {
    "content-type": "application/json",
    "cache-control": "no-store",
  },
});

const builOptionsForUriUpload = (server, uri) => ({
  host: server.host,
  port: server.port,
  path: uri,
  headers: {
    "cache-control": "no-store",
  },
});

export const getRequest = async (server, uri) =>
    asyncHttp(Object.assign(builOptionsForUri(server, uri), {method: "GET"}), false);

export const postRequest = async (server, uri, payload) =>
    asyncHttp(Object.assign(builOptionsForUri(server, uri), {method: "POST"}), payload);

export const uploadRequest = async (server, uri, payload) =>
    asyncHttpUpload(Object.assign(builOptionsForUriUpload(server, uri), {method: "POST"}), payload);

export const deleteRequest = async (server, uri) =>
    asyncHttpUpload(Object.assign(builOptionsForUri(server, uri), {method: "DELETE"}), false);


export const throwIfNotEmpty = async (requestPromise) => {
  const out = await requestPromise;
  const data = JSON.parse(out.data);
  const fileListArray = data["fileList"];
  if (!Array.isArray(fileListArray) || fileListArray.length) {
    throw new Error(
        `Returned non-empty Result, got: ${JSON.stringify(out.data)}`
    );
  } else {
    return true;
  }
};

export const throwIfHttpFailed = async (requestPromise) => {
  const out = await requestPromise;
  if (out.status === 500)
    throw new Error(`Internal Server Error, got: ${JSON.stringify(out)}`);
  return out;
};
