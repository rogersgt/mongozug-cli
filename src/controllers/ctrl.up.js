import handleUp from '../library/action.handleUp';
import Command from '../models/command.model';
import Stdout from '../models/stdout.model';

const cmd = new Command();

export default function up(command=cmd) {
  return Promise.resolve(command)
  .then(handleUp)
  .catch((e) => {
    const text = 'Error on down';
    new Stdout(text, true, new Error(text), 'Uncaught', true);
  });
}
