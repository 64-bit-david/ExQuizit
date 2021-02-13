exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    pageTitle: "Page Not Found",
    path: '/404',
    isAuthenticated: req.session.isLoggedIn
  });
}

exports.get500 = (req, res, next) => {
  res.status(500).render('errors/500', {
    pageTitle: "Error",
    isAuthenticated: req.session.isLoggedIn,
    path: '/500',
  })
}