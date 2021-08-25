import { createAction } from "redux-actions";
import { ModalProperties } from "../../interfaces/ModalProperties";

export enum ModalActionTypes {
  SHOW_MODAL = "[Modal] SHOW_MODAL",
  HIDE_MODAL = "[Modal] HIDE_MODAL",
}

export const hideModal = createAction(ModalActionTypes.HIDE_MODAL);

export const showModal = createAction(
  ModalActionTypes.SHOW_MODAL,
  (payload: ModalProperties) => payload
);
