import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Icon from "../Icon";
import { StyledLabel, StyledError, Wrapper } from "./Styles";

interface IProps {
   label: string;
   error?: boolean;
   editorRef: any;
   data?: any;
}

const Editor = ({ label, error, editorRef, ...passProps }: IProps) => {
   return (
      <Wrapper>
         {label ? <StyledLabel>{label}</StyledLabel> : null}
         <div>
            <CKEditor
               editor={ClassicEditor}
               onReady={(editor) => {
                  editorRef.current = editor;
               }}
               {...passProps}
            />
         </div>
         {error && (
            <StyledError>
               <Icon center color="" type="help" />
               {error}
            </StyledError>
         )}
      </Wrapper>
   );
};

export default Editor;
