/*
The MIT License (MIT)
Copyright (c) 2016 Shopify Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.


*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function join() {
  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
    fields[_key] = arguments[_key];
  }

  return fields.join(' ');
}

function isObject(value) {
  return Boolean(value) && Object.prototype.toString.call(value.valueOf()) === '[object Object]';
}

function deepFreezeCopyExcept(predicate, structure) {
  if (predicate(structure)) {
    return structure;
  } else if (isObject(structure)) {
    return Object.freeze(Object.keys(structure).reduce(function (copy, key) {
      copy[key] = deepFreezeCopyExcept(predicate, structure[key]);

      return copy;
    }, {}));
  } else if (Array.isArray(structure)) {
    return Object.freeze(structure.map(function (item) {
      return deepFreezeCopyExcept(predicate, item);
    }));
  } else {
    return structure;
  }
}

function schemaForType(typeBundle, typeName) {
  var type = typeBundle.types[typeName];

  if (type) {
    return type;
  }

  throw new Error("No type of " + typeName + " found in schema");
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var VariableDefinition = function () {

  /**
   * This constructor should not be invoked directly.
   * Use the factory function {@link Client#variable} to create a VariableDefinition.
   *
   * @param {String} name The name of the variable.
   * @param {String} type The GraphQL type of the variable.
   * @param {*} [defaultValue] The default value of the variable.
   */
  function VariableDefinition(name, type, defaultValue) {
    classCallCheck(this, VariableDefinition);

    this.name = name;
    this.type = type;
    this.defaultValue = defaultValue;
    Object.freeze(this);
  }

  /**
   * Returns the GraphQL query string for the variable as an input value (e.g. `$variableName`).
   *
   * @return {String} The GraphQL query string for the variable as an input value.
   */


  createClass(VariableDefinition, [{
    key: 'toInputValueString',
    value: function toInputValueString() {
      return '$' + this.name;
    }

    /**
     * Returns the GraphQL query string for the variable (e.g. `$variableName:VariableType = defaultValue`).
     *
     * @return {String} The GraphQL query string for the variable.
     */

  }, {
    key: 'toString',
    value: function toString() {
      var defaultValueString = this.defaultValue ? ' = ' + formatInputValue(this.defaultValue) : '';

      return '$' + this.name + ':' + this.type + defaultValueString;
    }
  }]);
  return VariableDefinition;
}();

function isVariable(value) {
  return VariableDefinition.prototype.isPrototypeOf(value);
}

function variable(name, type, defaultValue) {
  return new VariableDefinition(name, type, defaultValue);
}

var Enum = function () {

  /**
   * This constructor should not be invoked directly.
   * Use the factory function {@link Client#enum} to create an Enum.
   *
   * @param {String} key The key of the enum.
   */
  function Enum(key) {
    classCallCheck(this, Enum);

    this.key = key;
  }

  /**
   * Returns the GraphQL query string for the enum (e.g. `enumKey`).
   *
   * @return {String} The GraphQL query string for the enum.
   */


  createClass(Enum, [{
    key: "toString",
    value: function toString() {
      return this.key;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.key.valueOf();
    }
  }]);
  return Enum;
}();

var enumFunction = (function (key) {
  return new Enum(key);
});

var Scalar = function () {
  function Scalar(value) {
    classCallCheck(this, Scalar);

    this.value = value;
  }

  createClass(Scalar, [{
    key: "toString",
    value: function toString() {
      return this.value.toString();
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.value.valueOf();
    }
  }, {
    key: "unwrapped",
    get: function get$$1() {
      return this.value;
    }
  }]);
  return Scalar;
}();

function formatInputValue(value) {
  if (VariableDefinition.prototype.isPrototypeOf(value)) {
    return value.toInputValueString();
  } else if (Enum.prototype.isPrototypeOf(value)) {
    return String(value);
  } else if (Scalar.prototype.isPrototypeOf(value)) {
    return JSON.stringify(value.valueOf());
  } else if (Array.isArray(value)) {
    return '[' + join.apply(undefined, toConsumableArray(value.map(formatInputValue))) + ']';
  } else if (isObject(value)) {
    return formatObject(value, '{', '}');
  } else {
    return JSON.stringify(value);
  }
}

function formatObject(value) {
  var openChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var closeChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var argPairs = Object.keys(value).map(function (key) {
    return key + ': ' + formatInputValue(value[key]);
  });

  return '' + openChar + join.apply(undefined, toConsumableArray(argPairs)) + closeChar;
}

function formatArgs(args) {
  if (!Object.keys(args).length) {
    return '';
  }

  return ' (' + formatObject(args) + ')';
}

// eslint-disable-next-line no-empty-function
var noop = (function () {});

var Profiler = {
  trackTypeDependency: noop,
  trackFieldDependency: noop
};

var trackTypeDependency = Profiler.trackTypeDependency;
var trackFieldDependency = Profiler.trackFieldDependency;


function parseFieldCreationArgs(creationArgs) {
  var callback = noop;
  var options = {};
  var selectionSet = null;

  if (creationArgs.length === 2) {
    if (typeof creationArgs[1] === 'function') {
      var _creationArgs = slicedToArray(creationArgs, 2);

      options = _creationArgs[0];
      callback = _creationArgs[1];
    } else {
      var _creationArgs2 = slicedToArray(creationArgs, 2);

      options = _creationArgs2[0];
      selectionSet = _creationArgs2[1];
    }
  } else if (creationArgs.length === 1) {
    // SelectionSet is defined before this function is called since it's
    // called by SelectionSet
    // eslint-disable-next-line no-use-before-define
    if (SelectionSet.prototype.isPrototypeOf(creationArgs[0])) {
      selectionSet = creationArgs[0];
    } else if (typeof creationArgs[0] === 'function') {
      callback = creationArgs[0];
    } else {
      options = creationArgs[0];
    }
  }

  return { options: options, selectionSet: selectionSet, callback: callback };
}

var emptyArgs = Object.freeze({});

var Field = function () {

  /**
   * This constructor should not be invoked directly.
   * Fields are added to a selection by {@link SelectionSetBuilder#add}, {@link SelectionSetBuilder#addConnection}
   * and {@link SelectionSetBuilder#addInlineFragmentOn}.
   *
   * @param {String} name The name of the field.
   * @param {Object} [options] An options object containing:
   *   @param {Object} [options.args] Arguments for the field.
   *   @param {String} [options.alias] An alias for the field.
   * @param {SelectionSet} selectionSet The selection set on the field.
   */
  function Field(name, options, selectionSet) {
    classCallCheck(this, Field);

    this.name = name;
    this.alias = options.alias || null;
    this.responseKey = this.alias || this.name;
    this.args = options.args ? deepFreezeCopyExcept(isVariable, options.args) : emptyArgs;
    this.selectionSet = selectionSet;
    Object.freeze(this);
  }

  /**
   * Returns the GraphQL query string for the Field (e.g. `catAlias: cat(size: 'small') { name }` or `name`).
   *
   * @return {String} The GraphQL query string for the Field.
   */


  createClass(Field, [{
    key: 'toString',
    value: function toString() {
      var aliasPrefix = this.alias ? this.alias + ': ' : '';

      return '' + aliasPrefix + this.name + formatArgs(this.args) + this.selectionSet;
    }
  }]);
  return Field;
}();

