import { Image, Letter } from "./Styles";

interface IProps {
   className: string;
   avatarUrl: string;
   name: string;
   size: number;
   alt: string;
   square: boolean;
}

const Avatar = ({
   className = "",
   avatarUrl = "",
   name = "",
   size = 32,
   alt,
   square = true,
   ...otherProps
}: IProps) => {
   const sharedProps = {
      className,
      size,
      "data-testid": name ? `avatar:${name}` : "avatar",
      ...otherProps,
   };

   if (avatarUrl) {
      return (
         <Image avatarUrl={avatarUrl} square={square} {...sharedProps}>
            {alt ? <span>{alt}</span> : null}
         </Image>
      );
   }

   return (
      <Letter color={getColorFromName(name)} {...sharedProps}>
         <span>{name.charAt(0)}</span>
      </Letter>
   );
};

const colors = [
   "#DA7657",
   "#6ADA57",
   "#5784DA",
   "#AA57DA",
   "#DA5757",
   "#DA5792",
   "#57DACA",
   "#57A5DA",
];

const getColorFromName = (name: string) =>
   colors[name.toLocaleLowerCase().charCodeAt(0) % colors.length];

export default Avatar;
