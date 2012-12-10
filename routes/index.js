exports.index = function(req, res) {
  images = [
    { '_id' : 0, 'href' : '#0', 'title' : 'Tom cooking', 'lat' : '0.0', 'lng' : '0.2', 'createdDate' : new Date().getTime() },
    { '_id' : 1, 'href' : '#1', 'title' : 'Kyle driving', 'lat' : '0.5', 'lng' : '3.2', 'createdDate' : new Date().getTime() },
    { '_id' : 2, 'href' : '#2', 'title' : 'Arthur Pass', 'lat' : '1.0', 'lng' : '1.2', 'createdDate' : new Date().getTime() },
    { '_id' : 3, 'href' : '#3', 'title' : 'Camper van shot', 'lat' : '2.0', 'lng' : '4.2', 'createdDate' : new Date().getTime() }
  ];
  res.render('index', { title: 'Campervan', images : images });
};

exports.show = function(req, res) { 
  data = { '_id' : 0, 'title' : 'Tom cooking', 'lat' : '0.0', 'lng' : '0.2', 'createdDate' : new Date().getTime() };
  res.render('show', { data : data })
};