function complete(client, string) {
  return new Promise((resolve, reject) => {
    client.query('UPDATE tasks SET completed = true WHERE id = $1', [string], (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

module.exports.complete = complete;
