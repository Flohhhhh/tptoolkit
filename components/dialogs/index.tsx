"use client";

import * as Responsive from "./responsive";
import YourModal from "./modal-example";
import { createPushModal } from "pushmodal";

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
    YourModal: {
      Wrapper: Responsive.default.Wrapper,
      Component: YourModal,
    },
  },
});
