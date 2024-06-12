var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

const cron = require("node-cron");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var eventRouter = require("./routes/events");
var productRouter = require("./routes/products");
var variantRouter = require("./routes/variants");
var productDescriptionRouter = require("./routes/productDescriptions");
var parameterRouter = require("./routes/parameters");
var timelineRouter = require("./routes/timelines");
var temperatureRouter = require("./routes/temperature");
var scheduleRouter = require("./routes/schedules");
var lineRouter = require("./routes/lines");
var productDescParamsStdRouter = require("./routes/stdProds");
var DataStabilityRouter = require("./routes/dataStabilities");
var SectionRouter = require("./routes/sections");
var EmailUserRouter = require("./routes/emailUsers");
var TransactionDataStabilityRouter = require("./routes/transactions");
var predictionsRouter = require("./routes/predictions");
var logCalculationRouter = require("./routes/logCalculations");

var app = express();
var cors = require("cors");
const eventController = require("./controller/eventController");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(cors({ origin: true, credentials: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/events", eventRouter);
app.use("/products", productRouter);
app.use("/variants", variantRouter);
app.use("/product-descriptions", productDescriptionRouter);
app.use("/parameters", parameterRouter);
app.use("/timelines", timelineRouter);
app.use("/temperature", temperatureRouter);
app.use("/schedules", scheduleRouter);
app.use("/lines", lineRouter);
app.use("/std-prods", productDescParamsStdRouter);
app.use("/data-stability", DataStabilityRouter);
app.use("/sections", SectionRouter);
app.use("/email-users", EmailUserRouter);
app.use("/transactions", TransactionDataStabilityRouter);
app.use("/predictions", predictionsRouter);
app.use("/log-calculations", logCalculationRouter);

cron.schedule(
  "00 7 * * *",
  () => {
    console.log("Running Cron Job");
    eventController.emailReminder();
  },
  {
    scheduled: true,
    timezone: "Asia/Jakarta",
  }
);

module.exports = app;
