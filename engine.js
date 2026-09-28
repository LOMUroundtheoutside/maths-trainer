/* Maths Trainer question engine. Plain script: defines YEARS, check(), norm(). */
(function(root){
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[ri(0,a.length-1)];
const nz=(a,b)=>{let v;do v=ri(a,b);while(v===0);return v};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
const frac=(n,d)=>{const g=gcd(n,d)||1;n/=g;d/=g;if(d<0){n=-n;d=-d}return d===1?`${n}`:`${n}/${d}`};
const r=(x,dp)=>Math.round(x*10**dp)/10**dp;
const term=(c,v,first)=>{if(c===0)return '';const abs=Math.abs(c);const body=(abs===1&&v)?v:abs+v;return first?(c<0?'−':'')+body:(c<0?' − ':' + ')+body};
const poly=(...pairs)=>{let s='',first=true;for(const [c,v] of pairs){if(!c)continue;s+=term(c,v,first);first=false}return s||'0'};
const apoly=(...pairs)=>{let s='';for(const [c,v] of pairs){if(!c)continue;const abs=Math.abs(c);const body=(abs===1&&v)?v:abs+v;s+=(c<0?'-':(s?'+':''))+body}return s||'0'};
const money=p=>'£'+(p/100).toFixed(2);
const shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const nCk=(n,k)=>{let x=1;for(let i=1;i<=k;i++)x=x*(n-k+i)/i;return Math.round(x)};
const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
const sum=a=>a.reduce((x,y)=>x+y,0);
const bracket=(a,b)=>`(${poly([1,'x'],[a,''])})(${poly([1,'x'],[b,''])})`;
const abracket=(a,b)=>`(${apoly([1,'x'],[a,''])})(${apoly([1,'x'],[b,''])})`;
const T=(id,name,gen)=>({id,name,gen});

/* ---------- generators by year ---------- */
const Y={};

Y[1]=[
 T('y1add','Adding within 20',()=>{const a=ri(0,10),b=ri(0,10);return{q:`${a} + ${b} = ?`,a:a+b,how:`Count on ${b} from ${a}.`}}),
 T('y1sub','Taking away within 20',()=>{const a=ri(2,20),b=ri(0,a);return{q:`${a} − ${b} = ?`,a:a-b,how:`Count back ${b} from ${a}.`}}),
 T('y1bond','Number bonds to 10',()=>{const a=ri(0,10);return{q:`${a} + ? = 10`,a:10-a,how:`${a} and ${10-a} make 10.`}}),
 T('y1more','One more, one less',()=>{const n=ri(1,99),m=pick([1,-1]);return{q:`What is one ${m>0?'more':'less'} than ${n}?`,a:n+m}}),
 T('y1dbl','Doubles and halves',()=>{const n=ri(1,10);return Math.random()<.5?{q:`Double ${n} = ?`,a:2*n}:{q:`Half of ${2*n} = ?`,a:n}}),
 T('y1count','Counting in 2s, 5s and 10s',()=>{const s=pick([2,5,10]),st=s*ri(1,5);const seq=[0,1,2,3].map(i=>st+i*s);return{q:`What comes next? ${seq.join(', ')}, ?`,a:st+4*s,how:`The numbers go up in ${s}s.`}}),
 T('y1cmp','Bigger or smaller',()=>{let a=ri(1,50),b=ri(1,50);if(a===b)b++;return{q:`Which number is bigger: ${a} or ${b}?`,a:Math.max(a,b)}}),
];

Y[2]=[
 T('y2add','Adding within 100',()=>{const a=ri(10,80),b=ri(5,100-a);return{q:`${a} + ${b} = ?`,a:a+b,how:`Add the tens, then the ones.`}}),
 T('y2sub','Subtracting within 100',()=>{const a=ri(20,99),b=ri(5,a-1);return{q:`${a} − ${b} = ?`,a:a-b}}),
 T('y2tab','2, 5 and 10 times tables',()=>{const t=pick([2,5,10]),n=ri(1,12);return{q:`${n} × ${t} = ?`,a:n*t}}),
 T('y2half','Halves and quarters',()=>{const q=pick([2,4]),n=ri(1,10)*q;return{q:`What is ${q===2?'half':'a quarter'} of ${n}?`,a:n/q,how:`Divide ${n} by ${q}.`}}),
 T('y2pv','Tens and ones',()=>{const n=ri(11,99),d=pick(['tens','ones']);return{q:`In the number ${n}, what is the ${d} digit worth?`,a:d==='tens'?Math.floor(n/10)*10:n%10,how:`The tens digit is worth ten times its value.`}}),
 T('y2money','Adding money (pence)',()=>{const a=ri(5,60),b=ri(5,60);return{q:`${a}p + ${b}p = ? p`,a:a+b}}),
 T('y2odd','Odd or even',()=>{const n=ri(1,100);return{q:`Is ${n} odd or even?`,choices:['odd','even'],a:n%2?'odd':'even',how:`Look at the last digit: 0, 2, 4, 6, 8 are even.`}}),
 T('y2miss','Missing numbers',()=>{const a=ri(1,15),b=ri(1,15);return Math.random()<.5?{q:`? + ${a} = ${a+b}`,a:b,how:`${a+b} − ${a} = ${b}.`}:{q:`${a+b} − ? = ${a}`,a:b}}),
];

Y[3]=[
 T('y3tab','3, 4 and 8 times tables',()=>{const t=pick([3,4,8]),n=ri(1,12);return{q:`${n} × ${t} = ?`,a:n*t}}),
 T('y3div','Division facts',()=>{const t=pick([2,3,4,5,8,10]),n=ri(1,12);return{q:`${n*t} ÷ ${t} = ?`,a:n,how:`How many ${t}s make ${n*t}?`}}),
 T('y3add','Adding 3-digit numbers',()=>{const a=ri(100,600),b=ri(100,999-a);return{q:`${a} + ${b} = ?`,a:a+b,how:`Column addition: ones, tens, hundreds.`}}),
 T('y3sub','Subtracting 3-digit numbers',()=>{const a=ri(200,999),b=ri(100,a-1);return{q:`${a} − ${b} = ?`,a:a-b}}),
 T('y3frac','Fractions of amounts',()=>{const d=pick([2,3,4,5,10]),n=ri(2,12)*d;return{q:`What is 1/${d} of ${n}?`,a:n/d,how:`Divide ${n} by ${d}.`}}),
 T('y3mul','2-digit × 1-digit',()=>{const a=ri(12,49),b=ri(2,6);return{q:`${a} × ${b} = ?`,a:a*b,how:`${Math.floor(a/10)*10} × ${b} = ${Math.floor(a/10)*10*b}, plus ${a%10} × ${b} = ${(a%10)*b}.`}}),
 T('y3pv','Hundreds, tens and ones',()=>{const n=ri(101,999),i=ri(0,2),names=['hundreds','tens','ones'],vals=[Math.floor(n/100)*100,Math.floor(n/10)%10*10,n%10];return{q:`In ${n}, what is the ${names[i]} digit worth?`,a:vals[i]}}),
 T('y3seq','Counting in 4s, 8s, 50s and 100s',()=>{const s=pick([4,8,50,100]),st=s*ri(1,6);const seq=[0,1,2,3].map(i=>st+i*s);return{q:`What comes next? ${seq.join(', ')}, ?`,a:st+4*s}}),
];

Y[4]=[
 T('y4tab','Times tables to 12',()=>{const a=ri(2,12),b=ri(2,12);return{q:`${a} × ${b} = ?`,a:a*b}}),
 T('y4mul','3-digit × 1-digit',()=>{const a=ri(112,499),b=ri(3,9);return{q:`${a} × ${b} = ?`,a:a*b,how:`Split ${a} into hundreds, tens and ones and multiply each by ${b}.`}}),
 T('y4round','Rounding to 10, 100, 1000',()=>{const to=pick([10,100,1000]),n=ri(1000,9999);return{q:`Round ${n} to the nearest ${to}.`,a:Math.round(n/to)*to,how:`Look at the digit to the right of the ${to}s place: 5 or more rounds up.`}}),
 T('y4neg','Negative numbers',()=>{const a=ri(-5,8),b=ri(1,12);return{q:`${a} − ${b} = ?`,a:a-b,how:`Count back ${b} from ${a}, going below zero if needed.`}}),
 T('y4dec','Tenths and hundredths',()=>{return pick([()=>{const a=ri(1,9),b=ri(1,9);return{q:`0.${a} + 0.${b} = ?`,a:r((a+b)/10,1)}},()=>{const a=ri(1,9);return{q:`Write ${a}/10 as a decimal.`,a:a/10}},()=>{const a=ri(1,99);return{q:`Write ${a}/100 as a decimal.`,a:a/100}}])()}),
 T('y4fac','Factors and multiples',()=>{const n=pick([12,18,20,24,30,36,40,48]);const f=[];for(let i=2;i<n;i++)if(n%i===0)f.push(i);const good=pick(f);let bad=[];for(let i=2;i<n;i++)if(n%i!==0)bad.push(i);bad=shuffle(bad).slice(0,3);return{q:`Which of these is a factor of ${n}?`,choices:shuffle([good,...bad]).map(String),a:String(good),how:`${n} ÷ ${good} = ${n/good} with nothing left over.`}}),
 T('y4peri','Perimeter of rectangles',()=>{const l=ri(3,15),w=ri(2,l);return{q:`A rectangle is ${l} cm long and ${w} cm wide. What is its perimeter in cm?`,a:2*(l+w),how:`Perimeter = 2 × (length + width).`}}),
 T('y4eq','Equivalent fractions',()=>{const d=pick([2,3,4,5]),n=ri(1,d-1),k=ri(2,6);return{q:`${n}/${d} = ?/${d*k}`,a:n*k,how:`Multiply top and bottom by ${k}.`}}),
 T('y4d10','Dividing by 10 and 100',()=>{const d=pick([10,100]),n=ri(2,99)*d;return{q:`${n} ÷ ${d} = ?`,a:n/d,how:`Digits move ${d===10?'one place':'two places'} to the right.`}}),
];

Y[5]=[
 T('y5lmul','Long multiplication',()=>{const a=ri(12,99),b=ri(12,49);return{q:`${a} × ${b} = ?`,a:a*b,how:`${a} × ${Math.floor(b/10)*10} = ${a*Math.floor(b/10)*10}, plus ${a} × ${b%10} = ${a*(b%10)}.`}}),
 T('y5div','Division with remainders',()=>{const d=ri(3,9),q=ri(11,99),rem=ri(1,d-1);return{q:`${q*d+rem} ÷ ${d} = ?  (give as e.g. 21 r 3)`,a:`${q}r${rem}`,how:`${d} × ${q} = ${q*d}, leaving ${rem}.`}}),
 T('y5fadd','Adding fractions (same denominator)',()=>{const d=pick([5,7,8,9,10,12]),a=ri(1,d-2),b=ri(1,d-1-a);return{q:`${a}/${d} + ${b}/${d} = ?  (as a fraction)`,a:(a+b)/d,show:frac(a+b,d),how:`Add the numerators, keep the denominator: ${a+b}/${d}.`}}),
 T('y5dadd','Adding and subtracting decimals',()=>{const a=ri(100,999)/100,b=ri(10,99)/10;return Math.random()<.5?{q:`${a} + ${b} = ?`,a:r(a+b,2)}:{q:`${a+b>a?r(a+b,2):a} − ${b} = ?`,a:r(a,2)}}),
 T('y5pct','Percentages of amounts',()=>{const p=pick([10,20,25,50,75]),n=ri(2,20)*20;return{q:`${p}% of ${n} = ?`,a:n*p/100,how:`10% is ${n/10}; build ${p}% from that.`}}),
 T('y5sq','Square and cube numbers',()=>{const n=ri(2,12);return Math.random()<.7?{q:`${n}² = ?`,a:n*n}:{q:`${n<6?n:ri(2,5)}³ = ?`,a:(n<6?n:ri(2,5))**3}}),
 T('y5prime','Prime numbers',()=>{const n=ri(2,60);return{q:`Is ${n} a prime number?`,choices:['yes','no'],a:isPrime(n)?'yes':'no',how:isPrime(n)?`${n} has no factors except 1 and itself.`:`${n} divides by ${[2,3,5,7].find(p=>n%p===0&&n!==p)||'a smaller number'}.`}}),
 T('y5area','Area of rectangles',()=>{const l=ri(3,20),w=ri(2,15);return{q:`A rectangle is ${l} cm by ${w} cm. What is its area in cm²?`,a:l*w,how:`Area = length × width.`}}),
 T('y5rnd','Rounding decimals',()=>{const n=ri(100,999)/100;return{q:`Round ${n} to 1 decimal place.`,a:r(n,1),how:`Look at the hundredths digit.`}}),
];

Y[6]=[
 T('y6bidmas','Order of operations (BIDMAS)',()=>{const a=ri(2,9),b=ri(2,9),c=ri(2,9);return pick([{q:`${a} + ${b} × ${c} = ?`,a:a+b*c,how:`Multiply first: ${b} × ${c} = ${b*c}.`},{q:`(${a} + ${b}) × ${c} = ?`,a:(a+b)*c,how:`Brackets first.`},{q:`${a*b*c} ÷ ${a} − ${b} = ?`,a:b*c-b,how:`Divide first.`},{q:`${a}² + ${b} = ?`,a:a*a+b,how:`Indices before addition.`}])}),
 T('y6ldiv','Long division',()=>{const d=ri(11,29),q=ri(21,199);return{q:`${d*q} ÷ ${d} = ?`,a:q}}),
 T('y6fmul','Multiplying fractions',()=>{const a=ri(1,4),b=ri(a+1,6),c=ri(1,4),d=ri(c+1,7);return{q:`${a}/${b} × ${c}/${d} = ?  (as a fraction)`,a:(a*c)/(b*d),show:frac(a*c,b*d),how:`Multiply tops, multiply bottoms: ${a*c}/${b*d}, then simplify.`}}),
 T('y6fdiv','Dividing fractions by whole numbers',()=>{const a=ri(1,5),b=ri(a+1,8),n=ri(2,5);return{q:`${a}/${b} ÷ ${n} = ?  (as a fraction)`,a:a/(b*n),show:frac(a,b*n),how:`Multiply the denominator by ${n}.`}}),
 T('y6ratio','Ratio',()=>{const a=ri(1,5),b=ri(a+1,7),k=ri(2,9),tot=(a+b)*k;return{q:`Share £${tot} in the ratio ${a}:${b}. How much is the smaller share (£)?`,a:a*k,how:`${a+b} parts, so one part is £${k}.`}}),
 T('y6pct','Percentages',()=>{const p=pick([5,15,30,35,40,60,65,80]),n=ri(2,10)*20;return{q:`${p}% of ${n} = ?`,a:n*p/100,how:`Find 10% (${n/10}) and 5% (${n/20}) and combine.`}}),
 T('y6alg','Simple algebra',()=>{const x=ri(2,12),a=ri(1,9);return pick([{q:`n + ${a} = ${x+a}. What is n?`,a:x},{q:`${a+1}n = ${(a+1)*x}. What is n?`,a:x},{q:`2n + ${a} = ${2*x+a}. What is n?`,a:x,how:`Take away ${a}, then halve.`}])}),
 T('y6mean','The mean average',()=>{const n=ri(3,5),m=ri(4,12);const arr=[];let s=0;for(let i=0;i<n-1;i++){const v=ri(1,2*m);arr.push(v);s+=v}const last=n*m-s;if(last<0)return Y[6][7].gen();arr.push(last);return{q:`Find the mean of ${shuffle(arr).join(', ')}.`,a:m,how:`Add them (${n*m}) and divide by ${n}.`}}),
 T('y6tri','Angles in a triangle',()=>{const a=ri(20,90),b=ri(20,160-a);return{q:`Two angles of a triangle are ${a}° and ${b}°. What is the third angle?`,a:180-a-b,how:`Angles in a triangle add to 180°.`}}),
 T('y6tarea','Area of triangles',()=>{const b=ri(2,12)*2,h=ri(3,15);return{q:`A triangle has base ${b} cm and height ${h} cm. Area in cm²?`,a:b*h/2,how:`Area = ½ × base × height.`}}),
];

Y[7]=[
 T('y7neg','Negative number arithmetic',()=>{const a=nz(-9,9),b=nz(-9,9);const s=x=>x<0?`(${x})`:x;return pick([{q:`${a} + ${s(b)} = ?`,a:a+b},{q:`${a} − ${s(b)} = ?`,a:a-b,how:`Subtracting a negative is the same as adding.`},{q:`${a} × ${s(b)} = ?`,a:a*b,how:`Same signs give positive, different signs give negative.`},{q:`${a*b} ÷ ${s(b)} = ?`,a:a}])}),
 T('y7simp','Collecting like terms',()=>{const a=ri(2,7),b=ri(1,6),c=ri(1,5);return Math.random()<.5?{q:`Simplify ${a}a + ${b}a − ${c}a`,a:apoly([a+b-c,'a']),how:`Add and subtract the numbers in front of a.`}:{q:`Simplify ${a}x + ${b}y − ${c}x + ${c}y`,a:apoly([a-c,'x'],[b+c,'y']),alt:[apoly([b+c,'y'],[a-c,'x'])]}}),
 T('y7subst','Substitution',()=>{const x=ri(2,9),a=ri(2,6),b=ri(1,9);return pick([{q:`If x = ${x}, what is ${a}x + ${b}?`,a:a*x+b},{q:`If x = ${x}, what is x² − ${b}?`,a:x*x-b},{q:`If x = ${x} and y = ${b}, what is ${a}x − y?`,a:a*x-b}])}),
 T('y7eq1','One-step equations',()=>{const x=ri(2,12),a=ri(1,9);return pick([{q:`Solve x + ${a} = ${x+a}`,a:x},{q:`Solve x − ${a} = ${x-a}`,a:x},{q:`Solve ${a+1}x = ${(a+1)*x}`,a:x},{q:`Solve x/${a+1} = ${x}`,a:x*(a+1)}])}),
 T('y7exp','Expanding a single bracket',()=>{const a=ri(2,7),b=nz(-9,9),c=pick([1,1,2,3]);return{q:`Expand ${a}(${poly([c,'x'],[b,''])})`,a:apoly([a*c,'x'],[a*b,'']),alt:[apoly([a*b,''],[a*c,'x'])],how:`Multiply everything inside the bracket by ${a}.`}}),
 T('y7seq','Sequences: next term',()=>{const st=ri(-5,20),d=nz(-6,9);const seq=[0,1,2,3].map(i=>st+i*d);return{q:`What is the next term? ${seq.join(', ')}, ?`,a:st+4*d,how:`The sequence changes by ${d} each time.`}}),
 T('y7fdp','Fractions, decimals, percentages',()=>{return pick([()=>{const [n,d]=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,10],[3,10],[7,10],[1,8],[3,8]]);return{q:`Write ${n}/${d} as a percentage.`,a:100*n/d}},()=>{const p=ri(1,19)*5;return{q:`Write ${p}% as a decimal.`,a:p/100}},()=>{const d=pick([2,4,5,10,20,25]),n=ri(1,d-1);return{q:`Write ${n/d} as a fraction in its simplest form.`,a:n/d,show:frac(n,d)}}])()}),
 T('y7hcf','HCF and LCM',()=>{const a=ri(2,6)*pick([2,3]),b=ri(2,6)*pick([2,3,5]);const g=gcd(a,b);return Math.random()<.5?{q:`Find the HCF of ${a} and ${b}.`,a:g,how:`The biggest number that divides both.`}:{q:`Find the LCM of ${a} and ${b}.`,a:a*b/g,how:`The smallest number in both times tables.`}}),
 T('y7ratio','Sharing in a ratio',()=>{const a=ri(1,5),b=ri(a+1,8),k=ri(3,12);return{q:`£${(a+b)*k} is shared in the ratio ${a}:${b}. What is the larger share (£)?`,a:b*k,how:`One part is £${k}.`}}),
 T('y7avg','Mean, median and mode',()=>{const arr=[];const m=ri(2,9);for(let i=0;i<5;i++)arr.push(ri(1,10));arr[ri(0,4)]=m;arr[ri(0,4)]=m;const s=arr.slice().sort((x,y)=>x-y);const counts={};arr.forEach(v=>counts[v]=(counts[v]||0)+1);const modes=Object.keys(counts).filter(k=>counts[k]===Math.max(...Object.values(counts)));const t=pick(['median','mode','range']);if(t==='mode'&&modes.length>1)return Y[7][9].gen();return{q:`Find the ${t} of ${arr.join(', ')}.`,a:t==='median'?s[2]:t==='mode'?+modes[0]:s[4]-s[0],how:t==='median'?`Put them in order: ${s.join(', ')}, then take the middle one.`:t==='mode'?`The most common value.`:`Biggest minus smallest.`}}),
];

