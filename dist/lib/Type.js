"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithRefine = exports.WithUnion = exports.WithUnknownContainers = exports.Schemable = exports.URI = exports.union = exports.sum = exports.lazy = exports.intersect = exports.tuple = exports.array = exports.record = exports.partial = exports.type = exports.nullable = exports.refine = exports.UnknownRecord = exports.UnknownArray = exports.boolean = exports.number = exports.string = exports.literal = void 0;
/**
 * **This module is experimental**
 *
 * Experimental features are published in order to get early feedback from the community, see these tracking
 * [issues](https://github.com/gcanti/io-ts/issues?q=label%3Av2.2+) for further discussions and enhancements.
 *
 * A feature tagged as _Experimental_ is in a high state of flux, you're at risk of it changing without notice.
 *
 * @since 2.2.3
 */
var E = __importStar(require("fp-ts/lib/Either"));
var pipeable_1 = require("fp-ts/lib/pipeable");
var t = __importStar(require("./index"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.2.3
 */
var literal = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return t.union(values.map(function (v) { return t.literal(v); }));
};
exports.literal = literal;
// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------
/**
 * @category primitives
 * @since 2.2.3
 */
exports.string = t.string;
/**
 * @category primitives
 * @since 2.2.3
 */
exports.number = new t.Type(t.number.name, t.number.is, function (u, c) {
    return pipeable_1.pipe(t.number.decode(u), E.chain(function (n) { return (isNaN(n) ? t.failure(u, c) : t.success(n)); }));
}, t.number.encode);
/**
 * @category primitives
 * @since 2.2.3
 */
exports.boolean = t.boolean;
/**
 * @category primitives
 * @since 2.2.3
 */
exports.UnknownArray = t.UnknownArray;
/**
 * @category primitives
 * @since 2.2.3
 */
exports.UnknownRecord = t.UnknownRecord;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.2.3
 */
var refine = function (refinement, id) { return function (from) {
    // tslint:disable-next-line: deprecation
    return t.refinement(from, refinement, id);
}; };
exports.refine = refine;
/**
 * @category combinators
 * @since 2.2.3
 */
var nullable = function (or) { return t.union([t.null, or]); };
exports.nullable = nullable;
/**
 * @category combinators
 * @since 2.2.3
 */
var type = function (properties) {
    return t.type(properties);
};
exports.type = type;
/**
 * @category combinators
 * @since 2.2.3
 */
var partial = function (properties) {
    return t.partial(properties);
};
exports.partial = partial;
/**
 * @category combinators
 * @since 2.2.3
 */
var record = function (codomain) { return t.record(t.string, codomain); };
exports.record = record;
/**
 * @category combinators
 * @since 2.2.3
 */
var array = function (item) { return t.array(item); };
exports.array = array;
/**
 * @category combinators
 * @since 2.2.3
 */
var tuple = function () {
    var components = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        components[_i] = arguments[_i];
    }
    return t.tuple(components);
};
exports.tuple = tuple;
/**
 * @category combinators
 * @since 2.2.3
 */
var intersect = function (right) { return function (left) { return t.intersection([left, right]); }; };
exports.intersect = intersect;
/**
 * @category combinators
 * @since 2.2.3
 */
var lazy = function (id, f) { return t.recursion(id, f); };
exports.lazy = lazy;
/**
 * @category combinators
 * @since 2.2.3
 */
var sum = function (_tag) { return function (members) { return t.union(Object.values(members)); }; };
exports.sum = sum;
/**
 * @category combinators
 * @since 2.2.3
 */
var union = function () {
    var members = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        members[_i] = arguments[_i];
    }
    return t.union(members);
};
exports.union = union;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.2.3
 */
exports.URI = 'io-ts/Type';
/**
 * @category instances
 * @since 2.2.8
 */
exports.Schemable = {
    URI: exports.URI,
    literal: exports.literal,
    string: exports.string,
    number: exports.number,
    boolean: exports.boolean,
    nullable: exports.nullable,
    type: exports.type,
    partial: exports.partial,
    record: exports.record,
    array: exports.array,
    tuple: exports.tuple,
    intersect: exports.intersect,
    sum: exports.sum,
    lazy: exports.lazy
};
/**
 * @category instances
 * @since 2.2.8
 */
exports.WithUnknownContainers = {
    UnknownArray: exports.UnknownArray,
    UnknownRecord: exports.UnknownRecord
};
/**
 * @category instances
 * @since 2.2.8
 */
exports.WithUnion = {
    union: exports.union
};
/**
 * @category instances
 * @since 2.2.8
 */
exports.WithRefine = {
    refine: exports.refine
};
