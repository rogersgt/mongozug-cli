import Command from '../models/command.model';
import Stdout from '../models/stdout.model';

const cmd = new Command();

export default function down(command=cmd) {
  return Promise.resolve(command)
  .catch((e) => {
    const text = 'Error on down';
    new Stdout('Error on down', true, e, 'Uncaught', true);
  });
}
