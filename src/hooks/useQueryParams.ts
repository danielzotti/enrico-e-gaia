interface ParamItem {
  key: string;
  value: string;
}

interface ParamsObject {
  [key: string]: string;
}

export const useQueryParams = () => {
  const paramList = window.location.search?.substring(1)?.split('&');

  if(!paramList) {
    return {};
  }

  const paramObjectList = paramList?.map(param => {
      const [key, value] = param.split('=');
      return { key, value };
    }
  );
  return paramObjectList.reduce((obj, item) => ({
    ...obj,
    [item.key]: item.value ? item.value : true
  }), {} as ParamItem) as ParamsObject;
};
