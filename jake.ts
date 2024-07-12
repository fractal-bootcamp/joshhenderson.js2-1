// requires a function to have strict positional arguments
const curry = (func: Function) => {
  const curried = (...args) => {
    if (args.length >= func.length) {
      return func(...args);
    }
    return (x) => curried(...args, x);
  };

  return curried;
};

function add(x, y, z) {
  // [x, y, z]
  return x + y + z;
}

const cur = curry(add);

console.log(cur(1)(2)(3));

// useEffect(() => {
//   const click = () => {};
//   // register eventlisetner
//   document.addEventListener("click", click);

//   return () => document.removeEventListener("click", click);
// }, []);