Y[8]=[
 T('y8eq2','Two-step equations',()=>{const x=nz(-8,12),a=ri(2,7),b=nz(-9,9);return{q:`Solve ${poly([a,'x'],[b,''])} = ${a*x+b}`,a:x,how:`${b<0?'Add':'Subtract'} ${Math.abs(b)}, then divide by ${a}.`}}),
 T('y8expsimp','Expand and simplify',()=>{const a=ri(2,5),b=nz(-6,6),c=ri(2,5),d=nz(-6,6);return{q:`Expand and simplify ${a}(x ${b<0?'−':'+'} ${Math.abs(b)}) + ${c}(x ${d<0?'−':'+'} ${Math.abs(d)})`,a:apoly([a+c,'x'],[a*b+c*d,'']),alt:[apoly([a*b+c*d,''],[a+c,'x'])],how:`${a}x + ${a*b} + ${c}x + ${c*d}.`}}),
 T('y8fact','Factorising (single bracket)',()=>{const g=ri(2,6),a=ri(1,5),b=nz(-7,7);if(gcd(a,b)!==1)return Y[8][2].gen();return{q:`Factorise ${poly([g*a,'x'],[g*b,''])}`,a:`${g}(${apoly([a,'x'],[b,''])})`,alt:[`${g}(${apoly([b,''],[a,'x'])})`],how:`The HCF of ${g*a} and ${g*b} is ${g}.`}}),
 T('y8nth','nth term of a linear sequence',()=>{const d=nz(-5,8),c=ri(-9,9);const seq=[1,2,3,4].map(n=>d*n+c);return{q:`Find the nth term of ${seq.join(', ')}, …`,a:apoly([d,'n'],[c,'']),alt:[apoly([c,''],[d,'n'])],how:`Common difference ${d}, so ${d}n; adjust by ${c}.`}}),
 T('y8pctch','Percentage change',()=>{const a=ri(2,20)*10,p=pick([10,20,25,40,50]),up=Math.random()<.5;const b=up?a*(1+p/100):a*(1-p/100);return{q:`A price changes from £${a} to £${b}. What is the percentage ${up?'increase':'decrease'}?`,a:p,how:`Change ÷ original × 100.`}}),
 T('y8ind','Laws of indices',()=>{const a=ri(2,9),b=ri(2,9);return pick([{q:`a^${a} × a^${b} = a^?`,a:a+b,how:`Add the powers.`},{q:`a^${a+b} ÷ a^${b} = a^?`,a:a,how:`Subtract the powers.`},{q:`(a^${a})^${b} = a^?`,a:a*b,how:`Multiply the powers.`}])}),
 T('y8circ','Circles: circumference and area',()=>{const rad=ri(2,12);return Math.random()<.5?{q:`Circumference of a circle with radius ${rad} cm, to 1 d.p.?`,a:r(2*Math.PI*rad,1),tol:.06,how:`C = 2πr.`}:{q:`Area of a circle with radius ${rad} cm, to 1 d.p.?`,a:r(Math.PI*rad*rad,1),tol:.06,how:`A = πr².`}}),
 T('y8prob','Probability',()=>{const red=ri(1,6),blue=ri(1,6),green=ri(0,4);const tot=red+blue+green;const col=pick(['red','blue']);const n=col==='red'?red:blue;return{q:`A bag has ${red} red, ${blue} blue${green?` and ${green} green`:''} counters. P(${col}) as a fraction?`,a:n/tot,show:frac(n,tot),how:`${n} out of ${tot}.`}}),
 T('y8poly','Angles in polygons',()=>{const n=ri(5,12);return Math.random()<.5?{q:`Sum of the interior angles of a ${n}-sided polygon?`,a:(n-2)*180,how:`(n − 2) × 180.`}:{q:`Each exterior angle of a regular ${n}-sided polygon, to 1 d.p.?`,a:r(360/n,1),tol:.06,how:`360 ÷ n.`}}),
 T('y8sdt','Speed, distance, time',()=>{const s=ri(5,30)*pick([1,2,4]),t=ri(2,6);return pick([{q:`A car travels ${s*t} miles in ${t} hours. Average speed in mph?`,a:s,how:`Speed = distance ÷ time.`},{q:`Travelling at ${s} mph for ${t} hours. Distance in miles?`,a:s*t},{q:`How long (hours) to go ${s*t} miles at ${s} mph?`,a:t}])}),
];

