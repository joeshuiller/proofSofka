export interface UiMapper<T, U> {
  mapToUi(model: T): U;
  mapFromUi(ui: U): T;
}
