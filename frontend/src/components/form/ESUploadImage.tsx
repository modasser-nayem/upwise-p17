"use client";

import React, { useState } from "react";
import {
   FormField,
   FormItem,
   FormLabel,
   FormControl,
   FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
   CldUploadWidget,
   CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { config } from "@/config";

type ESImageUploadProps<T extends FieldValues> = {
   form: UseFormReturn<T>;
   name: Path<T>;
   label: string;
};

export default function ESImageUpload<T extends FieldValues>({
   form,
   name,
   label,
}: ESImageUploadProps<T>) {
   const [urlInput, setUrlInput] = useState("");
   const [urlError, setUrlError] = useState("");

   const isValidImageUrl = (url: string) => {
      try {
         const parsed = new URL(url);
         return /\.(jpeg|jpg|png|gif|webp)$/i.test(parsed.pathname);
      } catch {
         return false;
      }
   };

   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <div className="flex items-center gap-6">
                     {/* Preview */}
                     {field.value ? (
                        <Image
                           src={field.value}
                           width={96}
                           height={96}
                           alt="Selected"
                           className="rounded-md object-cover ring-1 ring-primary"
                        />
                     ) : (
                        <div className="h-24 w-24 rounded-md ring-1 ring-primary bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                           No Image
                        </div>
                     )}

                     {/* Right side: Upload button and URL input vertically */}
                     <div className="flex flex-col gap-3 flex-1 max-w-xs">
                        <CldUploadWidget
                           uploadPreset={config.UPLOAD_PRESET!}
                           onSuccess={(
                              result: CloudinaryUploadWidgetResults
                           ) => {
                              if (
                                 typeof result.info === "object" &&
                                 "secure_url" in result.info
                              ) {
                                 field.onChange(result.info.secure_url);
                                 setUrlInput("");
                                 setUrlError("");
                              }
                           }}
                        >
                           {({ open }) => (
                              <Button
                                 type="button"
                                 variant="default"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    open();
                                 }}
                              >
                                 Upload Image
                              </Button>
                           )}
                        </CldUploadWidget>

                        <div className="flex gap-2">
                           <Input
                              placeholder="Enter image URL"
                              value={urlInput}
                              onChange={(e) => setUrlInput(e.target.value)}
                           />
                           <Button
                              type="button"
                              variant="default"
                              onClick={() => {
                                 if (isValidImageUrl(urlInput)) {
                                    field.onChange(urlInput);
                                    setUrlError("");
                                 } else {
                                    setUrlError(
                                       "Please enter a valid image URL."
                                    );
                                 }
                              }}
                           >
                              Use URL
                           </Button>
                        </div>

                        {urlError && (
                           <p className="text-red-500 text-sm mt-1">
                              {urlError}
                           </p>
                        )}
                     </div>
                  </div>
               </FormControl>
               <FormMessage className="text-red-500" />
            </FormItem>
         )}
      />
   );
}