// This is an interface that defines a usage, and simplifies type checking
var Spread = function Spread() {
  classCallCheck(this, Spread);
};

var InlineFragment = function (_Spread) {
  inherits(InlineFragment, _Spread);

  /**
   * This constructor should not be invoked directly.
   * Use the factory function {@link SelectionSetBuilder#addInlineFragmentOn} to create an InlineFragment.
   *
   * @param {String} typeName The type of the fragment.
   * @param {SelectionSet} selectionSet The selection set on the fragment.
   */
  function InlineFragment(typeName, selectionSet) {
    classCallCheck(this, InlineFragment);

    var _this = possibleConstructorReturn(this, (InlineFragment.__proto__ || Object.getPrototypeOf(InlineFragment)).call(this));

    _this.typeName = typeName;
    _this.selectionSet = selectionSet;
    Object.freeze(_this);
    return _this;
  }

  /**
   * Returns the GraphQL query string for the InlineFragment (e.g. `... on Cat { name }`).
   *
   * @return {String} The GraphQL query string for the InlineFragment.
   */


  createClass(InlineFragment, [{
    key: 'toString',
    value: function toString() {
      return '... on ' + this.typeName + this.selectionSet;
    }
  }]);
  return InlineFragment;
}(Spread);

var FragmentSpread = function (_Spread2) {
  inherits(FragmentSpread, _Spread2);

  /**
   * This constructor should not be invoked directly.
   * Use the factory function {@link Document#defineFragment} to create a FragmentSpread.
   *
   * @param {FragmentDefinition} fragmentDefinition The corresponding fragment definition.
   */
  function FragmentSpread(fragmentDefinition) {
    classCallCheck(this, FragmentSpread);

    var _this2 = possibleConstructorReturn(this, (FragmentSpread.__proto__ || Object.getPrototypeOf(FragmentSpread)).call(this));

    _this2.name = fragmentDefinition.name;
    _this2.selectionSet = fragmentDefinition.selectionSet;
    Object.freeze(_this2);
    return _this2;
  }

  /**
   * Returns the GraphQL query string for the FragmentSpread (e.g. `...catName`).
   *
   * @return {String} The GraphQL query string for the FragmentSpread.
   */


  createClass(FragmentSpread, [{
    key: 'toString',
    value: function toString() {
      return '...' + this.name;
    }
  }, {
    key: 'toDefinition',
    value: function toDefinition() {
      // eslint-disable-next-line no-use-before-define
      return new FragmentDefinition(this.name, this.selectionSet.typeSchema.name, this.selectionSet);
    }
  }]);
  return FragmentSpread;
}(Spread);

var FragmentDefinition = function () {

  /**
   * This constructor should not be invoked directly.
   * Use the factory function {@link Document#defineFragment} to create a FragmentDefinition on a {@link Document}.
   *
   * @param {String} name The name of the fragment definition.
   * @param {String} typeName The type of the fragment.
   */
  function FragmentDefinition(name, typeName, selectionSet) {
    classCallCheck(this, FragmentDefinition);

    this.name = name;
    this.typeName = typeName;
    this.selectionSet = selectionSet;
    this.spread = new FragmentSpread(this);
    Object.freeze(this);
  }

  /**
   * Returns the GraphQL query string for the FragmentDefinition (e.g. `fragment catName on Cat { name }`).
   *
   * @return {String} The GraphQL query string for the FragmentDefinition.
   */


  createClass(FragmentDefinition, [{
    key: 'toString',
    value: function toString() {
      return 'fragment ' + this.name + ' on ' + this.typeName + ' ' + this.selectionSet;
    }
  }]);
  return FragmentDefinition;
}();

function selectionsHaveIdField(selections) {
  return selections.some(function (fieldOrFragment) {
    if (Field.prototype.isPrototypeOf(fieldOrFragment)) {
      return fieldOrFragment.name === 'id';
    } else if (Spread.prototype.isPrototypeOf(fieldOrFragment) && fieldOrFragment.selectionSet.typeSchema.implementsNode) {
      return selectionsHaveIdField(fieldOrFragment.selectionSet.selections);
    }

    return false;
  });
}

function selectionsHaveTypenameField(selections) {
  return selections.some(function (fieldOrFragment) {
    if (Field.prototype.isPrototypeOf(fieldOrFragment)) {
      return fieldOrFragment.name === '__typename';
    } else if (Spread.prototype.isPrototypeOf(fieldOrFragment) && fieldOrFragment.selectionSet.typeSchema.implementsNode) {
      return selectionsHaveTypenameField(fieldOrFragment.selectionSet.selections);
    }

    return false;
  });
}

function indexSelectionsByResponseKey(selections) {
  function assignOrPush(obj, key, value) {
    if (Array.isArray(obj[key])) {
      obj[key].push(value);
    } else {
      obj[key] = [value];
    }
  }
  var unfrozenObject = selections.reduce(function (acc, selection) {
    if (selection.responseKey) {
      assignOrPush(acc, selection.responseKey, selection);
    } else {
      var responseKeys = Object.keys(selection.selectionSet.selectionsByResponseKey);

      responseKeys.forEach(function (responseKey) {
        assignOrPush(acc, responseKey, selection);
      });
    }

    return acc;
  }, {});

  Object.keys(unfrozenObject).forEach(function (key) {
    Object.freeze(unfrozenObject[key]);
  });

  return Object.freeze(unfrozenObject);
}

/**
 * Class that specifies the full selection of data to query.
 */

var SelectionSet = function () {

  /**
   * This constructor should not be invoked directly. SelectionSets are created when building queries/mutations.
   *
   * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
   * @param {(Object|String)} type The type of the current selection.
   * @param {Function} builderFunction Callback function used to build the SelectionSet.
   *   The callback takes a {@link SelectionSetBuilder} as its argument.
   */
  function SelectionSet(typeBundle, type, builderFunction) {
    classCallCheck(this, SelectionSet);


    if (typeof type === 'string') {
      this.typeSchema = schemaForType(typeBundle, type);
    } else {
      this.typeSchema = type;
    }

    trackTypeDependency(this.typeSchema.name);

    this.typeBundle = typeBundle;
    this.selections = [];
    if (builderFunction) {
      // eslint-disable-next-line no-use-before-define
      builderFunction(new SelectionSetBuilder(this.typeBundle, this.typeSchema, this.selections));
    }

    if (this.typeSchema.implementsNode || this.typeSchema.name === 'Node') {
      if (!selectionsHaveIdField(this.selections)) {
        this.selections.unshift(new Field('id', {}, new SelectionSet(typeBundle, 'ID')));
      }
    }

    if (this.typeSchema.kind === 'INTERFACE') {
      if (!selectionsHaveTypenameField(this.selections)) {
        this.selections.unshift(new Field('__typename', {}, new SelectionSet(typeBundle, 'String')));
      }
    }

    this.selectionsByResponseKey = indexSelectionsByResponseKey(this.selections);
    Object.freeze(this.selections);
    Object.freeze(this);
  }

  /**
   * Returns the GraphQL query string for the SelectionSet (e.g. `{ cat { name } }`).
   *
   * @return {String} The GraphQL query string for the SelectionSet.
   */


  createClass(SelectionSet, [{
    key: 'toString',
    value: function toString() {
      if (this.typeSchema.kind === 'SCALAR' || this.typeSchema.kind === 'ENUM') {
        return '';
      } else {
        return ' { ' + join(this.selections) + ' }';
      }
    }
  }]);
  return SelectionSet;
}();

