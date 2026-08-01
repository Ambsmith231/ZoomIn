require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
----------------------------------->>>
 E-Buy E-Commerce Backend Started
 Running on: http://localhost:${PORT}
 Environment: ${process.env.NODE_ENV}
 ------------------------------------>>>>
`);
});