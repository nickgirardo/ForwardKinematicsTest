
import Segment from "./entities/segment.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Chain set up as linked list like structure
const root = new Segment(120, 0, 0.01, 
              new Segment(100, 0, 0.01,
                new Segment(80, 0, 0.01,
                  new Segment(60, 0, 0.01,
                    new Segment(40, 0, 0.01,
                      new Segment(20, 0, 0.01)
                  )))));


function update() {
  root.update();

  draw();

  window.requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  root.draw(canvas, ctx);
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  root.pos = {x: canvas.width/2, y: canvas.height/2};

  draw();
}

function handleError(msg, url, row, col, obj) {
  const handlerDiv = document.querySelector('#error-handler');
  const errorMsg = document.querySelector('#error-message');

  handlerDiv.style.display = "block"

  if(!!obj && !!obj.stack) {
    const stack = obj.stack.split('\n').map(str=>'\t'+str).join('\n');
    const fullMsg = `${obj.name}: ${obj.message}\n${stack}`;
    console.error(fullMsg);
    errorMsg.innerText = fullMsg;
  } else {
    // Not all browsers have access to obj and obj.stack
    const fallbackMsg = `${msg}\n\t${url}:${row}:${col}\n\t(fallback error handler)`;
    console.error(fallbackMsg);
    errorMsg.innerText = fallbackMsg;
  }
}

function init() {
  window.onerror = handleError;

  window.addEventListener('resize', resize);

  update();
  resize();
}

init();