var SelectionSetBuilder = function () {

  /**
   * This constructor should not be invoked directly. SelectionSetBuilders are created when building queries/mutations.
   *
   * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
   * @param {Object} typeSchema The schema object for the type of the current selection.
   * @param {Field[]} selections The fields on the current selection.
   */
  function SelectionSetBuilder(typeBundle, typeSchema, selections) {
    classCallCheck(this, SelectionSetBuilder);

    this.typeBundle = typeBundle;
    this.typeSchema = typeSchema;
    this.selections = selections;
  }

  createClass(SelectionSetBuilder, [{
    key: 'hasSelectionWithResponseKey',
    value: function hasSelectionWithResponseKey(responseKey) {
      return this.selections.some(function (field) {
        return field.responseKey === responseKey;
      });
    }

    /**
     * Adds a field to be queried on the current selection.
     *
     * @example
     * client.query((root) => {
     *   root.add('cat', {args: {id: '123456'}, alias: 'meow'}, (cat) => {
     *     cat.add('name');
     *   });
     * });
     *
     * @param {SelectionSet|String} selectionOrFieldName The selection or name of the field to add.
     * @param {Object} [options] Options on the query including:
     *   @param {Object} [options.args] Arguments on the query (e.g. `{id: '123456'}`).
     *   @param {String} [options.alias] Alias for the field being added.
     * @param {Function|SelectionSet} [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
     */

  }, {
    key: 'add',
    value: function add(selectionOrFieldName) {
      var selection = void 0;

      if (Object.prototype.toString.call(selectionOrFieldName) === '[object String]') {
        trackFieldDependency(this.typeSchema.name, selectionOrFieldName);

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        selection = this.field.apply(this, [selectionOrFieldName].concat(rest));
      } else {
        if (Field.prototype.isPrototypeOf(selectionOrFieldName)) {
          trackFieldDependency(this.typeSchema.name, selectionOrFieldName.name);
        }

        selection = selectionOrFieldName;
      }

      if (selection.responseKey && this.hasSelectionWithResponseKey(selection.responseKey)) {
        throw new Error('The field name or alias \'' + selection.responseKey + '\' has already been added.');
      }
      this.selections.push(selection);
    }
  }, {
    key: 'field',
    value: function field(name) {
      for (var _len2 = arguments.length, creationArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        creationArgs[_key2 - 1] = arguments[_key2];
      }

      var parsedArgs = parseFieldCreationArgs(creationArgs);
      var options = parsedArgs.options,
          callback = parsedArgs.callback;
      var selectionSet = parsedArgs.selectionSet;


      if (!selectionSet) {
        if (!this.typeSchema.fieldBaseTypes[name]) {
          throw new Error('No field of name "' + name + '" found on type "' + this.typeSchema.name + '" in schema');
        }

        var fieldBaseType = schemaForType(this.typeBundle, this.typeSchema.fieldBaseTypes[name]);

        selectionSet = new SelectionSet(this.typeBundle, fieldBaseType, callback);
      }

      return new Field(name, options, selectionSet);
    }

    /**
     * Creates an inline fragment.
     *
     * @access private
     * @param {String} typeName The type  the inline fragment.
     * @param {Function|SelectionSet}  [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
     * @return {InlineFragment} An inline fragment.
     */

  }, {
    key: 'inlineFragmentOn',
    value: function inlineFragmentOn(typeName) {
      var builderFunctionOrSelectionSet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      var selectionSet = void 0;

      if (SelectionSet.prototype.isPrototypeOf(builderFunctionOrSelectionSet)) {
        selectionSet = builderFunctionOrSelectionSet;
      } else {
        selectionSet = new SelectionSet(this.typeBundle, schemaForType(this.typeBundle, typeName), builderFunctionOrSelectionSet);
      }

      return new InlineFragment(typeName, selectionSet);
    }

    /**
     * Adds a field to be queried on the current selection.
     *
     * @access private
     * @param {String}    name The name of the field to add to the query.
     * @param {Object} [options] Options on the query including:
     *   @param {Object} [options.args] Arguments on the query (e.g. `{id: '123456'}`).
     *   @param {String} [options.alias] Alias for the field being added.
     * @param {Function}  [callback] Callback which will be used to create a new {@link SelectionSet} for the field added.
     */

  }, {
    key: 'addField',
    value: function addField(name) {
      for (var _len3 = arguments.length, creationArgs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        creationArgs[_key3 - 1] = arguments[_key3];
      }

      this.add.apply(this, [name].concat(creationArgs));
    }

    /**
     * Adds a connection to be queried on the current selection.
     * This adds all the fields necessary for pagination.
     *
     * @example
     * client.query((root) => {
     *   root.add('cat', (cat) => {
     *     cat.addConnection('friends', {args: {first: 10}, alias: 'coolCats'}, (friends) => {
     *       friends.add('name');
     *     });
     *   });
     * });
     *
     * @param {String}    name The name of the connection to add to the query.
     * @param {Object} [options] Options on the query including:
     *   @param {Object} [options.args] Arguments on the query (e.g. `{first: 10}`).
     *   @param {String} [options.alias] Alias for the field being added.
     * @param {Function|SelectionSet}  [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
     */

  }, {
    key: 'addConnection',
    value: function addConnection(name) {
      for (var _len4 = arguments.length, creationArgs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        creationArgs[_key4 - 1] = arguments[_key4];
      }

      var _parseFieldCreationAr = parseFieldCreationArgs(creationArgs),
          options = _parseFieldCreationAr.options,
          callback = _parseFieldCreationAr.callback,
          selectionSet = _parseFieldCreationAr.selectionSet;

      this.add(name, options, function (connection) {
        connection.add('pageInfo', {}, function (pageInfo) {
          pageInfo.add('hasNextPage');
          pageInfo.add('hasPreviousPage');
        });
        connection.add('edges', {}, function (edges) {
          edges.add('cursor');
          edges.addField('node', {}, selectionSet || callback); // This is bad. Don't do this
        });
      });
    }

    /**
     * Adds an inline fragment on the current selection.
     *
     * @example
     * client.query((root) => {
     *   root.add('animal', (animal) => {
     *     animal.addInlineFragmentOn('cat', (cat) => {
     *       cat.add('name');
     *     });
     *   });
     * });
     *
     * @param {String} typeName The name of the type of the inline fragment.
     * @param {Function|SelectionSet}  [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
     */

  }, {
    key: 'addInlineFragmentOn',
    value: function addInlineFragmentOn(typeName) {
      var fieldTypeCb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      this.add(this.inlineFragmentOn(typeName, fieldTypeCb));
    }

    /**
     * Adds a fragment spread on the current selection.
     *
     * @example
     * client.query((root) => {
     *   root.addFragment(catFragmentSpread);
     * });
     *
     * @param {FragmentSpread} fragmentSpread The fragment spread to add.
     */

  }, {
    key: 'addFragment',
    value: function addFragment(fragmentSpread) {
      this.add(fragmentSpread);
    }
  }]);
  return SelectionSetBuilder;
}();

