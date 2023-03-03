import { useMemo, useState } from "react";

interface IPropsOptions {
   manual: boolean;
}

interface ISTate {
   loading: boolean;
   error: any;
   data: any;
}

const useRequest = (
   service: any,
   options: IPropsOptions = {
      manual: false,
   }
) => {
   const [status, setStatus] = useState<ISTate>({
      loading: false,
      error: false,
      data: null,
   });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const isManual = useMemo(() => options.manual, []);

   const runAsync = async (...params: any[]) => {
      setStatus((prev) => ({ ...prev, loading: true, error: false }));
      try {
         const data = await service(...params);
         setStatus((prev) => ({ ...prev, loading: false, error: false, data }));
         return Promise.resolve(data);
      } catch (error) {
         setStatus((prev) => ({ ...prev, loading: false, error }));
         return Promise.reject(error);
      }
   };

   return { runAsync, ...status };
};

export default useRequest;
