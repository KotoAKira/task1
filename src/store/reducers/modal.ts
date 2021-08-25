import { handleActions } from "redux-actions";
import { AnyAction } from "redux";
import { ModalProperties } from "../../interfaces/ModalProperties";
import { ModalActionTypes } from "../actions/modal";

export interface State {
  modal: ModalProperties | null;
}

const initialState: State = {
  modal: null,
};

export const reducer = handleActions<State>(
  {
    [ModalActionTypes.SHOW_MODAL]: (state: State, action: AnyAction) => ({
      ...state,
      modal: action.payload,
    }),
    [ModalActionTypes.HIDE_MODAL]: (state: State) => ({
      ...state,
      modal: null,
    }),
  },
  initialState
);
