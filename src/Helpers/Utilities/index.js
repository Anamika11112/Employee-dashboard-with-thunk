export const dynamicInputHandler = (event, setState) => {
  const { name, value } = event.target;
  setState((prevState) => ({ ...prevState, [name]: value }));
};
export const setError = (errorName, setState, message) => {
  setState((prevState) => ({ ...prevState, [errorName]: message }));
};
export const formatDate = (isoDate) => (isoDate ? isoDate.split("T")[0] : "");