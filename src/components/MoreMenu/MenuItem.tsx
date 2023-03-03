import Button from "../Button/Button";
import { IMenuUser } from "../../layouts/components/Header/header-config";

interface IProps {
   item: IMenuUser;
   onClick: (item: IMenuUser) => void;
}

const MenuItem = ({ item, onClick }: IProps) => {
   return (
      <>
         <Button
            fullWidth
            className=""
            onClick={() => onClick(item)}
            variant="empty"
         >
            {item.title}
         </Button>
      </>
   );
};

export default MenuItem;
