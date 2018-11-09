// The constructor for the choices
var choice = function(type, colour, pattern, shape, x, y, colour_string) {
    this.type = type; // What type the order is
	if (this.type == "colour") {
		this.colour_string = colour_string;
	}

    // If the type is colour, pattern, or shape
    if (this.type === "colour") {
        this.colour = colour;
    } else if (this.type === "pattern") {
        this.pattern = pattern;
    } else {
        this.shape = shape;
    }

    this.x = x; // X coordinate
    this.y = y; // Y coordinate
};

// The draw method for the choices
choice.prototype.draw = function() {
    fill(0);
    textSize(20);

    if (this.type === "colour") {
        if (colour_selected !== this.colour) {
            noStroke();
        } else {
            strokeWeight(3);
            stroke(135);
        }
        fill(this.colour);
        rect(this.x - 10, this.y - 10, 20, 20); // Draw it

        // Check to see if the mouse clicked it
        if (mouseX >= (this.x - 10) && mouseX <= (this.x + 10) && mouseY >= (this.y - 10) && mouseY <= (this.y + 10) && clicked) {
            colour_selected = this.colour;
			colour_selected_string = this.colour_string
            // if (colour_selected === colours[0]) {
            //     colour_selected_string = "White";
			// 	console.log(colour_selected_string);
            // } else if (colour_selected === colours[1]) {
            //     colour_selected_string = "Red";
			// 	console.log(colour_selected_string);
            // } else if (colour_selected === colours[2]) {
            //     colour_selected_string = "Orange";
			// 	console.log(colour_selected_string);
            // } else if (colour_selected === colours[3]) {
            //     colour_selected_string = "Yellow";
			// 	console.log(colour_selected_string);
            // } else if (colour_selected === colours[4]) {
            //     colour_selected_string = "Blue";
			// 	console.log(colour_selected_string);
            // }
        }
    } else if (this.type === "pattern") {
        choice_plate(this.x, this.y, this.pattern);
        if (pattern_selected === this.pattern) {
            strokeWeight(2);
            stroke(255, 105, 133);
            line(this.x + 17, this.y + 10, this.x + 17, this.y - 10);
        }

        switch (this.pattern) {
            case "Plain":
                plain(this.x, this.y);
                break;
            case "Flower":
                flower(this.x, this.y, 25);
                break;
            case "Star":
                image(star_img, this.x - 12, this.y - 14, 25, 25);
                break;
            case "Spots":
                spots(this.x, this.y, 27);
        }
    } else {
        if (shape_selected === this.shape) {
            strokeWeight(2);
            stroke(255, 105, 133);
            line(this.x + 25, this.y + 10, this.x + 25, this.y - 10);
        }

        switch (this.shape) {
            case "Circle":
                circle_plate();
                break;
            case "Square":
                square_plate();
                break;
            case "Oval":
                oval_plate();
                break;
            case "Rectangle":
                rect_plate();
        }
    }
};
