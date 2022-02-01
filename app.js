require("dotenv").config()
const Express = require('express')
const app = Express();
const dbConnection = require("./db");
const middleware = require("./middleware")

app.use(Express.json());

const controllers = require("./controllers");
app.use(middleware.CORS)
app.use("/log", controllers.logController);
app.use("/user", controllers.userController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000`);
            });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    });

app.use('/test', (req, res) => {
    res.send('This is a message from the test endpoint on the server!');
});

// app.use('/log', (req, res) => {
//     res.send('This is a message from the log endpoint!')
// });



