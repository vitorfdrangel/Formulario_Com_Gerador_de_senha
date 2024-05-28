// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

// Novas funcionalidades
const openCloseGeneratorButton = document.querySelector(
  "#open-generate-password"
);
const generateOptionsElement = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symblosInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

// Funções
// Obter letras minúsculas
const getLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
// Obter letras maiúsculas
const getUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
// Obter números
const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};
// Obter símbolos
const getSymbol = () => {
  const symbols = "#@!*$-<>/";

  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Gerar senha
const generatePassword = (getLowerCase, getUpperCase, getNumber, getSymbol) => {
  let password = "";
  const passwordLength = lengthInput.value;

  const generators = [];

  if (!lettersInput.checked && !numbersInput.checked && !symblosInput.checked)
    return;

  if (lettersInput.checked) {
    generators.push(getLowerCase, getUpperCase);
  }

  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  if (symblosInput.checked) {
    generators.push(getSymbol);
  }

  for (let i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const generatorsValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += generatorsValue;
    });
  }

  password = password.slice(0, passwordLength);

  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
};

// Eventos

openCloseGeneratorButton.addEventListener("click", () => {
  generateOptionsElement.classList.toggle("hide");
});

generatePasswordButton.addEventListener("click", () => {
  generatePassword(getLowerCase, getUpperCase, getNumber, getSymbol);

  copyPasswordButton.classList.remove("copy-sucess");
  copyPasswordButton.innerText = "Copiar";
});

copyPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatedPasswordElement.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(() => {
    copyPasswordButton.innerText = "Senha copiada com sucesso!";
  });

  copyPasswordButton.classList.add("copy-sucess");
});
