var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const rateLimit = require("express-rate-limit");

app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//==========================================================================================================================
// ROUTES
//==========================================================================================================================
app.get("/api/", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send("Hello there!");
});
//==========================================================================================================================
// POST Request "SUM"
//==========================================================================================================================
app.post("/api/sum", function (req, res) {
    var data = req.body;
    var sumInit = parseFloat(0);
    var problematicInput = [];
    var output = {
        success: false,
        error: null,
        stack: null,
        result: 0
    }
    console.log("====================================")
    console.log("Mikos tou entry data: " + data.length)
    console.log("====================================")
    console.log("Type of entry data:   " + typeof data)
    console.log("====================================")
    console.log("Entry data: " + data);
    console.log("====================================")

    sumOfNumbersInArray();

    function sumOfNumbersInArray() {

        for (var i = 0; i < data.length; i++) {
            var dataNum = parseFloat(data[i])
            console.log("=================================================================");
            console.log("DataNum's type is a " + typeof dataNum + ". And this time has the value: " + dataNum);
            console.log("=================================================================");
            if (Number.isNaN(dataNum)) {
                problematicInput.push(data[i]);
            }
            sumInit = sumInit + dataNum;
        }
        if (isNaN(sumInit)) {
            output.success = false;
            output.error = "Value/s: " + "'" + problematicInput + "'" + " cannot be converted to a number.";
            output.stack = "Please, make sure you only provide numbers as an input";
            res.setHeader('Content-Type', 'application/json');
            res.send(output);
        } else {
            output.success = true;
            output.result = sumInit;
            res.setHeader('Content-Type', 'application/json');
            res.send(output);
            return sumInit;
        }
    };
});
//==========================================================================================================================
// POST Request "Square Root"
//==========================================================================================================================
app.post("/api/sqrt", function (req, res) {
    var data = req.body;
    var squaredNumber = [];
    var problematicInput = [];
    var output = {
        success: false,
        error: null,
        stack: null,
        result: []
    }
    console.log("====================================")
    console.log("Mikos tou entry data: " + data.length)
    console.log("====================================")
    console.log("Type of entry data:   " + typeof data)
    console.log("====================================")
    console.log("Entry data: " + data);
    console.log("====================================")

    sqrtOfNumbersInArray();

    function sqrtOfNumbersInArray() {

        for (var i = 0; i < data.length; i++) {
            var dataNum = parseFloat(data[i])
            console.log("=================================================================");
            console.log("DataNum's type is a " + typeof dataNum + ". And this time has the value: " + dataNum);
            console.log("=================================================================");
            if (Number.isNaN(dataNum)) {
                problematicInput.push(data[i]);
                var unsuccessfulConversion = true;
            }

            output.result.push(Math.sqrt(dataNum));
        }
        if (unsuccessfulConversion) {
            output.success = false;
            output.error = "Value/s: " + "'" + problematicInput + "'" + " cannot be converted to a number.";
            output.stack = "Please, make sure you only provide numbers as an input";
            output.result = [];
            res.setHeader('Content-Type', 'application/json');
            res.send(output);
        } else {
            output.success = true;
            res.setHeader('Content-Type', 'application/json');
            res.send(output);

        }
    };
});
//==========================================================================================================================
// POST Request "contained"
//==========================================================================================================================
app.post("/api/contained", function (req, res) {
    var input = {
        testees: [],
        subject: toString
    }

    input.testees = req.body.testees;
    input.subject = req.body.subject;

    var output = {
        success: false,
        error: null,
        stack: null,
        result: false
    }
    console.log("Type: " + typeof input.testees + ", Value: " + input.testees + ", Length: " + input.testees.length)
    console.log("Type: " + typeof input.subject + ", Value: " + input.subject)

    let flag = true;

    const [set1, set2] = input.testees; // Destruct both sets.

    function checkSet(charsSet) {
        const chars = charsSet.split('');
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i].toLowerCase();
            if (!input.subject.toLowerCase().includes(char)) {
                flag = false;
                break;
            }
        }
    }

    checkSet(set1);
    if (flag == false) {
        res.setHeader('Content-Type', 'application/json');
        res.send(output);
    } else {
        checkSet(set2, set1.length);
        if (flag) {
            output.success = true;
            output.result = true;
            res.setHeader('Content-Type', 'application/json');
            res.send(output);
            // Both sets are contained inside the third set.
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(output);
            // One or more of the sets is not contained inside the third set.
        }
    }

});
//==========================================================================================================================
// POST Request "ACRONYM"
//==========================================================================================================================
app.post("/api/acronym", function (req, res) {
    var data = req.body;
    var output = {
        success: false,
        error: null,
        stack: null,
        result: false
    }

    function acronymn() {

    }
    acronymn();
});



//==========================================================================================================================
// Listen to the right port
//==========================================================================================================================
app.listen(3000, function () {
    console.log("====================================")
    console.log("Server has started!");
});