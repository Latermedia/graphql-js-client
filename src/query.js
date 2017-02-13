import SelectionSet from './selection-set';
import VariableDefinitions from './variable-definitions';
import parseArgs from './parse-args';

export default class Query {
  constructor(typeBundle, ...args) {
    const {name, variables, selectionSetCallback} = parseArgs(args);

    this.typeBundle = typeBundle;
    this.typeSchema = typeBundle.QueryRoot;
    this.name = name;
    this.variableDefinitions = new VariableDefinitions(variables);
    this.selectionSet = new SelectionSet(typeBundle, 'QueryRoot', selectionSetCallback);
    Object.freeze(this);
  }

  get isAnonymous() {
    return !this.name;
  }

  toString() {
    const nameString = (this.name) ? ` ${this.name}` : '';

    return `query${nameString}${this.variableDefinitions.toString()}${this.selectionSet.toString()}`;
  }
}
