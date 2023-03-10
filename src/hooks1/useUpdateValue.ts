import { useEffect, useState } from "react";

const useUpdateValue = (value: any) => {
   const [currentValue, setCurrentValue] = useState(value);

   useEffect(() => {
      setCurrentValue(value);
   }, [value]);

   return [currentValue, setCurrentValue];
};

export default useUpdateValue;
