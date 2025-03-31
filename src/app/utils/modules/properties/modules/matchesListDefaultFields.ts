
export function createDefaultFields() {
  return {
    formDataModel: {
      columns: [
        { data: 'holderNumber', name: 'HolderNumber', searchable: true },
        { data: 'holderName', name: 'HolderName', searchable: true },
        { data: 'holderCpf', name: 'HolderCpf', searchable: true },
        { data: 'residencialCode', name: 'ResidencialCode', searchable: true },
      ],
      page: 1,
      pageSize: 10,
      search: {
        search: '',
        holderNumber: '',
        holderName: '',
        holderCpf: '',
        residencialCode: '',
      },
    }
  }
}
