module.exports = function (req, res, next) {
  const {
    fullname,
    group,
    phone,
    faculty,
    city,
  } = req.body;

  const fullnameRegexp = /^([A-Z][a-z]+ [A-Z]\. [A-Z]\.)$/;
  const groupRegexp = /^([A-Z]{2}-[0-9]{2})$/;
  const phoneRegexp = /^(\(\d{3}\)-\d{3}-\d{2}-\d{2})$/;
  const facultyRegexp = /^([A-Z]{4})$/;
  const cityRegexp = /^([A-Z][a-z]+)$/;

  if(
    !fullnameRegexp.test(fullname)
    || !groupRegexp.test(group)
    || !phoneRegexp.test(phone)
    || !facultyRegexp.test(faculty)
    || !cityRegexp.test(city)
    ) {
      res.json({ message: 'Wrong format in some field' });
  } else {
    next();
  }
}