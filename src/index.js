import dotenv from 'dotenv';
import colors from 'colors';
import fs from 'fs';
import up from './controllers/ctrl.up';
import down from './controllers/ctrl.down';
import Command from './models/command.model';
import Stdout from './models/stdout.model';

const defaultFile = `${__dirname}/${process.env.NODE_ENV}.env`;
const namedEnvFilesExists = fs.existsSync(defaultFile);
const envFile = namedEnvFilesExists ? defaultFile : `${__dirname}/.env`;

if (!!fs.existsSync(envFile)) dotenv.config({ path: envFile });

const command = new Command(process.argv[2] || '');
command.childArguments = process.argv.splice(3, process.argv.length - 2) || [];

process.env.MZ_CLI_INFO = `
  mongozug-cli v ${process.env.MZ_VERSION || 'not set' }

  Example Usage:

  One Migration:
  mz up [name of migration]
  mz down [name of migration]

  All Migrations:
  mz up
  mz down

  migrations_folder: ${ !process.env.MZ_MIGRATIONS_FOLDER ? 'default' : `${process.env.MZ_MIGRATIONS_FOLDER}`.blue }
`;

(function index() {
  switch (command.value) {
    case 'up': up(command);
      break;

    case 'down': down(command);
      break;
    
      default:
        const text = 'Incorrect Usage';
        new Stdout(text, true, new Error(text), process.env.MZ_CLI_INFO, true);
        break;
  }
})();

