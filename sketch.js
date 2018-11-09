/**
Started on:
    Thursday, March 30, 2017
Finished on:
    Saturday, April 8, 2017

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Inspired by Chester Banks' "Scoop it!"

Credit to "Noble Mushtak" for the oval button collision checker function

Leader Board:
    1. IndianaJonesJR - 24
    2. Chloe - 15
    3. Nija - 12

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

This is my third official game, and my second one to use OOP.
**/

/**VARIABLES**/
let scene, play, how_to, back, time_left, timer, timer_colour, beep, background_colour, stripe_colour, moving, stripeX, stripeSpeed, plates_done;
let colours, patterns, shapes, colour_selected_string, colour_selected, pattern_selected, shape_selected, star_img;
let order_colour, order_pattern, order_shape, alarm_scaling, alarm_size, bottom_plate_x, bottom_plate_y, top_plate_x, top_plate_y;
let white_choice, red_choice, orange_choice, yellow_choice, blue_choice, none_pattern_choice, dotted_pattern_choice, dashed_pattern_choice, striped_pattern_choice;
let circle_choice, square_choice, oval_choice, rectangle_choice;
let clicked, order;

function preload() {
	star_img = loadImage("https://sphaericactus.github.io/Plateformer/assets/star.png"); // A star image for one of the patterns
	beep = loadSound("https://sphaericactus.github.io/Plateformer/assets/beep.mp3"); // The sound that the timer makes when it hits five and under
}

function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES);

	// You know what this is for
	scene = "menu";

	// The colour of the play button
	play = color(0);

	// The colour of the how button
	how_to = color(0);

	// The colour of the back button
	back = color(0);

	// For the timer
	time_left = 60; // How much time you have left (in seconds)
	timer = 100; // Leave this alone
	timer_colour = color(0); // The colour of the timer

	// For the background
	background_colour = color(141, 189, 199); // The background colour
	stripe_colour = color(123, 217, 205); // The colour of the stripes

	moving = true; // Are the stripes moving?
	stripeX = 0; // The x position of the stripes
	stripeSpeed = 0.5; // The speed of the stripes

	// Game variables
	plates_done = 0; // How many plates you did correctly

	colours = [color(255), color(255, 0, 0), color(255, 153, 0), color(255, 255, 0), color(0, 0, 255)]; // An array of possible plate colours
	patterns = ["Plain", "Flower", "Star", "Spots"]; // An array of possible plate patterns
	shapes = ["Circle", "Square", "Oval", "Rectangle"]; // An array of possible plate shapes

	colour_selected_string = "White";
	colour_selected = colours[0]; // Which colour you have selected
	pattern_selected = "Plain"; // Which pattern you have selected
	shape_selected = "Circle"; // Which shape you have selected

	// For the orders
	order_colour = "Orange";
	order_pattern = patterns[3];
	order_shape = shapes[3];

	// End variables
	alarm_scaling = "out"; // Which way the alarm clock is scaling in
	alarm_size = 40; // The size of the alarm clock
	bottom_plate_x = 200; // The x coordinate of the bottom plate
	bottom_plate_y = 282; // The y coordinate of the bottom plate
	top_plate_x = 200; // The x coordinate of the top plate
	top_plate_y = 201; // The y coordinate of the top plate

	/* The choices */
	white_choice = new choice("colour", color(255), "", "", 50, 70, "White");
	red_choice = new choice("colour", color(255, 0, 0), "", "", 50, 95, "Red");
	orange_choice = new choice("colour", color(255, 153, 0), "", "", 50, 120, "Orange");
	yellow_choice = new choice("colour", color(255, 255, 0), "", "", 50, 145, "Yellow");
	blue_choice = new choice("colour", color(0, 0, 255), "", "", 50, 170, "Blue");

	none_pattern_choice = new choice("pattern", "", "Plain", "", 50, 265);
	dotted_pattern_choice = new choice("pattern", "", "Flower", "", 50, 295);
	dashed_pattern_choice = new choice("pattern", "", "Star", "", 50, 325);
	striped_pattern_choice = new choice("pattern", "", "Spots", "", 50, 355);

	circle_choice = new choice("shape", "", "", "Circle", 350, 75);
	square_choice = new choice("shape", "", "", "Square", 350, 105);
	oval_choice = new choice("shape", "", "", "Oval", 350, 135);
	rectangle_choice = new choice("shape", "", "", "Rectangle", 350, 165);

	order = new Order(order_colour, order_pattern, order_shape);

	textAlign(CENTER, CENTER); // Align the text

	clicked = false;
}

/*******************************************************************************************/

// Mouse clicky stuff
function mouseClicked() {
    clicked = true;
}

