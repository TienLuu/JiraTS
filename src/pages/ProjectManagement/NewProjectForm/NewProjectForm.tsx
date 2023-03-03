import { useState, useRef, ReactElement } from "react";
import { useForm } from "react-hook-form";

import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import Editor from "../../../components/Editor";
import MenuSelect from "../../../components/MenuSelect";

import projectAPI from "../../../services/projectAPI";
import anothersAPI from "../../../services/anothersAPI";
import useRequest from "../../../hooks1/useRequest";

import { showSuccess, showError } from "../../../utils/toast";
import {
   StyledButton,
   TextFieldWrapper,
   Title,
   CategoryItem,
   ButtonClose,
   FormControl,
   Overlay,
   StyledModal,
   ModalContainer,
} from "./Styles";
import { ICreateProject, IProject } from "../../../type/project.interface";

interface IProps {
   onCreateSuccess: () => void;
}

const NewProjectForm = ({ onCreateSuccess }: IProps) => {
   const [open, setOpen] = useState(false);

   const editorRef = useRef<any>(null);
   const selectRef = useRef<any>(null);

   const createProject = useRequest(projectAPI.createProject, { manual: true });

   const {
      handleSubmit,
      register,
      formState: { errors },
      reset,
   } = useForm({
      defaultValues: {
         alias: "",
         projectName: "",
      },
   });

   const handleOpenForm = () => {
      setOpen(true);
   };

   const handleCloseForm = () => {
      setOpen(false);
      formMethod.reset();
   };

   const handleCreateProject = async (values: IProject) => {
      try {
         if (editorRef.current == null || selectRef.current == null) {
            return;
         }

         const projectValue: ICreateProject = {
            ...values,
            description: editorRef.current.getData(),
            categoryId: +selectRef.current.getValue()?.id,
         };

         const createdProject = await createProject.runAsync(projectValue);

         await projectAPI.addUserToProject({
            userId: createdProject.creator,
            projectId: createdProject.id,
         });

         onCreateSuccess();
         formMethod.reset();

         showSuccess(`Create project ${values.projectName} successful`);
      } catch (err: any) {
         showError(err);
      }
   };

   const handleSelect = (item: any, method: object) => {
      return { item, method };
   };

   const formMethod = {
      reset: (...params: any[]) => {
         reset(...params);
         if (editorRef.current != null && selectRef.current != null) {
            editorRef.current.setData("");
            selectRef.current.setValue();
         }
      },
      closeForm: handleCloseForm,
   };

   return (
      <>
         <StyledButton onClick={handleOpenForm}>
            <Button className="" variant="primary">
               Add Project
            </Button>
         </StyledButton>
         <StyledModal className={`${open ? "open" : ""}`}>
            <ModalContainer>
               <Title>
                  <h2>Create Project</h2>
               </Title>
               <form onSubmit={handleSubmit(handleCreateProject)}>
                  <TextFieldWrapper>
                     <TextField
                        placeholder="Project Name"
                        {...register("projectName", { required: true })}
                        error={
                           errors.projectName ? "Project Name is required" : ""
                        }
                     />
                     <TextField
                        placeholder="Alias Name"
                        {...register("alias", { required: true })}
                        error={errors.alias ? "Alias Name is required" : ""}
                     />
                     <MenuSelect
                        onChange={(item, method) => handleSelect(item, method)}
                        placement="bottom"
                        hideOnSelect={true}
                        serviceAPI={anothersAPI.getProjectCategories}
                        getItemsKey={(item: any) => item.id}
                        getSearchKey={(item: any) => item.projectCategoryName}
                        renderItem={(item: any, index: any) => (
                           <CategoryItem key={index}>
                              {item.projectCategoryName || item.name}
                           </CategoryItem>
                        )}
                        arrow
                        selectPlaceHolder={
                           <CategoryItem>Select Category</CategoryItem>
                        }
                        ref={selectRef}
                     />
                     <Editor label="" editorRef={editorRef} />
                     <FormControl>
                        <Button className="" variant="primary">
                           Create
                        </Button>
                     </FormControl>
                  </TextFieldWrapper>
               </form>
            </ModalContainer>
            <ButtonClose onClick={handleCloseForm}>X</ButtonClose>
         </StyledModal>
         <Overlay
            className={`${open ? "open" : ""}`}
            onClick={handleCloseForm}
         ></Overlay>
      </>
   );
};

export default NewProjectForm;
