import { memo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridProps } from "@mui/x-data-grid/models/props/DataGridProps";

import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import CustomErrorOverLay from "./CustomErrorOverLay";

import { Wrapper } from "./Styles";

interface IProps extends DataGridProps {
   rows: [];
   columns: any;
   autoRowHeight: boolean;
   loading: boolean;
   className?: string;
}

const TableData = ({
   rows,
   columns,
   autoRowHeight,
   loading,
   className = "table",
   ...passProps
}: IProps) => {
   const [pageSize, setPageSize] = useState(10);

   if (autoRowHeight) {
      passProps.getRowHeight = () => "auto";
   }

   return (
      <Wrapper>
         <DataGrid
            getRowClassName={() => "row"}
            getCellClassName={() => "cell"}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            onPageSizeChange={(newPageSize: any) => setPageSize(newPageSize)}
            pagination
            {...passProps}
            // className={className}
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            disableColumnMenu={true}
            components={{
               NoRowsOverlay: CustomNoRowsOverlay,
               LoadingOverlay: CustomLoadingOverlay,
               ErrorOverlay: CustomErrorOverLay,
            }}
         />
      </Wrapper>
   );
};

export default memo(TableData);
