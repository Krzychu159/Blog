import { useState } from "react";
import "./PostModal.scss";
import { FaRegImage } from "react-icons/fa6";

function ImageUploader({ onUpload, preview, setPreview }) {
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
        {preview && <img src={preview} alt="preview" className="preview" />}
      </div>
      {added && (
        <div>
          <label>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUpload}
            />
            <div className="media">
              Add to your post <FaRegImage color="green" size={24} />
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
