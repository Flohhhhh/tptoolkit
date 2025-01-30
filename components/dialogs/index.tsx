"use client";

import * as Responsive from "./responsive";
import YourModal from "./modal-example";
import { createPushModal } from "pushmodal";
import ServiceAreasDialog from "./service-area-reference/service-areas-dialog";
import PaletteDialog from "./palette/palette";

export const {
  pushModal,
  popModal,
  popAllModals,
  replaceWithModal,
  useOnPushModal,
  onPushModal,
  ModalProvider,
} = createPushModal({
  modals: {
    PaletteDialog: {
      Wrapper: Responsive.default.Wrapper,
      Component: PaletteDialog,
    },
    ServiceAreasReference: {
      Wrapper: Responsive.default.Wrapper,
      Component: ServiceAreasDialog,
    },
    YourModal: {
      Wrapper: Responsive.default.Wrapper,
      Component: YourModal,
    },
  },
});
