import PropTypes from "prop-types";
import { useState } from "react";

const propTypes = {
   value: PropTypes.any.isRequired,
};

const useToggle = (value: any) => {
   const [isActive, setIsActive] = useState(value);

   const setValue = (value: any) => {
      setIsActive((currentValue: any) =>
         typeof value === "boolean" ? value : !currentValue
      );
   };

   return [isActive, setValue];
};

useToggle.propTypes = propTypes;

export default useToggle;
