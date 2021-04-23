import fc from "fast-check";
import {IOrbit} from "./Orbit";

export class OrbitModel {
  serverIsRunning = false;
  validUsers = [100, 101, 102];
}

export type OrbitCommand = fc.Command<OrbitModel, IOrbit>;
