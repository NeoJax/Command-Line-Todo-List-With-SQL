function list(client) {
  return new Promise((resolve, reject) => {
    client.query('SELECT * FROM tasks WHERE completed = false', (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

module.exports.list = list;
