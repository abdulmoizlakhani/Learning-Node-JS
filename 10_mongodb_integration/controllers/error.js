exports.get404Page = (req, res) => {
  res.status(404).render("404", { docTitle: "404 - Not Found", path: '/404' });
};
