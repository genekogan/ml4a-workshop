// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
Fast_Style_Transfer_Mirror
Fast Style Transfer Mirror Example with p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let fastStyle;
let video;
let modelReady = false;
let cameraReady = false;
let startPredict = false;
let resultImg;

function setup() {
  createCanvas(800, 600).parent('canvasContainer');
  pixelDensity(1);
  background(0);
  video = createCapture(VIDEO, cameraLoaded);
  resultImg = createImg('');
  resultImg.hide();
  video.size(200, 200);
  video.hide();
  style = new ml5.StyleTransfer('models/udnie', modelLoaded);
}

function draw(){
    background(255,0,0);
  image(resultImg, 0, 0, 300, 300);
    fill(0, 255, 0);
    ellipse(mouseX, mouseY, 50, 50);
}

function cameraLoaded() {
  cameraReady = true;
}

function modelLoaded() {
  modelReady = true;
}

function togglePredicting() {
  startPredict = !startPredict;
  if(startPredict){
    select('#controlBtn').html('Stop');
    predict();
  } else {
    select('#controlBtn').html('Start');
  }

}

function predict() {
  if(cameraReady && modelReady && startPredict) {
    const result = style.transfer(video.elt);
    resultImg.attribute('src', result.src);
    image(resultImg, 0, 300, 300);
    setTimeout(() => predict(), 500);
  }
}