Y[9]=[
 T('y9both','Unknowns on both sides',()=>{const x=nz(-6,9),a=ri(3,8),b=ri(1,a-1),c=nz(-9,9);const d=(a-b)*x+c;return{q:`Solve ${poly([a,'x'],[c,''])} = ${poly([b,'x'],[d,''])}`,a:x,how:`Take ${b}x from both sides: ${poly([a-b,'x'],[c,''])} = ${d}.`}}),
 T('y9dbl','Expanding double brackets',()=>{const a=nz(-6,6),b=nz(-6,6);return{q:`Expand ${bracket(a,b)}`,a:apoly([1,'x^2'],[a+b,'x'],[a*b,'']),how:`x² + ${a}x + ${b}x + ${a*b}.`}}),
 T('y9fq','Factorising quadratics',()=>{const a=nz(-6,6),b=nz(-6,6);return{q:`Factorise ${poly([1,'x²'],[a+b,'x'],[a*b,''])}`,a:abracket(a,b),alt:[abracket(b,a)],how:`Two numbers that multiply to ${a*b} and add to ${a+b}: ${a} and ${b}.`}}),
 T('y9sim','Simultaneous equations',()=>{const x=nz(-5,6),y=nz(-5,6),a=ri(1,3),b=ri(1,3),c=ri(1,3),d=ri(1,3);if(a*d===b*c)return Y[9][3].gen();return{q:`Solve: ${poly([a,'x'],[b,'y'])} = ${a*x+b*y} and ${poly([c,'x'],[-d,'y'])} = ${c*x-d*y}. Give x, y.`,a:[x,y],ordered:true,how:`Eliminate one variable by adding or subtracting multiples of the equations.`}}),
 T('y9pyth','Pythagoras',()=>{const [p,q,h]=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[7,24,25]]);return Math.random()<.5?{q:`A right-angled triangle has shorter sides ${p} and ${q}. Hypotenuse?`,a:h,how:`√(${p}² + ${q}²).`}:{q:`Hypotenuse ${h}, one shorter side ${p}. The other side?`,a:q,how:`√(${h}² − ${p}²).`}}),
 T('y9sf','Standard form',()=>{return Math.random()<.5?(()=>{const m=ri(11,99)/10,p=ri(2,6);return{q:`Write ${m} × 10^${p} as an ordinary number.`,a:m*10**p}})():(()=>{const m=ri(11,99)/10,p=ri(2,6);return{q:`${m*10**p} in standard form is ${m} × 10^?  Give the power.`,a:p}})()}),
 T('y9ineq','Inequalities',()=>{const a=ri(2,5),b=ri(1,9),x=ri(1,9),s=pick(['<','>','≤','≥']);const key={'<':'<','>':'>','≤':'<=','≥':'>='}[s];return{q:`Solve ${a}x + ${b} ${s} ${a*x+b}`,a:`x${key}${x}`,alt:[`x${key.replace('=','')}=${x}`],how:`Same as an equation: subtract ${b}, divide by ${a}.`}}),
 T('y9ci','Compound interest',()=>{const P=ri(5,50)*100,rate=pick([2,3,4,5]),n=ri(2,4);return{q:`£${P} at ${rate}% compound interest for ${n} years. Total, to the nearest penny?`,a:r(P*(1+rate/100)**n,2),tol:.006,how:`${P} × ${1+rate/100}^${n}.`}}),
 T('y9grad','Gradients and straight lines',()=>{const m=nz(-4,5),c=ri(-6,6);return pick([()=>({q:`What is the gradient of y = ${poly([m,'x'],[c,''])}?`,a:m}),()=>({q:`Where does y = ${poly([m,'x'],[c,''])} cross the y-axis? Give the y value.`,a:c}),()=>{const x1=ri(-3,3),x2=x1+ri(1,4);return{q:`Gradient of the line through (${x1}, ${m*x1+c}) and (${x2}, ${m*x2+c})?`,a:m,how:`Change in y ÷ change in x.`}}])()}),
 T('y9trig','Trigonometry: finding sides',()=>{const ang=pick([30,35,40,45,50,55,60]),h=ri(5,20),t=pick(['opposite','adjacent']);const v=t==='opposite'?h*Math.sin(ang*Math.PI/180):h*Math.cos(ang*Math.PI/180);return{q:`Right-angled triangle: hypotenuse ${h} cm, angle ${ang}°. Length of the ${t} side, to 1 d.p.?`,a:r(v,1),tol:.06,how:`${t==='opposite'?'sin':'cos'} ${ang}° × ${h}.`}}),
 T('y9prop','Proportion',()=>{const n=ri(2,6),cost=ri(2,9)*n,m=ri(n+1,12);return{q:`${n} pens cost £${cost}. How much do ${m} pens cost (£)?`,a:cost/n*m,how:`One pen costs £${cost/n}.`}}),
];

