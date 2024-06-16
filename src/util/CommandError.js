const stringify = message => (message).toString()

class CommandError extends Error {
  constructor (message, filename, lineError) {
    super(stringify(message), filename, lineError);
    this.name = 'CommandError';
    this._message = message;
  }

  get message () {
    return stringify(this._message);
  }
}
module.exports = CommandError;

