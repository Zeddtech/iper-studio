import useLocalStorage from "./useLocalStorage";

const useInput = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const reset = () => setValue(initValue);
  let attr;
  if (key == "register") {
    attr = {
      onChange: e => {
        const namesd = e.target.name;
        return setValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
      },
    };
  } else {
    attr = {
      value,
      onChange: e => setValue(e.target.value),
    };
  }

  return [value, reset, attr];
};

export default useInput;