Y[10]=[
 T('y10qf','Solving quadratics by factorising',()=>{const a=nz(-7,7),b=nz(-7,7);if(a===b)return Y[10][0].gen();return{q:`Solve ${poly([1,'x²'],[a+b,'x'],[a*b,''])} = 0. Give both solutions.`,a:[-a,-b],how:`${bracket(a,b)} = 0.`}}),
 T('y10qform','The quadratic formula',()=>{const a=ri(1,3),b=nz(-9,9),c=nz(-9,9);const D=b*b-4*a*c;if(D<=0||Number.isInteger(Math.sqrt(D)))return Y[10][1].gen();const s=Math.sqrt(D);return{q:`Solve ${poly([a,'x²'],[b,'x'],[c,''])} = 0 to 2 d.p. Give both solutions.`,a:[r((-b-s)/(2*a),2),r((-b+s)/(2*a),2)],tol:.006,how:`x = (−b ± √(b² − 4ac)) / 2a with b² − 4ac = ${D}.`}}),
 T('y10sim','Simultaneous equations (harder)',()=>{const x=nz(-6,6),y=nz(-6,6),a=ri(2,5),b=nz(-4,4),c=ri(2,5),d=nz(-4,4);if(a*d===b*c)return Y[10][2].gen();return{q:`Solve: ${poly([a,'x'],[b,'y'])} = ${a*x+b*y} and ${poly([c,'x'],[d,'y'])} = ${c*x+d*y}. Give x, y.`,a:[x,y],ordered:true}}),
 T('y10surd','Simplifying surds',()=>{const k=ri(2,6),m=pick([2,3,5,6,7]);return{q:`Simplify √${k*k*m}`,a:`${k}sqrt${m}`,alt:[`${k}sqrt(${m})`],how:`√(${k*k} × ${m}) = ${k}√${m}.`}}),
 T('y10trig','Trigonometry: finding angles',()=>{const h=ri(8,20),o=ri(3,h-1),t=pick(['opposite','adjacent']);const ang=t==='opposite'?Math.asin(o/h):Math.acos(o/h);return{q:`Right-angled triangle: hypotenuse ${h} cm, ${t} side ${o} cm. Angle between hypotenuse and adjacent, to 1 d.p.?`,a:r(ang*180/Math.PI,1),tol:.06,how:`${t==='opposite'?'sin⁻¹':'cos⁻¹'}(${o}/${h}).`}}),
 T('y10sfc','Standard form calculations',()=>{const a=ri(2,9),b=ri(2,9),m=ri(2,4),n=ri(1,3);return{q:`(${a} × 10^${m}) × (${b} × 10^${n}) = ?  Write as an ordinary number.`,a:a*b*10**(m+n),how:`${a*b} × 10^${m+n}.`}}),
 T('y10prop','Direct and inverse proportion',()=>{const k=ri(2,6),x1=ri(2,6),x2=ri(2,9);return Math.random()<.5?{q:`y is directly proportional to x. When x = ${x1}, y = ${k*x1}. Find y when x = ${x2}.`,a:k*x2,how:`y = ${k}x.`}:{q:`y is inversely proportional to x. When x = ${x1}, y = ${k*x2}. Find y when x = ${x2}.`,a:k*x1,how:`xy = ${k*x1*x2} always.`}}),
 T('y10bounds','Bounds',()=>{const n=ri(20,99)/10;return Math.random()<.5?{q:`A length is ${n} cm to 1 d.p. What is the upper bound?`,a:r(n+.05,2),how:`Add half of 0.1.`}:{q:`A length is ${n} cm to 1 d.p. What is the lower bound?`,a:r(n-.05,2)}}),
 T('y10rmean','Reverse mean',()=>{const n=ri(4,6),m=ri(5,12);const arr=[];let s=0;for(let i=0;i<n-1;i++){const v=ri(1,2*m);arr.push(v);s+=v}const last=n*m-s;if(last<1)return Y[10][8].gen();return{q:`The mean of ${n} numbers is ${m}. ${n-1} of them are ${arr.join(', ')}. What is the other one?`,a:last,how:`Total is ${n*m}.`}}),
 T('y10prob2','Probability without replacement',()=>{const red=ri(2,6),blue=ri(1,6),tot=red+blue;return{q:`A bag has ${red} red and ${blue} blue sweets. Two are taken without replacement. P(both red) as a fraction?`,a:red*(red-1)/(tot*(tot-1)),show:frac(red*(red-1),tot*(tot-1)),how:`${red}/${tot} × ${red-1}/${tot-1}.`}}),
 T('y10rpct','Reverse percentages',()=>{const orig=ri(2,20)*10,p=pick([10,20,25,50]),up=Math.random()<.5;const now=up?orig*(1+p/100):orig*(1-p/100);return{q:`After a ${p}% ${up?'increase':'decrease'} a price is £${now}. What was the original price (£)?`,a:orig,how:`Divide by ${up?1+p/100:1-p/100}.`}}),
 T('y10vec','Vectors',()=>{const a=[nz(-4,4),nz(-4,4)],b=[nz(-4,4),nz(-4,4)],k=ri(2,3);return{q:`a = (${a[0]}, ${a[1]}), b = (${b[0]}, ${b[1]}). Find ${k}a + b as (x, y).`,a:`(${k*a[0]+b[0]},${k*a[1]+b[1]})`,how:`Multiply each part of a by ${k}, then add b.`}}),
];

