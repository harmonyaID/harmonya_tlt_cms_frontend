// CRUD Modal Request
export type UseCRUDModalRequestOptions<TDetail, TForm> = {
    modalId: string
    modalRemoveId: string
    emptyParam?: TForm
    mapDetailToFormRequest?: (data: TDetail) => TForm
}
