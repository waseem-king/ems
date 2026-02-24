const connectDB = require("./src/config/db");

const app = require("./src/app");
const logger = require("./src/config/logger");
const PORT = process.env.PORT;


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      logger.info(`Server running on port ${PORT}`)
    );
  } catch (error) {
    logger.error("Server failed to start", error)
    process.exit(1);
  }
};

startServer();