import {create} from "zustand";
interface SubModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useSubModal = create<SubModal>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}));

export default useSubModal;
