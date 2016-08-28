exports['this'] = function it (x) { // `it` as `this` is a reserved word
	return function (this_, _, _) {
		return this_(x)
	}
}

exports.that = function that (x) {
	return function (_, that_, _) {
		return that_(x)
	}
}

exports.these = function these (x, y) {
	return function (_, _, these_) {
		return these_(x, y)
	}
}

exports.merge = function (f, those) {
	return those(id, id, f)
}

exports.mergeWith = function (f, g, h, those) {
	return those(g, h, function (x, y) {
		return f(g(x), h(y))
	})
}

exports.map = function (f, those) {
	return exports.bimap(id, f, those)
}

exports.bimap = function (f, g, those) {
	return those(
		compose(exports.this, f),
		compose(exports.that, g),
		function (x, y) { return exports.these(f(x), g(y)) }
	)
}

exports.reduce = function (f, init, those) {
	return those(constant(init), function (x) { return f(init, x) }, constant(init))
}

exports.sequence = function (F, those) {
	return those(
		function (x) { return F.of(exports.this(x))  },
		function (x) { return F.map(exports.that, x) },
		function (x, y) { return F.map(function (z) { return exports.these(x, z) }, y) }
	)
}

function id (x) { return x }

function compose (f, g) { return function (x) { return f(g(x)) } }

function constant (x) { return function (_) { return x } }
