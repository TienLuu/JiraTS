import { TypeIcon } from "./Styles";

interface IProps {
   type: any;
}

const IssueTypeIcon = ({ type, ...otherProps }: IProps) => (
   <TypeIcon type={type} color={type} size={18} {...otherProps} />
);

export default IssueTypeIcon;
