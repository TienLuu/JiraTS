import { forwardRef, ReactElement } from "react";
import { ButtonBaseProps } from "@mui/material/ButtonBase";

import Icon from "../Icon";
import { color } from "../../utils/styles";
import { StyledButton, Text } from "./Styles";

type Variant = "primary" | "success" | "danger" | "secondary" | "empty";
type IProps = {
   className: string;
   children: ReactElement | string;
   variant: Variant;
   icon?: ReactElement;
   iconSize?: number;
   disabled?: boolean;
   isWorking?: boolean;
   fullWidth?: boolean;
   textCenter?: boolean;
   onClick?: () => void;
   icon1?: string;
};
type ButtonProps = IProps & ButtonBaseProps;

const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
   (
      {
         className = "",
         children,
         variant,
         icon,
         icon1,
         iconSize,
         disabled,
         isWorking = false,
         textCenter = true,
         fullWidth = false,
         onClick,
         ...buttonProps
      },
      ref
   ) => {
      const handleClick = () => {
         if (!disabled && !isWorking && onClick !== undefined) {
            onClick();
         }
      };

      return (
         <StyledButton
            textCenter={textCenter}
            fullWidth={fullWidth}
            {...buttonProps}
            onClick={handleClick}
            variant={variant}
            disabled={disabled || isWorking}
            iconOnly={!children}
            ref={ref}
         >
            {!isWorking && icon && typeof icon1 === "string" ? (
               <Icon
                  type={icon1}
                  size={iconSize}
                  color={getIconColor(variant)}
               />
            ) : (
               icon
            )}
            {children && (
               <Text withPadding={isWorking || !!icon}>{children}</Text>
            )}
         </StyledButton>
      );
   }
);

const getIconColor = (variant: string) =>
   ["secondary", "empty"].includes(variant) ? color.textDark : "#fff";

export default Button;
