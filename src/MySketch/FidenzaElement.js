import palettes from "./ColorPalettes";

export default function createFidenzaElement(p5, x, y, c, length, speed, flowField) {
    return {
        pos: p5.createVector(x, y),
        length: length,
        speed: speed,
        color: c,

        display1() {
            p5.noFill();
            p5.stroke(c);
            p5.strokeWeight(1);
            p5.beginShape();
            let drawCursor = p5.createVector(this.pos.x, this.pos.y);

            p5.curveVertex(drawCursor.x, drawCursor.y);
            for (let i = 0; i < this.length; i++) {
                p5.curveVertex(drawCursor.x, drawCursor.y);
                const v = flowField.get(drawCursor.x, drawCursor.y);
                p5.circle(drawCursor.x, drawCursor.y, v.mag()*8 - 3);
                drawCursor.add(v.mult(this.speed));
            }
            p5.noFill();
            p5.endShape();
        },

        display2() {
            p5.noFill();
            p5.stroke(c);
            p5.strokeWeight(1);
            p5.beginShape();
            let drawCursor = p5.createVector(this.pos.x, this.pos.y);

            p5.curveVertex(drawCursor.x, drawCursor.y);
            for (let i = 0; i < this.length*5; i++) {
                p5.curveVertex(drawCursor.x, drawCursor.y);
                let v = flowField.get(drawCursor.x, drawCursor.y);
                v.normalize();
                //p5.strokeWeight(v.mag()*20);
                drawCursor.add(v.mult(5));//this.speed
            }
            p5.noFill();
            p5.endShape();
        }
    }
}

export function makeFidEleGrid(p5, flowField) {
    //TODO: refactor into iterateGrid of flowfield
    let elements = [];
    
    for (let col = 0; col < flowField.numCols; col++) {
        for (let row = 0; row < flowField.numRows; row++) {
            const pos = p5.createVector(
                flowField.dims.leftX + col * flowField.drawResolution,
                flowField.dims.topY + row * flowField.drawResolution
              );
            elements.push(new createFidenzaElement(p5, pos.x, pos.y, p5.color(p5.random(255)), p5.random(10), 5, flowField ));
        }
    }

    return elements;
}