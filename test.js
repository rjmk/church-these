var these = require('./')
var assert = require('assert')

var one = these.this(1)
var two = these.that("two")
var oneTwo = these.these(1, "two")

function ifOne (one) {
	return [ 1, one ]
}

function ifTwo (two) {
	return [ 2, two ]
}

function ifBoth (one, two) {
	return [ "BOTH", one, two ]
}

function go (these) {
	return these(ifOne, ifTwo, ifBoth)
}

assert.deepEqual(go(one), [ 1, 1 ], 'one')

assert.deepEqual(go(two), [ 2, "two" ], 'two')

assert.deepEqual(go(oneTwo), [ "BOTH", 1, 'two' ], 'oneTwo')

assert.deepEqual(mergeFirst(one), mergeFirst(oneTwo), 'merge')

assert.equal(myMerge(one), 2)

assert.equal(myMerge(two), 2)

assert.equal(myMerge(oneTwo), 4)

assert.equal(these.map(inc, these.that(1))(id, id, add), 2)

assert.equal(these.map(inc, these.these(0, 1))(id, id, add), 2)

assert.deepEqual(go(these.bimap(inc, id, these.these(0, 1))), [ "BOTH", 1, 1])

assert.equal(these.reduce(add, 30, these.that(12)), 42)

assert.equal(these.reduce(add, 30, these.this(12)), 30)

assert.equal(these.sequence({ of: x => x, map: (f, x) => x }, these.that(3)), 3)

function mergeFirst (them) { return these.merge(function (x, _) { return x }, them) }

function myMerge (them) {
	return these.mergeWith(add, inc, function (_) { return 2 }, them)
}

function inc (x) { return x + 1 }

function add (x, y) { return x + y }

function id (x) { return x }