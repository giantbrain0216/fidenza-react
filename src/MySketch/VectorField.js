export const drawModes = {
  LINES: "LINES",
  ARROWS: "ARROWS"
};

export default function createVectorField(p5) {
  return {
    dims: {
      leftX: 0,
      rightX: p5.width,
      topY: 0,
      bottomY: p5.height
    },

    drawResolution: p5.int(p5.width * 0.01),
    drawVecScale: 20,
    isColorDrawn: false,
    isLengthDrawn: false,
    isBorderDrawn: true,
    drawMode: drawModes.ARROWS,

    xRange: { min: -3, max: 3 },
    yRange: { min: -3, max: 3 },
    fxRange: { min: -p5.PI, max: p5.PI },
    fyRange: { min: -p5.PI, max: p5.PI },
    f: (x, y) => p5.createVector(p5.PI * p5.sin(y), p5.PI * p5.cos(x)),

    get width() {
      return this.dims.rightX - this.dims.leftX;
    },

    get height() {
      return this.dims.bottomY - this.dims.topY;
    },

    get numCols() {
      return this.width / this.drawResolution;
    },

    get numRows() {
      return this.height / this.drawResolution;
    },

    drawVisualizer() {
      if (this.isBorderDrawn) {
        this.drawBorder();
      }

      for (let col = 0; col < this.numCols; col++) {
        for (let row = 0; row < this.numRows; row++) {
          const pos = p5.createVector(
            this.dims.leftX + col * this.drawResolution,
            this.dims.topY + row * this.drawResolution
          );
          let v = this.get(pos.x, pos.y);

          if (this.isColorDrawn) {
            const c = this.getColorOfV(v);
            p5.fill(c);
            p5.stroke(c);
          }

          if (!this.isLengthDrawn) {
            v.normalize();
          }

          if (this.drawMode === drawModes.ARROWS) {
            this.drawArrow(pos, v);
          } else if (this.drawMode === drawModes.LINES) {
            this.drawPointAndLine(pos, v);
          }
        }
      }
    },

    getColorOfV(v, scale = 0.6) {
      const mag = v.mag() * scale;
      return p5.color(mag * 255, 255 - mag * 255, 0);
    },

    drawBorder() {
      p5.noFill();
      p5.stroke("black");
      p5.strokeWeight(2);
      p5.rect(
        this.dims.leftX - this.drawResolution,
        this.dims.topY - this.drawResolution,
        this.width + this.drawResolution * 2,
        this.height + this.drawResolution * 2
      );
    },

    drawPointAndLine(p, v) {
      p5.strokeWeight(3);
      p5.point(p.x, p.y);

      p5.strokeWeight(1);
      p5.line(
        p.x,
        p.y,
        p.x + v.x * this.drawVecScale,
        p.y + v.y * this.drawVecScale
      );
    },

    drawArrow(p, v) {
      //TODO: check mag?
      p5.strokeWeight(3);

      p5.push();
      p5.translate(p.x, p.y);
      p5.line(0, 0, v.x * this.drawVecScale, v.y * this.drawVecScale);
      p5.rotate(v.heading());
      const arrowSize = 0.2 * v.mag() * this.drawVecScale;
      p5.translate(v.mag() * this.drawVecScale - arrowSize, 0);
      p5.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
      p5.pop();
    },

    get(x, y) {
      //TODO: out of bounds handling?
      const mappedX = p5.map(
        x,
        this.dims.leftX,
        this.dims.rightX,
        this.xRange.min,
        this.xRange.max
      );
      const mappedY = p5.map(
        y,
        this.dims.topY,
        this.dims.bottomY,
        this.yRange.min,
        this.yRange.max
      );

      const v = this.f(mappedX, mappedY);
      const mappedVX = p5.map(v.x, this.fxRange.min, this.fxRange.max, -1, 1);
      const mappedVY = p5.map(v.y, this.fyRange.min, this.fyRange.max, -1, 1);
      return p5.createVector(mappedVX, mappedVY);
    }
  };
}
