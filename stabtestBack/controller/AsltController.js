const { SimpleLinearRegression } = require("ml-regression-simple-linear");
const {
  ProductDescParamsStd,
  ProductDescription,
  Schedule,
  Timeline,
  Temperature,
  TransactionDetails,
} = require("../models");

module.exports = {
  calculateData: async (req, res) => {
    try {
      // find product desc params std according data request
      const productDescParamsStd = await ProductDescParamsStd.findOne({
        where: {
          productDescId: req.body.productDescId,
          parameterId: req.body.parameter.id,
        },
      });


      // find product desc according data request
      const productDesc = await ProductDescription.findByPk(
        req.body.productDescId
      );

      const schedules = await Schedule.findAll({
        where: {
          productId: productDesc.productId,
        },
        include: [
          {
            model: Timeline,
          },
          {
            model: Temperature,
          },
        ],
      });

      let schedule30 = schedules.filter((item) => item.temperatureId == 1);
      let schedule40 = schedules.filter((item) => item.temperatureId == 2);
      let schedule50 = schedules.filter((item) => item.temperatureId == 3);
      schedule30 = schedule30.map(function (item) {
        return item.Timeline.value;
      });
      schedule40 = schedule40.map(function (item) {
        return item.Timeline.value;
      });
      schedule50 = schedule50.map(function (item) {
        return item.Timeline.value;
      });

      // return res.json(productDescParamsStd);
      const categories = ["30", "40", "50"];
      const x = {};
      const y = {};
      const rawX = {};
      const rawY = {};

      categories.forEach((category) => {
        x[category] = req.body[`data${category}`].map((item) => item.timeline);
        y[category] = req.body[`data${category}`].map((item) => item.value);
        rawX[category] = req.body[`raw${category}`].map(
          (item) => item.timeline
        );
        rawY[category] = req.body[`raw${category}`].map((item) => item.value);
      });

      const firstRegression30 = new SimpleLinearRegression(x["30"], y["30"]);
      const firstRegression40 = new SimpleLinearRegression(x["40"], y["40"]);
      const firstRegression50 = new SimpleLinearRegression(x["50"], y["50"]);

      const regression40String = firstRegression40.toString();
      const isIncrease = /x\s*[+-]/.test(regression40String)
        ? /x\s*\+/.test(regression40String)
        : null;

      const resultArray = [];
      const resultPrediction = [];

      const predict30 = schedule30.map((item, index) => {
        return index == 0
          ? rawY["30"][0]
          : parseFloat(firstRegression30.predict(item).toFixed(3));
      });
      const predictAwal30 = schedule30.map((item, index) => {
        return index == 0
          ? y["30"][0]
          : parseFloat(firstRegression30.predict(item).toFixed(3));
      });
      const predict40 = schedule40.map((item, index) => {
        return index == 0
          ? rawY["40"][0]
          : parseFloat(firstRegression40.predict(item).toFixed(3));
      });
      const predict50 = schedule50.map((item, index) => {
        return index == 0
          ? rawY["50"][0]
          : parseFloat(firstRegression50.predict(item).toFixed(3));
      });

      categories.forEach((category, index) => {
        const tempC = parseFloat(category);
        const tempK = tempC + 273;
        const perT = 1 / tempK;
        const regression = new SimpleLinearRegression(x[category], y[category]);
        const xValue = regression.slope.toFixed(4);
        const lnX = Math.log(Math.abs(xValue)).toFixed(5);
        resultArray.push({
          tempC: tempC,
          tempK: tempK,
          perT: parseFloat(perT.toFixed(8)),
          x: parseFloat(xValue),
          lnX: parseFloat(lnX),
        });
      });

      const xres = resultArray.map((item) => item.perT);
      const yres = resultArray.map((item) => item.lnX);

      const xResPredict = resultPrediction.map((item) => item.perT);
      const yResPredict = resultPrediction.map((item) => item.lnX);

      const regressionRes = new SimpleLinearRegression(xres, yres);

      const regressionResPredict = new SimpleLinearRegression(
        xResPredict,
        yResPredict
      );

      const eaR = parseFloat(regressionRes.slope.toFixed(2));
      const lnKO = parseFloat(regressionRes.intercept.toFixed(5));

      const eaRPredict = parseFloat(regressionResPredict.slope.toFixed(2));
      const lnKOPredict = parseFloat(regressionResPredict.intercept.toFixed(5));

      const initValue = y["40"][0];
      let stdReject;
      if (productDescParamsStd.standardType == "range") {
        const initValue = productDescParamsStd.standard;
        const [minValue, maxValue] = initValue.split("-").map(parseFloat);

        stdReject = isIncrease ? maxValue : minValue;
      } else {
        stdReject = parseFloat(productDescParamsStd.standard);
      }

      // Mendefinisikan array baru
      const finalResult = [];
      const finalResultPredict = [];

      categories.forEach((category) => {
        const tempC = parseFloat(category);
        const tempK = tempC + 273;
        const perT = 1 / tempK;

        // Menghitung lnk
        const lnk = lnKO + eaR * perT;
        const lnkPredict = lnKOPredict + eaRPredict * perT;

        // Menghitung k dan bulatkan menjadi 9 desimal
        const k = parseFloat(Math.exp(lnk).toFixed(9));
        const kPredict = parseFloat(Math.exp(lnkPredict).toFixed(9));

        // Menghitung month
        const month = ((stdReject - initValue) / k).toFixed();

        const absoluteMonth = Math.abs(month);

        // Menambahkan objek ke dalam array baru
        finalResult.push({
          tempC: tempC,
          tempK: tempK,
          perT: parseFloat(perT.toFixed(8)),
          lnk: parseFloat(lnk.toFixed(5)),
          k: k,
          month: parseFloat(absoluteMonth),
        });
        finalResultPredict.push({
          tempC: tempC,
          tempK: tempK,
          perT: parseFloat(perT.toFixed(8)),
          lnk: parseFloat(lnkPredict.toFixed(5)),
          k: kPredict,
          month: parseFloat(absoluteMonth),
        });
      });

      const value30 = x["30"].map((item, index) => {
        return {
          x: item,
          y: y["30"][index],
        };
      });
      const value40 = x["40"].map((item, index) => {
        return {
          x: item,
          y: y["40"][index],
        };
      });
      const value50 = x["50"].map((item, index) => {
        return {
          x: item,
          y: y["50"][index],
        };
      });

      const valueResult = resultArray.map((item) => {
        return {
          x: item.perT,
          y: item.lnX,
        };
      });

      const xResult = resultArray.map((item) => {
        return item.perT;
      });


      const regression30Deg = {
        slope: parseFloat(firstRegression30.slope.toFixed(4)),
        intercept: parseFloat(firstRegression30.intercept.toFixed(4)),
        operation: firstRegression30.toString().split("x")[2].split(" ")[1],
        value: firstRegression30.toString(),
        score: firstRegression30.score(x["30"], y["30"]).r2.toFixed(4),
      };
      const regression40Deg = {
        slope: parseFloat(firstRegression40.slope.toFixed(4)),
        intercept: parseFloat(firstRegression40.intercept.toFixed(4)),
        operation: firstRegression40.toString().split("x")[2].split(" ")[1],
        value: firstRegression40.toString(),
        score: firstRegression40.score(x["40"], y["40"]).r2.toFixed(4),
      };
      const regression50Deg = {
        slope: parseFloat(firstRegression50.slope.toFixed(4)),
        intercept: parseFloat(firstRegression50.intercept.toFixed(4)),
        operation: firstRegression50.toString().split("x")[2].split(" ")[1],
        value: firstRegression50.toString(),
        score: firstRegression50.score(x["50"], y["50"]).r2.toFixed(4),
      };
      const regressionResult = {
        slope: parseFloat(regressionRes.slope.toFixed(4)),
        intercept: parseFloat(regressionRes.intercept.toFixed(4)),
        operation: regressionRes.toString().split("x")[2].split(" ")[1],
        value: regressionRes.toString(),
        score: regressionRes.score(xres, yres).r2.toFixed(4),
      };

      function calculateLineRegression(data, regression) {
        return data.map((item) => {
          let result;
          if (regression.operation === "+") {
            result = regression.slope * item + regression.intercept;
          } else if (regression.operation === "-") {
            result =
              parseFloat(regression.slope.toFixed(4)) * item -
              parseFloat(regression.intercept.toFixed(4));
          } else {
            result = 0;
          }

          return {
            x: item,
            y: parseFloat(result.toFixed(3)),
          };
        });
      }

      const lineRegression30Deg = calculateLineRegression(
        x["30"],
        regression30Deg
      );
      const lineRegression40Deg = calculateLineRegression(
        x["40"],
        regression40Deg
      );
      const lineRegression50Deg = calculateLineRegression(
        x["50"],
        regression50Deg
      );
      const lineRegressionResult = calculateLineRegression(
        valueResult.map((item) => item.x),
        regressionResult
      );

      return res.json({
        lineRegression30Deg,
        lineRegression40Deg,
        lineRegression50Deg,
        lineRegressionResult,
        predict30,
        predict40,
        predict50,
        stdReject,
        value30,
        value40,
        value50,
        valueResult,
        x30: x["30"],
        y30: y["30"],
        x40: x["40"],
        y40: y["40"],
        x50: x["50"],
        y50: y["50"],
        xResult,
        regression30Deg,
        regression40Deg,
        regression50Deg,
        resultArray,
        regressionResult,
        schedule30,
        schedule40,
        schedule50,
        rawX30: rawX["30"],
        rawY30: rawY["30"],
        rawX40: rawX["40"],
        rawY40: rawY["40"],
        rawX50: rawX["50"],
        rawY50: rawY["50"],
        // lnKO,
        // eaR,
        // initValue,
        // stdReject,
        finalResult,
        finalResultPredict,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
