"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { fonts, languages } from "@/lib/options";
import { useRecoilState } from "recoil";
import { codeAtom } from "@/store/codeAtom";
import { CameraIcon } from "lucide-react";
import htmlToImage ,  { toJpeg } from "html-to-image";

export default function MenuBar({
  reff,
}: {
  reff: React.RefObject<HTMLDivElement>;
}) {
  const [code, setCode] = useRecoilState(codeAtom);

  const handleValueChange = (value: string) => {
    setCode({ ...code, language: value });
  };

  const handleFontChange = (value: string) => {
    setCode({ ...code, fontStyle: value });
  };
  const handleTakeScreenshot = async () => {
    const node = reff.current;
    if (!node) return;
    try {
        const url = await toJpeg(node);
        console.log(url);
        const downloadImage = () => {
            const link = document.createElement('a');
            link.href = url;
            link.download = 'screenshot.jpeg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          };
          downloadImage();
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div>
      <div className="shadow-2xl rounded-xl min-w-[400px] border-white/20 border-2 dark:bg-[#111] ">
        <div className="grid grid-cols-3 gap-3 p-2">
          <div>
            <Select
              onValueChange={(e) => {
                handleValueChange(e);
              }}
            >
              <SelectTrigger className=" border-none px-2 w-[200px] text-center flex justify-center gap-3 text-lg ">
                <SelectValue placeholder={code.language || "Select language"} />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-gray-600/60">
                {Object.entries(languages).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              onValueChange={(e) => {
                handleFontChange(e);
              }}
            >
              <SelectTrigger className=" border-none px-2 w-[200px] text-center flex justify-center gap-3 text-lg ">
                <SelectValue
                  placeholder={fonts[code.fontStyle].name || "Select Font"}
                />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-gray-600/60">
                {Object.entries(fonts).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center  ">
            <CameraIcon
              className="cursor-pointer hover:text-gray-300 shadow-lg"
              onClick={handleTakeScreenshot}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
