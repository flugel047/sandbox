let billValue=275;
let tipValue=50<billValue && billValue<300 ?  0.15*billValue : 0.20*billValue ;
console.log(`The bill was ${billValue}, the tip was ${tipValue}, and the total value ${billValue+tipValue}`);