/**
 * Created by ryan on 11/23/16.
 */
/**
 * Created by ryan on 11/22/16.
 */
/**
 * Created by gleicher on 10/9/15.
 */
/*
 a second example object for graphics town
 check out "simplest" first

 the long_house is more complicated since it is designed to allow making many long_houses

 we make a constructor function that will make instances of long_houses - each one gets
 added to the grobjects list

 we need to be a little bit careful to distinguish between different kinds of initialization
 1) there are the things that can be initialized when the function is first defined
 (load time)
 2) there are things that are defined to be shared by all long_houses - these need to be defined
 by the first init (assuming that we require opengl to be ready)
 3) there are things that are to be defined for each long_house instance
 */
// var LoadedOBJFiles = [];
// OBJLoader.load("resources/long_house_blender_export.obj", function (long_house_arrs){
//do things with wolf
// LoadedOBJFiles = long_house_arrs;
// console.log(long_house_arrs);
// });
// var lh_arrs = document.getElementById("lhouse_obj");
// console.log(lh_arrs["long_house_arrs"]);

// var me = document.querySelector('script[src="//example.com/embed.js"]');
// var Long_house_blender_export = LoadedOBJFiles["long_house_blender_export.obj"];
// var gLong_house_blender_export = Long_house_blender_export.groups["long_house_blender_export"];
// for(var i = 0;i < gWolf.faces.length;i++){
//     var face = gWolf.faces[i];
//     console.log(face);//all the faces in wolf model!.
// }

