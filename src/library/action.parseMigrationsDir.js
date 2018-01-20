import fs from 'fs';
import Stdout from '../models/stdout.model';

const migrationsFolder = process.env.MZ_MIGRATIONS_FOLDER || `./migrations`;

export default function parseMigrationsDirForModules(migrationName=undefined) {
  if (!!migrationName && typeof migrationName === 'string') {
    if (isValidMigrationName(`${migrationName}`)) {
      const module = require(`${migrationsFolder}/${migrationName}`);
      return Promise.resolve(module);
    }
    return Promise.reject('Invalid Migration Name')
  } else {
    // get all migration objects
    return new Promise((res, rej) => {
      fs.readdir(`${migrationsFolder}`, (err, files) => {
        if (!!files && files.length > 0) {
          const migrationModuleArray = [];
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (isValidMigrationName(file)) {
              const migrationName = file.replace('.js', '');
              const module = require(`${migrationsFolder}/${migrationName}`);
              migrationModuleArray.push(module.default);
            } else {
              const text= 'Invalid migration file name';
              new Stdout(text, true, new Error(text), 'Invalid File Name');
              process.exit(1);
            }
          }
          res(migrationModuleArray);
        } else {
          const text ='No Migrations folder found!';
          new Stdout(text, true, new Error(text), 'No Such File or Directory');
          proces.exit(1);
        }
      });
    });
  }
}

function isValidMigrationName(fileName) {
  const name = fileName.replace('.js', '');
  const nameSplitArr = name.split('.');
  const number = nameSplitArr.length > 0 ? nameSplitArr[0] : null;
  if (!number || !parseInt(number)) {
    const text = `
    Invalid Migration File name
    name: ${name} is not allowed.

      example: 001.someCustomMigration.js || 002.anotherOne.js
    `;
    new Stdout(text, true, new Error(text), 'Missing Migrations folder');
  }
  return !!number && (parseInt(number) >= 0);
}

