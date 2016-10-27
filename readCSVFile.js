/*
var csv = require('csv');

var CSV = csv();

CSV.from.path('/Users/Zuriel/Downloads/maridaje.csv').to.array(function(data){
	console.log(data);
});
*/
/*
var fs          = require('fs');
var csv = require("fast-csv");
var stream = fs.createReadStream("/Users/Zuriel/Downloads/maridaje.csv");
 
var csvStream = csv()
    .on("data", function(data){
         console.log(data);
    })
    .on("end", function(){
         console.log("done");
    });
 
stream.pipe(csvStream);
*/

/*
var csv = require("fast-csv");
var fs 	= require("fs");

var stream = fs.createReadStream("/Users/Zuriel/Downloads/maridaje.csv");
csv
  .fromStream(stream, {ignoreEmpty: true})
  .on("data", function(data){
  	console.log(data);
  })
  .on("end",function(){
  	console.log("done");
  });
*/

/*

As ShanShan mentioned you can leverage an external library for this in a real project, but I've made some modifications to your code that should do what you want in case you're doing this as a learning experience.

I've tried to keep the code roughly the same. There are two major changes. First, rather than construct a string with the content I'm creating an object that stores the data that you're interested in for each row. Because this object is on a per-row level, this is in the outer loop that handles rows. Second, I'm stripping out the first and last character of the header and value text (the quotes). Because you're interepreting the CSV as a string and splitting based on that, it still contains the quotes. In the real world you might want to extract this with a regex or a replace function, but I tried to keep it simple so it uses substring instead.

The code below:

var fs = require("fs");

var data = fs.readFileSync('test.csv');
var stringData=data.toString();

console.log(stringData);
var arrayOne= stringData.split('\r\n');

var header=arrayOne[0].split(',');
var noOfRow=arrayOne.length;
var noOfCol=header.length;

var jArray=[];

var i=0,j=0;
for (i = 1; i < noOfRow-1; i++) {

    var obj = {};
    var myNewLine=arrayOne[i].split(',');

    for (j = 0; j< noOfCol; j++) {
        var headerText = header[j].substring(1,header[j].length-1);
        var valueText = myNewLine[j].substring(1,myNewLine[j].length-1);
        obj[headerText] = valueText;
    };
    jArray.push(obj);
};

console.log( jArray);

// another way to convert csv to json
https://www.npmjs.com/package/csvtojson

*/

var fs = require("fs");

var data = fs.readFileSync("./data/maridaje2.csv");
var stringData = data.toString();



console.log(stringData);