/* Functions for objects */
function choice_plate(x, y, pattern) {
    stroke(0);
    strokeWeight(1);
    fill(255);
    ellipse(x, y, 27, 27); // Draw it

    // Check if the mouse clicked it
    if (dist(mouseX, mouseY, x, y) <= 27/2 && clicked) {
        pattern_selected = pattern;
    }
}

function plain(x, y) {
    fill(0);
    textSize(10);
	noStroke();
    text("Plain", x, y);
}

function flower(x, y, size) {
    fill(255, 255, 0);
    strokeWeight(1);
    stroke(0);
    ellipse(x, y, size/4, size/4); // Center

    // Petals
    fill(0, 157, 255);
    // Up, down, left, and right petals
    ellipse(x, y - size/4, size/4, size/4); // Up
    ellipse(x + size/4, y, size/4, size/4); // Right
    ellipse(x, y + size/4, size/4, size/4); // Down
    ellipse(x -size/4, y, size/4, size/4); // Left

    // Diagonal petals
    ellipse(x - size/6, y - size/5, size/4, size/4);
    ellipse(x + size/6, y - size/5, size/4, size/4); // Right
    ellipse(x + size/6, y + size/5, size/4, size/4); // Down
    ellipse(x - size/6, y + size/5, size/4, size/4); // Left
}

function spots(x, y, size) {
    noStroke();
    fill(0, 255, 174);
    // First row
    ellipse(x - size/6, y - size/3, size/9, size/9); // Left
    ellipse(x + size/6, y - size/3, size/9, size/9); // Right

    // Second row
    ellipse(x - size/3, y, size/9, size/9); // Left
    ellipse(x, y, size/9, size/9); // Middle
    ellipse(x + size/3, y, size/9, size/9); // Right

    // Third row
    ellipse(x - size/6, y + size/3, size/9, size/9); // Left
    ellipse(x + size/6, y + size/3, size/9, size/9); // Right
}

function circle_plate() {
    stroke(0);
    strokeWeight(1);
    fill(255);
    ellipse(350, 75, 27, 27); // Draw it

    // Check if the mouse clicked it
    if (dist(mouseX, mouseY, 350, 75) <= 27/2 && clicked) {
        shape_selected = "Circle";
    }
}

function square_plate() {
    rectMode(CENTER);
    stroke(0);
    strokeWeight(1);
    fill(255);
    rect(350, 105, 27, 27); // Draw it

    // Check if the mouse clicked it
    if (mouseX >= (350 - 27/2) && mouseX <= (350 + 27/2) && mouseY >= (105 - 27/2) && mouseY <= (105 + 27/2) && clicked) {
        shape_selected = "Square";
    }
}

function oval_plate() {
    stroke(0);
    strokeWeight(1);
    fill(255);
    ellipse(350, 135, 36, 27);

    // Check if the mouse clicked it (credit to "Noble Mushtak")
    var b = sqrt(pow(36/2, 2) - pow(27/2, 2));
    if (dist(mouseX, mouseY, 350 - b, 135) + dist(mouseX, mouseY, 350 + b, 135) < 36 && clicked) {
        shape_selected = "Oval";
    }
}

function rect_plate() {
    rectMode(CENTER);
    stroke(0);
    strokeWeight(1);
    fill(255);
    rect(350, 165, 36, 27); // Draw it

    // Check if the mouse clicked it
    if (mouseX >= (350 - 36/2) && mouseX <= (350 + 36/2) && mouseY >= (165 - 27/2) && mouseY <= (165 + 27/2) && clicked) {
        shape_selected = "Rectangle";
    }
}

/**FUNCTIONS**/

// A function to restart the restart the program
function restartProgram() {
	// You know what this is for
	scene = "menu";

	// For the timer
	time_left = 60; // How much time you have left (in seconds)
	timer = 100; // Leave this alone

	moving = true; // Are the stripes moving?
	stripeX = 0; // The x position of the stripes

	// Game variables
	plates_done = 0; // How many plates you did correctly

	// For the orders
	order_colour = "Orange";
	order_pattern = patterns[3];
	order_shape = shapes[3];

	// End variables
	alarm_scaling = "out"; // Which way the alarm clock is scaling in
	alarm_size = 40; // The size of the alarm clock

	order = new Order(order_colour, order_pattern, order_shape);
}

// A function to draw the cool striped background
function stripe_background() {
    rectMode(CORNER);
    background(background_colour);

    // Draw the stripes
    for (var i = -500; i < 550; i += 40) {
        fill(stripe_colour);
        noStroke();
        push();
            rotate(45);
            translate(stripeX, -345);
            rect(i, 0, 20, 800);
        pop();

        // Check to see if the stripe has gone off the screen, and if it has, bring it back to the start
        if (stripeX > 500) {
            stripeX = -5;
        }
    }

    // Animate the stripes
    if (moving) {
        stripeX += stripeSpeed;
    }
}

