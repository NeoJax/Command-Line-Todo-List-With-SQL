function add(client, string) {
  return new Promise((resolve, reject) => {
    client.query('INSERT INTO tasks (task, completed) VALUES($1, false)', [string], (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

module.exports.add = add;
