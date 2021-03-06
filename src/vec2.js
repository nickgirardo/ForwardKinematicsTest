
// Super sloppy 2d-vector maths
// Started this when I was doing ld48 and I'm still using it because its simple

export function up() {
  return {x: 0, y: 1};
}

export function rotate(vec, theta) {
  return {
    x: vec.x*Math.cos(theta) - vec.y*Math.sin(theta), 
    y: vec.x*Math.sin(theta) + vec.y*Math.cos(theta)
  }
}

export function rotateAbout(vec, about, theta) {
  return add(rotate(sub(vec, about), theta), about);
}

export function getRotation(vec) {
  return Math.atan2(vec.y, vec.x);
}

export function add(vec1, vec2) {
  return {x: vec1.x + vec2.x, y: vec1.y + vec2.y};
}

export function subtract(vec1, vec2) {
  return {x: vec1.x - vec2.x, y: vec1.y - vec2.y};
}

export const sub = subtract;

export function normalize(vec) {
  const _mag = mag(vec);
  if(_mag === 0)
    return {x: 0, y: 0};
  return div(vec, _mag);
}

export const norm = normalize;

// Vector by scalar division
export function divide(vec, s) {
  return {x: vec.x/s, y: vec.y/s};
}

export const div = divide;

export function magnitude(vec) {
  return Math.sqrt(vec.x**2 + vec.y**2);
}

export const mag = magnitude;

export function sMul(vec, s) {
  return {x: vec.x*s, y: vec.y*s};
}

// TODO should be using epsilons for this
export function equals(vec1, vec2) {
  return vec1.x === vec2.x && vec1.y === vec2.y;
}
