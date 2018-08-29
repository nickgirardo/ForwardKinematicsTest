
import * as Vec2 from "../vec2.js";

export default class Segment {

  constructor(length, angle, rotationalVelocity, next = null) {
    this.length = length;
    this.ownAngle = angle;
    this.rotationalVelocity = rotationalVelocity

    // These should be given values later
    this.pos = {x: 0, y: 0};
    this.inheritedAngle = 0;

    this.next = next;
  }

  angle() {
    return this.ownAngle + this.inheritedAngle;
  }

  endPoint() {
    return Vec2.rotateAbout(Vec2.add(this.pos, {x: 0, y: this.length}), this.pos, this.angle());
  }

  update(pos = this.pos, angle = this.ownAngle) {
    this.pos = pos;
    this.inheritedAngle = angle;

    this.ownAngle += this.rotationalVelocity;

    if(this.next)
      this.next.update(this.endPoint(), this.angle());
  }

  draw(canvas, ctx) {
    const segmentWidth = 20;
    const points = [
      Vec2.add(this.pos, {x: -segmentWidth/2, y:0}),
      Vec2.add(this.pos, {x: -segmentWidth/2, y:this.length}),
      Vec2.add(this.pos, {x: segmentWidth/2, y:this.length}),
      Vec2.add(this.pos, {x: segmentWidth/2, y:0}),
    ].map(p => Vec2.rotateAbout(p, this.pos, this.angle()));

    ctx.fillStyle = 'lightgrey';
    ctx.beginPath();
    ctx.moveTo(points[points.length-1].x, points[points.length-1].y);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.fill();
    ctx.stroke();

    if(this.next)
      this.next.draw(canvas, ctx);
  }

}
