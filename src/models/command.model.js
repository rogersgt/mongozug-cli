function Command(commandString='') {
  this.childArguments = [];
  this.value = commandString;

  this.defaultAction = function() {
    // map to service
  }

  this.help = function() {
    console.log(`
      ${ `Command: `.gray } ${ `${this.value}`.blue }
      ${ `Arguments:`.gray } ${ this.childArguments }
    `);
  }
}

Command.prototype = Object.create(Command.prototype);
Command.prototype.constructor = Command;

module.exports = Command;
