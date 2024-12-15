import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const todosAtom = atom({
    key: "todosatom",
    default: [],
    effects_UNSTABLE: [persistAtom],
})