function parseArgs(args) {
  var name = void 0;
  var variables = void 0;
  var selectionSetCallback = void 0;

  if (args.length === 3) {
    var _args = slicedToArray(args, 3);

    name = _args[0];
    variables = _args[1];
    selectionSetCallback = _args[2];
  } else if (args.length === 2) {
    if (Object.prototype.toString.call(args[0]) === '[object String]') {
      name = args[0];
      variables = null;
    } else if (Array.isArray(args[0])) {
      variables = args[0];
      name = null;
    }

    selectionSetCallback = args[1];
  } else {
    selectionSetCallback = args[0];
    name = null;
  }

  return { name: name, variables: variables, selectionSetCallback: selectionSetCallback };
}

var VariableDefinitions = function () {
  function VariableDefinitions(variableDefinitions) {
    classCallCheck(this, VariableDefinitions);

    this.variableDefinitions = variableDefinitions ? [].concat(toConsumableArray(variableDefinitions)) : [];
    Object.freeze(this.variableDefinitions);
    Object.freeze(this);
  }

  createClass(VariableDefinitions, [{
    key: 'toString',
    value: function toString() {
      if (this.variableDefinitions.length === 0) {
        return '';
      }

      return ' (' + join(this.variableDefinitions) + ') ';
    }
  }]);
  return VariableDefinitions;
}();

/**
 * Base class for {@link Query} and {@link Mutation}.
 * @abstract
 */


var Operation = function () {

  /**
   * This constructor should not be invoked. The subclasses {@link Query} and {@link Mutation} should be used instead.
   */
  function Operation(typeBundle, operationType) {
    classCallCheck(this, Operation);

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var _parseArgs = parseArgs(args),
        name = _parseArgs.name,
        variables = _parseArgs.variables,
        selectionSetCallback = _parseArgs.selectionSetCallback;

    this.typeBundle = typeBundle;
    this.name = name;
    this.variableDefinitions = new VariableDefinitions(variables);
    this.operationType = operationType;
    if (operationType === 'query') {
      this.selectionSet = new SelectionSet(typeBundle, typeBundle.queryType, selectionSetCallback);
      this.typeSchema = schemaForType(typeBundle, typeBundle.queryType);
    } else {
      this.selectionSet = new SelectionSet(typeBundle, typeBundle.mutationType, selectionSetCallback);
      this.typeSchema = schemaForType(typeBundle, typeBundle.mutationType);
    }
    Object.freeze(this);
  }

  /**
   * Whether the operation is anonymous (i.e. has no name).
   */


  createClass(Operation, [{
    key: 'toString',


    /**
     * Returns the GraphQL query or mutation string (e.g. `query myQuery { cat { name } }`).
     *
     * @return {String} The GraphQL query or mutation string.
     */
    value: function toString() {
      var nameString = this.name ? ' ' + this.name : '';

      return '' + this.operationType + nameString + this.variableDefinitions + this.selectionSet;
    }
  }, {
    key: 'isAnonymous',
    get: function get$$1() {
      return !this.name;
    }
  }]);
  return Operation;
}();

/**
 * GraphQL Query class.
 * @extends Operation
 */

var Query = function (_Operation) {
  inherits(Query, _Operation);

  /**
   * This constructor should not be invoked directly.
   * Use the factory functions {@link Client#query} or {@link Document#addQuery} to create a Query.
   *
   * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
   * @param {String} [name] A name for the query.
   * @param {Object[]} [variables] A list of variables in the query. See {@link Client#variable}.
   * @param {Function} selectionSetCallback The query builder callback.
   *   A {@link SelectionSet} is created using this callback.
   */
  function Query(typeBundle) {
    var _ref;

    classCallCheck(this, Query);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return possibleConstructorReturn(this, (_ref = Query.__proto__ || Object.getPrototypeOf(Query)).call.apply(_ref, [this, typeBundle, 'query'].concat(args)));
  }

  return Query;
}(Operation);

/**
 * GraphQL Mutation class.
 * @extends Operation
 */

var Mutation = function (_Operation) {
  inherits(Mutation, _Operation);

  /**
   * This constructor should not be invoked directly.
   * Use the factory functions {@link Client#mutation} or {@link Document#addMutation} to create a Mutation.
   *
   * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
   * @param {String} [name] A name for the mutation.
   * @param {Object[]} [variables] A list of variables in the mutation. See {@link Client#variable}.
   * @param {Function} selectionSetCallback The mutation builder callback.
   *   A {@link SelectionSet} is created using this callback.
   */
  function Mutation(typeBundle) {
    var _ref;

    classCallCheck(this, Mutation);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return possibleConstructorReturn(this, (_ref = Mutation.__proto__ || Object.getPrototypeOf(Mutation)).call.apply(_ref, [this, typeBundle, 'mutation'].concat(args)));
  }

  return Mutation;
}(Operation);

function isAnonymous(operation) {
  return operation.isAnonymous;
}

function hasAnonymousOperations(operations) {
  return operations.some(isAnonymous);
}

function hasDuplicateOperationNames(operations) {
  var names = operations.map(function (operation) {
    return operation.name;
  });

  return names.reduce(function (hasDuplicates, name, index) {
    return hasDuplicates || names.indexOf(name) !== index;
  }, false);
}

function extractOperation(typeBundle, operationType) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (Operation.prototype.isPrototypeOf(args[0])) {
    return args[0];
  }

  if (operationType === 'query') {
    return new (Function.prototype.bind.apply(Query, [null].concat([typeBundle], args)))();
  } else {
    return new (Function.prototype.bind.apply(Mutation, [null].concat([typeBundle], args)))();
  }
}

function isInvalidOperationCombination(operations) {
  if (operations.length === 1) {
    return false;
  }

  return hasAnonymousOperations(operations) || hasDuplicateOperationNames(operations);
}

function fragmentNameIsNotUnique(existingDefinitions, name) {
  return existingDefinitions.some(function (definition) {
    return definition.name === name;
  });
}

