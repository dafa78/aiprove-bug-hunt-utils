# Test log — bug-hunt-utils probe run

Command: `node probe.js` (Node v24.22.1, 2026-11-14). Harness loads the challenge utils.js and compares each function against an independent reference implementation over 81 cases.

```
PASS sum([]) => actual=0 expected=0
PASS sum([0]) => actual=0 expected=0
PASS sum([1,2,3]) => actual=6 expected=6
PASS sum([-1,-2,3]) => actual=0 expected=0
PASS sum([0.1,0.2]) => actual=0.30000000000000004 expected=0.30000000000000004
PASS sum([1000000000000000,1,1]) => actual=1000000000000002 expected=1000000000000002
PASS sum([5]) => actual=5 expected=5
PASS max([1,2,3]) => actual=3 expected=3
PASS max([-5,-1,-9]) => actual=-1 expected=-1
PASS max([7]) => actual=7 expected=7
PASS max([3,3,3]) => actual=3 expected=3
PASS max([0.5,0.25]) => actual=0.5 expected=0.5
PASS max([]) => actual=undefined expected=undefined
PASS max([-1,0,1]) => actual=1 expected=1
PASS reverse("") => actual="" expected=""
PASS reverse("a") => actual="a" expected="a"
PASS reverse("abc") => actual="cba" expected="cba"
PASS reverse("hello") => actual="olleh" expected="olleh"
FAIL reverse("a😀b") => actual="b\ude00\ud83da" expected="b😀a"
FAIL reverse("😀😃") => actual="\ude03😀\ud83d" expected="😃😀"
PASS reverse("é") => actual="́e" expected="́e"
PASS reverse("ab cd") => actual="dc ba" expected="dc ba"
PASS reverse("12321") => actual="12321" expected="12321"
PASS isPalindrome("") => actual=true expected=true
PASS isPalindrome("a") => actual=true expected=true
PASS isPalindrome("racecar") => actual=true expected=true
PASS isPalindrome("hello") => actual=false expected=false
PASS isPalindrome("Racecar") => actual=false expected=false
PASS isPalindrome("Aba") => actual=false expected=false
FAIL isPalindrome("a😀a") => actual=false expected=true
PASS isPalindrome("12 21") => actual=true expected=true
PASS isPalindrome("noon") => actual=true expected=true
PASS factorial(0) => actual=1 expected=1
PASS factorial(1) => actual=1 expected=1
FAIL factorial(2) => actual=1 expected=2
FAIL factorial(3) => actual=2 expected=6
FAIL factorial(4) => actual=6 expected=24
FAIL factorial(5) => actual=24 expected=120
FAIL factorial(6) => actual=120 expected=720
FAIL factorial(10) => actual=362880 expected=3628800
FAIL factorial(20) => actual=121645100408832000 expected=2432902008176640000
PASS clamp(5, 0, 10) => actual=5 expected=5
PASS clamp(-5, 0, 10) => actual=0 expected=0
PASS clamp(15, 0, 10) => actual=10 expected=10
PASS clamp(0, 0, 10) => actual=0 expected=0
PASS clamp(10, 0, 10) => actual=10 expected=10
PASS clamp(5, 5, 5) => actual=5 expected=5
PASS clamp(2.5, 0, 2) => actual=2 expected=2
PASS clamp(7, 10, 20) => actual=10 expected=10
PASS unique([1,1,2,2,3]) => actual=[1,2,3] expected=[1,2,3]
PASS unique([]) => actual=[] expected=[]
PASS unique(["a","a","b"]) => actual=["a","b"] expected=["a","b"]
PASS unique([null,null]) => actual=[null] expected=[null]
PASS unique([1,"1",1]) => actual=[1,"1"] expected=[1,"1"]
PASS unique([0,0]) => actual=[0] expected=[0]
PASS average([1,2,3]) => actual=2 expected=2
PASS average([10]) => actual=10 expected=10
PASS average([0,0,0]) => actual=0 expected=0
PASS average([-5,5]) => actual=0 expected=0
PASS average([0.1,0.2]) => actual=0.15000000000000002 expected=0.15000000000000002
PASS average([1,2]) => actual=1.5 expected=1.5
PASS average([5,5,5,5]) => actual=5 expected=5
PASS titleCase("") => actual="" expected=""
PASS titleCase("hello world") => actual="Hello World" expected="Hello World"
PASS titleCase("hello-world") => actual="Hello-World" expected="Hello-World"
PASS titleCase("don't stop") => actual="Don'T Stop" expected="Don'T Stop"
PASS titleCase("HELLO WORLD") => actual="HELLO WORLD" expected="HELLO WORLD"
PASS titleCase("hello  world") => actual="Hello  World" expected="Hello  World"
PASS titleCase("a b c") => actual="A B C" expected="A B C"
PASS titleCase("123 abc") => actual="123 Abc" expected="123 Abc"
PASS titleCase("hello_world") => actual="Hello_world" expected="Hello_world"
PASS countVowels("") => actual=0 expected=0
PASS countVowels("aeiou") => actual=5 expected=5
FAIL countVowels("AEIOU") => actual=0 expected=5
PASS countVowels("Hello World") => actual=3 expected=3
FAIL countVowels("AEIOUaeiou") => actual=5 expected=10
PASS countVowels("bcdfg") => actual=0 expected=0
FAIL countVowels("AaEeIiOoUu") => actual=5 expected=10
FAIL countVowels("HELLO") => actual=0 expected=2
PASS countVowels("rhythm") => actual=0 expected=0
PASS countVowels("café") => actual=1 expected=1

TOTAL: 67/81 passed, 14 failed
FAILURES: [
  {
    "fn": "reverse",
    "input": "a😀b",
    "actual": "b\ude00\ud83da",
    "expected": "b😀a"
  },
  {
    "fn": "reverse",
    "input": "😀😃",
    "actual": "\ude03😀\ud83d",
    "expected": "😃😀"
  },
  {
    "fn": "isPalindrome",
    "input": "a😀a",
    "actual": false,
    "expected": true
  },
  {
    "fn": "factorial",
    "input": 2,
    "actual": 1,
    "expected": 2
  },
  {
    "fn": "factorial",
    "input": 3,
    "actual": 2,
    "expected": 6
  },
  {
    "fn": "factorial",
    "input": 4,
    "actual": 6,
    "expected": 24
  },
  {
    "fn": "factorial",
    "input": 5,
    "actual": 24,
    "expected": 120
  },
  {
    "fn": "factorial",
    "input": 6,
    "actual": 120,
    "expected": 720
  },
  {
    "fn": "factorial",
    "input": 10,
    "actual": 362880,
    "expected": 3628800
  },
  {
    "fn": "factorial",
    "input": 20,
    "actual": 121645100408832000,
    "expected": 2432902008176640000
  },
  {
    "fn": "countVowels",
    "input": "AEIOU",
    "actual": 0,
    "expected": 5
  },
  {
    "fn": "countVowels",
    "input": "AEIOUaeiou",
    "actual": 5,
    "expected": 10
  },
  {
    "fn": "countVowels",
    "input": "AaEeIiOoUu",
    "actual": 5,
    "expected": 10
  },
  {
    "fn": "countVowels",
    "input": "HELLO",
    "actual": 0,
    "expected": 2
  }
]

--- extra targeted probes ---
reverse("🇺🇸") = "\uddf8🇺\ud83c" | code-point ref = "🇸🇺"
reverse("a\u0301b") combining accent = "b́a"
max([]) = undefined | Math.max([]) = -Infinity, undefined-ref = undefined
sum([]) = 0 | average([]) = NaN (0/0 = NaN)
factorial(-1) = 1 | factorial(0) = 1 factorial(1) = 1
titleCase("don't") = "Don'T" | "hello-world" = "Hello-World"
countVowels("AEIOU") = 0
isPalindrome("Racecar") = false
```
