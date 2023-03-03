import {
   forwardRef,
   useImperativeHandle,
   useState,
   useEffect,
   ReactElement,
} from "react";
import Tippy from "@tippyjs/react/headless";

import Popper from "../Popper";

import useRequest from "../../hooks1/useRequest";
import useUpdateValue from "../../hooks1/useUpdateValue";
import {
   Wrapper,
   WrapperPopper,
   Search,
   WrapperList,
   Item,
   Empty,
   Loadmore,
   StyledTitle,
   Title,
   IconTitle,
} from "./Styles";
import Icon from "../Icon";

interface IMenuSelect {
   trigger?: string;
   placement: string | any;
   items?: any[];
   stepRender?: number;
   renderItem: any;
   getItemsKey: (item: any) => typeof item;
   onChange: (item: any, method: object) => void;
   onBlur?: () => void;
   getSearchKey?: (item: any) => typeof item;
   searchPlaceholder?: string;
   hideOnSelect: boolean;
   arrow?: boolean;
   maxRender?: number;
   defaultPlaceHolder?: ReactElement;
   value?: any;
   label?: string;
   serviceAPI?: any;
   rootClass?: string;
   selectPlaceHolder?: any;
   mb?: boolean;
}

const MenuSelect = forwardRef<HTMLInputElement, IMenuSelect>(
   (
      {
         trigger = "click",
         placement,
         items = [],
         maxRender = 4,
         stepRender = 2,
         value,
         renderItem,
         getItemsKey,
         onChange,
         onBlur,
         getSearchKey,
         searchPlaceholder = "Search",
         selectPlaceHolder = "",
         defaultPlaceHolder,
         label,
         rootClass = "",
         arrow = false,
         serviceAPI,
         hideOnSelect = true,
         mb,
         ...props
      },
      ref
   ) => {
      let options = items;
      const API = useRequest(serviceAPI, { manual: true });
      const [visible, setVisible] = useState(false);
      const [maximum, setMaximum] = useState(maxRender);
      const [searchInput, setSearchInput] = useState("");
      const [selectedItem, setSelectedItem] = useUpdateValue(value);

      if (API.data) {
         options = API.data;
      }

      let filterItem = options;

      if (searchInput && getSearchKey) {
         filterItem = options.filter((item) => {
            return getSearchKey(item)
               .toLowerCase()
               .includes(searchInput.toLocaleLowerCase());
         });
      }

      let leftItems: number;
      if (maximum && maximum < filterItem.length) {
         leftItems = filterItem.length - maximum;
         filterItem = filterItem.slice(0, maximum);
      }

      const selectMethod = {
         setValue: (value: any) => {
            setSelectedItem(value);
         },
         getValue: () => {
            return selectedItem;
         },
         toggleSelect: (boolean: boolean) => {
            setVisible((prev) => boolean ?? !prev);
         },
         stateSelect: !visible,
      };

      const handleSelect = (item: any) => {
         setTimeout(() => {
            onChange(item, selectMethod);
         }, 0);

         if (!hideOnSelect) return;
         setVisible(false);
         setSelectedItem(item);
      };

      const handleLoadMore = () => {
         setMaximum((prev) => prev + stepRender);
      };

      useImperativeHandle(ref, (): any => {
         return selectMethod;
      });

      useEffect(() => {
         if (!serviceAPI) return;
         if (options.length > 0) return;

         API.runAsync();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
         <Wrapper mb={mb} {...props}>
            {label ? <label htmlFor="">{label}</label> : null}
            <Tippy
               visible={visible}
               interactive
               placement={placement}
               delay={[null, 200]}
               onClickOutside={() => {
                  setVisible(false);
                  setMaximum(maxRender);
                  setSearchInput("");
               }}
               render={(attrs) => (
                  <WrapperPopper tabIndex={1} {...attrs}>
                     <Popper className="">
                        <Search>
                           <input
                              type="text"
                              value={searchInput}
                              placeholder={searchPlaceholder}
                              onChange={(evt) =>
                                 setSearchInput(evt.target.value)
                              }
                           />
                        </Search>
                        <div>
                           {API.loading ? "Loading" : null}
                           <WrapperList>
                              {filterItem.length > 0 ? (
                                 filterItem.map((item, index) => (
                                    <Item
                                       key={getItemsKey(item) || index}
                                       onClick={() => handleSelect(item)}
                                    >
                                       {renderItem(item)}
                                    </Item>
                                 ))
                              ) : (
                                 <Empty>No results</Empty>
                              )}
                           </WrapperList>
                           {leftItems > 0 ? (
                              <Loadmore onClick={handleLoadMore}>
                                 Load more
                              </Loadmore>
                           ) : null}
                        </div>
                     </Popper>
                  </WrapperPopper>
               )}
            >
               <StyledTitle
                  className={` ${rootClass ? rootClass : ""}`}
                  onClick={() => setVisible(true)}
               >
                  <Title>
                     {defaultPlaceHolder
                        ? defaultPlaceHolder
                        : selectedItem
                        ? renderItem(selectedItem)
                        : selectPlaceHolder}
                  </Title>
                  {arrow ? (
                     <IconTitle>
                        {visible ? (
                           <Icon color="" type="arrow-up" />
                        ) : (
                           <Icon color="" type="arrow-down" />
                        )}
                     </IconTitle>
                  ) : null}
               </StyledTitle>
            </Tippy>
         </Wrapper>
      );
   }
);

export default MenuSelect;
