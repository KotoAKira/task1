import MainContentI from "./MainContent";

export interface ModalProperties {
  mainContent: MainContentI;
  handler: (text: string) => void;
}