var Document = function () {

  /**
   * This constructor should not be invoked directly.
   * Use the factory function {@link Client#document} to create a Document.
   * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
   */
  function Document(typeBundle) {
    classCallCheck(this, Document);

    this.typeBundle = typeBundle;
    this.definitions = [];
  }

  /**
   * Returns the GraphQL query string for the Document (e.g. `query queryOne { ... } query queryTwo { ... }`).
   *
   * @return {String} The GraphQL query string for the Document.
   */


  createClass(Document, [{
    key: 'toString',
    value: function toString() {
      return join(this.definitions);
    }

    /**
     * Adds an operation to the Document.
     *
     * @private
     * @param {String} operationType The type of the operation. Either 'query' or 'mutation'.
     * @param {(Operation|String)} [query|queryName] Either an instance of an operation
     *   object, or the name of an operation. Both are optional.
     * @param {Object[]} [variables] A list of variables in the operation. See {@link Client#variable}.
     * @param {Function} [callback] The query builder callback. If an operation
     *   instance is passed, this callback will be ignored.
     *   A {@link SelectionSet} is created using this callback.
      */

  }, {
    key: 'addOperation',
    value: function addOperation(operationType) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var operation = extractOperation.apply(undefined, [this.typeBundle, operationType].concat(args));

      if (isInvalidOperationCombination(this.operations.concat(operation))) {
        throw new Error('All operations must be uniquely named on a multi-operation document');
      }

      this.definitions.push(operation);
    }

    /**
     * Adds a query to the Document.
     *
     * @example
     * document.addQuery('myQuery', (root) => {
     *   root.add('cat', (cat) => {
     *    cat.add('name');
     *   });
     * });
     *
     * @param {(Query|String)} [query|queryName] Either an instance of a query
     *   object, or the name of a query. Both are optional.
     * @param {Object[]} [variables] A list of variables in the query. See {@link Client#variable}.
     * @param {Function} [callback] The query builder callback. If a query
     *   instance is passed, this callback will be ignored.
     *   A {@link SelectionSet} is created using this callback.
     */

  }, {
    key: 'addQuery',
    value: function addQuery() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.addOperation.apply(this, ['query'].concat(args));
    }

    /**
     * Adds a mutation to the Document.
     *
     * @example
     * const input = client.variable('input', 'CatCreateInput!');
     *
     * document.addMutation('myMutation', [input], (root) => {
     *   root.add('catCreate', {args: {input}}, (catCreate) => {
     *     catCreate.add('cat', (cat) => {
     *       cat.add('name');
     *     });
     *   });
     * });
     *
     * @param {(Mutation|String)} [mutation|mutationName] Either an instance of a mutation
     *   object, or the name of a mutation. Both are optional.
     * @param {Object[]} [variables] A list of variables in the mutation. See {@link Client#variable}.
     * @param {Function} [callback] The mutation builder callback. If a mutation
     *   instance is passed, this callback will be ignored.
     *   A {@link SelectionSet} is created using this callback.
     */

  }, {
    key: 'addMutation',
    value: function addMutation() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.addOperation.apply(this, ['mutation'].concat(args));
    }

    /**
     * Defines a fragment on the Document.
     *
     * @param {String} name The name of the fragment.
     * @param {String} onType The type the fragment is on.
     * @param {Function} [builderFunction] The query builder callback.
     *   A {@link SelectionSet} is created using this callback.
     * @return {FragmentSpread} A {@link FragmentSpread} to be used with {@link SelectionSetBuilder#addFragment}.
     */

  }, {
    key: 'defineFragment',
    value: function defineFragment(name, onType, builderFunction) {
      if (fragmentNameIsNotUnique(this.fragmentDefinitions, name)) {
        throw new Error('All fragments must be uniquely named on a multi-fragment document');
      }

      var selectionSet = new SelectionSet(this.typeBundle, onType, builderFunction);
      var fragment = new FragmentDefinition(name, onType, selectionSet);

      this.definitions.push(fragment);

      return fragment.spread;
    }

    /**
     * All operations ({@link Query} and {@link Mutation}) on the Document.
     */

  }, {
    key: 'operations',
    get: function get$$1() {
      return this.definitions.filter(function (definition) {
        return Operation.prototype.isPrototypeOf(definition);
      });
    }

    /**
     * All {@link FragmentDefinition}s on the Document.
     */

  }, {
    key: 'fragmentDefinitions',
    get: function get$$1() {
      return this.definitions.filter(function (definition) {
        return FragmentDefinition.prototype.isPrototypeOf(definition);
      });
    }
  }]);
  return Document;
}();

/**
 * The base class used when deserializing response data.
 * Provides rich features, like functions to generate queries to refetch a node or fetch the next page.
 *
 * @class
 */
var GraphModel =

/**
 * @param {Object} attrs Attributes on the GraphModel.
 */
function GraphModel(attrs) {
  var _this = this;

  classCallCheck(this, GraphModel);

  Object.defineProperty(this, 'attrs', { value: attrs, enumerable: false });

  Object.keys(this.attrs).filter(function (key) {
    return !(key in _this);
  }).forEach(function (key) {
    var descriptor = void 0;

    if (attrs[key] === null) {
      descriptor = {
        enumerable: true,
        get: function get$$1() {
          return null;
        }
      };
    } else {
      descriptor = {
        enumerable: true,
        get: function get$$1() {
          return this.attrs[key].valueOf();
        }
      };
    }
    Object.defineProperty(_this, key, descriptor);
  });
};

/**
 * A registry of classes used to deserialize the response data. Uses {@link GraphModel} by default.
 */

var ClassRegistry = function () {
  function ClassRegistry() {
    classCallCheck(this, ClassRegistry);

    this.classStore = {};
  }

  /**
   * Registers a class for a GraphQL type in the registry.
   *
   * @param {Class} constructor The constructor of the class.
   * @param {String} type The GraphQL type of the object to deserialize into the class.
   */


  createClass(ClassRegistry, [{
    key: 'registerClassForType',
    value: function registerClassForType(constructor, type) {
      this.classStore[type] = constructor;
    }

    /**
     * Unregisters a class for a GraphQL type in the registry.
     *
     * @param {String} type The GraphQL type to unregister.
     */

  }, {
    key: 'unregisterClassForType',
    value: function unregisterClassForType(type) {
      delete this.classStore[type];
    }

    /**
     * Returns the class for the given GraphQL type.
     *
     * @param {String} type The GraphQL type to look up.
     * @return {Class|GraphModel} The class for the given GraphQL type. Defaults to {@link GraphModel} if no class is registered for the GraphQL type.
     */

  }, {
    key: 'classForType',
    value: function classForType(type) {
      return this.classStore[type] || GraphModel;
    }
  }]);
  return ClassRegistry;
}();

function isValue(arg) {
  return Object.prototype.toString.call(arg) !== '[object Null]' && Object.prototype.toString.call(arg) !== '[object Undefined]';
}

function isNodeContext(context) {
  return context.selection.selectionSet.typeSchema.implementsNode;
}

function isConnection(context) {
  return context.selection.selectionSet.typeSchema.name.endsWith('Connection');
}

function nearestNode(context) {
  if (context == null) {
    return null;
  } else if (isNodeContext(context)) {
    return context;
  } else {
    return nearestNode(context.parent);
  }
}

function contextsFromRoot(context) {
  if (context.parent) {
    return contextsFromRoot(context.parent).concat(context);
  } else {
    return [context];
  }
}

function contextsFromNearestNode(context) {
  if (context.selection.selectionSet.typeSchema.implementsNode) {
    return [context];
  } else {
    return contextsFromNearestNode(context.parent).concat(context);
  }
}