Y[11]=[
 T('y11cts','Completing the square',()=>{const p=nz(-6,6),c=ri(-9,9);return{q:`Write ${poly([1,'x²'],[2*p,'x'],[c,''])} in the form (x + a)² + b. Give a, b.`,a:[p,c-p*p],ordered:true,how:`Half of ${2*p} is ${p}; subtract ${p}² and add ${c}.`}}),
 T('y11qseq','Quadratic sequences',()=>{const a=ri(1,3),b=ri(-4,4),c=ri(-5,5);const seq=[1,2,3,4,5].map(n=>a*n*n+b*n+c);return{q:`Find the nth term of ${seq.join(', ')}, …`,a:apoly([a,'n^2'],[b,'n'],[c,'']),how:`Second difference is ${2*a}, so ${a}n²; subtract to find the linear part.`}}),
 T('y11comp','Composite functions',()=>{const a=ri(2,5),b=ri(-5,6),x=ri(1,5);return Math.random()<.5?{q:`f(x) = ${poly([a,'x'],[b,''])}, g(x) = x². Find fg(${x}).`,a:a*x*x+b,how:`g first: ${x*x}, then f.`}:{q:`f(x) = ${poly([a,'x'],[b,''])}, g(x) = x². Find gf(${x}).`,a:(a*x+b)**2,how:`f first: ${a*x+b}, then square.`}}),
 T('y11inv','Inverse functions',()=>{const a=ri(2,5),b=nz(-6,6),x=ri(1,6);return{q:`f(x) = ${poly([a,'x'],[b,''])}. Find f⁻¹(${a*x+b}).`,a:x,how:`Solve ${poly([a,'x'],[b,''])} = ${a*x+b}.`}}),
 T('y11rearr','Rearranging formulae',()=>pick([{q:`v = u + at. Make a the subject.`,a:'(v-u)/t'},{q:`A = lw. Make w the subject.`,a:'a/l'},{q:`y = mx + c. Make x the subject.`,a:'(y-c)/m'},{q:`P = 2(l + w). Make l the subject.`,a:'p/2-w',alt:['(p-2w)/2']},{q:`v² = u² + 2as. Make s the subject.`,a:'(v^2-u^2)/(2a)',alt:['(v^2-u^2)/2a']}])),
 T('y11cos','Cosine rule',()=>{const b=ri(4,12),c=ri(4,12),A=pick([40,50,60,70,80,100,120]);const a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180));return{q:`Triangle: b = ${b}, c = ${c}, angle A = ${A}°. Find side a to 1 d.p.`,a:r(a,1),tol:.06,how:`a² = b² + c² − 2bc cos A.`}}),
 T('y11sine','Sine rule',()=>{const a=ri(4,12),A=pick([40,50,60,70]),B=pick([30,45,55,65,80]);const b=a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180);return{q:`Triangle: a = ${a}, angle A = ${A}°, angle B = ${B}°. Find side b to 1 d.p.`,a:r(b,1),tol:.06,how:`b = a sin B / sin A.`}}),
 T('y11afrac','Algebraic fractions',()=>{const a=nz(-5,5),b=nz(-5,5);if(a===b)return Y[11][7].gen();return{q:`Simplify (${poly([1,'x²'],[a+b,'x'],[a*b,''])}) / (${poly([1,'x'],[a,''])})`,a:apoly([1,'x'],[b,'']),how:`Factorise the top: ${bracket(a,b)}, then cancel.`}}),
 T('y11qineq','Quadratic inequalities',()=>{const p=ri(-4,4),q=p+ri(1,5);return{q:`Solve ${poly([1,'x²'],[-(p+q),'x'],[p*q,''])} < 0`,a:`${p}<x<${q}`,how:`Roots ${p} and ${q}; the curve is below zero between them.`}}),
 T('y11sector','Arcs and sectors',()=>{const rad=ri(3,12),ang=pick([30,45,60,90,120,150]);return Math.random()<.5?{q:`Arc length of a sector, radius ${rad} cm, angle ${ang}°, to 1 d.p.?`,a:r(ang/360*2*Math.PI*rad,1),tol:.06,how:`${ang}/360 × 2πr.`}:{q:`Area of a sector, radius ${rad} cm, angle ${ang}°, to 1 d.p.?`,a:r(ang/360*Math.PI*rad*rad,1),tol:.06,how:`${ang}/360 × πr².`}}),
 T('y11recur','Recurring decimals to fractions',()=>{const n=ri(1,98);const d=n<10?9:99;if(n%11===0&&n>9)return Y[11][10].gen();return{q:`Write 0.${n<10?n:n}${n<10?n:n}${n<10?n:n}… (${n<10?n:n} recurring) as a fraction.`,a:n/d,show:frac(n,d),how:`Let x = the decimal; ${d+1}x − x = ${n}.`}}),
 T('y11hist','Histograms: frequency density',()=>{const w=pick([2,4,5,10,20]),f=ri(2,12)*w/ (w>5?5:1);return{q:`A class of width ${w} has frequency ${f}. Frequency density?`,a:f/w,how:`Frequency ÷ class width.`}}),
];

