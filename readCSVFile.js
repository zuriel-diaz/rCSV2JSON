var fs = require("fs");

var data = fs.readFileSync("./data/input.csv");
var temp_data = data.toString();
var data= temp_data.split('\r\n');


var character_position = "";
var foods = "";
var base_string = "";
var beer_data = [];
var temp_data = {};
var response = [];
// begin on position number one, because 0 is for header row
for(position = 1; position < (data.length); position++){

	character_position = (data[position]).indexOf('"');

	if( character_position !== -1 && character_position >= 0 ){
	
		base_string = data[position].substring(0,character_position);
		// check if we need to remove the last character
		if(base_string.charAt( (base_string.length)-1 ) == ","){
			base_string = base_string.substring(0,(base_string.length)-1);
		}

		foods = data[position].substring(character_position);
		foods = foods.replace(/\"/gi,"");
		foods = foods.replace(/\'/gi,'"');
	}

	// check if base_string is not empty

	if(base_string){
		beer_data = base_string.split(",");
		temp_data["beer_name"] = beer_data[0];
		temp_data["beer_name_cleaned"] = beer_data[1];
		temp_data["beer_img_url"] = beer_data[2];
		temp_data["foods"] = JSON.parse("["+foods+"]");
	}

	// add 'temp_data' to response
	response.push(temp_data);
}

//console.log(JSON.stringify(response));

// check if file exists, then remove it!
fs.unlink('./data/maridaje.json', (err) => {
	if(err) return console.log(err);
	console.log('successfully deleted "./data/maridaje.json".');
})

fs.writeFile('./data/maridaje.json', JSON.stringify(response), function (err) {
  if (err) return console.log(err);
  console.log('file has been created.');
});






