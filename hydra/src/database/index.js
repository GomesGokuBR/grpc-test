const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27018/hydra', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});