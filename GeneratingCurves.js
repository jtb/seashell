function ellipse(a, b) {
    return function(s) {
        return Math.pow(Math.pow(Math.cos(s) / a, 2) + Math.pow(Math.sin(s) / b, 2), -0.5);
    };
}
