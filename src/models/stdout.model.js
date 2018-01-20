import colors from 'colors';

const err = new Error();

function Stdout(text='', isError=false, errorObject=null, description='', exit=false) {
  this.errorObject = isError ? errorObject : undefined;
  this.stderr = isError ? text : undefined;
  this.description = `${isError ? 'mz: ERROR: ' : 'mz: INFO' }${ description || 'No description provided' }`;
  this.text = text;

  this.print = function() {
    if (isError) {
      console.log(`${this.description}`.red);
      console.log(`${this.text}`);
    } else {
      console.log(`${this.description}`.cyan);
      console.log(`
        ${this.text}
      `.gray);
    }
    if (exit) {
      const code = isError ? 1 : 0;
      process.exit(code);
    }
  };

  this.print();
}

Stdout.prototype = Object.create(Stdout.prototype);
Stdout.prototype.constructor = Stdout;

module.exports = Stdout;
