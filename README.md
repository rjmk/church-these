# Church These

A church encoding of the These data structure inspired by
@joneshf's [Elm These][elm-these],
[this article featuring Church encoding][church],
and @dominictarr's [pull streams][pull].

[elm-these]: https://github.com/joneshf/elm-these
[church]: http://www.haskellforall.com/2014/09/morte-intermediate-language-for-super.html
[pull]: https://github.com/pull-stream/pull-stream

![static-land](https://raw.githubusercontent.com/rpominov/static-land/master/logo/logo.png)

## Installation

```console
npm install church-these
```

## Motivation

If you have two boxes that can have something in them there are 4 possibilities:
* Both are occupied
* Neither are occupied
* One each for each box being occupied (assuming you can distinguish the boxes)

The `Either` type restricts one to the bottom bullet point.
The `These` type restricts one to either the first or the last bullet point.

This is useful for modelling situations where not all 4 possibilities make sense

## Compatibility

This library fufils the following [Static Land][static-land] specs:

* Functor
* Bifunctor
* Foldable
* Traversable

It could, but does not currently, fulfil (after constraining the types it holds):

* Semigroup
* Monoid
* Apply
* Applicative
* Monad

[static-land]: https://github.com/rpominov/static-land

## Usage

```js
var These = require('these')

var a = These.this(13)
var b = These.that([ "hello" ])
var c = These.those(0, [ "a", "b" ])

var change = those =>
	These.bimap(x => x + 1, xs => xs.map(x => x.toUpperCase()), those)

change(a) // These.this(14)
change(b) // These.that([ "HELLO" ])
change(c) // These.those(1, [ "A", "B")

var cata = those =>
	those(x => x, xs => xs.reverse(), (x, xs) => Array.apply(Array, Array(x)).map(_ => xs))

cata(a) // 13
cata(b) // [ "hello" ]
cata(c) // [ [ "a", "b" ], [ "a", "b" ], ..., [ "a", "b" ] ]
```

## Vibe

I've not curried the functions which has reduced opportunities for pointfree.
There's no check that you always pass in all three reducing functions.
It might make sense to add one, but I'm erring on the side of bare bones

## TODO

* Add support for constrained Static Land types
* JSVerify
