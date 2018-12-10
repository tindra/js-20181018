export function debounce(fn, delay) {
  let timerId = null;
  return function(...args) {
    let context = this;
    clearTimeout(timerId);
    timerId = setTimeout(function() {
     fn.apply(context, args); 
   }, delay);
  }
} 