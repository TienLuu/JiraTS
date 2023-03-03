import PropTypes from "prop-types";

import { IssuePriority } from "../../constants/issues";
import { PriorityIcon } from "./Styles";

const propTypes = {
   priority: PropTypes.string.isRequired,
};

interface IProps {
   priority: string;
}

const IssuePriorityIcon = ({ priority, ...otherProps }: IProps) => {
   const iconType = [IssuePriority.LOW, IssuePriority.LOWEST].includes(priority)
      ? "arrow-down"
      : "arrow-up";

   return (
      <PriorityIcon
         type={iconType}
         color={priority}
         size={18}
         {...otherProps}
      />
   );
};

IssuePriorityIcon.propTypes = propTypes;

export default IssuePriorityIcon;
