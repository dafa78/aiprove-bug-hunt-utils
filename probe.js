// Probe harness for bug-hunt-utils
// Loads utils.js, runs each fn against a hand-written reference impl,
// prints PASS/FAIL per case with actual vs expected.
const u = require('/home/hatch/workspace/aiprove/challenges/challenges/bug-hunt-utils/utils.js');

// Reference implementations (reasonable, spec-faithful)
const ref = {
  sum: a => a.reduce((t,x)=>t+x,0),
  max: a => a.length===0 ? undefined : Math.max(...a),
  reverse: s => [...s].reverse().join(''),           // code-point aware
  isPalindrome: s => s === [...s].reverse().join(''),
  factorial: n => { let r=1; for(let i=2;i<=n;i++) r*=i; return r; },
  clamp: (x,lo,hi) => Math.min(Math.max(x,lo),hi),
  unique: a => [...new Set(a)],
  average: a => a.reduce((t,x)=>t+x,0)/a.length,
  titleCase: s => s.replace(/\b\w/g, c=>c.toUpperCase()),
  countVowels: s => (s.match(/[aeiou]/gi)||[]).length,
};

function eq(a,b){
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  return JSON.stringify(a)===JSON.stringify(b);
}

const cases = {
  sum:       [[[]],[[0]],[[1,2,3]],[[-1,-2,3]],[[0.1,0.2]],[[1e15,1,1]],[[5]]],
  max:       [[[1,2,3]],[[ -5,-1,-9]],[[7]],[[3,3,3]],[[0.5,0.25]],[[]],[[ -1,0,1]]],
  reverse:   [[''],['a'],['abc'],['hello'],['a😀b'],['😀😃'],['e\u0301'],['ab cd'],['12321']],
  isPalindrome: [[''],['a'],['racecar'],['hello'],['Racecar'],['Aba'],['a😀a'],['12 21'],['noon']],
  factorial: [[0],[1],[2],[3],[4],[5],[6],[10],[20]],
  clamp:     [[5,0,10],[-5,0,10],[15,0,10],[0,0,10],[10,0,10],[5,5,5],[2.5,0,2],[7,10,20]],
  unique:    [[[1,1,2,2,3]],[[ ]],[['a','a','b']],[[NaN,NaN]],[[1,'1',1]],[[0,-0]]],
  average:   [[[1,2,3]],[[10]],[[0,0,0]],[[-5,5]],[[0.1,0.2]],[[1,2]],[[5,5,5,5]]],
  titleCase: [[''],['hello world'],['hello-world'],["don't stop"],['HELLO WORLD'],['hello  world'],['a b c'],['123 abc'],['hello_world']],
  countVowels:[[''],['aeiou'],['AEIOU'],['Hello World'],['AEIOUaeiou'],['bcdfg'],['AaEeIiOoUu'],['HELLO'],['rhythm'],['café']],
};

let fails = [];
let total = 0, passed = 0;
for (const [fn, inputs] of Object.entries(cases)) {
  for (const args of inputs) {
    total++;
    const actual = u[fn](...args);
    const expected = ref[fn](...args);
    const ok = eq(actual, expected);
    if (ok) passed++;
    else fails.push({fn, input: args.length===1?args[0]:args, actual, expected});
    console.log(`${ok?'PASS':'FAIL'} ${fn}(${args.map(a=>JSON.stringify(a)).join(', ')}) => actual=${JSON.stringify(actual)} expected=${JSON.stringify(expected)}`);
  }
}
console.log(`\nTOTAL: ${passed}/${total} passed, ${total-passed} failed`);
console.log('FAILURES:', JSON.stringify(fails, null, 2));

// Extra probes: unicode reverse with grapheme clusters, max empty, titleCase apostrophes, isPalindrome case
console.log('\n--- extra targeted probes ---');
console.log('reverse("🇺🇸") =', JSON.stringify(u.reverse('🇺🇸')), '| code-point ref =', JSON.stringify(ref.reverse('🇺🇸')));
console.log('reverse("a\\u0301b") combining accent =', JSON.stringify(u.reverse('a\u0301b')));
console.log('max([]) =', JSON.stringify(u.max([])), '| Math.max([]) = -Infinity, undefined-ref =', JSON.stringify(ref.max([])));
console.log('sum([]) =', u.sum([]), '| average([]) =', u.average([]), '(0/0 = NaN)');
console.log('factorial(-1) =', u.factorial(-1), '| factorial(0) =', u.factorial(0), 'factorial(1) =', u.factorial(1));
console.log('titleCase("don\'t") =', JSON.stringify(u.titleCase("don't")), '| "hello-world" =', JSON.stringify(u.titleCase('hello-world')));
console.log('countVowels("AEIOU") =', u.countVowels('AEIOU'));
console.log('isPalindrome("Racecar") =', u.isPalindrome('Racecar'));
