const express = require("express");
const cors = require("cors");
const { Employee } = require("./models");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/employees", async (req, res, next) => {
  const employee = await Employee.findAll();
  res.status(200).send(employee);
});

app.post("/employees", async (req, res, next) => {
  const { name, email, mobile, birthdate, address } = req.body;

  await Employee.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  }).then(async function (val) {
    const date = new Date();
    const [month, year] = [
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1,
      date.getFullYear(),
    ];
    const formatId = `${year.toString()[2]}${year.toString()[3]}${
      month.toString()[0]
    }${month.toString()[1]}`;
    let formatUserId = "";
    if (val.length == 0) {
      formatUserId = parseInt(`${formatId}0001`);
    } else {
      if (val[0].userId.toString().slice(0, 4) === formatId) {
        formatUserId = val[0].userId + 1;
      } else {
        formatUserId = parseInt(`${formatId}0001`);
      }
    }

    await Employee.create({
      userId: formatUserId,
      name,
      email,
      mobile,
      birthdate,
      address: [address],
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((val) => {
      res.status(200).send(val);
    });
  });
});

app.put("/employees", async (req, res, next) => {
  const { userId, name, email, mobile, birthdate, address } = req.body;

  await Employee.update(
    {
      userId,
      name,
      email,
      mobile,
      birthdate,
      address: [address],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { where: { userId } }
  ).then((val) => {
    res.status(200).send(val);
  });
});

app.delete("/employees/:id", async (req, res, next) => {
  await Employee.destroy({ where: { userId: req.params.id } }).then((val) => {
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
