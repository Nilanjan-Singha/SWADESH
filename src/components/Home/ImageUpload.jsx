import React from "react";
import { Camera, Upload } from "lucide-react";

const ImageUpload = ({ onChange }) => {
  const handleFileChange = (e) => {
    onChange([...e.target.files]); // pass files to parent
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-6 text-center border-muted-foreground/25">
      <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
      <p className="text-sm text-muted-foreground mb-2">
        Drag and drop images here, or click to select
      </p>

      <input
        multiple
        accept="image/*"
        className="hidden"
        id="image-upload"
        type="file"
        onChange={handleFileChange}
      />

      <label
        htmlFor="image-upload"
        className="inline-flex cursor-pointer items-center justify-center text-sm font-medium border bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 gap-2"
      >
        <Upload className="h-4 w-4" />
        Choose Images
      </label>

      <p className="text-xs text-muted-foreground mt-2">
        Maximum 3 images, up to 5MB each
      </p>
    </div>
  );
};

export default ImageUpload;