// A function to draw the alarm clock
function alarm_clock(size, x, y) {
    stroke(133, 0, 0);
    strokeWeight(size/8);
    fill(255, 248, 168);
    ellipse(x, y, size, size); // Clock face

    // Hands
    stroke(0);
    line(x, y, x, y - size/4); // Up hand
    line(x, y, x + size/6, y + size/6); // Right hand

    // Bells
    fill(255, 242, 0);
    noStroke();
    arc(x + size/2.4, y - size/2.7, size/2, size/2, -133, 47); // Right bell
    arc(x - size/2.4, y - size/2.7, size/2, size/2, 133, 312); // Left bell

    // Bell tips
    stroke(255, 213, 0);
    point(x + size/1.6, y - size/1.8); // Right bell tip
    point(x - size/1.6, y - size/1.8); // Left bell tip

    // Legs
    noStroke();
    fill(255, 252, 176);
    arc(x - size/3.4, y + size/2, size/4, size/2, 12, 200); // Left leg
    arc(x + size/3.4, y + size/2, size/4, size/2, -23, 166); // Right leg
}

// A function to draw the plate
function plate(x, y) {
    strokeWeight(1);
    fill(colour_selected);
    if (shape_selected === "Rectangle" || shape_selected === "Square") {
        rectMode(CENTER);
        if (shape_selected === "Square") {
            rect(200, 200, 150, 150);
        } else {
            rect(200, 200, 200, 150);
        }
    } else if (shape_selected === "Circle") {
        ellipse(200, 200, 150, 150);
    } else if (shape_selected === "Oval") {
        ellipse(200, 200, 200, 150);
    }

    switch (pattern_selected) {
        case "Flower":
            flower(200, 200, 150, 150);
            break;
        case "Star":
            image(star_img, 150, 150, 100, 100);
            break;
        case "Spots":
            spots(200, 200, 150, 150);
    }
}

// A function to draw the plate for the end scene
function end_plate(x, y) {
    strokeWeight(1);
    stroke(0, 94, 255);
    fill(122, 220, 255);
    quad(x - 26, y + 18, x + 26, y + 18, x + 13, y + 25, x - 13, y + 25); // Bottom
    ellipse(x, y, 100, 40); // Main part
    ellipse(x, y, 50, 18); // Inside
}

// A function to draw the end scene
function end() {
    moving = false;
    stripe_background();

    fill(0);
    textSize(50);
    text("Time's up!", 200, 60); // Title

    alarm_clock(alarm_size, 200, 130); // Draw the alarm clock

    // Animate the alarm clock
    if(alarm_size === 40) {
        alarm_size += 0.5;
        alarm_scaling = "out";
    } else if(alarm_size !== 60 && alarm_size !== 40 && alarm_scaling === "out") {
        alarm_size += 0.5;
    } else if(alarm_size !== 60 && alarm_size !== 40 && alarm_scaling === "in") {
        alarm_size -= 0.5;
    } else if(alarm_size === 60) {
        alarm_size -= 0.5;
        alarm_scaling = "in";
    }

    // Draw the bottom plate
    push();
        rotate(-140);
        translate(-516, -182);
        end_plate(bottom_plate_x, bottom_plate_y);
    pop();

    // Draw the top plate
    push();
        rotate(140);
        translate(-182, -352);
        end_plate(top_plate_x, top_plate_y);
    pop();

    // Your score
    fill(0);
    text("Your score: " + plates_done, 200, 205);

    // Other text
    textSize(20);
    text("If you want to play again, click anywhere.", 200, 300);

    if (clicked) {
        restartProgram();
    }
}

// A function to draw the timer
function counter() {
    if (time_left !== 0) {
        fill(timer_colour);
        textSize(50);
        text(time_left, 345, 350);
    }

    timer --;

    if (time_left <= 0) {
        scene = "end";
    } else if (timer % 75 === 0) {
        time_left --;
    }

    if (time_left <= 5) {
        timer_colour = color(255, 0, 0);
    }

    if ((time_left <= 5 && time_left !== 0) && timer % 75 === 0) {
        beep.play();
    }
}

// A function to draw the colour choices
function draw_colours() {
    rectMode(CORNER);
    // Colours
    fill(0);
    textSize(20);
    text("Colours:", 50, 40);

    stroke(141, 189, 199);
    strokeWeight(2);
    line(20, 55, 80, 55); // Separator

    // Draw the colour choices
    white_choice.draw();
    red_choice.draw();
    yellow_choice.draw();
    orange_choice.draw();
    blue_choice.draw();
}

// A function to draw the pattern choices
function draw_patterns() {
    // Patterns
    fill(0);
    textSize(20);
    text("Patterns:", 50, 230);

    stroke(141, 189, 199);
    strokeWeight(2);
    line(20, 245, 80, 245); // Separator

    // Draw the pattern choices
    none_pattern_choice.draw();
    dotted_pattern_choice.draw();
    dashed_pattern_choice.draw();
    striped_pattern_choice.draw();
}

