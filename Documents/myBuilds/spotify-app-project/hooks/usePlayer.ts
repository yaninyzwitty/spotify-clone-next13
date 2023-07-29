import { create } from "zustand";

type Props ={
    ids: string[],
    activeId?: string;
    setId: (id:string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;

}

const usePlayer = create<Props>((set) => ({
    ids: [],
    activeId: undefined,
    setId: (id) => set({activeId: id}),
    setIds: (ids) => set({ids}),
    reset: () => set({ids: [], activeId: undefined}),
}));

export default usePlayer;


