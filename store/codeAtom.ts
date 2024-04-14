import { codeSnippets } from "@/lib/options";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export const codeAtom = atom({
  key: "codeAtom",
  default: {
    code: codeSnippets[1].code,
    title: "Title",
    theme: "hyper",
    darkMode: "true",
    showBackground: true,
    language: codeSnippets[1].language,
    autoDetectLanguage: false,
    fontSize: 18,
    fontStyle: "jetBrainsMono",
    padding: 64,
  },
  effects_UNSTABLE: [persistAtom],
});