Y[12]=[
 T('y12diff','Differentiation',()=>{const a=nz(-4,4),b=nz(-6,6),c=nz(-9,9);return{q:`Differentiate y = ${poly([a,'x³'],[b,'x²'],[c,'x'])} + ${ri(1,9)}`,a:apoly([3*a,'x^2'],[2*b,'x'],[c,'']),how:`Multiply by the power, reduce the power by one.`}}),
 T('y12grad','Gradient at a point',()=>{const a=nz(-3,3),b=nz(-5,5),x=ri(-3,3);return{q:`y = ${poly([a,'x²'],[b,'x'])}. Find dy/dx at x = ${x}.`,a:2*a*x+b,how:`dy/dx = ${poly([2*a,'x'],[b,''])}.`}}),
 T('y12int','Integration',()=>{const a=nz(-3,3),b=nz(-4,4);return{q:`Integrate ${poly([3*a,'x²'],[2*b,'x'])} with respect to x.`,a:apoly([a,'x^3'],[b,'x^2'])+'+c',alt:[apoly([a,'x^3'],[b,'x^2'])],how:`Raise the power by one and divide by the new power. Don't forget + c.`}}),
 T('y12defint','Definite integrals',()=>{const a=ri(1,3),lo=ri(0,2),hi=lo+ri(1,3);const F=x=>a*x*x;return{q:`Evaluate ∫ from ${lo} to ${hi} of ${poly([2*a,'x'])} dx`,a:F(hi)-F(lo),how:`[${a}x²] from ${lo} to ${hi}.`}}),
 T('y12binom','Binomial expansion',()=>{const n=ri(4,8),k=ri(2,n-2);return{q:`Coefficient of x^${k} in the expansion of (1 + x)^${n}?`,a:nCk(n,k),how:`${n}C${k}.`}}),
 T('y12log','Logarithms and exponentials',()=>{const b=pick([2,3,5,10]),p=ri(2,5);return pick([{q:`log base ${b} of ${b**p} = ?`,a:p},{q:`Solve ${b}^x = ${b**p}`,a:p},{q:`log base ${b} of x = ${p}. Find x.`,a:b**p},{q:`Solve e^x = ${ri(5,50)}. Give x to 2 d.p.`,a:null}])}),
 T('y12disc','The discriminant',()=>{const a=ri(1,3),b=nz(-8,8),c=nz(-8,8);const D=b*b-4*a*c;return Math.random()<.5?{q:`Discriminant of ${poly([a,'x²'],[b,'x'],[c,''])}?`,a:D,how:`b² − 4ac.`}:{q:`How many real roots does ${poly([a,'x²'],[b,'x'],[c,''])} = 0 have?`,choices:['0','1','2'],a:String(D<0?0:D===0?1:2),how:`b² − 4ac = ${D}.`}}),
 T('y12circ','Equation of a circle',()=>{const h=nz(-5,5),k=nz(-5,5),rad=ri(2,7);const eq=`(x ${h<0?'+':'−'} ${Math.abs(h)})² + (y ${k<0?'+':'−'} ${Math.abs(k)})² = ${rad*rad}`;return Math.random()<.5?{q:`Radius of the circle ${eq}?`,a:rad}:{q:`Centre of the circle ${eq}? Give as (x, y).`,a:`(${h},${k})`}}),
 T('y12exact','Exact trig values',()=>pick([{q:`sin 30° = ?`,a:.5},{q:`cos 60° = ?`,a:.5},{q:`tan 45° = ?`,a:1},{q:`sin 60° = ?`,a:'sqrt3/2',alt:['sqrt(3)/2']},{q:`cos 30° = ?`,a:'sqrt3/2',alt:['sqrt(3)/2']},{q:`sin 45° = ?`,a:'1/sqrt2',alt:['sqrt2/2','1/sqrt(2)','sqrt(2)/2']},{q:`tan 60° = ?`,a:'sqrt3',alt:['sqrt(3)']},{q:`sin 90° = ?`,a:1},{q:`cos 90° = ?`,a:0}])),
 T('y12sd','Mean and standard deviation',()=>{const arr=[];for(let i=0;i<5;i++)arr.push(ri(1,12));const m=sum(arr)/5;const v=sum(arr.map(x=>(x-m)**2))/5;return Math.random()<.5?{q:`Mean of ${arr.join(', ')}? (1 d.p.)`,a:r(m,1),tol:.06}:{q:`Standard deviation of ${arr.join(', ')} (divide by n), to 2 d.p.?`,a:r(Math.sqrt(v),2),tol:.006,how:`√(mean of squares − square of mean).`}}),
 T('y12bin','Binomial probability',()=>{const n=ri(3,6),k=ri(0,n),p=pick([.2,.3,.4,.5]);return{q:`X ~ B(${n}, ${p}). Find P(X = ${k}) to 3 d.p.`,a:r(nCk(n,k)*p**k*(1-p)**(n-k),3),tol:.0006,how:`${n}C${k} × ${p}^${k} × ${1-p}^${n-k}.`}}),
 T('y12vec','Vector magnitude',()=>{const [a,b]=pick([[3,4],[6,8],[5,12],[8,15],[2,3],[4,7],[1,5]]);const m=Math.hypot(a,b);return{q:`Magnitude of the vector (${a}, ${b}), to 2 d.p.?`,a:r(m,2),tol:.006,how:`√(${a}² + ${b}²).`}}),
 T('y12ap','Arithmetic sequences',()=>{const a=ri(-5,10),d=nz(-4,6),n=ri(5,20);return Math.random()<.5?{q:`Arithmetic sequence: first term ${a}, common difference ${d}. Find the ${n}th term.`,a:a+(n-1)*d,how:`a + (n − 1)d.`}:{q:`Arithmetic sequence: first term ${a}, common difference ${d}. Sum of the first ${n} terms?`,a:n/2*(2*a+(n-1)*d),how:`n/2 × (2a + (n − 1)d).`}}),
];
// fix the e^x item: give it a real answer
{const t=Y[12][5];const g=t.gen;t.gen=()=>{let o=g();if(o.a===null){const v=ri(5,50);o={q:`Solve e^x = ${v}. Give x to 2 d.p.`,a:r(Math.log(v),2),tol:.006,how:`x = ln ${v}.`}}return o}}

Y[13]=[
 T('y13chain','Chain rule',()=>{const a=ri(2,4),b=nz(-3,3),n=ri(2,4),x=ri(0,3);const inner=a*x+b;return{q:`f(x) = (${poly([a,'x'],[b,''])})^${n}. Find f'(${x}).`,a:n*inner**(n-1)*a,how:`${n}(${poly([a,'x'],[b,''])})^${n-1} × ${a}.`}}),
 T('y13prod','Product and quotient rules',()=>{const x=ri(1,3);return pick([{q:`f(x) = x² eˣ. Find f'(${x}) to 2 d.p.`,a:r((2*x+x*x)*Math.exp(x),2),tol:.006,how:`(2x + x²)eˣ.`},{q:`f(x) = x sin x. Find f'(${x}) to 3 d.p. (radians)`,a:r(Math.sin(x)+x*Math.cos(x),3),tol:.0006,how:`sin x + x cos x.`},{q:`f(x) = eˣ / x. Find f'(${x}) to 3 d.p.`,a:r(Math.exp(x)*(x-1)/(x*x),3),tol:.0006,how:`(x eˣ − eˣ) / x².`}])}),
 T('y13intg','Integration techniques',()=>pick([()=>{const a=ri(1,2),n=ri(1,3);return{q:`∫ from 0 to ${a} of 2x(x² + 1)^${n} dx, to 3 d.p.`,a:r(((a*a+1)**(n+1)-1)/(n+1),3),tol:.0006,how:`Substitute u = x² + 1.`}},()=>({q:`∫ from 0 to 1 of x eˣ dx, to 3 d.p.`,a:1,tol:.0006,how:`By parts: [x eˣ − eˣ] from 0 to 1.`}),()=>({q:`∫ from 1 to e of ln x dx, to 3 d.p.`,a:1,tol:.0006,how:`By parts: [x ln x − x].`}),()=>({q:`∫ from 0 to π/2 of x cos x dx, to 3 d.p.`,a:r(Math.PI/2-1,3),tol:.0006,how:`By parts: [x sin x + cos x].`})])()),
 T('y13geo','Geometric series',()=>{const a=ri(1,9),rr=pick([.5,.25,.1,.2,2,3]),n=ri(4,8);return rr<1?{q:`Geometric series: first term ${a}, ratio ${rr}. Sum to infinity?`,a:r(a/(1-rr),3),tol:.0006,how:`a / (1 − r).`}:{q:`Geometric series: first term ${a}, ratio ${rr}. Sum of the first ${n} terms?`,a:a*(rr**n-1)/(rr-1),how:`a(rⁿ − 1)/(r − 1).`}}),
 T('y13pf','Partial fractions',()=>{const p=nz(-5,5),q=nz(-5,5);if(p===q)return Y[13][4].gen();const A=nz(-4,4),B=nz(-4,4);const b=A+B,c=A*q+B*p;return{q:`(${poly([b,'x'],[c,''])}) / (${bracket(p,q)}) = A/(${poly([1,'x'],[p,''])}) + B/(${poly([1,'x'],[q,''])}). Give A, B.`,a:[A,B],ordered:true,how:`Cover-up: substitute x = ${-p} for A and x = ${-q} for B.`}}),
 T('y13rad','Radians',()=>pick([()=>{const [d,ans]=pick([[30,'pi/6'],[45,'pi/4'],[60,'pi/3'],[90,'pi/2'],[120,'2pi/3'],[135,'3pi/4'],[150,'5pi/6'],[180,'pi'],[270,'3pi/2']]);return{q:`Convert ${d}° to radians, in terms of π.`,a:ans}},()=>{const rad=ri(2,10),th=pick([.5,1,1.5,2,2.5]);return{q:`Arc length: radius ${rad}, angle ${th} radians?`,a:rad*th,how:`s = rθ.`}},()=>{const rad=ri(2,10),th=pick([.5,1,1.5,2]);return{q:`Sector area: radius ${rad}, angle ${th} radians?`,a:.5*rad*rad*th,how:`A = ½r²θ.`}}])()),
 T('y13nr','Newton-Raphson',()=>{const b=nz(-4,4),c=nz(-6,6),x0=ri(1,3);const f=x=>x**3+b*x+c,fp=x=>3*x*x+b;if(fp(x0)===0)return Y[13][6].gen();return{q:`f(x) = ${poly([1,'x³'],[b,'x'],[c,''])}, x₀ = ${x0}. One Newton-Raphson step gives x₁ = ? (3 d.p.)`,a:r(x0-f(x0)/fp(x0),3),tol:.0006,how:`x₁ = x₀ − f(x₀)/f'(x₀), f'(x) = ${poly([3,'x²'],[b,''])}.`}}),
 T('y13trig','Trig identities and R-form',()=>pick([()=>{const [o,a,h]=pick([[3,4,5],[5,12,13],[8,15,17]]);return{q:`x is acute and sin x = ${o}/${h}. Find cos x as a fraction.`,a:a/h,show:frac(a,h),how:`sin²x + cos²x = 1.`}},()=>{const [a,b]=pick([[3,4],[5,12],[6,8],[1,1],[2,3]]);return{q:`${a} sin x + ${b} cos x = R sin(x + α). Find R to 2 d.p.`,a:r(Math.hypot(a,b),2),tol:.006,how:`R = √(a² + b²).`}},()=>{const [a,b]=pick([[3,4],[5,12],[1,1],[2,3]]);return{q:`${a} sin x + ${b} cos x = R sin(x + α). Find α in degrees to 1 d.p.`,a:r(Math.atan2(b,a)*180/Math.PI,1),tol:.06,how:`tan α = b/a.`}}])()),
 T('y13de','Differential equations',()=>{const A=ri(2,9)*10,k=pick([.1,.2,.3,-.1,-.2]),t=ri(2,6);return{q:`dy/dt = ${k}y with y = ${A} at t = 0. Find y when t = ${t}, to 2 d.p.`,a:r(A*Math.exp(k*t),2),tol:.006,how:`y = ${A}e^(${k}t).`}}),
 T('y13param','Parametric differentiation',()=>{const t=nz(-3,3),a=ri(1,3);return{q:`x = t², y = ${2*a}t. Find dy/dx when t = ${t}. (as a fraction if needed)`,a:a/t,show:frac(a,t),how:`dy/dx = (dy/dt)/(dx/dt) = ${2*a}/(2t).`}}),
 T('y13mod','Modulus equations',()=>{const a=ri(2,4),b=nz(-6,6),k=ri(1,9);const s1=(k-b)/a,s2=(-k-b)/a;if(!Number.isInteger(s1)||!Number.isInteger(s2))return Y[13][10].gen();return{q:`Solve |${poly([a,'x'],[b,''])}| = ${k}. Give both solutions.`,a:[s1,s2],how:`${poly([a,'x'],[b,''])} = ${k} or ${poly([a,'x'],[b,''])} = −${k}.`}}),
 T('y13rec','Recurrence relations',()=>{const a=ri(2,3),b=nz(-4,4),u1=ri(1,5),n=ri(3,5);let u=u1;for(let i=1;i<n;i++)u=a*u+b;return{q:`u₁ = ${u1}, uₙ₊₁ = ${poly([a,'uₙ'],[b,''])}. Find u${['','₁','₂','₃','₄','₅'][n]}.`,a:u,how:`Apply the rule ${n-1} times.`}}),
];

