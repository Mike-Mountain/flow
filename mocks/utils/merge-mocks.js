const fs = require('fs');

const files = process.argv.slice(2);

function mergeJsonObjects(files) {
  const requests = files.map(file => require(`../${file}`));
  return requests.reduce(
    (previousValue, currentValue) => Object.assign(previousValue, currentValue),
    {}
  );
}

try {
  const mergedObjects = mergeJsonObjects(files);
  fs.writeFile(
    'mocks/merged/mocks.json',
    JSON.stringify(mergedObjects),
    function (err) {
      console.log(err);
    }
  )
} catch (err) {
  console.log('Something went wrong...');
  console.log(err);
}

