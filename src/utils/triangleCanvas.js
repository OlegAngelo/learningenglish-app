const triangleCanvas =  {
  context: null,
  drawGraph: function () {
    this.context.beginPath();
    this.context.moveTo(75, 0);
    this.context.lineTo(75, 150);
    this.context.lineTo(220, 150);
    this.context.closePath();

    this.context.moveTo(75, 22);
    this.context.lineTo(200, 150);

    this.context.moveTo(75, 43);
    this.context.lineTo(180, 150);

    this.context.moveTo(75, 64);
    this.context.lineTo(160, 150);

    this.context.moveTo(75, 85);
    this.context.lineTo(140, 150);

    this.context.moveTo(75, 105);
    this.context.lineTo(120, 150);

    this.context.moveTo(75, 128);
    this.context.lineTo(97, 150);

    this.context.strokeStyle = "#ACBECF";
    this.context.lineWidth = 1;
    this.context.stroke();
  },
  drawResults: function (reading, speaking) {
    this.context.beginPath();
    this.context.moveTo(75, 150);
    this.context.lineTo(123, 150);  // x axis
    this.context.lineTo(75, 85);  // y axis
    this.context.closePath();

    this.context.strokeStyle = "rgba(3,218,198,0)";
    this.context.fillStyle = "rgba(3,218,198,0.6)";
    this.context.fill();
    this.context.stroke();
  },
  loadLabels: function (reading, speaking) {
    const ctx = this.context;

    let readingIcon = new Image();
    readingIcon.src = "/images/Brain.svg";

    readingIcon.onload = () => {
      ctx.drawImage(readingIcon, 0, 0, 200, 200, 23, 44, 184, 184);
      ctx.fillStyle = '#5F7386';
      ctx.font = "300 13px Hiragino Sans";
      ctx.fillText("異文化理解", 1, 82);
      ctx.font = "600 14.5px Hiragino Sans";
      ctx.fillStyle = '#03DAC6';
      ctx.fillText("000", 2, 104);
    }


    let speakingIcon = new Image();
    speakingIcon.src = "/images/KeyboardVoice.svg";

    speakingIcon.onload = () => {
      ctx.drawImage(speakingIcon, 0, 0, 200, 200, 243, 101, 184, 184);
      ctx.fillStyle = '#5F7386';
      ctx.font = "300 12px Hiragino Sans";
      ctx.fillText("非言語", 231, 136);
      ctx.font = "600 14.5px Hiragino Sans";
      ctx.fillStyle = '#03DAC6';
      ctx.fillText("000", 231, 159);
    }
  }
};

export default triangleCanvas;
