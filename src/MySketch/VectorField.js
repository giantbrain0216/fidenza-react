export const drawModes = {
  LINES: "LINES",
  ARROWS: "ARROWS"
};

export const funcModes = {
  PERLIN: "PERLIN",
  FUNCTION: "FUNCTION"
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

    graphDomain: { min: -3, max: 3 },
    graphRange: { min: -3, max: 3 },
    funcMode: funcModes.PERLIN,

    fDomain: { min: 0, max: 1 },
    fRange: { min: 0, max: 1 },
    f: (x, y) => p5.createVector(p5.PI * p5.sin(y), p5.PI * p5.cos(x)),

    perlinLod: 8,
    perlinFalloff: 0.75,
    perlinSeed: 42,
    perlinF: (x, y) => {
      p5.noiseSeed(this.perlinSeed);
      p5.noiseDetail(this.perlinLod, this.perlinFalloff);
      const angle = p5.map(p5.noise(this.noiseSeed + x, y), 0, 1, 0, 2 * p5.PI);
      const scale = p5.noise(x + this.noiseSeed + 100, y + 100);
      let v = p5.createVector(0, scale);
      v.rotate(angle);
      return v;
    },

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
          } else {
            p5.fill(0);
            p5.stroke(0);
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

    getColorOfV(v, scale = 1) {
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
        this.graphDomain.min,
        this.graphDomain.max
      );
      const mappedY = p5.map(
        y,
        this.dims.topY,
        this.dims.bottomY,
        this.graphRange.min,
        this.graphRange.max
      );
      c;

      let v;
      if (this.funcMode === funcModes.PERLIN) {
        v = this.perlinF(mappedX, mappedY);
      } else if (this.funcMode === funcModes.FUNCTION) {
        v = this.f(mappedX, mappedY);
      }

      const mappedVX = p5.map(v.x, this.fDomain.min, this.fDomain.max, -1, 1);
      const mappedVY = p5.map(v.y, this.fRange.min, this.fRange.max, -1, 1);
      return p5.createVector(mappedVX, mappedVY);
    }
  };
}
