export default function IdGenerator() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
  let result = "";

  const number = [8, 4, 4, 4, 12];
  number.forEach((el, key) => {
    if (key !== number.length - 1) {
      for (let i = 0; i < el; i++) {
        const random = Math.floor(Math.random() * (alphabet.length - 1));
        result = result + alphabet[random];
      }

      result += "-";
    } else {
      for (let i = 0; i < el; i++) {
        const random = Math.floor(Math.random() * (alphabet.length - 1));
        result = result + alphabet[random];
      }
    }
  });
  return result;
}

// 974b53d1-edc9-4c0f-bae7-8763a2c26005
