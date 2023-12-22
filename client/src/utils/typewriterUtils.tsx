export const typeWriter = (
  name: string,
  setNewName: React.Dispatch<React.SetStateAction<string>>,
  delay = 200,
  resetDelay = 300
) => {
  let index = 1;

  const type = () => {
    setNewName(name.slice(0, index));
    index++;

    if (index <= name.length) {
      setTimeout(type, delay);
    } else {
      setTimeout(() => {
        setNewName("");
        index = 1;
        type();
      }, resetDelay);
    }
  };

  type();
};