function initializeDocumentAndVars(currentContext, contextChain) {
  var lastInChain = contextChain[contextChain.length - 1];
  var first = lastInChain.selection.args.first;
  var variableDefinitions = Object.keys(lastInChain.selection.args).filter(function (key) {
    return isVariable(lastInChain.selection.args[key]);
  }).map(function (key) {
    return lastInChain.selection.args[key];
  });

  var firstVar = variableDefinitions.find(function (definition) {
    return definition.name === 'first';
  });

  if (!firstVar) {
    firstVar = variable('first', 'Int', first);
    variableDefinitions.push(firstVar);
  }

  var document = new Document(currentContext.selection.selectionSet.typeBundle);

  return [document, variableDefinitions, firstVar];
}

function addNextFieldTo(currentSelection, contextChain, path, cursor) {
  // There are always at least two. When we start, it's the root context, and the first set
  var nextContext = contextChain.shift();

  path.push(nextContext.selection.responseKey);

  if (contextChain.length) {
    currentSelection.add(nextContext.selection.name, { alias: nextContext.selection.alias, args: nextContext.selection.args }, function (newSelection) {
      addNextFieldTo(newSelection, contextChain, path, cursor);
    });
  } else {
    var edgesField = nextContext.selection.selectionSet.selections.find(function (field) {
      return field.name === 'edges';
    });
    var nodeField = edgesField.selectionSet.selections.find(function (field) {
      return field.name === 'node';
    });
    var first = void 0;

    if (isVariable(nextContext.selection.args.first)) {
      first = nextContext.selection.args.first;
    } else {
      first = variable('first', 'Int', nextContext.selection.args.first);
    }

    var options = {
      alias: nextContext.selection.alias,
      args: Object.assign({}, nextContext.selection.args, { after: cursor, first: first })
    };

    currentSelection.addConnection(nextContext.selection.name, options, nodeField.selectionSet);
  }
}

function collectFragments(selections) {
  return selections.reduce(function (fragmentDefinitions, field) {
    if (FragmentSpread.prototype.isPrototypeOf(field)) {
      fragmentDefinitions.push(field.toDefinition());
    }

    fragmentDefinitions.push.apply(fragmentDefinitions, toConsumableArray(collectFragments(field.selectionSet.selections)));

    return fragmentDefinitions;
  }, []);
}

function nextPageQueryAndPath(context, cursor) {
  var nearestNodeContext = nearestNode(context);

  if (nearestNodeContext) {
    return function () {
      var _document$definitions;

      var path = [];
      var nodeType = nearestNodeContext.selection.selectionSet.typeSchema;
      var nodeId = nearestNodeContext.responseData.id;
      var contextChain = contextsFromNearestNode(context);

      var _initializeDocumentAn = initializeDocumentAndVars(context, contextChain),
          _initializeDocumentAn2 = slicedToArray(_initializeDocumentAn, 2),
          document = _initializeDocumentAn2[0],
          variableDefinitions = _initializeDocumentAn2[1];

      document.addQuery(variableDefinitions, function (root) {
        path.push('node');
        root.add('node', { args: { id: nodeId } }, function (node) {
          node.addInlineFragmentOn(nodeType.name, function (fragment) {
            addNextFieldTo(fragment, contextChain.slice(1), path, cursor);
          });
        });
      });

      var fragments = collectFragments(document.operations[0].selectionSet.selections);

      (_document$definitions = document.definitions).unshift.apply(_document$definitions, toConsumableArray(fragments));

      return [document, path];
    };
  } else {
    return function () {
      var _document$definitions2;

      var path = [];
      var contextChain = contextsFromRoot(context);

      var _initializeDocumentAn3 = initializeDocumentAndVars(context, contextChain),
          _initializeDocumentAn4 = slicedToArray(_initializeDocumentAn3, 2),
          document = _initializeDocumentAn4[0],
          variableDefinitions = _initializeDocumentAn4[1];

      document.addQuery(variableDefinitions, function (root) {
        addNextFieldTo(root, contextChain.slice(1), path, cursor);
      });

      var fragments = collectFragments(document.operations[0].selectionSet.selections);

      (_document$definitions2 = document.definitions).unshift.apply(_document$definitions2, toConsumableArray(fragments));

      return [document, path];
    };
  }
}

function hasNextPage$1(connection, edge) {
  if (edge !== connection.edges[connection.edges.length - 1]) {
    return new Scalar(true);
  }

  return connection.pageInfo.hasNextPage;
}

function hasPreviousPage(connection, edge) {
  if (edge !== connection.edges[0]) {
    return new Scalar(true);
  }

  return connection.pageInfo.hasPreviousPage;
}

function transformConnections(variableValues) {
  return function (context, value) {
    if (isConnection(context)) {
      if (!(value.pageInfo && value.pageInfo.hasOwnProperty('hasNextPage') && value.pageInfo.hasOwnProperty('hasPreviousPage'))) {
        throw new Error('Connections must include the selections "pageInfo { hasNextPage, hasPreviousPage }".');
      }

      return value.edges.map(function (edge) {
        return Object.assign(edge.node, {
          nextPageQueryAndPath: nextPageQueryAndPath(context, edge.cursor),
          hasNextPage: hasNextPage$1(value, edge),
          hasPreviousPage: hasPreviousPage(value, edge),
          variableValues: variableValues
        });
      });
    } else {
      return value;
    }
  };
}

/* eslint-disable no-warning-comments */
var DecodingContext = function () {
  function DecodingContext(selection, responseData) {
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    classCallCheck(this, DecodingContext);

    this.selection = selection;
    this.responseData = responseData;
    this.parent = parent;
    Object.freeze(this);
  }

  createClass(DecodingContext, [{
    key: 'contextForObjectProperty',
    value: function contextForObjectProperty(responseKey) {
      var nestedSelections = this.selection.selectionSet.selectionsByResponseKey[responseKey];
      var nextSelection = nestedSelections && nestedSelections[0];
      var nextContext = void 0;

      // fragment spreads operate inside the current context, so we recurse to get the proper
      // selection set, but retain the current response context
      if (Spread.prototype.isPrototypeOf(nextSelection)) {
        nextContext = new DecodingContext(nextSelection, this.responseData, this.parent);
      } else {
        nextContext = new DecodingContext(nextSelection, this.responseData[responseKey], this);
      }

      if (!nextSelection) {
        throw new Error('Unexpected response key "' + responseKey + '", not found in selection set: ' + this.selection.selectionSet);
      }

      if (Field.prototype.isPrototypeOf(nextSelection)) {
        return nextContext;
      } else {
        return nextContext.contextForObjectProperty(responseKey);
      }
    }
  }, {
    key: 'contextForArrayItem',
    value: function contextForArrayItem(item) {
      return new DecodingContext(this.selection, item, this.parent);
    }
  }]);
  return DecodingContext;
}();

function decodeArrayItems(context, transformers) {
  return context.responseData.map(function (item) {
    return decodeContext(context.contextForArrayItem(item), transformers);
  });
}

