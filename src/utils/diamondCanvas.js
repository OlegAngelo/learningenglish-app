const diamondCanvas =  {
  context: null,
  drawGraph: function () {
    this.context.beginPath();

    //rectangles
    this.context.moveTo(78, 145);
    this.context.lineTo(217, 222);
    this.context.lineTo(352, 145);
    this.context.lineTo(217, 70);
    this.context.closePath();

    this.context.moveTo(103, 145);
    this.context.lineTo(217, 205);
    this.context.lineTo(329, 145);
    this.context.lineTo(217, 86);
    this.context.closePath();

    this.context.moveTo(126, 145);
    this.context.lineTo(217, 192);
    this.context.lineTo(304, 145);
    this.context.lineTo(217, 100);
    this.context.closePath();

    this.context.moveTo(157, 145);
    this.context.lineTo(217, 178);
    this.context.lineTo(275, 145);
    this.context.lineTo(217, 113);
    this.context.closePath();

    this.context.moveTo(182, 145);
    this.context.lineTo(217, 163);
    this.context.lineTo(249, 145);
    this.context.lineTo(217, 127);
    this.context.closePath();

    //y-axis line
    this.context.moveTo(217, 70);
    this.context.lineTo(217, 222);

    //x-axis line
    this.context.moveTo(78, 145);
    this.context.lineTo(352, 145);

    this.context.strokeStyle = "#ACBECF";
    this.context.lineWidth = 1.2;
    this.context.stroke();
  },
  loadEnLabels: function () {
    const ctx = this.context;

    let readingIcon = new Image();
    readingIcon.src = "/images/Brain.svg";
    readingIcon.onload = () => {
      ctx.drawImage(readingIcon, 0, 0, 56, 56, 39, 107, 60, 60);
      ctx.fillStyle = '#5F7386';
      ctx.font = "400 15.5px Hiragino Kaku Gothic ProN";
      ctx.fillText("Reading", 0, 153);
      ctx.font = "700 19px Hiragino Kaku Gothic ProN";
      ctx.fillStyle = '#03DAC6';
      ctx.fillText("000", 0, 180);
    }

    let speakingIcon = new Image();
    speakingIcon.src = "/images/KeyboardVoice.svg";
    speakingIcon.onload = () => {
      ctx.drawImage(speakingIcon, 0, 0, 56, 56, 176, 16, 60, 60);
      ctx.fillStyle = '#5F7386';
      ctx.font = "400 15.5px Hiragino Kaku Gothic ProN";
      ctx.fillText("Speaking", 202, 31);
      ctx.font = "700 19px Hiragino Kaku Gothic ProN";
      ctx.fillStyle = '#03DAC6';
      ctx.fillText("000", 202, 59);
    }

    let listeningIcon = new Image();
    listeningIcon.src = "/images/Ear.svg";
    listeningIcon.onload = () => {
      ctx.drawImage(listeningIcon, 0, 0, 55, 55, 368, 106, 60, 60);
      ctx.fillStyle = '#5F7386';
      ctx.font = "400 15.5px Hiragino Kaku Gothic ProN";
      ctx.fillText("Listening", 367, 153);
      ctx.font = "700 19px Hiragino Kaku Gothic ProN";
      ctx.fillStyle = '#03DAC6';
      ctx.fillText("000", 366, 180);
    }

    let writtingIcon = new Image();
    writtingIcon.src = "/images/Create.svg";
    writtingIcon.onload = () => {
      ctx.drawImage(writtingIcon, 0, 0, 55, 55, 169, 225, 60, 60);
      ctx.fillStyle = '#5F7386';
      ctx.font = "400 15.5px Hiragino Kaku Gothic ProN";
      ctx.fillText("Writing", 198, 243);
      ctx.font = "700 19px Hiragino Kaku Gothic ProN";
      ctx.fillStyle = '#03DAC6';
      ctx.fillText("000", 200, 270);
    }
  },
  loadJpLabels: function () {
    const ctx = this.context;

    let readingIcon = new Image();
    readingIcon.src = "/images/Brain.svg";
    readingIcon.onload = () => {
      ctx.drawImage(readingIcon, 0, 0, 56, 56, 36, 126, 60, 60);
      ctx.fillStyle = '#5F7386';
      ctx.font = "400 15.5px Hiragino Kaku Gothic ProN";
      ctx.fillText("意味理解", 15, 168);
      ctx.font = "700 19px Hiragino Kaku Gothic ProN";
      ctx.fillStyle = '#03DAC6';
      ctx.fillText("000", 13, 193);
    }

    let speakingIcon = new Image();
    speakingIcon.src = "/images/KeyboardVoice.svg";
    speakingIcon.onload = () => {
      ctx.drawImage(speakingIcon, 0, 0, 56, 56, 190, 22, 60, 60);
      ctx.fillStyle = '#5F7386';
      ctx.font = "400 15.5px Hiragino Kaku Gothic ProN";
      ctx.fillText("発音", 211, 40);
      ctx.font = "700 19px Hiragino Kaku Gothic ProN";
      ctx.fillStyle = '#03DAC6';
      ctx.fillText("000", 211, 64);
    }

    let listeningIcon = new Image();
    listeningIcon.src = "/images/Ear.svg";
    listeningIcon.onload = () => {
      ctx.drawImage(listeningIcon, 0, 0, 55, 55, 366, 125, 60, 60);
      ctx.fillStyle = '#5F7386';
      ctx.font = "400 15.5px Hiragino Kaku Gothic ProN";
      ctx.fillText("音声認識", 364, 168);
      ctx.font = "700 19px Hiragino Kaku Gothic ProN";
      ctx.fillStyle = '#03DAC6';
      ctx.fillText("000", 363, 193);
    }

    let writtingIcon = new Image();
    writtingIcon.src = "/images/Create.svg";
    writtingIcon.onload = () => {
      ctx.drawImage(writtingIcon, 0, 0, 55, 55, 189, 225, 60, 60);
      ctx.fillStyle = '#5F7386';
      ctx.font = "400 15.5px Hiragino Kaku Gothic ProN";
      ctx.fillText("スペリング", 212, 238);
      ctx.font = "700 19px Hiragino Kaku Gothic ProN";
      ctx.fillStyle = '#03DAC6';
      ctx.fillText("000", 214, 265);
    }
  },
  drawResults: function (reading, writting, listening, speaking, fillColor, strokeColor) {
    this.context.beginPath();

    reading = this.getPercentage(reading, (217-78), -217);
    writting = this.getPercentage(writting, (222-145), 145);
    listening = this.getPercentage(listening, (352-217), 217);
    speaking = this.getPercentage(speaking, (145-70), -145);

    this.context.moveTo(reading, 145);
    this.context.lineTo(217, writting);
    this.context.lineTo(listening, 145);
    this.context.lineTo(217, speaking);
    this.context.closePath();

    this.context.strokeStyle = strokeColor;
    this.context.fillStyle = fillColor;
    this.context.fill();
    this.context.stroke();
  },
  getPercentage: function (x, y, z) {
    let minscore = 0;
    let maxscore = 150;
    let scorepercent = 0;
    let point = 0;
    let result = 0;

    if(x <= 0) {
      x = minscore;
    }
    else if(x > 150){
      x = maxscore;
    }

    //calculate percentage
    scorepercent = (x / maxscore).toFixed(2);

    //calculate equivalent percent in chart
    point = (y * scorepercent).toFixed(2);

    //calculate point coordinates
    result = Math.abs((parseFloat(point) + parseFloat(z))).toFixed(2);

    return result;
  }
};

export default diamondCanvas;
