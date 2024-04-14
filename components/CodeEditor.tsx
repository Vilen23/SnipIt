"use client";
import { codeSnippets, fonts } from "@/lib/options";
import React from "react";
import Editor from "react-simple-code-editor";
import { useState } from "react";
import hljs from "highlight.js";
import { useRecoilState } from "recoil";
import { codeAtom } from "@/store/codeAtom";
export default function CodeEditor() {
  const [coding,setCoding] = useRecoilState(codeAtom);
  const code = coding.code;
  return (
    <div className="shadow-2xl rounded-xl min-w-[400px] border-white/20 border-2 ">
      <header className="grid grid-cols-6 gap-3 items-center py-3 px-4">
        <div className="flex gap-1.5">
          <div className="rounded-full h-3 w-3 bg-red-500 text-sm "></div>
          <div className="rounded-full h-3 w-3 bg-yellow-500 text-sm"></div>
          <div className="rounded-full h-3 w-3 bg-green-500"></div>
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            onChange={(e) => setCoding({...coding,title:e.target.value})}
            type="text"
            placeholder="Title"
            className="bg-transparent text-white/70  text-center focus:ring-0 focus:outline-none"
          />
        </div>
      </header>
      <div className="px-4 pb-4">
        <Editor
          value={code}
          onValueChange={(code) => setCoding({...coding,code:code})} 
          highlight={(code) =>
            hljs.highlight(code, {
              language: coding.language,
            }).value
          }
          textareaClassName="bg-transparent text-white/70  focus:outline-none"
          preClassName="bg-transparent"
          style={{
            fontFamily: fonts[coding.fontStyle].name,
            fontSize: coding.fontSize,
          }}
        />
      </div>
    </div>
  );
}
