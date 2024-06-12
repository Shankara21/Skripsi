var express = require("express");
const TransactionDataStabilityController = require("../controller/TransactionDataStabilityController");
var router = express.Router();

const moment = require("moment");

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      moment().format("YYYYMMDDHHmmss") +
        +Math.floor(Math.random() * 9999999) +
        "" +
        file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
});

const multipleUpload = upload.fields([
  { name: "attachmentSensory", maxCount: 1 },
  { name: "attachmentAnalysis", maxCount: 1 },
]);

router.get("/", TransactionDataStabilityController.index);
router.get(
  "/dataStability/:id",
  TransactionDataStabilityController.getByDataStabilityId
);
router.put(
  "/dataStability/:id",
  multipleUpload,
  TransactionDataStabilityController.updateTransactionDataStability
);
router.get(
  "/showTransaction/:id",
  TransactionDataStabilityController.showTransactionDataStability
);
router.get(
  "/showTransaction-details/:id",
  TransactionDataStabilityController.showTransactionDetails
);
router.get(
  "/transactions-details/data-stability/:dataStabilityId/parameter/:parameterId",
  TransactionDataStabilityController.getTransactionDetailsPerParameter
);
router.get(
  "/transactions-details/:id",
  TransactionDataStabilityController.getTransactionDetailsByTransactionId
);

router.get('/trend-parameter/data-stability/:dataStabilityId/maxTime/:maxTime', TransactionDataStabilityController.getTrendParameter);

router.post("/", multipleUpload, TransactionDataStabilityController.store);

router.delete(
  "/deleteTransaction/:id",
  TransactionDataStabilityController.deleteTransaction
);

router.put(
  "/update-transaction-details/:id",
  TransactionDataStabilityController.updateTransactionDetails
);

router.put(
  "/update-whole-data/:id",
  TransactionDataStabilityController.updateWholeTransactionDetails
);

module.exports = router;