// console.log(OBJLoader.createJSString);
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var long_house = undefined;
var Spinninglong_house = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function () {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all long_houses - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;
    //todo
    function setbuffers(buffers, buffers_init) {
        buffers = buffers_init;
    }

    // constructor for long_houses
    long_house = function long_house(name, position, size, color) {
        this.name = name;
        this.position = position || [0, 0, 0];
        this.size = size || 1.0;
        this.color = color || [.7, .8, .9];
    };
    long_house.prototype.init = function (drawingState) {
        console.log(secret_message);
        var gl = drawingState.gl;
        // create the shaders once - for all long_houses
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["long_house-vs", "long_house-fs"]);
        }
        if (!buffers) {
            var arrays;
            // parameter is a (anonymous?)closure
            var loader_inst = OBJLoader.load("resources/long_house_blender_export.obj", function (wolf) {
                console.log("long_house wolf");
                console.log(wolf);
                console.log("long_house OBJLoader");
                console.log(OBJLoader);
                var vertices = wolf.vertices;
                console.log("o verts");
                console.log(vertices);
                var normals = wolf.normals;
                console.log("o normals");
                console.log(normals);
                var groups = wolf.groups;
                console.log("groups");
                console.log(groups);
                var long_house = wolf.groups.long_house;
                console.log("wolf groups long_house");
                console.log(long_house);
                var faces = wolf.groups.long_house.faces;
                console.log("long_house wolf groups long_house faces");
                console.log(faces);
                var gverts = wolf.groups.long_house.vertices;
                console.log("gverts");
                console.log(gverts);
                var gnormals = wolf.groups.long_house.normals;
                console.log("gnormals");
                console.log(gnormals);

                var verts_ungrouped = [];
                var normals_ungrouped = [];
                var faces_ungrouped = [];
                var count = 0;
                //todo change sources to gverts, gnormals
                //arrays without groupings
                for (var r = 0; r < vertices.length; r++) {
                    for (var s = 0; s < 3; s++) {
                        verts_ungrouped[count] = vertices[r][s];
                        count++;
                    }
                }
                count = 0;
                for (var t = 0; t < normals.length; t++) {
                    for (var u = 0; u < 3; u++) {
                        normals_ungrouped[count] = normals[t][u];
                        count++;
                    }
                }
                count = 0;
                for (var v = 0; v < faces.length; v++) {
                    for (var w = 0; w < 3; w++) {
                        for (var a = 0; a < 3; a++) {
                            faces_ungrouped[count] = faces[v][w][a];
                            count++;
                        }
                    }
                }
                console.log("ungrouped verts");
                console.log(verts_ungrouped);
                console.log("ungrouped normals");
                console.log(normals_ungrouped);
                console.log("ungrouped faces (indices?)");
                console.log(faces_ungrouped);

                arrays = {
                    vpos: {numComponents: 3, data: verts_ungrouped},
                    vnormal: {numComponents: 3, data: normals_ungrouped},
                    indices: {numComponents: 3, data: faces_ungrouped}
                };

                console.log("arrays inside thing");
                console.log(arrays);

                //todo
                // undoing this in hopes buffers stays constant, otherwise should move this stuff into function
                var buffers_init;
                buffers_init = twgl.createBufferInfoFromArrays(drawingState.gl, arrays);
                this.getbuffers = function () {
                    return buffers_init;
                };
                console.log("buffers inside draw and loader");
                console.log(buffers_init);
            });
        }
    };
    // had to move buffers stuff from init here so OBJLoader would allow access
    // todo can I access OBJLoader like a var?
    long_house.prototype.draw = function (drawingState) {
        // we make a model matrix to place the long_house in the world
        var modelM = twgl.m4.scaling([this.size, this.size, this.size]);
        twgl.m4.setTranslation(modelM, this.position, modelM);
        // the drawing code is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl, shaderProgram, buffers);
        twgl.setUniforms(shaderProgram, {
            view: drawingState.view, proj: drawingState.proj, lightdir: drawingState.sunDirection,
            long_housecolor: this.color, model: modelM
        });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    long_house.prototype.center = function (drawingState) {
        return this.position;
    };


    ////////
    // constructor for long_houses
    Spinninglong_house = function Spinninglong_house(name, position, size, color, axis) {
        long_house.apply(this, arguments);
        this.axis = axis || 'X';
    };
    Spinninglong_house.prototype = Object.create(long_house.prototype);
    Spinninglong_house.prototype.draw = function (drawingState) {
        // we make a model matrix to place the long_house in the world
        var modelM = twgl.m4.scaling([this.size, this.size, this.size]);
        var theta = Number(drawingState.realtime) / 200.0;
        if (this.axis == 'X') {
            twgl.m4.rotateX(modelM, theta, modelM);
        } else if (this.axis == 'Z') {
            twgl.m4.rotateZ(modelM, theta, modelM);
        } else {
            twgl.m4.rotateY(modelM, theta, modelM);
        }
        twgl.m4.setTranslation(modelM, this.position, modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl, shaderProgram, buffers);
        twgl.setUniforms(shaderProgram, {
            view: drawingState.view, proj: drawingState.proj, lightdir: drawingState.sunDirection,
            long_housecolor: this.color, model: modelM
        });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Spinninglong_house.prototype.center = function (drawingState) {
        return this.position;
    }


})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of long_houses, just don't load this file.
grobjects.push(new long_house("long_house1", [-4, 0.0, 0], 1));
grobjects.push(new long_house("long_house2", [4, 0.0, 0], 1, [1, 1, 0]));
grobjects.push(new long_house("long_house3", [0, 0.0, -4], 1, [0, 1, 1]));
grobjects.push(new long_house("long_house4", [0, 0.0, 4], 1));
//
// grobjects.push(new long_house("long_house5",[ 4, 0.5, -2],1 , [1,1,1]));

// grobjects.push(new Spinninglong_house("slong_house 1",[-2,0.5, -2],1) );
// grobjects.push(new Spinninglong_house("slong_house 2",[-2,0.5,  2],1,  [1,0,0], 'Y'));
// grobjects.push(new Spinninglong_house("slong_house 3",[ 2,0.5, -2],1 , [0,0,1], 'Z'));
// grobjects.push(new Spinninglong_house("slong_house 4",[ 2,0.5,  2],1));

// grobjects.push(new Spinninglong_house("slong_house 5",[ 2,0.5, -2],1 , [0,0,1], 'Y'));
