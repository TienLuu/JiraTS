import CloudQueueOutlinedIcon from "@mui/icons-material/CloudQueueOutlined";
import { Wrapper, LoaderWrapper, Overlay, Loader, LoaderInner } from "./Styles";

interface IProps {
   message?: string;
   overlay?: boolean;
}

const CustomLoadingOverlay = ({
   message = "Data is loading ...",
   overlay = false,
}: IProps) => {
   return (
      <Wrapper>
         <LoaderWrapper>
            <CloudQueueOutlinedIcon fontSize="inherit" color="inherit" />
            <Loader>
               <LoaderInner className="inner"></LoaderInner>
               <LoaderInner className="inner"></LoaderInner>
               <LoaderInner className="inner"></LoaderInner>
            </Loader>
            <p>{message}</p>
         </LoaderWrapper>
         {overlay && <Overlay></Overlay>}
      </Wrapper>
   );
};

export default CustomLoadingOverlay;
