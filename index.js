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

exports.merge = function (f, these) {
	return these(id, id, f)
}

exports.mergeWith = function (f, g, h, these) {
	return these(g, h, function (x, y) {
		return f(g(x), h(y))
	})
}

exports.map = function (f, them) {
  return them(exports.this, function (x) {
  	return exports.that(f(x))
  }, function (x, y) {
  	return exports.these(x, f(y))
  })
}

function id (x) { return x }