export default function createVectorField(p5) {
  return {
    leftX: 0,
    rightX: p5.width,
    topY: 0,
    bottomY: p5.height,

    drawResolution: p5.int(p5.width * 0.01),
    isColorDrawn: false,
    isLengthDrawn: false,
    isBorderDrawn: true,
    areArrowsDrawn: false,

    f: (x, y) => p5.createVector(p5.noise(x), p5.noise(y)),

    get width() {
      return this.rightX - this.leftX;
    },

    get height() {
      return this.bottomY - this.topY;
    },

    get numCols() {
      return this.width / this.drawResolution;
    },

    get numRows() {
      return this.height / this.drawResolution;
    },

    drawVisualizer() {
      if (this.isBorderDrawn) {
        p5.noFill();
        p5.stroke("black");
        p5.strokeWeight(2);
        p5.rect(
          this.leftX - this.drawResolution,
          this.topY - this.drawResolution,
          this.width + this.drawResolution * 2,
          this.height + this.drawResolution * 2
        );
      }

      if (this.drawAsPointsAndLines) this.drawAsPointsAndLines();
    },

    drawAsPointsAndLines() {
      for (let col = 0; col < this.numCols; col++) {
        for (let row = 0; row < this.numRows; row++) {
          p5.stroke(0);
          p5.strokeWeight(2);
          p5.point(
            this.leftX + col * this.drawResolution,
            this.topY + row * this.drawResolution
          );
        }
      }
    },

    getAngle(x, y) {
      const scaledX = x * 0.005;
      const scaledY = y * 0.005;

      const noiseVal = p5.noise(scaledX, scaledY);
      const angle = p5.map(noiseVal, 0.0, 1.0, 0.0, p5.PI * 2.0);
      return angle;
    }
  };
}
