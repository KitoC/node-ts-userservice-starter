const passwordRegex = {
  minCharacters: (min?: number, max?: number) =>
    new RegExp(`[A-Za-z\\d@$!%*?&]{${min},${max ? max : ""}}$`),
  oneUppercaseLetter: () => new RegExp("(?=.*[A-Z])"),
  oneLowercaseLetter: () => new RegExp("(?=.*[a-z])"),
  oneNumber: () => new RegExp("(?=.*\\d)"),
  oneSpecialCharacter: () => new RegExp(`(?=.*[@$!%*?&])`),
};

const validatePassword = (password: string, config: any) => {
  const { min = 8, max } = config;

  let regex = "^";

  const maxText = max ? `and maximum ${max} ` : "";
  let startingString = `Password must contain minimum ${min} ${maxText}characters`;

  let message: string | string[] = [];

  if (config.atLeastOneUppercaseLetter) {
    regex += passwordRegex.oneUppercaseLetter().source;
    message.push("one uppercase letter");
  }

  if (config.atLeastOneLowercaseLetter) {
    regex += passwordRegex.oneLowercaseLetter().source;
    message.push("one lowercase letter");
  }

  if (config.atLeastOneNumber) {
    regex += passwordRegex.oneNumber().source;
    message.push("one number");
  }

  if (config.atLeastOneSpecialCharacter) {
    regex += passwordRegex.oneSpecialCharacter().source;
    message.push("one special character");
  }

  regex += passwordRegex.minCharacters(min, max).source;

  const isValid = new RegExp(regex).test(password);

  if (!isValid) {
    message = message.reduce((string, next, index) => {
      if (index + 1 === message.length && message.length !== 1) {
        string += ` and ${next}.`;
      } else if (index === 0 || message.length === 1) {
        string += `, at least ${next}`;
      } else {
        string += `, ${next}`;
      }
      return string;
    }, startingString);

    throw {
      message,
      status: 401,
      code: "AUTH_INVALID_PASSWORD",
      meta: {
        isValid,
        regex,
      },
    };
  }
};

export default validatePassword;
