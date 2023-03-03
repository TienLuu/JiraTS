import { ReactElement } from "react";
import { StyledPopper } from "./Styles";

interface IProps {
   children: JSX.Element[];
   className: string;
}

const Popper = ({ children, className }: IProps) => {
   return <StyledPopper className={className}>{children}</StyledPopper>;
};

export default Popper;
