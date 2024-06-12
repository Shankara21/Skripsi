const { Op } = require("sequelize");
const fs = require("fs");
const {
  Event,
  ProductDescription,
  DataStability,
  Product,
  Variant,
  Schedule,
  Timeline,
  Temperature,
  Section,
  EmailUser,
  LogError,
} = require("../models");
const nodemailer = require("nodemailer");
const path = require("path");
const moment = require("moment");
const request = require("request");
const { promisify } = require("util");
const cheerio = require("cheerio");
const readDirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

module.exports = {
  index: async (req, res) => {
    try {
      const events = await Event.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: DataStability,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: ProductDescription,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: Product,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                  {
                    model: Variant,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  show: async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: DataStability,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: ProductDescription,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: Product,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                  {
                    model: Variant,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
          {
            model: Schedule,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Timeline,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Temperature,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
      });
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  weeklyEvent: async (req, res) => {
    try {
      // count event status "Not Yet" and "Done" in this week

      const events = await Event.findAll({
        where: {
          date: {
            // monthly
            [Op.between]: [
              moment().startOf("month").format("YYYY-MM-DD"),
              moment().endOf("month").format("YYYY-MM-DD"),
            ],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      let notYet = 0;
      let done = 0;
      events.forEach((event) => {
        if (event.status === "Not Yet") {
          notYet++;
        } else {
          done++;
        }
      });

      res.status(200).json({ notYet, done });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  findNextChecking: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findOne({
        order: [["date", "ASC"]],
        where: {
          dataStabilityId: id,
          status: "Not Yet",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Schedule,
            include: [
              {
                model: Timeline,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Temperature,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
      });
      res.status(200).json(event);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  emailReminder: async (req, res) => {
    try {
      let today = moment().format("YYYY-MM-DD");
      const eventToday = await Event.findAll({
        where: {
          date: today,
        },
      });
      if (eventToday.length) {
        const findEvent = await Event.findAll({
          where: {
            date: {
              [Op.lte]: today,
            },
            status: "Not Yet",
          },
          include: [
            {
              model: DataStability,
              include: [
                {
                  model: ProductDescription,
                  include: [
                    {
                      model: Product,
                    },
                    {
                      model: Variant,
                    },
                  ],
                },
                {
                  model: Section,
                },
              ],
            },
            {
              model: Schedule,
              include: [
                {
                  model: Timeline,
                },
                {
                  model: Temperature,
                },
              ],
            },
          ],
        });

        const eventLists = {};

        // filter event by date
        findEvent.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });

        const promises = findEvent.map(async (event) => {
          const sectionName = event.DataStability.Section.code;
          const sectionId = event.DataStability.Section.id;
          if (!eventLists[sectionName]) {
            eventLists[sectionName] = {
              event: [],
            };
          }
          const findEmail = await EmailUser.findAll({
            where: {
              sectionId,
            },
          });
          eventLists[sectionName].event.push(event);
          eventLists[sectionName].email = findEmail;
        });

        let dataRmd, dataPmd, dataPsd, dataPjd;

        try {
          await Promise.all(promises);
          function createEventData(item, today) {
            return {
              sku: `${item.DataStability.ProductDescription.Product.name} ${item.DataStability.ProductDescription.Variant.name}`,
              devBg: item.DataStability.description,
              lotNumber: item.DataStability.lotNumber,
              checkingPeriod: `${item.Schedule.Timeline.time} ${item.Schedule.Temperature.value}`,
              checkingDate: item.date,
              status: item.date === today ? "Now" : "Not Yet",
            };
          }

          function createEventDataObject(eventList, today) {
            return {
              emails:
                eventList && eventList.email
                  ? eventList.email.map((item) => item)
                  : [],
              events:
                eventList && eventList.event
                  ? eventList.event.map((item) => createEventData(item, today))
                  : [],
            };
          }

          dataRmd = createEventDataObject(eventLists.RMD, today);
          dataPmd = createEventDataObject(eventLists.PMD, today);
          dataPsd = createEventDataObject(eventLists.PSD, today);
          dataPjd = createEventDataObject(eventLists.PJD, today);

          let transporter = nodemailer.createTransport({
            // service: 'gmail',
            host: "mail.aio.co.id",
            port: 587,
            secure: false,
            auth: {
              user: "appskjy@aio.co.id",
              pass: "Plicakjy1234",
            },
            from: "appskjy@aio.co.id",
          });
          let fileDir = path.join(__dirname, "../views/emailReminder.html");
          let template = fs.readFileSync(fileDir, "utf8");
          let templateText = [];
          try {
            function sendEmail(data, location) {
              if (data.events.length) {
                const templateText = data.events
                  .map(
                    (event) => `
        <tr>
          <td>${event.sku}</td>
          <td>${event.devBg}</td>
          <td>${event.lotNumber}</td>
          <td>${event.checkingPeriod}</td>
          <td>${event.checkingDate}</td>
          <td>${event.status}</td>
        </tr>`
                  )
                  .join("");

                let emailHtml = template.replace("{{ data }}", templateText);

                data.emails.forEach(async (item) => {
                  const { name, email } = item;
                  const message = {
                    from: "appskjy@aio.co.id",
                    to: email,
                    subject: "Stability Test Reminder",
                    html: emailHtml.replace("{{ pic }}", name),
                  };
                  try {
                    await transporter.sendMail(message);
                  } catch (error) {
                    LogError.create({
                      name: error.message,
                      // location: `Inner Catch | ${location}`,
                    });
                  }
                });
              }
            }
            // return res.json(dataRmd)

            sendEmail(dataRmd, "RMD");
            sendEmail(dataPmd, "PMD");
            sendEmail(dataPsd, "PSD");
            sendEmail(dataPjd, "PJD");
          } catch (error) {
            LogError.create({
              name: error.message,
              // location: "Outer Catch",
            });
          }
          // return res.json({
          //   dataRmd,
          //   dataPmd,
          //   dataPsd,
          //   dataPjd,
          // });
        } catch (error) {
          console.error("Error:", error);
        }
        res.json({
          message: "Email sent",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  monitoringByProduct: async (req, res) => {
    try {
      const findDataStability = await DataStability.findAll({
        include: [
          {
            model: ProductDescription,
            include: [
              {
                model: Product,
              },
              {
                model: Variant,
              },
            ],
          },
          {
            model: Event,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Schedule,
              },
            ],
          },
        ],
      });
      let soyjoy = [];
      let psiw = [];
      let ps = [];
      let newProduct = [];
      findDataStability.forEach((data) => {
        if (data.productId === 1) {
          soyjoy.push(data);
        } else if (data.productId === 2) {
          ps.push(data);
        } else if (data.productId === 3) {
          psiw.push(data);
        } else {
          newProduct.push(data);
        }
      });

      // Soyjoy
      soyjoy.forEach((data) => {
        let tempInitialData = [];
        let temp30 = [];
        let temp40 = [];
        let temp50 = [];
        data.Events.forEach((event) => {
          if (
            event.Schedule.temperatureId === 1 &&
            event.Schedule.timelineId != 1
          ) {
            temp30.push(event);
          } else if (
            event.Schedule.temperatureId === 2 &&
            event.Schedule.timelineId != 1
          ) {
            temp40.push(event);
          } else if (
            event.Schedule.temperatureId === 3 &&
            event.Schedule.timelineId != 1
          ) {
            temp50.push(event);
          } else if (event.description.includes("initial")) {
            if (tempInitialData.length < 1) tempInitialData.push(event);
          }
        });
        data.dataValues.schedule = [
          ...tempInitialData,
          ...temp50,
          ...temp40,
          ...temp30,
        ];
      });

      // PS
      ps.forEach((data) => {
        let tempInitialData = [];
        let temp30 = [];
        let temp40 = [];
        let temp50 = [];
        data.Events.forEach((event) => {
          if (
            event.Schedule.temperatureId === 1 &&
            event.Schedule.timelineId != 1
          ) {
            temp30.push(event);
          } else if (
            event.Schedule.temperatureId === 2 &&
            event.Schedule.timelineId != 1
          ) {
            temp40.push(event);
          } else if (
            event.Schedule.temperatureId === 3 &&
            event.Schedule.timelineId != 1
          ) {
            temp50.push(event);
          } else if (event.description.includes("initial")) {
            if (tempInitialData.length < 1) tempInitialData.push(event);
          }
        });
        data.dataValues.schedule = [
          ...tempInitialData,
          ...temp50,
          ...temp40,
          ...temp30,
        ];
      });
      // return res.json(ps);
      // PSIW
      psiw.forEach((data) => {
        let tempInitialData = [];
        let temp30 = [];
        let temp40 = [];
        let temp50 = [];
        data.Events.forEach((event) => {
          if (
            event.Schedule.temperatureId === 1 &&
            event.Schedule.timelineId != 1
          ) {
            temp30.push(event);
          } else if (
            event.Schedule.temperatureId === 2 &&
            event.Schedule.timelineId != 1
          ) {
            temp40.push(event);
          } else if (
            event.Schedule.temperatureId === 3 &&
            event.Schedule.timelineId != 1
          ) {
            temp50.push(event);
          } else if (event.description.includes("initial")) {
            if (tempInitialData.length < 1) tempInitialData.push(event);
          }
        });
        data.dataValues.schedule = [
          ...tempInitialData,
          ...temp50,
          ...temp40,
          ...temp30,
        ];
      });

      // New Product
      newProduct.forEach((data) => {
        let tempInitialData = [];
        let temp30 = [];
        let temp40 = [];
        let temp50 = [];
        data.Events.forEach((event) => {
          if (
            event.Schedule.temperatureId === 1 &&
            event.Schedule.timelineId != 1
          ) {
            temp30.push(event);
          } else if (
            event.Schedule.temperatureId === 2 &&
            event.Schedule.timelineId != 1
          ) {
            temp40.push(event);
          } else if (
            event.Schedule.temperatureId === 3 &&
            event.Schedule.timelineId != 1
          ) {
            temp50.push(event);
          } else if (event.description.includes("initial")) {
            if (tempInitialData.length < 1) tempInitialData.push(event);
          }
        });
        data.dataValues.schedule = [
          ...tempInitialData,
          ...temp50,
          ...temp40,
          ...temp30,
        ];
      });

      return res.status(200).json({
        soyjoy,
        psiw,
        ps,
        newProduct,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: error,
      });
    }
  },
  getHolidays: async (req, res) => {
    try {
      const { year } = req.params;
      request("https://www.tanggalan.com/" + year, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          const data = [];

          $("article ul").each((i, ul) => {
            const $ul = $(ul);
            const Tahun = $ul.find("li b").eq(0).text();
            const strBulan = $ul.find("li a").eq(0).text();
            const cleanedStr = strBulan.replace(/\d+/g, "");

            const mapBulan = {
              januari: "01",
              februari: "02",
              maret: "03",
              april: "04",
              mei: "05",
              juni: "06",
              juli: "07",
              agustus: "08",
              september: "09",
              oktober: "10",
              november: "11",
              desember: "12",
            };

            const Bulan = cleanedStr.toLowerCase().trim();
            const kodeBulan = mapBulan[Bulan];

            $ul
              .find("li")
              .eq(3)
              .find("tbody tr")
              .each((i, tr) => {
                const $tr = $(tr);
                const namaHariLibur = $tr.find("td").eq(1).text();
                const tanggal = $tr.find("td").eq(0).text();
                if (tanggal.includes("-")) {
                  const date = tanggal.split("-");
                  const start = parseInt(date[0]);
                  const end = parseInt(date[1]);

                  for (let i = start; i <= end; i++) {
                    data.push({
                      tanggal: Tahun + "-" + kodeBulan + "-" + i,
                      keterangan: namaHariLibur,
                      cuti: namaHariLibur.includes("Cuti"),
                    });
                  }
                } else {
                  data.push({
                    tanggal: Tahun + "-" + kodeBulan + "-" + tanggal,
                    keterangan: namaHariLibur,
                    cuti: namaHariLibur.includes("Cuti"),
                  });
                }
              });
          });

          // const dataJson = JSON.stringify(data);
          // const filename = `${year}.json`;
          // const foldername = "public/holidays";
          // if (!fs.existsSync(foldername)) fs.mkdirSync(foldername);
          // fs.writeFile(`${foldername}/${filename}`, dataJson, (err) => {
          //   if (err) throw err;
          // });
          res.json({
            message: "success",
            data: data,
          });
        } else {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
      return res.json({
        message: error.message,
      });
    }
  },
};
