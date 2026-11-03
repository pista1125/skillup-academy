const fs = require('fs');
const path = require('path');

const subtopicFolders = [
  'tablazatok',
  'diagramok',
  'valtozasok-abrazolasa',
  'grafikonok-a-mindennapokban',
  'a-fuggveny-fogalma',
  'keszitsunk-grafikont',
  'az-egyenes-es-forditott-aranyossag-fuggvenye',
  'egyenesek-meredeksege',
  'linearis-fuggvenyek',
  'abszoluterteek-fuggveny',
  'fuggvenyek-jellemzese',
  'szelsoertekek',
  'masodfoku-es-negyzetgyok-fuggveny',
  'gyakorlati-feladatok',
  'egyenletek-grafikus-megoldasa',
  'egyenlotlensegek',
  'abszolut-ertekes-egyenletek'
];

console.log(`Checking ${subtopicFolders.length} subtopics...`);

