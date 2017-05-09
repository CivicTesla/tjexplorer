define(function () {
return "@export qtek.compositor.kernel.gaussian_9\nfloat gaussianKernel[9];\ngaussianKernel[0] = 0.07;\ngaussianKernel[1] = 0.09;\ngaussianKernel[2] = 0.12;\ngaussianKernel[3] = 0.14;\ngaussianKernel[4] = 0.16;\ngaussianKernel[5] = 0.14;\ngaussianKernel[6] = 0.12;\ngaussianKernel[7] = 0.09;\ngaussianKernel[8] = 0.07;\n@end\n\n@export qtek.compositor.kernel.gaussian_13\n\nfloat gaussianKernel[13];\n\ngaussianKernel[0] = 0.02;\ngaussianKernel[1] = 0.03;\ngaussianKernel[2] = 0.06;\ngaussianKernel[3] = 0.08;\ngaussianKernel[4] = 0.11;\ngaussianKernel[5] = 0.13;\ngaussianKernel[6] = 0.14;\ngaussianKernel[7] = 0.13;\ngaussianKernel[8] = 0.11;\ngaussianKernel[9] = 0.08;\ngaussianKernel[10] = 0.06;\ngaussianKernel[11] = 0.03;\ngaussianKernel[12] = 0.02;\n\n@end\n\n\n@export qtek.compositor.gaussian_blur\n\nuniform sampler2D texture; varying vec2 v_Texcoord;\n\nuniform float blurSize : 2.0;\nuniform vec2 textureSize : [512.0, 512.0];\nuniform float blurDir : 0.0;\n\n@import qtek.util.rgbm\n@import qtek.util.clamp_sample\n\nvoid main (void)\n{\n    @import qtek.compositor.kernel.gaussian_9\n\n    vec2 off = blurSize / textureSize;\n    off *= vec2(1.0 - blurDir, blurDir);\n\n    vec4 sum = vec4(0.0);\n    float weightAll = 0.0;\n\n        for (int i = 0; i < 9; i++) {\n        float w = gaussianKernel[i];\n                sum += decodeHDR(clampSample(texture, v_Texcoord + float(i - 4) * off)) * w;\n        weightAll += w;\n    }\n    gl_FragColor = encodeHDR(sum / weightAll);\n}\n\n@end\n\n@export qtek.compositor.box_blur\n\nuniform sampler2D texture;\nvarying vec2 v_Texcoord;\n\nuniform float blurSize : 3.0;\nuniform vec2 textureSize : [512.0, 512.0];\n\n@import qtek.util.rgbm\n@import qtek.util.clamp_sample\n\nvoid main(void)\n{\n\n    vec4 tex = decodeHDR(texture2D(texture, v_Texcoord));\n    vec2 offset = blurSize / textureSize;\n\n    tex += decodeHDR(clampSample(texture, v_Texcoord + vec2(offset.x, 0.0) ));\n    tex += decodeHDR(clampSample(texture, v_Texcoord + vec2(offset.x, offset.y) ));\n    tex += decodeHDR(clampSample(texture, v_Texcoord + vec2(-offset.x, offset.y) ));\n    tex += decodeHDR(clampSample(texture, v_Texcoord + vec2(0.0, offset.y) ));\n    tex += decodeHDR(clampSample(texture, v_Texcoord + vec2(-offset.x, 0.0) ));\n    tex += decodeHDR(clampSample(texture, v_Texcoord + vec2(-offset.x, -offset.y) ));\n    tex += decodeHDR(clampSample(texture, v_Texcoord + vec2(offset.x, -offset.y) ));\n    tex += decodeHDR(clampSample(texture, v_Texcoord + vec2(0.0, -offset.y) ));\n\n    tex /= 9.0;\n\n    \n    gl_FragColor = encodeHDR(tex);\n}\n\n@end";
});