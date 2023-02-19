const makeRandomId = (length: number) => {
  let result = '';
  const time = new Date(Date.now()).getTime();

  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${time}`;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return `userid-${time}-${result}`;
};

export { makeRandomId };
