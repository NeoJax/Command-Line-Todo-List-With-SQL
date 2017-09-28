function del(client, string) {
  return new Promise((resolve, reject) => {
    client.query('DELETE FROM tasks WHERE id = $1', [string], (err, res) => {
      client.end();
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

module.exports.del = del;
