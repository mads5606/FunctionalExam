import {RequestResponse} from "./RequestResponse";
import {getRequest, postRequest, uploadRequest} from "./http";

export interface IOrbit {
  validUser(user: number): boolean;

  validUserList(): number[];

  listFiles(): Promise<RequestResponse>;

  createFile(parentId: number, name: string): Promise<RequestResponse>;

  getFile(id: number): Promise<RequestResponse>;

  uploadFile(id: number, version: number, content: string): Promise<RequestResponse>;
}

export class OrbitImpl implements IOrbit {
  private server = {
    host: "localhost",
    port: 8085,
  };
  private userId = 100;
  private rootDirectoryId = 15;

  private validUsers: number[];

  constructor(validUsers: number[]) {
    this.validUsers = validUsers;
  }

  validUser(user: number): boolean {
    return this.validUsers.includes(user);
  }

  validUserList(): number[] {
    return this.validUsers;
  }

  async listFiles(): Promise<RequestResponse> {
    const out: any = await (getRequest(
        this.server,
        `/file/list?userId=${this.userId}`
    ));
    return {status: out.status, data: JSON.parse(out.data)};
  }

  async createFile(parentId: number, name: string): Promise<RequestResponse> {
    const currentTime = 0;
    const encodedName = encodeURIComponent(name);
    const out: any = await (postRequest(
        this.server,
        `/file?userId=${this.userId}&parentId=${parentId}&name=${encodedName}&timestamp=${currentTime}`,
        false
    ));
    return {status: out.status, data: JSON.parse(out.data)};
  }

  async getFile(id: number): Promise<RequestResponse> {
    const out: any = await (getRequest(
        this.server,
        `/file?userId=${this.userId}&id=${id}`
    ));
    return {status: out.status, data: out.data};
  }

  async uploadFile(id: number, version: number, content: string): Promise<RequestResponse> {
    const currentTime = 0;
    const out: any = await (uploadRequest(
        this.server,
        `/file/upload?userId=${this.userId}&id=${id}&version=${version}&timestamp=${currentTime}`,
        content
    ));
    return {status: out.status, data: JSON.parse(out.data)};
  }
}
