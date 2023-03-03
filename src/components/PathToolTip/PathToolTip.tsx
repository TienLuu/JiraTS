import { ReactElement } from "react";
import { Tooltip } from "@mui/material";

interface IProps {
   children: ReactElement;
   size: number;
   title?: string;
   arrow?: any;
}

const PathToolTip = ({ children, size, title, ...props }: IProps) => {
   return (
      <Tooltip
         arrow
         title={title}
         PopperProps={{
            sx: {
               "& .MuiTooltip-tooltip": {
                  fontSize: { size },
               },
            },
         }}
         disableInteractive
         {...props}
      >
         {children}
      </Tooltip>
   );
};

export default PathToolTip;
