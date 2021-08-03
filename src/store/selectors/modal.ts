import { createSelector } from "reselect";
import * as modal from "../reducers/modal";
import { AppState } from "../reducers";

const boardsState = (state: AppState): modal.State => state.modalState;

const selectModal = createSelector(boardsState, (state) => state.modal);

export default selectModal;
