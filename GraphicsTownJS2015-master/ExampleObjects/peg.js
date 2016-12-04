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

 the peg is more complicated since it is designed to allow making many pegs

 we make a constructor function that will make instances of pegs - each one gets
 added to the grobjects list

 we need to be a little bit careful to distinguish between different kinds of initialization
 1) there are the things that can be initialized when the function is first defined
 (load time)
 2) there are things that are defined to be shared by all pegs - these need to be defined
 by the first init (assuming that we require opengl to be ready)
 3) there are things that are to be defined for each peg instance
 */
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var peg = undefined;
var Spinningpeg = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function () {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all pegs - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for pegs
    peg = function peg(name, position, size, color) {
        this.name = name;
        this.position = position || [0, 0, 0];
        this.size = size || 1.0;
        this.color = color || [.7, .8, .9];
    }
    peg.prototype.init = function (drawingState) {
        var gl = drawingState.gl;
        // create the shaders once - for all pegs
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["peg-vs", "peg-fs"]);
        }
        if (!buffers) {
            // verticies are grouped by triangle, triangles on the same plane are on the same row
            // the comment on the right side isn't the correct plane, but it does indicate xyz and sign correctly
            var arrays;
            var arrays0 = {
                startpos: {
                    numComponents: 3, data: [
                        0.000000, 0.000000, -0.125000,
                        0.000000, 0.500000, -0.125000,
                        0.024386, 0.000000, -0.122598,
                        0.024386, 0.500000, -0.122598,
                        0.047835, 0.000000, -0.115485,
                        0.047835, 0.500000, -0.115485,
                        0.069446, 0.000000, -0.103934,
                        0.069446, 0.500000, -0.103934,
                        0.088388, 0.000000, -0.088388,
                        0.088388, 0.500000, -0.088388,
                        0.103934, 0.000000, -0.069446,
                        0.103934, 0.500000, -0.069446,
                        0.115485, 0.000000, -0.047835,
                        0.115485, 0.500000, -0.047835,
                        0.122598, 0.000000, -0.024386,
                        0.122598, 0.500000, -0.024386,
                        0.125000, 0.000000, 0.000000,
                        0.125000, 0.500000, 0.000000,
                        0.122598, 0.000000, 0.024386,
                        0.122598, 0.500000, 0.024386,
                        0.115485, 0.000000, 0.047835,
                        0.115485, 0.500000, 0.047835,
                        0.103934, 0.000000, 0.069446,
                        0.103934, 0.500000, 0.069446,
                        0.088388, 0.000000, 0.088388,
                        0.088388, 0.500000, 0.088388,
                        0.069446, 0.000000, 0.103934,
                        0.069446, 0.500000, 0.103934,
                        0.047835, 0.000000, 0.115485,
                        0.047835, 0.500000, 0.115485,
                        0.024386, 0.000000, 0.122598,
                        0.024386, 0.500000, 0.122598,
                        0.000000, 0.000000, 0.125000,
                        0.000000, 0.500000, 0.125000,
                        -0.024386, 0.000000, 0.122598,
                        -0.024386, 0.500000, 0.122598,
                        -0.047835, 0.000000, 0.115485,
                        -0.047835, 0.500000, 0.115485,
                        -0.069446, 0.000000, 0.103934,
                        -0.069446, 0.500000, 0.103934,
                        -0.088388, 0.000000, 0.088388,
                        -0.088388, 0.500000, 0.088388,
                        -0.103934, 0.000000, 0.069446,
                        -0.103934, 0.500000, 0.069446,
                        -0.115485, 0.000000, 0.047835,
                        -0.115485, 0.500000, 0.047835,
                        -0.122598, 0.000000, 0.024386,
                        -0.122598, 0.500000, 0.024386,
                        -0.125000, 0.000000, 0.000000,
                        -0.125000, 0.500000, 0.000000,
                        -0.122598, 0.000000, -0.024386,
                        -0.122598, 0.500000, -0.024386,
                        -0.115485, 0.000000, -0.047836,
                        -0.115485, 0.500000, -0.047836,
                        -0.103934, 0.000000, -0.069446,
                        -0.103934, 0.500000, -0.069446,
                        -0.088388, 0.000000, -0.088388,
                        -0.088388, 0.500000, -0.088388,
                        -0.069446, 0.000000, -0.103934,
                        -0.069446, 0.500000, -0.103934,
                        -0.047835, 0.000000, -0.115485,
                        -0.047835, 0.500000, -0.115485,
                        -0.024386, 0.000000, -0.122598,
                        -0.024386, 0.500000, -0.122598
                    ]
                },
                fnormal: {
                    numComponents: 3, data: [
                        0.0980, 0.0000, -0.9952,
                        0.2903, 0.0000, -0.9569,
                        0.4714, 0.0000, -0.8819,
                        0.6344, 0.0000, -0.7730,
                        0.7730, 0.0000, -0.6344,
                        0.8819, 0.0000, -0.4714,
                        0.9569, 0.0000, -0.2903,
                        0.9952, 0.0000, -0.0980,
                        0.9952, 0.0000, 0.0980,
                        0.9569, 0.0000, 0.2903,
                        0.8819, 0.0000, 0.4714,
                        0.7730, 0.0000, 0.6344,
                        0.6344, 0.0000, 0.7730,
                        0.4714, 0.0000, 0.8819,
                        0.2903, 0.0000, 0.9569,
                        0.0980, 0.0000, 0.9952,
                        -0.0980, 0.0000, 0.9952,
                        -0.2903, 0.0000, 0.9569,
                        -0.4714, 0.0000, 0.8819,
                        -0.6344, 0.0000, 0.7730,
                        -0.7730, 0.0000, 0.6344,
                        -0.8819, 0.0000, 0.4714,
                        -0.9569, 0.0000, 0.2903,
                        -0.9952, 0.0000, 0.0980,
                        -0.9952, 0.0000, -0.0980,
                        -0.9569, 0.0000, -0.2903,
                        -0.8819, 0.0000, -0.4714,
                        -0.7730, 0.0000, -0.6344,
                        -0.6344, 0.0000, -0.7730,
                        -0.4714, 0.0000, -0.8819,
                        0.0000, 1.0000, 0.0000,
                        -0.2903, 0.0000, -0.9569,
                        -0.0980, 0.0000, -0.9952,
                        0.0000, -1.0000, 0.0000
                    ]
                },
                /*indices : earcut([0.000000, 0.000000, -0.125000,
                 0.000000 ,0.500000 ,-0.125000,
                 0.024386 ,0.000000 ,-0.122598,
                 0.024386 ,0.500000 ,-0.122598,
                 0.047835 ,0.000000 ,-0.115485,
                 0.047835 ,0.500000 ,-0.115485,
                 0.069446 ,0.000000 ,-0.103934,
                 0.069446 ,0.500000 ,-0.103934,
                 0.088388 ,0.000000 ,-0.088388,
                 0.088388 ,0.500000 ,-0.088388,
                 0.103934 ,0.000000 ,-0.069446,
                 0.103934 ,0.500000 ,-0.069446,
                 0.115485 ,0.000000 ,-0.047835,
                 0.115485 ,0.500000 ,-0.047835,
                 0.122598 ,0.000000 ,-0.024386,
                 0.122598 ,0.500000 ,-0.024386,
                 0.125000 ,0.000000 ,0.000000,
                 0.125000 ,0.500000 ,0.000000,
                 0.122598 ,0.000000 ,0.024386,
                 0.122598 ,0.500000 ,0.024386,
                 0.115485 ,0.000000 ,0.047835,
                 0.115485 ,0.500000 ,0.047835,
                 0.103934 ,0.000000 ,0.069446,
                 0.103934 ,0.500000 ,0.069446,
                 0.088388 ,0.000000 ,0.088388,
                 0.088388 ,0.500000 ,0.088388,
                 0.069446 ,0.000000 ,0.103934,
                 0.069446 ,0.500000 ,0.103934,
                 0.047835 ,0.000000 ,0.115485,
                 0.047835 ,0.500000 ,0.115485,
                 0.024386 ,0.000000 ,0.122598,
                 0.024386 ,0.500000 ,0.122598,
                 0.000000, 0.000000, 0.125000,
                 0.000000, 0.500000, 0.125000,
                 -0.024386, 0.000000, 0.122598,
                 -0.024386, 0.500000, 0.122598,
                 -0.047835, 0.000000, 0.115485,
                 -0.047835, 0.500000, 0.115485,
                 -0.069446, 0.000000, 0.103934,
                 -0.069446, 0.500000, 0.103934,
                 -0.088388, 0.000000, 0.088388,
                 -0.088388, 0.500000, 0.088388,
                 -0.103934, 0.000000, 0.069446,
                 -0.103934, 0.500000, 0.069446,
                 -0.115485, 0.000000, 0.047835,
                 -0.115485, 0.500000, 0.047835,
                 -0.122598, 0.000000, 0.024386,
                 -0.122598, 0.500000, 0.024386,
                 -0.125000, 0.000000, 0.000000,
                 -0.125000, 0.500000, 0.000000,
                 -0.122598, 0.000000, -0.024386,
                 -0.122598, 0.500000, -0.024386,
                 -0.115485, 0.000000, -0.047836,
                 -0.115485, 0.500000, -0.047836,
                 -0.103934, 0.000000, -0.069446,
                 -0.103934, 0.500000, -0.069446,
                 -0.088388, 0.000000, -0.088388,
                 -0.088388, 0.500000, -0.088388,
                 -0.069446, 0.000000, -0.103934,
                 -0.069446, 0.500000, -0.103934,
                 -0.047835, 0.000000, -0.115485,
                 -0.047835, 0.500000, -0.115485,
                 -0.024386, 0.000000, -0.122598,
                 -0.024386, 0.500000, -0.122598],null,3)*/
                indices: [
                    2, 1, 3, 1, 1, 1,
                    4, 2, 5, 2, 3, 2,
                    6, 3, 7, 3, 5, 3,
                    8, 4, 9, 4, 7, 4,
                    10, 5, 11, 5, 9, 5,
                    12, 6, 13, 6, 11, 6,
                    14, 7, 15, 7, 13, 7,
                    16, 8, 17, 8, 15, 8,
                    18, 9, 19, 9, 17, 9,
                    20, 10, 21, 10, 19, 10,
                    22, 11, 23, 11, 21, 11,
                    24, 12, 25, 12, 23, 12,
                    26, 13, 27, 13, 25, 13,
                    28, 14, 29, 14, 27, 14,
                    30, 15, 31, 15, 29, 15,
                    32, 16, 33, 16, 31, 16,
                    34, 17, 35, 17, 33, 17,
                    36, 18, 37, 18, 35, 18,
                    38, 19, 39, 19, 37, 19,
                    40, 20, 41, 20, 39, 20,
                    42, 21, 43, 21, 41, 21,
                    44, 22, 45, 22, 43, 22,
                    46, 23, 47, 23, 45, 23,
                    48, 24, 49, 24, 47, 24,
                    50, 25, 51, 25, 49, 25,
                    52, 26, 53, 26, 51, 26,
                    54, 27, 55, 27, 53, 27,
                    56, 28, 57, 28, 55, 28,
                    58, 29, 59, 29, 57, 29,
                    60, 30, 61, 30, 59, 30,
                    30, 31, 22, 31, 6, 31,
                    62, 32, 63, 32, 61, 32,
                    64, 33, 1, 33, 63, 33,
                    31, 34, 47, 34, 15, 34,
                    2, 1, 4, 1, 3, 1,
                    4, 2, 6, 2, 5, 2,
                    6, 3, 8, 3, 7, 3,
                    8, 4, 10, 4, 9, 4,
                    10, 5, 12, 5, 11, 5,
                    12, 6, 14, 6, 13, 6,
                    14, 7, 16, 7, 15, 7,
                    16, 8, 18, 8, 17, 8,
                    18, 9, 20, 9, 19, 9,
                    20, 10, 22, 10, 21, 10,
                    22, 11, 24, 11, 23, 11,
                    24, 12, 26, 12, 25, 12,
                    26, 13, 28, 13, 27, 13,
                    28, 14, 30, 14, 29, 14,
                    30, 15, 32, 15, 31, 15,
                    32, 16, 34, 16, 33, 16,
                    34, 17, 36, 17, 35, 17,
                    36, 18, 38, 18, 37, 18,
                    38, 19, 40, 19, 39, 19,
                    40, 20, 42, 20, 41, 20,
                    42, 21, 44, 21, 43, 21,
                    44, 22, 46, 22, 45, 22,
                    46, 23, 48, 23, 47, 23,
                    48, 24, 50, 24, 49, 24,
                    50, 25, 52, 25, 51, 25,
                    52, 26, 54, 26, 53, 26,
                    54, 27, 56, 27, 55, 27,
                    56, 28, 58, 28, 57, 28,
                    58, 29, 60, 29, 59, 29,
                    60, 30, 62, 30, 61, 30,
                    6, 31, 4, 31, 2, 31,
                    2, 31, 64, 31, 6, 31,
                    62, 31, 60, 31, 58, 31,
                    58, 31, 56, 31, 54, 31,
                    54, 31, 52, 31, 50, 31,
                    50, 31, 48, 31, 54, 31,
                    46, 31, 44, 31, 38, 31,
                    42, 31, 40, 31, 38, 31,
                    38, 31, 36, 31, 34, 31,
                    34, 31, 32, 31, 38, 31,
                    30, 31, 28, 31, 26, 31,
                    26, 31, 24, 31, 22, 31,
                    22, 31, 20, 31, 18, 31,
                    18, 31, 16, 31, 22, 31,
                    14, 31, 12, 31, 10, 31,
                    10, 31, 8, 31, 14, 31,
                    6, 31, 64, 31, 62, 31,
                    62, 31, 58, 31, 54, 31,
                    54, 31, 48, 31, 46, 31,
                    44, 31, 42, 31, 38, 31,
                    38, 31, 32, 31, 30, 31,
                    30, 31, 26, 31, 22, 31,
                    22, 31, 16, 31, 14, 31,
                    14, 31, 8, 31, 6, 31,
                    6, 31, 62, 31, 54, 31,
                    54, 31, 46, 31, 38, 31,
                    38, 31, 30, 31, 6, 31,
                    22, 31, 14, 31, 6, 31,
                    6, 31, 54, 31, 38, 31,
                    62, 32, 64, 32, 63, 32,
                    64, 33, 2, 33, 1, 33,
                    63, 34, 1, 34, 3, 34,
                    3, 34, 5, 34, 7, 34,
                    7, 34, 9, 34, 11, 34,
                    11, 34, 13, 34, 7, 34,
                    15, 34, 17, 34, 19, 34,
                    19, 34, 21, 34, 15, 34,
                    23, 34, 25, 34, 31, 34,
                    27, 34, 29, 34, 31, 34,
                    31, 34, 33, 34, 35, 34,
                    35, 34, 37, 34, 39, 34,
                    39, 34, 41, 34, 43, 34,
                    43, 34, 45, 34, 47, 34,
                    47, 34, 49, 34, 51, 34,
                    51, 34, 53, 34, 55, 34,
                    55, 34, 57, 34, 63, 34,
                    59, 34, 61, 34, 63, 34,
                    63, 34, 3, 34, 15, 34,
                    7, 34, 13, 34, 15, 34,
                    15, 34, 21, 34, 23, 34,
                    25, 34, 27, 34, 31, 34,
                    31, 34, 35, 34, 47, 34,
                    39, 34, 43, 34, 47, 34,
                    47, 34, 51, 34, 63, 34,
                    57, 34, 59, 34, 63, 34,
                    3, 34, 7, 34, 15, 34,
                    15, 34, 23, 34, 31, 34,
                    35, 34, 39, 34, 47, 34,
                    51, 34, 55, 34, 63, 34,
                    63, 34, 15, 34, 47, 34
                ]
            };
            // console.log(arrays0.indices);
            // for(var q = 0;q<34;q++){   //for each face
            //     // var face = faces[q];
            //     for(var r = 0;r < 3;r++){ //for each vertex r was 64
            //         // var indices = face[r];
            //         var vertex = arrays0[indices[0]] //get the vertex (indices[0] is position index)
            //         for(var s = 0;s < 3;s++){//for x, y, z in that vertex
            //             sum[s] += vertex[s]; //add to sum
            //         }
            //         c++;
            //     }
            //
            // }

            var vndata = [];
            // var e = 2;
            // var o = 3;
            var s1 = 0;
            var s2 = 1;
            var count = 6;
            // var count = 0;
            //0
            var c0;
            vndata[0] = arrays0.fnormal.data[(33 * 3)] + arrays0.fnormal.data[(32 * 3)] + arrays0.fnormal.data[(0 * 3)];
            c0 = (1) % 3;
            vndata[1] = arrays0.fnormal.data[(33 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0] + arrays0.fnormal.data[(0 * 3) + c0];
            c0 = (c0 + 1) % 3;
            vndata[2] = arrays0.fnormal.data[(33 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0] + arrays0.fnormal.data[(0 * 3) + c0];
            c0 = (c0 + 1) % 3;
            //1
            vndata[3] = arrays0.fnormal.data[(30 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0] + arrays0.fnormal.data[0];
            c0 = (c0 + 1) % 3;
            vndata[4] = arrays0.fnormal.data[(30 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0] + arrays0.fnormal.data[0];
            c0 = (c0 + 1) % 3;
            vndata[5] = arrays0.fnormal.data[(30 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0] + arrays0.fnormal.data[0];
            c0 = (c0 + 1) % 3;
            // for (var t = 0; t<(vdata.length)/3;t++) {
            for (var t = 2; t < 60; t++) {
                // if (t > 1 && t < 60) {
                if (t % 2 === 0) {
                    for (var vin = 0; vin < 3; vin++) {
                        vndata[count + vin] = arrays0.fnormal.data[(33 * 3) + c0] +
                            arrays0.fnormal.data[(s1 * 3) + c0] + arrays0.fnormal.data[(s2 * 3) + c0];
                        c0 = (c0 + 1) % 3;
                    }
                } else {
                    for (var vin = 0; vin < 3; vin++) {
                        vndata[count + vin] = (arrays0.fnormal.data[(30 * 3) + c0] +
                        arrays0.fnormal.data[(s1 * 3) + c0] + arrays0.fnormal.data[(s2 * 3) + c0]);
                        c0 = (c0 + 1) % 3;
                    }
                    s1++;
                    s2++;
                }
                count += 3;
                // }
            }
            //60
            vndata[count] = arrays0.fnormal.data[(33 * 3) + c0] + arrays0.fnormal.data[(29 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            vndata[count] = arrays0.fnormal.data[(33 * 3) + c0] + arrays0.fnormal.data[(29 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            vndata[count] = arrays0.fnormal.data[(33 * 3) + c0] + arrays0.fnormal.data[(29 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            //61
            vndata[count] = arrays0.fnormal.data[(30 * 3) + c0] + arrays0.fnormal.data[(29 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            vndata[count] = arrays0.fnormal.data[(30 * 3) + c0] + arrays0.fnormal.data[(29 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            vndata[count] = arrays0.fnormal.data[(30 * 3) + c0] + arrays0.fnormal.data[(29 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            //62
            vndata[count] = arrays0.fnormal.data[(33 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            vndata[count] = arrays0.fnormal.data[(33 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            vndata[count] = arrays0.fnormal.data[(33 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            //63
            vndata[count] = arrays0.fnormal.data[(30 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            vndata[count] = arrays0.fnormal.data[(30 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0];
            count++;
            c0 = (c0 + 1) % 3;
            vndata[count] = arrays0.fnormal.data[(30 * 3) + c0] + arrays0.fnormal.data[(31 * 3) + c0] + arrays0.fnormal.data[(32 * 3) + c0];
            // count++;
            // c0 = (c0+1)%3;

            //createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCapopt, bottomCapopt)
            // var cynarr = twgl.primitives.createCylinderVertices(0.2, 0.5, 3, 3, true, true);
            // var cynarr = twgl.primitives.createCylinderBufferInfo(drawingState.gl, 0.2, 0.5, 10, 10, true, true);
            // var cynarr = twgl.primitives.createCylinderBuffers(drawingState.gl, 0.2, 0.5, 10, 10, true, true);

            // console.log(cynarr);
            // var group = LoadedOBJFiles["cylinder.obj"].groups["cylinder"];
            // var faces = group.faces;
            // var vertices = group.vertices;
            // var sum = [0, 0, 0], c = 0;

            // for(var i = 0;i<faces.length;i++){   //for each face
            //     var face = faces[i];
            //     for(var n = 0;n < face.length;n++){ //for each vertex
            //         var indices = face[n];
            //         var vertex = vertices[indices[0]] //get the vertex (indices[0] is position index)
            //         for(var j = 0;j < 3;j++){//for x, y, z in that vertex
            //             sum[j] += vertex[j]; //add to sum
            //         }
            //         c++;
            //     }
            // }
            var s = 0;
            var vdata = [];
            var vnidata = [];
            for (var q = 0; q < arrays0.indices.length; q++) {   //for each triangle index
                // var face = faces[q];
                for (var r = 0; r < 3; r++) { //for each vertex of triangle r was 64
                    // var indices = face[r];
                    vdata[s] = arrays0.startpos.data[(arrays0.indices[q] * 3) + r]; //get the vertex (indices[0] is position index)
                    vnidata[s] = vndata[(arrays0.indices[q] * 3) + r];
                    // for(var s = 0;s < 3;s++) { //for each xyz of a vertex
                    //     vdata[countvd] = arrays0.startpos.data[arrays0.indices[q] * 9 + (r * 3) + s]; //get the vertex (indices[0] is position index)
                    //     countvd++;
                    // }
                    // for(var s = 0;s < 3;s++){//for x, y, z in that vertex
                    //     sum[r] += vertex[r]; //add to sum
                    // }
                    s++;
                    // c++;
                }
            }
            arrays = {
                vpos: {numComponents: 3, data: vdata},
                vnormal: {numComponents: 3, data: vnidata}
            };
            // sum[0] /= c;
            // sum[1] /= c;
            // sum[2] /= c;
            // console.log(sum);
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl, arrays);
        }

    };
    peg.prototype.draw = function (drawingState) {
        // we make a model matrix to place the peg in the world
        var modelM = twgl.m4.scaling([this.size, this.size, this.size]);
        twgl.m4.setTranslation(modelM, this.position, modelM);
        // the drawing code is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl, shaderProgram, buffers);
        twgl.setUniforms(shaderProgram, {
            view: drawingState.view, proj: drawingState.proj, lightdir: drawingState.sunDirection,
            pegcolor: this.color, model: modelM
        });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    peg.prototype.center = function (drawingState) {
        return this.position;
    };


    ////////
    // constructor for pegs
    Spinningpeg = function Spinningpeg(name, position, size, color, axis) {
        peg.apply(this, arguments);
        this.axis = axis || 'X';
    };
    Spinningpeg.prototype = Object.create(peg.prototype);
    Spinningpeg.prototype.draw = function (drawingState) {
        // we make a model matrix to place the peg in the world
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
            pegcolor: this.color, model: modelM
        });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Spinningpeg.prototype.center = function (drawingState) {
        return this.position;
    }


})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of pegs, just don't load this file.
// grobjects.push(new peg("peg1",[-4,0.0,   0],1) );
// grobjects.push(new peg("peg2",[ 4,0.0,   0],1, [1,1,0]));
// grobjects.push(new peg("peg3",[ 0, 0.0, -4],1 , [0,1,1]));
// grobjects.push(new peg("peg4",[ 0,0.0,   4],1));

grobjects.push(new peg("peg1", [-4, 0.0, -4], 1));
grobjects.push(new peg("peg2", [4, 0.0, 4], 1, [1, 1, 0]));
grobjects.push(new peg("peg3", [4, 0.0, -4], 1, [0, 1, 1]));
grobjects.push(new peg("peg4", [-4, 0.0, 4], 1));
//
// grobjects.push(new peg("peg5",[ 4, 0.5, -2],1 , [1,1,1]));


// grobjects.push(new Spinningpeg("speg 1",[-2,0.5, -2],1) );
// grobjects.push(new Spinningpeg("speg 2",[-2,0.5,  2],1,  [1,0,0], 'Y'));
// grobjects.push(new Spinningpeg("speg 3",[ 2,0.5, -2],1 , [0,0,1], 'Z'));
// grobjects.push(new Spinningpeg("speg 4",[ 2,0.5,  2],1));

// grobjects.push(new Spinningpeg("speg 5",[ 2,0.5, -2],1 , [0,0,1], 'Y'));
