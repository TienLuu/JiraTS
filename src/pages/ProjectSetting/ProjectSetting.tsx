import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import MoreMenu from "../../components/MoreMenu";
import TextField from "../../components/TextField";
import MenuSelect from "../../components/MenuSelect";
import Editor from "../../components/Editor";
import Button from "../../components/Button";
import Icon from "../../components/Icon";

import { getProjectDetail } from "../../redux/slices/projectSlice";
import useRequest from "../../hooks1/useRequest";
import projectAPI from "../../services/projectAPI";
import anothersAPI from "../../services/anothersAPI";

import { showSuccess, showError } from "../../utils/toast";
import {
   Wrapper,
   StyledTitle,
   StyledForm,
   OnlyReadField,
   CategoryItem,
} from "./Styles";
import { RootState, useAppDispatch } from "../../store";
import { IUpUpdateProject } from "../../type/project.interface";

const ProjectSetting = () => {
   const { selectedProject } = useSelector((state: RootState) => state.project);
   const dispatch = useAppDispatch();
   const editorRef = useRef<any>(null);
   const selectRef = useRef<any>(null);

   const updateProject = useRequest(projectAPI.updateProject, { manual: true });

   const {
      handleSubmit,
      register,
      formState: { errors },
      setValue,
   } = useForm({
      defaultValues: {
         creator: "",
         id: "",
         projectName: "",
      },
   });

   useEffect(() => {
      setValue("id", selectedProject?.id);
      setValue("creator", selectedProject?.creator.id);
      setValue("projectName", selectedProject?.projectName);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedProject]);

   const onSubmit = async (values: any) => {
      const updateValues = {
         ...values,
         description:
            editorRef.current?.getData() || selectedProject?.description || "",
         categoryId: selectRef.current.getValue().id,
      };

      try {
         const data: IUpUpdateProject = await updateProject.runAsync(
            values.id,
            updateValues
         );

         showSuccess("Save change successful");
         dispatch(getProjectDetail(data.id));
      } catch (err: any) {
         showError(err);
      }
   };

   const handleSelect = (item: any, method: object) => {
      return { item, method };
   };

   return (
      <Wrapper>
         <StyledTitle>
            <h2>Project Details</h2>
         </StyledTitle>
         <form onSubmit={handleSubmit(onSubmit)}>
            <StyledForm>
               <OnlyReadField>
                  <TextField
                     label="ID"
                     readOnly
                     disabled
                     {...register("id", {
                        required: {
                           value: true,
                           message: "Project ID is required",
                        },
                     })}
                     error={errors.id && errors.id.message}
                  />
                  <TextField
                     label="CreatorId"
                     disabled
                     readOnly
                     {...register("creator", {
                        required: {
                           value: true,
                           message: "Creator ID is required",
                        },
                     })}
                     error={errors.creator && errors.creator.message}
                  />
               </OnlyReadField>
               <TextField
                  label="Project Name"
                  {...register("projectName", {
                     required: {
                        value: true,
                        message: "Project Name is required",
                     },
                  })}
                  error={errors.projectName && errors.projectName.message}
               />
               <MenuSelect
                  placement="bottom"
                  hideOnSelect={true}
                  onChange={(item, method) => handleSelect(item, method)}
                  value={selectedProject?.projectCategory}
                  serviceAPI={anothersAPI.getProjectCategories}
                  getItemsKey={(item) => item.id}
                  getSearchKey={(item) => item.projectCategoryName}
                  renderItem={(item: any, index: any) => (
                     <CategoryItem key={index}>
                        {item.projectCategoryName || item.name}
                     </CategoryItem>
                  )}
                  arrow
                  label="Category"
                  selectPlaceHolder={
                     <CategoryItem>Select Category</CategoryItem>
                  }
                  ref={selectRef}
               />
               <Editor
                  label="Description"
                  editorRef={editorRef}
                  data={selectedProject?.description}
               />
            </StyledForm>
            <Button className="" variant="primary">
               Save
            </Button>
         </form>
      </Wrapper>
   );
};

export default ProjectSetting;
