import { StyledIcon } from "./Styles";

const fontIconCodes: { [key: string]: string } = {
   [`bug`]: "\\e90f",
   [`stopwatch`]: "\\e914",
   [`new task`]: "\\e910",
   [`story`]: "\\e911",
   [`arrow-down`]: "\\e90a",
   [`arrow-left-circle`]: "\\e917",
   [`arrow-up`]: "\\e90b",
   [`chevron-down`]: "\\e900",
   [`chevron-left`]: "\\e901",
   [`chevron-right`]: "\\e902",
   [`chevron-up`]: "\\e903",
   [`board`]: "\\e904",
   [`help`]: "\\e905",
   [`link`]: "\\e90c",
   [`menu`]: "\\e916",
   [`more`]: "\\e90e",
   [`attach`]: "\\e90d",
   [`plus`]: "\\e906",
   [`search`]: "\\e907",
   [`issues`]: "\\e908",
   [`settings`]: "\\e909",
   [`close`]: "\\e913",
   [`feedback`]: "\\e918",
   [`trash`]: "\\e912",
   [`github`]: "\\e915",
   [`shipping`]: "\\e91c",
   [`component`]: "\\e91a",
   [`reports`]: "\\e91b",
   [`page`]: "\\e919",
   [`calendar`]: "\\e91d",
   [`arrow-left`]: "\\e91e",
   [`arrow-right`]: "\\e91f",
};

interface IProps {
   type: string;
   size?: number;
   color: string;
   top?: number;
   left?: number;
   center?: boolean;
}

const Icon = ({
   type,
   size = 16,
   color,
   top = 0,
   left = 0,
   center,
   ...iconProps
}: IProps) => {
   return (
      <StyledIcon
         center
         {...iconProps}
         top={top}
         left={left}
         color={color}
         size={size}
         data-testid={`icon-${type}`}
         code={fontIconCodes[type]}
      />
   );
};

export default Icon;
