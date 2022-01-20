export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "white",
    padding: 20,
    backgroundColor: "",
    cursor: "pointer",
    ':active': {
      ...provided[':active'],
      backgroundColor: "#793EF9"
    },
    ':hover': {
      ...provided[':hover'],
      backgroundColor: "#9a6cff"
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "#3D4451",
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#3D4451",
    borderColor: "rgb(82, 82, 82)",
    // none of react-select's styles are passed to <Control />
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#793EF9",
    color: "#FFFFFF"
    // none of react-select's styles are passed to <Control />
  }),

  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "#FFFFFF"
    // none of react-select's styles are passed to <Control />
  }),

  
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
  
    return { ...provided, opacity, transition };
  },
};