function decodeObjectValues(context, transformers) {
  return Object.keys(context.responseData).reduce(function (acc, responseKey) {
    acc[responseKey] = decodeContext(context.contextForObjectProperty(responseKey), transformers);

    return acc;
  }, {});
}

function runTransformers(transformers, context, value) {
  return transformers.reduce(function (acc, transformer) {
    return transformer(context, acc);
  }, value);
}

function decodeContext(context, transformers) {
  var value = context.responseData;

  if (Array.isArray(value)) {
    value = decodeArrayItems(context, transformers);
  } else if (isObject(value)) {
    value = decodeObjectValues(context, transformers);
  }

  return runTransformers(transformers, context, value);
}

function generateRefetchQueries(context, value) {
  if (isValue(value) && isNodeContext(context)) {
    value.refetchQuery = function () {
      return new Query(context.selection.selectionSet.typeBundle, function (root) {
        root.add('node', { args: { id: context.responseData.id } }, function (node) {
          node.addInlineFragmentOn(context.selection.selectionSet.typeSchema.name, context.selection.selectionSet);
        });
      });
    };
  }

  return value;
}

function transformPojosToClassesWithRegistry(classRegistry) {
  return function transformPojosToClasses(context, value) {
    if (isObject(value)) {
      var Klass = classRegistry.classForType(context.selection.selectionSet.typeSchema.name);

      return new Klass(value);
    } else {
      return value;
    }
  };
}

function transformScalars(context, value) {
  if (isValue(value)) {
    if (context.selection.selectionSet.typeSchema.kind === 'SCALAR') {
      return new Scalar(value);
    } else if (context.selection.selectionSet.typeSchema.kind === 'ENUM') {
      return new Enum(value);
    }
  }

  return value;
}

function recordTypeInformation(context, value) {
  if (isValue(value)) {
    if (value.__typename) {
      value.type = schemaForType(context.selection.selectionSet.typeBundle, value.__typename);
    } else {
      value.type = context.selection.selectionSet.typeSchema;
    }
  }

  return value;
}

function defaultTransformers(_ref) {
  var _ref$classRegistry = _ref.classRegistry,
      classRegistry = _ref$classRegistry === undefined ? new ClassRegistry() : _ref$classRegistry,
      variableValues = _ref.variableValues;

  return [transformScalars, generateRefetchQueries, transformConnections(variableValues), recordTypeInformation, transformPojosToClassesWithRegistry(classRegistry)];
}

/**
 * A function used to decode the response data.
 *
 * @function decode
 * @param {SelectionSet} selection The selection set used to query the response data.
 * @param {Object} responseData The response data returned.
 * @param {Object} [options] Options to use when decoding including:
 *   @param {ClassRegistry} [options.classRegistry] A class registry to use when deserializing the data into classes.
 * @return {GraphModel} The decoded response data.
 */
function decode(selection, responseData) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var transformers = options.transformers || defaultTransformers(options);
  var context = new DecodingContext(selection, responseData);

  return decodeContext(context, transformers);
}

