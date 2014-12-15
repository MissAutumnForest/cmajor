var crypto = require("crypto"),
    db     = require("./database");

function genToken(username){
  var shasum = crypto.createHash("sha256"),
      sha512sum = crypto.createHash("sha512"),
      date = new Date().toISOString();
  shasum.update(date + username + date);
  sha512sum.update(date + shasum.digest('hex') + date);
  return sha512sum.digest('hex');
}

function hashPassword(password, salt){
  var shasum = crypto.createHash("sha256"),
      sha512sum = crypto.createHash("sha512");
  shasum.update(salt + password + salt);
  shasum = shasum.digest('hex');
  sha512sum.update(shasum + salt + shasum);
  return sha512sum.digest('hex');
}

exports.genToken = genToken;
exports.hashPassword = hashPassword;
