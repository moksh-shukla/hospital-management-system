const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
// const Users = require('./routes/users');
const Patient = require('./routes/users/Patient/patient');
const Doctor = require('./routes/users/Doctor/doctor');
// const Admin = require('./routes/users/Admin/admin');
const api = require('./routes/api/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
// app.use('/users', Users);
app.use('/patient', Patient);
app.use('/doctor' , Doctor);
// app.use('/admin', Admin);
app.use('/api', api);

// app.use(express.static(path.join(__dirname + '/client/build')));

// app.use('/*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });


const PORT = 3000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));