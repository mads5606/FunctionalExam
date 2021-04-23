import fc from "fast-check";
import {createFileCommand} from "./Commands/createFileCommand";
import {downloadCommand} from "./Commands/downloadCommand";
import {listCommand} from "./Commands/listCommand";
import {uploadFileCommand} from "./Commands/uploadFileCommand";

// Removing "/" because it does not encode or decode correctly. Removing " also, because it is a lot harder to debug with that in JSON strings
// split-join to "replaceAll"
// Replacement is a and b, for no specific reason, simply removing the two characters may leave the generated string empty
//const nameArbitrary = fc.string(1, 12).map(s => s.split("/").join("a").split('"').join("b"));
const nameArbitrary = fc.base64String(1, 12).map(s => s.split("/").join("a"));

const indexArbitrary = fc.integer(0, 10000);

export const OrbitCommands = [
  // fc.constant(new createDirCommand()),
  fc.tuple(indexArbitrary, nameArbitrary).map(([dirIndex, name]) => new createFileCommand(dirIndex, name)),
  // fc.constant(new deleteDirCommand()),
  // fc.constant(new deleteFileCommand()),
  indexArbitrary.map(v => new downloadCommand(v)),
  fc.constant(new listCommand()),
  // fc.constant(new lockUnlockFileCommand()),
  // fc.constant(new metaCommand()),
  // fc.constant(new setFileTimeCommand()),
  // fc.constant(new structureCommand()),
  fc.tuple(indexArbitrary, fc.base64String(0, 100)).map(([fileIndex, content]) => new uploadFileCommand(fileIndex, content)),
  // fc.constant(new uploadFileCommand()),
  // fc.constant(new versionCommand()),
  // fc.constant(new moveFileCommand()),
  // fc.constant(new moveDirCommand()),
];
