import fs from 'fs-extra';
import path from 'path';
import { packageCachePath, ioDir as ioFolderPath } from '../paths';

if (!fs.existsSync(ioFolderPath)) {
  fs.mkdirSync(ioFolderPath);
  console.log(`Directory '${ioFolderPath}' created successfully.`);
};

export const writeFile = (content: any[], fileName: string) => {
  const filePath: string = path.join(ioFolderPath, fileName);
  let data: string;
  if (typeof content === 'string') {
    data = content;
  } else {
    data = JSON.stringify(content);
  }
  // console.log(`Writing to ${filePath}, content type is ${typeof data}`);
  fs.writeFileSync(filePath, data);
  // console.log(`File ${filePath} created successfully.`);
};

export const readFile = (fileName: string) => {
  const filePath: string = path.join(ioFolderPath, fileName);
  const data: string = fs.readFileSync(filePath).toString();
  let res;
  try {
    res = JSON.parse(data);
  } catch {
    res = data;
  }
  return res;
};

export const readDir = (subDir?: string): string[] => {
  const dirPath: string = subDir ? path.join(ioFolderPath, subDir) : ioFolderPath;
  const fileList: string[] = fs.readdirSync(dirPath);
  return fileList;
};

export const makeDir = (relativePath: string) => {
  const absPath: string = path.join(ioFolderPath, relativePath);
  if (!fs.existsSync(absPath)) {
    fs.mkdirSync(absPath, { recursive: true });
  }
};

export const readPackageIndex = (packageId: string, version: string) => {
  const filePath: string = path.join(packageCachePath, `${packageId}#${version}`, 'package', '.index.json');
  return JSON.parse(fs.readFileSync(filePath).toString());
};

export const resolveCanonical = (packageId: string, version: string, url: string) => {
  const index = readPackageIndex(packageId, version);
  const fileRecord = index.files.filter((file: Record<string, string>) => file.url === url)[0];
  const filePath: string = path.join(packageCachePath, `${packageId}#${version}`, 'package', fileRecord.filename);
  const resource = JSON.parse(fs.readFileSync(filePath).toString());
  return resource;
};