const YEARS={};for(const y of Object.keys(Y))YEARS[y]={year:+y,topics:Y[y]};
const TOPIC={};for(const y in Y)for(const t of Y[y]){t.year=+y;TOPIC[t.id]=t}


/* ---------- per-topic hints (method, never the answer) ---------- */
const HINTS={
y1add:'Start at the first number and count on. Use your fingers if it helps.',y1sub:'Start at the big number and count backwards.',y1bond:'What do you add to get to 10? Think of the pairs: 1 and 9, 2 and 8, 3 and 7…',y1more:'One more is the next number when counting up. One less is the one before.',y1dbl:'Double means add the number to itself. Half means split it into two equal parts.',y1count:'Find how much the numbers go up by each time, then add that once more.',y1cmp:'Compare the tens first. If they match, compare the ones.',
y2add:'Add the tens first, then the ones. Or count on in tens then ones.',y2sub:'Take away the tens, then the ones. Watch out if you need to borrow.',y2tab:'For 2s double it. For 5s count 5, 10, 15… For 10s put a 0 on the end.',y2half:'Half: share into 2 equal groups. Quarter: halve it, then halve again.',y2pv:'The tens digit is worth tens: 4 in 47 is worth 40. The ones digit is worth itself.',y2money:'Add the tens of pence first, then the ones. 10p + 10p = 20p.',y2odd:'Look at the last digit only. 0, 2, 4, 6, 8 are even.',y2miss:'Use the opposite: to find what was added, take away. To find what was taken, add.',
y3tab:'For 4s: double, then double again. For 8s: double three times. For 3s: add the number three times.',y3div:'Ask: how many of the small number fit into the big one? Use the times table backwards.',y3add:'Line up the columns: ones, tens, hundreds. Carry when a column goes over 9.',y3sub:'Column subtraction. If the top digit is smaller, borrow from the next column.',y3frac:'One third means divide by 3, one quarter means divide by 4, and so on.',y3mul:'Split the 2-digit number into tens and ones, multiply each, then add.',y3pv:'Hundreds digit × 100, tens digit × 10, ones digit × 1.',y3seq:'Work out the jump between two numbers next to each other, then jump once more.',
y4tab:'Use a fact you know and adjust: 7 × 8 is 7 × 10 minus 7 × 2.',y4mul:'Multiply the hundreds, tens and ones separately, then add them up.',y4round:'Look at the digit to the right of where you are rounding. 5 or more rounds up.',y4neg:'Picture a number line. Subtracting moves left, past zero into negatives.',y4dec:'Tenths are the first digit after the point, hundredths the second. 3/10 = 0.3.',y4fac:'A factor divides in exactly with nothing left over. Try dividing by each option.',y4peri:'Perimeter is the distance all the way around: add up all four sides.',y4eq:'Whatever you multiply the bottom by, multiply the top by the same.',y4d10:'Dividing by 10 moves every digit one place right; by 100, two places.',
y5lmul:'Multiply by the tens digit (with a 0 on the end), then by the ones digit, and add.',y5div:'How many times does it go in? Multiply back to see what is left over.',y5fadd:'Same denominator: add the tops, keep the bottom. Simplify at the end.',y5dadd:'Line up the decimal points, then add or subtract like whole numbers.',y5pct:'Find 10% by dividing by 10. 50% is half, 25% is a quarter, 20% is 10% doubled.',y5sq:'Squared means times itself. Cubed means times itself twice.',y5prime:'A prime has exactly two factors: 1 and itself. Try dividing by 2, 3, 5, 7.',y5area:'Area of a rectangle is length × width.',y5rnd:'Look at the second decimal place. 5 or more rounds the first place up.',
y6bidmas:'Brackets, Indices, Division and Multiplication, then Addition and Subtraction.',y6ldiv:'Estimate first: how many times does the divisor go into the first few digits?',y6fmul:'Multiply the tops together and the bottoms together, then simplify.',y6fdiv:'Dividing by a whole number: keep the top, multiply the bottom by that number.',y6ratio:'Add the ratio parts to find how many parts in total, then find one part.',y6pct:'Build it from 10%, 5% and 1%. 35% = 10% + 10% + 10% + 5%.',y6alg:'Do the opposite operation to both sides to get n on its own.',y6mean:'Add all the numbers, then divide by how many there are.',y6tri:'The three angles of any triangle add up to 180°.',y6tarea:'Area of a triangle is half of base × height.',
y7neg:'Two minuses next to each other make a plus. For × and ÷, same signs give positive.',y7simp:'Only combine terms with the same letter. Add the numbers in front.',y7subst:'Swap the letter for its number, then use BIDMAS.',y7eq1:'Do the inverse operation to both sides: + and − undo each other, × and ÷ undo each other.',y7exp:'Multiply everything inside the bracket by the number outside.',y7seq:'Find the difference between neighbouring terms and add it again.',y7fdp:'Fraction to %: divide top by bottom then × 100. % to decimal: divide by 100.',y7hcf:'HCF: list the factors of both and take the biggest shared one. LCM: list multiples and take the first shared one.',y7ratio:'Total parts = sum of the ratio. One part = amount ÷ total parts.',y7avg:'Median: put in order, take the middle. Mode: most common. Range: biggest minus smallest.',
y8eq2:'Undo the + or − first, then undo the multiplication.',y8expsimp:'Expand each bracket separately, then collect the x terms and the numbers.',y8fact:'Find the biggest number that divides both terms and take it outside the bracket.',y8nth:'The difference between terms tells you the number in front of n. Then adjust with a constant.',y8pctch:'Percentage change = change ÷ original × 100.',y8ind:'Multiplying: add the powers. Dividing: subtract. Power of a power: multiply.',y8circ:'Circumference = 2πr. Area = πr². Use the π button.',y8prob:'Probability = number of ways it can happen ÷ total number of counters.',y8poly:'Interior angle sum = (n − 2) × 180. Exterior angles of any polygon add to 360.',y8sdt:'Speed = distance ÷ time. Cover the one you want in the triangle.',
y9both:'Move the smaller x term across first, then solve like a two-step equation.',y9dbl:'FOIL: First, Outer, Inner, Last. Then collect the x terms.',y9fq:'Find two numbers that multiply to give the last number and add to give the middle one.',y9sim:'Make the coefficients of one letter match, then add or subtract the equations to eliminate it.',y9pyth:'a² + b² = c². The hypotenuse is opposite the right angle and is the longest side.',y9sf:'Standard form is a × 10ⁿ with 1 ≤ a < 10. The power counts how many places the point moves.',y9ineq:'Solve it like an equation, keeping the inequality sign in place.',y9ci:'Multiply by the multiplier (1 + rate/100) once for each year.',y9grad:'In y = mx + c, m is the gradient and c is where it crosses the y-axis. Gradient = rise ÷ run.',y9trig:'Label opposite, adjacent, hypotenuse. SOH CAH TOA. Side = ratio × known side.',y9prop:'Find the cost of one first (unitary method), then multiply.',
y10qf:'Factorise into two brackets, then set each bracket equal to zero.',y10qform:'x = (−b ± √(b² − 4ac)) / 2a. Work out b² − 4ac first.',y10sim:'Multiply one or both equations so one letter has matching coefficients, then eliminate.',y10surd:'Look for the biggest square number that divides in. √(a × b) = √a × √b.',y10trig:'Pick the ratio that uses the two sides you know, then use the inverse (sin⁻¹, cos⁻¹, tan⁻¹).',y10sfc:'Multiply the number parts, add the powers of 10.',y10prop:'Direct: y = kx, find k first. Inverse: y = k/x, so x × y is constant.',y10bounds:'Half the rounding unit above and below. To 1 d.p. means ± 0.05.',y10rmean:'Mean × how many = total. Subtract the ones you know.',y10prob2:'Multiply the probabilities along the branches. The second pick has one fewer sweet.',y10rpct:'The new price is a percentage of the original. Divide by the multiplier.',y10vec:'Multiply each component by the number, then add matching components.',
y11cts:'Halve the x coefficient to get a. Then b = constant − a².',y11qseq:'Second difference ÷ 2 gives the n² coefficient. Subtract an² from the sequence and find the linear part.',y11comp:'fg(x) means do g first, then put the result into f.',y11inv:'f⁻¹(y) asks: which x gives that output? Solve f(x) = y.',y11rearr:'Undo the operations one at a time, doing the same to both sides.',y11cos:'a² = b² + c² − 2bc cos A.',y11sine:'a / sin A = b / sin B. Rearrange for the side you want.',y11afrac:'Factorise the numerator, then cancel the common bracket.',y11qineq:'Find the roots first. A positive x² curve is negative between its roots.',y11sector:'Take the fraction of the circle: angle ÷ 360, times circumference or area.',y11recur:'Call it x, multiply by 10 or 100 so the repeating parts line up, then subtract.',y11hist:'Frequency density = frequency ÷ class width.',
y12diff:'Bring the power down in front and reduce the power by one. Constants disappear.',y12grad:'Differentiate first, then substitute the x value into dy/dx.',y12int:'Raise the power by one and divide by the new power. Add + c.',y12defint:'Integrate, then substitute the top limit minus the bottom limit.',y12binom:'The coefficient of xᵏ in (1 + x)ⁿ is nCk = n! / (k!(n − k)!).',y12log:'log_b(x) = p means bᵖ = x. ln undoes e.',y12disc:'Discriminant = b² − 4ac. Positive: 2 roots, zero: 1 root, negative: none.',y12circ:'(x − a)² + (y − b)² = r² has centre (a, b) and radius r. Watch the signs.',y12exact:'Draw the 30-60-90 and 45-45-90 triangles, or remember the 0, ½, √2/2, √3/2, 1 pattern.',y12sd:'Mean = total ÷ n. SD = √(mean of the squares − square of the mean).',y12bin:'P(X = k) = nCk × pᵏ × (1 − p)ⁿ⁻ᵏ.',y12vec:'Magnitude is Pythagoras: √(x² + y²).',y12ap:'nth term = a + (n − 1)d. Sum = n/2 × (2a + (n − 1)d).',
y13chain:'Differentiate the outside, keep the inside, times the derivative of the inside.',y13prod:'Product: u\'v + uv\'. Quotient: (u\'v − uv\') / v².',y13intg:'Substitution when you see a function and its derivative. Parts for x × (eˣ, sin, cos, ln).',y13geo:'Sum to infinity = a / (1 − r) when |r| < 1. Sum of n terms = a(rⁿ − 1)/(r − 1).',y13pf:'Cover-up method: substitute the x value that makes each bracket zero.',y13rad:'180° = π radians. Arc length s = rθ, sector area = ½r²θ, with θ in radians.',y13nr:'x₁ = x₀ − f(x₀) / f\'(x₀). Differentiate first.',y13trig:'sin²x + cos²x = 1. For R sin(x + α): R = √(a² + b²), tan α = b/a.',y13de:'dy/dt = ky has solution y = Aeᵏᵗ.',y13param:'dy/dx = (dy/dt) ÷ (dx/dt).',y13mod:'Split into two cases: the inside equals +k, or the inside equals −k.',y13rec:'Feed each answer back into the rule to get the next term.',
};
for(const id in HINTS)if(TOPIC[id])TOPIC[id].hint=HINTS[id];

