import { useState } from "react";

function ImageUploader({ onUpload }) {
  const [preview, setPreview] = useState(null);
  const [added, setAdded] = useState(true);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dswda50ri/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (data.secure_url) {
      setPreview(data.secure_url);
      onUpload?.(data.secure_url);
      setAdded(false);
    } else {
      console.error("Upload error:", data);
    }
  };

  return (
    <div>
      <div>
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: "150px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}
      </div>
      {added && <input type="file" accept="image/*" onChange={handleUpload} />}
    </div>
  );
}

export default ImageUploader;
