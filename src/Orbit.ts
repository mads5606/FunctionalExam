export interface IOrbit {
  validUser(user: number): boolean;
  validUserList(): number[];
}

export class OrbitImpl implements IOrbit {
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
}
