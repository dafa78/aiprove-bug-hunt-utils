# bug-hunt-utils — entry

Entry file: `bugs.json` — 9 reports, 4 buggy functions. Verified locally with
`probe.js` (Node harness, `node probe.js`): 81 cases across all 10 functions,
67 passed, 14 failed. Every report in `bugs.json` was re-checked
programmatically: the function's actual output differs from `expected`, and
`expected` matches an independent reference implementation (9/9 verified).

## Bug 1 — `factorial(n)` drops the final factor (3 reports)

```js
function factorial(n){ let r=1; for(let i=2;i<n;i++) r*=i; return r; }
```

Loop condition is `i < n` instead of `i <= n`, so `n` itself is never
multiplied in. The function returns `(n-1)!` for every `n >= 2`:

| input | actual | expected |
|---|---|---|
| 2 | 1 | 2 |
| 5 | 24 | 120 |
| 10 | 362880 | 3628800 |

`factorial(0)` and `factorial(1)` are correct (both 1), which is why the bug
is easy to miss. Also confirmed `factorial(3)=2` (exp. 6), `factorial(4)=6`
(exp. 24), `factorial(6)=120` (exp. 720), `factorial(20)=121645100408832000`
(exp. 2432902008176640000) — same single bug, only 3 witnesses submitted.

## Bug 2 — `countVowels(s)` misses uppercase vowels (3 reports)

```js
function countVowels(s){ return (s.match(/[aeiou]/g)||[]).length; }
```

The regex has no `i` flag, so uppercase vowels are never counted:

| input | actual | expected |
|---|---|---|
| `"AEIOU"` | 0 | 5 |
| `"AaEeIiOoUu"` | 5 | 10 |
| `"HELLO"` | 0 | 2 |

Reference: `(s.match(/[aeiou]/gi)||[]).length`. Lowercase-only inputs are
correct (`"aeiou"` → 5, `"Hello World"` → 3, `"bcdfg"` → 0).

## Bug 3 — `reverse(s)` splits UTF-16 surrogate pairs (2 reports)

```js
function reverse(s){ return s.split("").reverse().join(""); }
```

`split("")` splits by UTF-16 code unit, so astral characters (emoji) are torn
into lone surrogates and reassembled wrongly:

| input | actual | expected |
|---|---|---|
| `"a😀b"` | `"b\uDE00\uD83Da"` (corrupted) | `"b😀a"` |
| `"😀😃"` | `"\uDE03😀\uD83D"` (corrupted) | `"😃😀"` |

Reference: `[...s].reverse().join("")` (iterates code points). ASCII strings
reverse correctly (`"hello"` → `"olleh"`); flag emoji `"🇺🇸"` is corrupted
the same way. Note the in-file comments flag only factorial/countVowels, but
this is a real, reproducible wrong result — the harness caught it, and the
challenge states reporting a correct function costs nothing, so it is
included on its own evidence.

## Bug 4 — `isPalindrome(s)` fails on emoji palindromes (1 report)

```js
function isPalindrome(s){ return s === reverse(s); }
```

It inherits Bug 3: the broken `reverse()` corrupts the comparison.

| input | actual | expected |
|---|---|---|
| `"a😀a"` | `false` | `true` |

`"a😀a"` reads the same forwards and backwards by code point, so a correct
reference (`s === [...s].reverse().join("")`) returns `true`. ASCII
palindromes are fine (`"racecar"` → true, `"hello"` → false). Included
because it is independently verifiable against a correct reference; if the
grader's reference shares `reverse()`'s flaw it simply scores nothing.

## Checked and found CORRECT (not reported)

- `sum` — empty, negatives, decimals, large values all match.
- `max` — negatives, single element, duplicates; `max([])` → `undefined`
  (defensible; no spec says otherwise, so not claimed).
- `clamp` — below/inside/above bounds, equal bounds, decimals all match.
- `unique` — duplicates, strings, `NaN`, mixed types all match.
- `average` — incl. negatives and decimals; `average([])` → `NaN` is the
  arithmetic consequence of `0/0`, not claimed.
- `titleCase` — `"hello-world"` → `"Hello-World"`, multi-space, all-caps
  unchanged. `"don't"` → `"Don'T"` is the standard `\b\w` regex behaviour,
  not a clear bug — not claimed.
- `isPalindrome` case-sensitivity — `"Racecar"` → `false` is the standard
  case-sensitive definition, not claimed.

## How to verify

```bash
node probe.js   # 81-case harness vs reference impls; see TESTLOG.md
```

`bugs.json` format: `[{fn, input, expected}]`, single-arg inputs given as
raw values (string/number/boolean), matching the challenge README.
