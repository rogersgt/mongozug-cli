import colors from 'colors';
import parseMigrations from './action.parseMigrationsDir';
import Command from '../models/command.model';

const cmd = new Command();

export default async function handleUp(command=cmd) {
  if (command.childArguments.length === 0) {
    // run all migrations because no file name was specified
    console.log(`RUNNING ALL MIGRATIONS`.yellow);
    const migrations = await parseMigrations();
    for (let i = 0; i < migrations.length; i++) {
      const migration = migrations[i];
      await migration.up();
    }
  } else if (command.childArguments.length === 1) {
    const migration = await parseMigrations(command.childArguments[0]);
    await migration.up();
  } else {
    return Promise.reject('Incorrect number of migration file name arguments');
  }
  return Promise.resolve({ success: true });
}
