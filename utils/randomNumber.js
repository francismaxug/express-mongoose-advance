//---------RANDOM NUMBER GENERATOR FUNCTION-----------
function generateVerificationCode() {
  return new Promise((resolve) => {
    const codeLength = 6;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
      const digit = Math.floor(Math.random() * 10); // Generate a random digit from 0 to 9
      code += digit.toString();
    }

    resolve(code);
  });
}


module.exports = generateVerificationCode