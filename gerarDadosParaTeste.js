const { faker } = require('@faker-js/faker');

const generateTestData = () => {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
  };
};

const fs = require('fs');
const path = require('path');

const testData = generateTestData();
fs.writeFileSync(
  path.resolve(__dirname, 'cypress/fixtures/dadosParaTeste.json'),
  JSON.stringify(testData, null, 2)
);
console.log('Dados de teste gerados e salvos em cypress/fixtures/dadosParaTeste.json');
