const pieChart = {
  pieRadius: 0,
  context: null,
  drawPieGraph: function (dataset, width, height) {
    let startLine = 4.70;
    let sum = dataset.reduce((total, label) => {
      return total + label.score + label.scoreDiff;
    }, 0);
    width = (width + 100);
    let canvasX = width / 2;
    let canvasY = height / 2;

    dataset.map((label) => {
      this.context.fillStyle = label.color;

      // Draw pie slice
      this.context.beginPath();
      let endLine = (label.score / sum) * Math.PI * 2 + startLine;
      this.context.moveTo(canvasX, canvasY);
      this.context.arc(
        canvasX,
        canvasY,
        this.pieRadius,
        startLine,
        endLine,
        false
      );
      this.context.lineTo(canvasX, canvasY);
      this.context.fill();
      this.context.closePath();

      //Add a extra slice of pie if there is a score different with fill of colorDiff
      if (label.scoreDiff) {
        this.context.fillStyle = label.colorDiff;
        let startLineDiff = endLine;
        this.context.beginPath();
        endLine = (label.scoreDiff / sum) * Math.PI * 2 + startLineDiff;
        this.context.moveTo(canvasX, canvasY);
        this.context.arc(
          canvasX,
          canvasY,
          this.pieRadius,
          startLineDiff,
          endLine,
          false
        );
        this.context.lineTo(canvasX, canvasY);
        this.context.fill();
        this.context.closePath();
      }

      startLine = endLine;
    });
  },
};

export default pieChart;
