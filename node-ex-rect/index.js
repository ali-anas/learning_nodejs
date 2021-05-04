var rect = require("./rectangle");

function solve(l,b) {
    console.log("l: " + l + " b: " + b);

    rect(l, b, (err, rectangle) => {
        if(err) {
            console.log("ERROR: " + err.message);
        } else {
            console.log("Perimeter with l: " + l + " b: " + b + " is: " + rectangle.perimeter());
            console.log("Area with l: " + l + " b: " + b + " is: " + rectangle.area());
        }
    });
}

solve(2,4);
solve(3,5);
solve(0, 5);
solve(-2, 4);