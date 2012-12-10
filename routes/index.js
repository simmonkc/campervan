exports.index = function(req, res) {
  images = [
    { '_id' : 123451, 'href' : '#0', 'title' : 'Tom cooking', 'lat' : '0.0', 'lng' : '0.2', 'createdDate' : new Date().getTime() },
    { '_id' : 123452, 'href' : '#1', 'title' : 'Kyle driving', 'lat' : '0.5', 'lng' : '3.2', 'createdDate' : new Date().getTime() },
    { '_id' : 123453, 'href' : '#2', 'title' : 'Arthur Pass', 'lat' : '1.0', 'lng' : '1.2', 'createdDate' : new Date().getTime() },
    { '_id' : 123454, 'href' : '#3', 'title' : 'Camper van shot', 'lat' : '2.0', 'lng' : '4.2', 'createdDate' : new Date().getTime() },
    { '_id' : 123455, 'href' : '#3', 'title' : 'Camper van shot', 'lat' : '2.0', 'lng' : '4.2', 'createdDate' : new Date().getTime() }
  ];
  res.render('index', { title: 'Campervan', images : images });
};

exports.show = function(req, res) { 
  data = { '_id' : 0, 'title' : 'Tom cooking', 'lat' : '0.0', 'lng' : '0.2', 'createdDate' : new Date().getTime() };
  res.render('show', { data : data })
};