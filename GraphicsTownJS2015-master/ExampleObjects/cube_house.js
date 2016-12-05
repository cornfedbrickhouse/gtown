/**
 * Created by ryan on 11/22/16.
 */
/**
 * Created by gleicher on 10/9/15.
 */
/*
 a second example object for graphics town
 check out "simplest" first

 the cube_house is more complicated since it is designed to allow making many cube_houses

 we make a constructor function that will make instances of cube_houses - each one gets
 added to the grobjects list

 we need to be a little bit careful to distinguish between different kinds of initialization
 1) there are the things that can be initialized when the function is first defined
 (load time)
 2) there are things that are defined to be shared by all cube_houses - these need to be defined
 by the first init (assuming that we require opengl to be ready)
 3) there are things that are to be defined for each cube_house instance
 */
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var cube_house = undefined;
var Spinningcube_house = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function () {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cube_houses - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for cube_houses
    cube_house = function cube_house(name, position, size, color) {
        this.name = name;
        this.position = position || [0, 0, 0];
        this.size = size || 1.0;
        this.color = color || [.7, .8, .9];
    };
    cube_house.prototype.init = function (drawingState) {
        var gl = drawingState.gl;
        // create the shaders once - for all cube_houses
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cube_house-vs", "cube_house-fs"]);
        }
        if (!buffers) {
            // verticies are grouped by triangle, triangles on the same plane are on the same row
            // the comment on the right side isn't the correct plane, but it does indicate xyz and sign correctly
            var arrays = {
                vpos: {
                    numComponents: 3, data: [
                        -1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 1.5, -1.0, 1.0, 1.5, -1.0, 1.0, 0.0, -1.0, -1.0, 1.5, -1.0, // z = -1
                        -1.0, 0.0, 1.0, 1.0, 0.0, 1.0, -1.0, 1.5, 1.0, 1.0, 1.5, 1.0, 1.0, 0.0, 1.0, -1.0, 1.5, 1.0, // z = 1
                        -1.0, 0.0, -1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, // y = 0
                        -1.0, 1.5, -1.0, 1.0, 1.5, -1.0, 1.0, 1.5, 1.0, -1.0, 1.5, 1.0, -1.0, 1.5, -1.0, 1.0, 1.5, 1.0, // y = 1.5
                        -1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 1.5, -1.0, -1.0, 1.5, 1.0, -1.0, 1.5, -1.0, -1.0, 0.0, 1.0, // x = -1
                        1.0, 0.0, -1.0, 1.0, 0.0, 1.0, 1.0, 1.5, -1.0, 1.0, 1.5, 1.0, 1.0, 1.5, -1.0, 1.0, 0.0, 1.0, // x = 1
                        0.0, 2.5, 0.0, 1.295, 1.205, 1.295, 1.295, 1.205, -1.295,
                        0.0, 2.5, 0.0, 1.295, 1.205, 1.295, -1.295, 1.205, 1.295,
                        0.0, 2.5, 0.0, -1.295, 1.205, -1.295, 1.295, 1.205, -1.295,
                        0.0, 2.5, 0.0, -1.295, 1.205, -1.295, -1.295, 1.205, 1.295
                    ]
                },
                vnormal: {
                    numComponents: 3, data: [
                        // I must need a normal for every time I pass in a vertex
                        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
                        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
                        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
                        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
                        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,

                        0, 1, 0, 1, 1, 1, 1, -1, 1,
                        0, 1, 0, 1, 1, 1, -1, 1, 1,
                        0, 1, 0, -1, -1, 1, 1, -1, 1,
                        0, 1, 0, -1, -1, 1, -1, 1, 1

                    ]
                }
            };
            //createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCapopt, bottomCapopt)
            // var cynarr = twgl.primitives.createCylinderVertices(0.2, 0.5, 3, 3, true, true);
            // var cynarr = twgl.primitives.createCylinderBufferInfo(drawingState.gl, 0.2, 0.5, 10, 10, true, true);
            // var cynarr = twgl.primitives.createCylinderBuffers(drawingState.gl, 0.2, 0.5, 10, 10, true, true);

            // console.log(cynarr);
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl, arrays);
            // console.log("cube_house arrays");
            // console.log(arrays);
            // console.log("cube_house buffers");
            // console.log(buffers);
        }

    };
    cube_house.prototype.draw = function (drawingState) {
        // we make a model matrix to place the cube_house in the world
        var modelM = twgl.m4.scaling([this.size, this.size, this.size]);
        twgl.m4.setTranslation(modelM, this.position, modelM);
        // the drawing code is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl, shaderProgram, buffers);
        twgl.setUniforms(shaderProgram, {
            view: drawingState.view, proj: drawingState.proj, lightdir: drawingState.sunDirection,
            cube_housecolor: this.color, model: modelM
        });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    cube_house.prototype.center = function (drawingState) {
        return this.position;
    };


    ////////
    // constructor for cube_houses
    Spinningcube_house = function Spinningcube_house(name, position, size, color, axis) {
        cube_house.apply(this, arguments);
        this.axis = axis || 'X';
    };
    Spinningcube_house.prototype = Object.create(cube_house.prototype);
    Spinningcube_house.prototype.draw = function (drawingState) {
        // we make a model matrix to place the cube_house in the world
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
            cube_housecolor: this.color, model: modelM
        });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Spinningcube_house.prototype.center = function (drawingState) {
        return this.position;
    }


})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cube_houses, just don't load this file.
grobjects.push(new cube_house("cube_house1", [-4, 0.0, 0], 1));
grobjects.push(new cube_house("cube_house2", [4, 0.0, 0], 1, [1, 1, 0]));
grobjects.push(new cube_house("cube_house3", [0, 0.0, -4], 1, [0, 1, 1]));
grobjects.push(new cube_house("cube_house4", [0, 0.0, 4], 1));
//
// grobjects.push(new cube_house("cube_house5",[ 4, 0.5, -2],1 , [1,1,1]));


// grobjects.push(new Spinningcube_house("scube_house 1",[-2,0.5, -2],1) );
// grobjects.push(new Spinningcube_house("scube_house 2",[-2,0.5,  2],1,  [1,0,0], 'Y'));
// grobjects.push(new Spinningcube_house("scube_house 3",[ 2,0.5, -2],1 , [0,0,1], 'Z'));
// grobjects.push(new Spinningcube_house("scube_house 4",[ 2,0.5,  2],1));

// grobjects.push(new Spinningcube_house("scube_house 5",[ 2,0.5, -2],1 , [0,0,1], 'Y'));