/* ---------- answer checking ---------- */
function norm(s){
  return String(s).toLowerCase().replace(/−|–/g,'-').replace(/×/g,'*').replace(/÷/g,'/').replace(/²/g,'^2').replace(/³/g,'^3')
    .replace(/√/g,'sqrt').replace(/root/g,'sqrt').replace(/π/g,'pi').replace(/≤/g,'<=').replace(/≥/g,'>=').replace(/\s+/g,'').replace(/\*\*/g,'^')
    .replace(/(\d)\*([a-z(])/g,'$1$2').replace(/([a-z)])\*([a-z(])/g,'$1$2').replace(/^\+/,'').replace(/^(y|f\(x\)|f'\(x\)|dy\/dx|un|u_n|s)=/,'');
}
function parseNum(s){
  s=norm(s).replace(/^[a-z]=/,'').replace(/[£$%]|cm|mph|miles|kg|m$|p$/g,'').replace(/,/g,'');
  if(s==='')return NaN;
  const mixed=s.match(/^(-?)(\d+)[ ]?(\d+)\/(\d+)$/);
  if(mixed){const v=+mixed[2]+ +mixed[3]/+mixed[4];return mixed[1]?-v:v}
  const f=s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if(f)return +f[1]/+f[2];
  if(/^-?\d*\.?\d+(e-?\d+)?$/.test(s))return +s;
  if(s==='pi')return Math.PI;
  return NaN;
}
function check(x,input){
  input=String(input??'').trim();
  if(x.choices)return input===x.a;
  if(Array.isArray(x.a)){
    const nums=input.split(/[,;]|and/).map(parseNum);
    if(nums.length!==x.a.length||nums.some(isNaN))return false;
    const tol=x.tol??1e-6;
    const A=x.ordered?x.a:x.a.slice().sort((p,q)=>p-q),B=x.ordered?nums:nums.slice().sort((p,q)=>p-q);
    return A.every((v,i)=>Math.abs(v-B[i])<=tol);
  }
  if(typeof x.a==='number'){const v=parseNum(input);return !isNaN(v)&&Math.abs(v-x.a)<=(x.tol??1e-6)}
  let n=norm(input);const targets=[x.a,...(x.alt||[])].map(norm);
  if(!targets.some(t=>/^[a-z]=/.test(t)))n=n.replace(/^[a-z]=/,'');
  return targets.includes(n);
}
function shown(x){ // how to display the correct answer
  if(x.show)return x.show;
  if(Array.isArray(x.a))return x.a.join(', ');
  return String(x.a).replace(/sqrt/g,'√').replace(/pi/g,'π').replace(/\^2/g,'²').replace(/\^3/g,'³').replace(/\^/g,'^');
}
const api={YEARS,TOPIC,check,norm,shown};
if(typeof module!=='undefined')module.exports=api;else root.MathsEngine=api;
})(typeof window!=='undefined'?window:globalThis);
