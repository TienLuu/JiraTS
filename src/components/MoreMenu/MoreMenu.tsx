import { useState, useEffect, ReactElement } from "react";
import Tippy from "@tippyjs/react";

import { Container, Wrapper, Menu } from "./Styles";
import Popper from "../Popper/Popper";
import MenuItem from "./MenuItem";
import { IMenuUser } from "../../layouts/components/Header/header-config";

type TypeTrigger =
   | "click"
   | "focusin"
   | "mouseenter focus"
   | "mouseenter click"
   | "manual";

interface IProps {
   items: any[];
   onChange: (item: IMenuUser) => void;
   children: ReactElement;
   placement: string | any;
   rootActiveClass: string;
   trigger: TypeTrigger;
}

const MoreMenu = ({
   children,
   trigger,
   items,
   onChange,
   placement = "bottom",
   rootActiveClass = "",
   ...props
}: IProps) => {
   const [listItem, setListItem] = useState<IMenuUser[]>([]);
   const [active, setActive] = useState(false);

   const handleClick = (item: IMenuUser) => {
      onChange(item);
   };

   useEffect(() => {
      setListItem(items);
   }, [items]);

   const renderMenuDropDown = (
      <Popper className="">
         {listItem.map(
            (item, index): JSX.Element => (
               <MenuItem key={index} item={item} onClick={handleClick} />
            )
         )}
      </Popper>
   );

   return (
      <Container>
         <Tippy
            {...props}
            interactive
            trigger={trigger}
            placement={placement}
            delay={[null, 200]}
            onTrigger={() => setActive(true)}
            onHidden={() => setActive(false)}
            render={(attrs: any): JSX.Element => (
               <Wrapper tabIndex="-1" {...attrs}>
                  {renderMenuDropDown}
               </Wrapper>
            )}
         >
            <Menu
               onClick={(e) => {
                  e.stopPropagation();
               }}
               className={`${active ? [rootActiveClass] : ""}`}
            >
               {children}
            </Menu>
         </Tippy>
      </Container>
   );
};

export default MoreMenu;