// A function to draw the shape choices
function draw_shapes() {
    fill(0);
    textSize(20);
    text("Shapes:", 350, 40);

    stroke(141, 189, 199);
    strokeWeight(2);
    line(320, 55, 380, 55); // Separator

    // Draw the shape choices
    circle_choice.draw();
    square_choice.draw();
    oval_choice.draw();
    rectangle_choice.draw();
}

function menu() {
    moving = true; // Make the stripes move
    stripe_background(); // Draw the background

    fill(0);

    textSize(15);
    text("Welcome to", 55, 58); // Small text

    textSize(48);
    text("The Plateformer!", 200, 90); // Title!

    textSize(50);

    // Play button
    text("GO!", 200, 180); // Text

    noStroke();
    fill(255, 255, 0);
    ellipse(213, 179, 29, 30); // Yellow circle

    fill(play);
    triangle(208, 170, 226, 179, 208, 188); // Triangle part

    // How button
    fill(0);
    text("HOW?", 200, 260); // Text

    noStroke();
    fill(255, 255, 0);
    ellipse(181, 259, 28, 30); // Yellow circle

    textSize(33);
    fill(how_to);
    text("?", 180, 260); // Other text

    // If your mouse goes over the play button
    if (dist(mouseX, mouseY, 215, 181) <= 30/2) {
        // If you click on the play button
        if (clicked) {
            scene = "game";
        } else {
            play = color(107);
        }
    } else {
        play = color(0);
    }

    // If your mouse goes over the how button
    if (dist(mouseX, mouseY, 179, 261) <= 30/2) {
        // If you click on the how button
        if (clicked) {
            scene = "how";
        } else {
            how_to = color(107);
        }
    } else {
        how_to = color(0);
    }

    // Top left plate
    push();
        rotate(142);
        translate(-156, -375);
        end_plate(200, 200);
    pop();

    // Bottom left plate
    push();
        rotate(35);
        translate(51, 21);
        end_plate(200, 200);
    pop();

    // Top right plate
    push();
        rotate(216);
        translate(-564, -137);
        end_plate(200, 200);
    pop();

    // Bottom right plate
    push();
        rotate(330);
        translate(-87, 245);
        end_plate(200, 200);
    pop();
}

function how() {
    moving = false; // Make the stripes stop moving
    stripe_background(); // Draw the background

    fill(0);
    textSize(48);
    text("How?", 200, 40); // Title

    textSize(18);
    text("This is a simple game where you try\nto design as many plates as you can\nin one minute. There are three different\nthings you can use to design the plate.\nThe colour, the pattern, and the shape.\nThe timer will be on the right, with the\nshape, and the colour and pattern will\nbe on the left. People's plates that they\nordered will appear at the top. Your number\nof finished plates will be at the bottom.\nHave fun!", 200, 230); // How to

	fill(255, 255, 0);
    noStroke();
    ellipse(60, 47, 14, 10); // Yellow circle

    // Back button
    textSize(35);
	fill(back);
    text("Back", 65, 40); // Text

    textSize(10);
    text("🠈", 59, 48); // Arrow

    // If your mouse goes over the back button
    if (dist(mouseX, mouseY, 54.5, 43.5) <= 14/2) {
        // If you click on the back button
        if (clicked) {
            scene = "menu";
        } else {
            back = color(107);
        }
    } else {
        back = color(0);
    }
}

function game() {
    background(255); // Let's not make the background too complicated

    // Two panels
    rectMode(CORNER);
    noStroke();
    fill(123, 217, 205);
    rect(0, 0, 100, 400); // Left
    rect(300, 0, 150, 400); // Right

    // Draw the colour choices
    draw_colours();

    stroke(141, 189, 199);
    line(10, 210, 90, 210); // Separator

    // Draw the patterns
    draw_patterns();

    // Draw the shapes
    draw_shapes();

    // Draw the order
    if (colour_selected_string == order.colour && pattern_selected == order.pattern && shape_selected == order.shape) {
        plates_done ++;
        shape_selected = "Circle";
        colour_selected = color(255);
        colour_selected_string = "White";
        pattern_selected = "Plain";
        order.generate();
        order.draw();
    } else {
        order.draw();
    }

    // Draw the order line
    strokeWeight(1);
    stroke(0);
    line(0, 15, 400, 15);

    // Draw the number of finished plates
    fill(0);
    textSize(50);
    text(plates_done, 200, 350);

    // Draw the plate!
    plate();

    // Draw the timer
    alarm_clock(40, 350, 290);
    counter();
}

function draw() {
    switch (scene) {
        case "menu":
            menu();
            break;
        case "how":
            how();
            break;
        case "game":
            game();
            break;
        case "end":
            end();
    }

    clicked = false;
}
