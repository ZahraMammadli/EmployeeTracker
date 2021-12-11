const inquirer = require("inquirer");

class InquirerFunctions {
  constructor(type, name, message, choices) {
    this.type = type;
    this.name = name;
    this.message = message;
    this.choices = choices;
  }

  ask() {
    const askObJ = {
      type: this.type,
      name: this.name,
      message: this.message,
    };
    if (this.choices === "undefined") {
      return askObJ;
    } else {
      askObJ.choices = this.choices;
      return askObJ;
    }
  }
}

module.exports = InquirerFunctions;