function httpFetcher(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function fetcher(graphQLParams) {
    return fetch(url, _extends({
      body: JSON.stringify(graphQLParams),
      method: 'POST',
      mode: 'cors'
    }, options, {
      headers: _extends({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, options.headers)
    })).then(function (response) {
      var contentType = response.headers.get('content-type');

      if (contentType === 'application/json') {
        return _handleJSONResponse(response);
      }

      return _handleTextResponse(response);
    });
  };
}

function _handleJSONResponse(response) {
  return response.json().then(function (responseJSON) {
    var hasError = Boolean(responseJSON.errors);

    if (hasError) {
      return {
        status: response.status,
        errors: responseJSON.errors,
        hasError: true
      };
    }

    return responseJSON;
  });
}

function _handleTextResponse(response) {
  return response.text().then(function (responseText) {
    var hasError = !response.ok;

    if (hasError) {
      return {
        status: response.status,
        errors: responseText,
        hasError: true
      };
    }

    return { data: responseText };
  });
}

function hasNextPage(paginatedModels) {
  return paginatedModels && paginatedModels.length && paginatedModels[paginatedModels.length - 1].hasNextPage;
}

/**
 * The Client class used to create and send GraphQL documents, fragments, queries and mutations.
 */

var Client = function () {

  /**
   * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
   * @param {Object} options An options object. Must include either `url` and optional `fetcherOptions` OR a `fetcher` function.
   *   @param {(String|Function)} options.url|fetcher Either the URL of the GraphQL API endpoint, or a custom fetcher function for further customization.
   *   @param {Object} [options.fetcherOptions] Additional options to use with `fetch`, like headers. Do not specify this argument if `fetcher` is specified.
   *   @param {ClassRegistry} [options.registry=new ClassRegistry()] A {@link ClassRegistry} used to decode the response data.
   */
  function Client(typeBundle, _ref) {
    var url = _ref.url,
        fetcherOptions = _ref.fetcherOptions,
        fetcher = _ref.fetcher,
        _ref$registry = _ref.registry,
        registry = _ref$registry === undefined ? new ClassRegistry() : _ref$registry;
    classCallCheck(this, Client);

    this.typeBundle = typeBundle;
    this.classRegistry = registry;

    if (url && fetcher) {
      throw new Error('Arguments not supported: supply either `url` and optional `fetcherOptions` OR use a `fetcher` function for further customization.');
    }

    if (url) {
      this.fetcher = httpFetcher(url, fetcherOptions);
    } else if (fetcher) {
      if (fetcherOptions) {
        throw new Error('Arguments not supported: when specifying your own `fetcher`, set options through it and not with `fetcherOptions`');
      }

      this.fetcher = fetcher;
    } else {
      throw new Error('Invalid arguments: one of `url` or `fetcher` is needed.');
    }
  }

  /**
   * Creates a GraphQL document.
   *
   * @example
   * const document = client.document();
   *
   * @return {Document} A GraphQL document.
   */


  createClass(Client, [{
    key: 'document',
    value: function document() {
      return new Document(this.typeBundle);
    }

    /**
     * Creates a GraphQL query.
     *
     * @example
     * const query = client.query('myQuery', (root) => {
     *   root.add('cat', (cat) => {
     *    cat.add('name');
     *   });
     * });
     *
     * @param {String} [name] A name for the query.
     * @param {VariableDefinition[]} [variables] A list of variables in the query. See {@link Client#variable}.
     * @param {Function} selectionSetCallback The query builder callback.
     *   A {@link SelectionSet} is created using this callback.
     * @return {Query} A GraphQL query.
     */

  }, {
    key: 'query',
    value: function query() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(Query, [null].concat([this.typeBundle], args)))();
    }

    /**
     * Creates a GraphQL mutation.
     *
     * @example
     * const input = client.variable('input', 'CatCreateInput!');
     *
     * const mutation = client.mutation('myMutation', [input], (root) => {
     *   root.add('catCreate', {args: {input}}, (catCreate) => {
     *     catCreate.add('cat', (cat) => {
     *       cat.add('name');
     *     });
     *   });
     * });
     *
     * @param {String} [name] A name for the mutation.
     * @param {VariableDefinition[]} [variables] A list of variables in the mutation. See {@link Client#variable}.
     * @param {Function} selectionSetCallback The mutation builder callback.
     *   A {@link SelectionSet} is created using this callback.
     * @return {Mutation} A GraphQL mutation.
     */

  }, {
    key: 'mutation',
    value: function mutation() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return new (Function.prototype.bind.apply(Mutation, [null].concat([this.typeBundle], args)))();
    }

    /**
     * Sends a GraphQL operation (query or mutation) or a document.
     *
     * @example
     * client.send(query, {id: '12345'}).then((result) => {
     *   // Do something with the returned result
     *   console.log(result);
     * });
     *
     * @param {(Query|Mutation|Document|Function)} request The operation or document to send. If represented
     * as a function, it must return `Query`, `Mutation`, or `Document` and recieve the client as the only param.
     * @param {Object} [variableValues] The values for variables in the operation or document.
     * @param {Object} [otherProperties] Other properties to send with the query. For example, a custom operation name.
     * @return {Promise.<Object>} A promise resolving to an object containing the response data.
     */

  }, {
    key: 'send',
    value: function send(request) {
      var _this = this;

      var variableValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var otherProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var operationOrDocument = void 0;

      if (Function.prototype.isPrototypeOf(request)) {
        operationOrDocument = request(this);
      } else {
        operationOrDocument = request;
      }

      var graphQLParams = { query: operationOrDocument.toString() };

      if (variableValues) {
        graphQLParams.variables = variableValues;
      }

      Object.assign(graphQLParams, otherProperties);

      var operation = void 0;

      if (Operation.prototype.isPrototypeOf(operationOrDocument)) {
        operation = operationOrDocument;
      } else {
        var document = operationOrDocument;

        if (document.operations.length === 1) {
          operation = document.operations[0];
        } else if (otherProperties.operationName) {
          operation = document.operations.find(function (documentOperation) {
            return documentOperation.name === otherProperties.operationName;
          });
        } else {
          throw new Error('\n          A document must contain exactly one operation, or an operationName\n          must be specified. Example:\n\n            client.send(document, null, {operationName: \'myFancyQuery\'});\n        ');
        }
      }

      return this.fetcher(graphQLParams).then(function (response) {
        if (response.data) {
          response.model = decode(operation, response.data, {
            classRegistry: _this.classRegistry,
            variableValues: variableValues
          });
        }

        return response;
      });
    }

    /**
     * Fetches the next page of a paginated node or array of nodes.
     *
     * @example
     * client.fetchNextPage(node, {first: 10}).then((result) => {
     *   // Do something with the next page
     *   console.log(result);
     * });
     *
     * @param {(GraphModel|GraphModel[])} nodeOrNodes The node or list of nodes on which to fetch the next page.
     * @param {Object} [options] Options object containing:
     *   @param {Integer} [options.first] The number of nodes to query on the next page. Defaults to the page size of the previous query.
     * @return {Promise.<GraphModel[]>} A promise resolving with the next page of {@link GraphModel}s.
     */

  }, {
    key: 'fetchNextPage',
    value: function fetchNextPage(nodeOrNodes, options) {
      var node = void 0;

      if (Array.isArray(nodeOrNodes)) {
        node = nodeOrNodes[nodeOrNodes.length - 1];
      } else {
        node = nodeOrNodes;
      }

      var _node$nextPageQueryAn = node.nextPageQueryAndPath(),
          _node$nextPageQueryAn2 = slicedToArray(_node$nextPageQueryAn, 2),
          query = _node$nextPageQueryAn2[0],
          path = _node$nextPageQueryAn2[1];

      var variableValues = void 0;

      if (node.variableValues || options) {
        variableValues = Object.assign({}, node.variableValues, options);
      }

      return this.send(query, variableValues).then(function (response) {
        response.model = path.reduce(function (object, key) {
          return object[key];
        }, response.model);

        return response;
      });
    }

    /**
     * Fetches all subsequent pages of a paginated array of nodes.
     *
     * @example
     * client.fetchAllPages(nodes, {pageSize: 20}).then((result) => {
     *   // Do something with all the models
     *   console.log(result);
     * });
     *
     * @param {GraphModel[]} paginatedModels The list of nodes on which to fetch all pages.
     * @param {Object} options Options object containing:
     *   @param {Integer} options.pageSize The number of nodes to query on each page.
     * @return {Promise.<GraphModel[]>} A promise resolving with all pages of {@link GraphModel}s, including the original list.
     */

  }, {
    key: 'fetchAllPages',
    value: function fetchAllPages(paginatedModels, _ref2) {
      var _this2 = this;

      var pageSize = _ref2.pageSize;

      if (hasNextPage(paginatedModels)) {
        return this.fetchNextPage(paginatedModels, { first: pageSize }).then(function (_ref3) {
          var model = _ref3.model;

          var pages = paginatedModels.concat(model);

          return _this2.fetchAllPages(pages, { pageSize: pageSize });
        });
      }

      return Promise.resolve(paginatedModels);
    }

    /**
     * Refetches a {@link GraphModel} whose type implements `Node`.
     *
     * @example
     * client.refetch(node).then((result) => {
     *   // Do something with the refetched node
     *   console.log(result);
     * });
     *
     * @param {GraphModel} nodeType A {@link GraphModel} whose type implements `Node`.
     * @return {Promise.<GraphModel>} The refetched {@link GraphModel}.
     */

  }, {
    key: 'refetch',
    value: function refetch(nodeType) {
      if (!nodeType) {
        throw new Error('\'client#refetch\' must be called with a non-null instance of a Node.');
      } else if (!nodeType.type.implementsNode) {
        throw new Error('\'client#refetch\' must be called with a type that implements Node. Received ' + nodeType.type.name + '.');
      }

      return this.send(nodeType.refetchQuery()).then(function (_ref4) {
        var model = _ref4.model;
        return model.node;
      });
    }

    /**
     * Creates a variable to be used in a {@link Query} or {@link Mutation}.
     *
     * @example
     * const idVariable = client.variable('id', 'ID!', '12345');
     *
     * @param {String} name The name of the variable.
     * @param {String} type The GraphQL type of the variable.
     * @param {*} [defaultValue] The default value of the variable.
     * @return {VariableDefinition} A variable object that can be used in a {@link Query} or {@link Mutation}.
     */

  }, {
    key: 'variable',
    value: function variable$$1(name, type, defaultValue) {
      return variable(name, type, defaultValue);
    }

    /**
     * Creates an enum to be used in a {@link Query} or {@link Mutation}.
     *
     * @example
     * const titleEnum = client.enum('TITLE');
     *
     * @param {String} key The key of the enum.
     * @return {Enum} An enum object that can be used in a {@link Query} or {@link Mutation}.
     */

  }, {
    key: 'enum',
    value: function _enum(key) {
      return enumFunction(key);
    }
  }]);
  return Client;
}();

exports.ClassRegistry = ClassRegistry;
exports['default'] = Client;
exports.GraphModel = GraphModel;
exports.decode = decode;
//# sourceMappingURL=index.js.map