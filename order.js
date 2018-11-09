// The constructor for the orders
function Order(colour, pattern, shape) {
    this.colour = colour; // The colour of the plate
    this.pattern = pattern; // The pattern on the plate
    this.shape = shape; // The shape of the plate
}

// The draw method for the orders
Order.prototype.draw = function() {
    rectMode(CORNER);
    noStroke();
    fill(255, 242, 171);
    rect(130, 15, 140, 100); // Paper

    // Lines
    stroke(255, 145, 145);
    strokeWeight(1);
    line(145, 15, 145, 114); // Vertical line

    stroke(158, 158, 255);
    for (var x = 35; x < 115; x += 20) {
        line(130, x, 270, x); // Horizontal lines
    }

    // Text
    fill(0);
    textSize(20);
    text("Order:", 200, 28);

    textSize(15);
    text("Colour: " + this.colour, 200, 50); // Colour
    text("Pattern: " + this.pattern, 200, 70); // Pattern
    text("Shape: " + this.shape, 200, 90); // Shape
};

Order.prototype.generate = function() {
    // Colour
    var new_order_colour = random(0, 5);
    new_order_colour = floor(new_order_colour);
    if (new_order_colour === 0) {
        new_order_colour = "White";
    } else if (new_order_colour === 1) {
        new_order_colour = "Red";
    } else if (new_order_colour === 2) {
        new_order_colour = "Orange";
    } else if (new_order_colour === 3) {
        new_order_colour = "Yellow";
    } else if (new_order_colour === 4) {
        new_order_colour = "Blue";
    }
    this.colour = new_order_colour;

    // Pattern
    var new_order_pattern = random(0, 4);
    new_order_pattern = floor(new_order_pattern);
    if (new_order_pattern === 0) {
        new_order_pattern = "Plain";
    } else if (new_order_pattern === 1) {
        new_order_pattern = "Flower";
    } else if (new_order_pattern === 2) {
        new_order_pattern = "Star";
    } else if (new_order_pattern === 3) {
        new_order_pattern = "Spots";
    }
    this.pattern = new_order_pattern;

    // Shape
    var new_order_shape = random(0, 4);
    new_order_shape = floor(new_order_shape);
    if (new_order_shape === 0) {
        new_order_shape = "Circle";
    } else if (new_order_shape === 1) {
        new_order_shape = "Square";
    } else if (new_order_shape === 2) {
        new_order_shape = "Oval";
    } else if (new_order_shape === 3) {
        new_order_shape = "Rectangle";
    }
    this.shape = new_order_shape;
};
