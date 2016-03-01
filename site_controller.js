
exports.index = function(req, res) {
  res.render('index', {
    name: "josh",
    age: 21,
    word: "word"
  });
}
