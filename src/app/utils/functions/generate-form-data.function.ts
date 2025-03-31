interface Column {
  data: string;
  name: string;
  searchable: boolean;
}

interface Order {
  column: string;
  direction: string;
}

export interface FormDataModel {
  columns: Column[];
  page: number;
  pageSize: number;
  search: any;
  order: Order;
  id?: any;
}

export function generateFormData(formDataModel: FormDataModel): FormData {
  const formData = new FormData();

  // ID's
  if (formDataModel?.id)
    formDataModel?.id.forEach((el: any, index: number) => {
      formData.set(`id[${index}]`, el);
    });

  // properties
  formDataModel.columns.forEach((item: any, index) => {
    for (const prop in item) {
      if (item.hasOwnProperty(prop)) {
        formData.set(`columns[${index}][${prop}]`, item[prop]);
      }
    }
  });

  // page and limit
  formData.set(
    'start',
    ((formDataModel.page - 1) * formDataModel.pageSize).toString()
  );
  formData.set('length', formDataModel.pageSize.toString());

  // order
  let columnIndex = '';
  let i = 0;
  while (columnIndex === '' && i < formDataModel.columns.length) {
    if (formDataModel.order.column === formDataModel.columns[i].data) {
      columnIndex = i.toString();
    }
    i++;
  }
  formData.set('order[0][column]', columnIndex ? columnIndex : '0');
  formData.set('order[0][dir]', formDataModel.order.direction);

  // search
  if (formDataModel.search) {
    for (const prop in formDataModel.search) {
      if (formDataModel.search.hasOwnProperty(prop)) {
        const value =
          formDataModel.search[prop] === null ? '' : formDataModel.search[prop];
        prop === 'search'
          ? formData.set('search[value]', value)
          : formData.set(prop, value);
      }
    }
  }

  return formData;
}
