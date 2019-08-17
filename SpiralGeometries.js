THREE.SpiralGeometries = {

    mobius3d: function(u, v, target) {

        // volumetric mobius strip                                                                                                              
        u *= Math.PI;
        v *= 2 * Math.PI;

        u = u * 2;
        var phi = u / 2;
        var major = 2.25, a = 0.125, b = 0.65;
        var x, y, z;
        x = a * Math.cos(v) * Math.cos(phi) - b * Math.sin(v) * Math.sin(phi);
        z = a * Math.cos(v) * Math.sin(phi) + b * Math.sin(v) * Math.cos(phi);
        y = (major + x) * Math.sin(u);
        x = (major + x) * Math.cos(u);
        target.set(x, y, z);
    },

    mobius4d: function (major) {

      return function(u, v, target) {

        // volumetric mobius strip                                                                                                              
        u *= Math.PI;
        v *= 2 * Math.PI;

        u = u * 2;
        var phi = u / 2;
        var a = 0.125, b = 0.65;
        var x, y, z;
        x = a * Math.cos(v) * Math.cos(phi) - b * Math.sin(v) * Math.sin(phi);
        z = a * Math.cos(v) * Math.sin(phi) + b * Math.sin(v) * Math.cos(phi);
        y = (major + x) * Math.sin(u);
        x = (major + x) * Math.cos(u);
        target.set(x, y, z);
      };
    },

    seashell: function (genCurve, A, W, beta, whorls) {
        beta = beta * Math.PI/180;
        var z_high = A * Math.cos(beta);
        var z_low = A * Math.cos(beta) *  Math.pow(W, -whorls);
        var z_mid = (z_high - z_low) / 2; 

        return function(u, v, target) {
            u = u * 2 * Math.PI * whorls;
            v = v * 2 * Math.PI;

            var r_e = genCurve(v);
            var r_i = Math.pow(W, u / (2*Math.PI) - whorls);
            var R_e = r_e * r_i;
            var x =  A * Math.sin(beta) * Math.cos(u) * r_i;
            var y =  A * Math.sin(beta) * Math.sin(u) * r_i;
            var z = -A * Math.cos(beta) * r_i;
            var x_c = Math.cos(v) * Math.cos(u) * R_e;
            var y_c = Math.cos(v) * Math.sin(u) * R_e;
            var z_c = Math.sin(v) * R_e;
            x = x + x_c;
            y = y + y_c;
            z = z + z_c + z_mid;
            //console.log(z_mid);

            target.set(x, z, y);
        };
    }
};
