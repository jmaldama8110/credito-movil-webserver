
// expected output: "05"

for (i = 0; i < 10; ++i) {
    const rand = Math.trunc(Math.random() * (1000000));
    const str1 = rand.toString();

    console.log(str1.padStart(9, '0'));

}


// const fullNumber = '2034399002125581';
// const last4Digits = fullNumber.slice(-4);
// const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

// console.log(maskedNumber);
// expected output: "************5581"