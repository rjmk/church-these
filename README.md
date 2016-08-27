# Church These

A church encoding of the These data structure inspired by [@joneshf's Elm These][elm-these] and [this article featuring Church encoding][church].

[elm-these]: https://github.com/joneshf/elm-these
[church]: http://www.haskellforall.com/2014/09/morte-intermediate-language-for-super.html

## Vibe

I've not curried the functions which has reduce ability for pointfree.
There's no check that you always pass in all three reducing functions, though I considered one.

## TODO

* Add further static-land support (how to deal with constraints?)
* JSVerify