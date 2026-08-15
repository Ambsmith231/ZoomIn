require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
                    --------------------
 E-Buy Backend has started successfully!
 Running on: http://localhost:${PORT}
 --------------
`);
});