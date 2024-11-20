import React, { useEffect, useState } from "react";
import style from "./ImagePicker.module.scss";
import Cropper from "react-easy-crop";
import { BiCheck } from "react-icons/bi";
import getCroppedImg from "./cropImage";
import { removeBackground } from "@imgly/background-removal";

const ImagePicker = ({
  done,
  image,
  width,
  height,
  cropShape = "rect",
  thumbs = null,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [file, setFile] = useState(null); // Ensure file is initialized to null
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [ratio, setRatio] = useState(1);
  const [transparent, setTransparent] = useState(false);
  const [cropping, setCropping] = useState(false);

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function getRatio(w, h) {
    w = parseFloat(w);
    h = parseFloat(h);
    let r = gcd(w, h);
    let ratioW = w / r,
      ratioH = h / r;

    setRatio(ratioW / ratioH);
  }

  const onDrop = async (e) => {
    e.preventDefault();
    done(null);
    const droppedFiles = e.dataTransfer.files;
    let imageUrl = await readFile(droppedFiles[0]);
    setFile(imageUrl);
  };

  const handleFile = async (e) => {
    const files = e.target.files;
    done(null);
    let imageUrl = await readFile(files[0]);
    setFile(imageUrl);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const resizeImage = (blobURL, width, height) => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.src = blobURL;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/webp"));
      };

      img.onerror = (err) => {
        reject(err);
      };
    });
  };

  async function blobToDataUrl(blob) {
    return new Promise((r) => {
      let a = new FileReader();
      a.onload = r;
      a.readAsDataURL(blob);
    }).then((e) => e.target.result);
  }

  const doneCropping = async () => {
    setCropping(true);
    try {
      let resType = transparent ? "blob" : "base64";
      let croppedImage = await getCroppedImg(
        file,
        croppedAreaPixels,
        {
          width,
          height,
        },
        resType
      );
      setFile(null);

      if (transparent) {
        croppedImage = await removeBackground(croppedImage);
        if (thumbs) croppedImage = URL.createObjectURL(croppedImage);
        else croppedImage = await blobToDataUrl(croppedImage);
      }

      if (thumbs) {
        let resizeImages = [];
        for (let size of thumbs) {
          let thumbImage = await resizeImage(
            croppedImage,
            size.width,
            size.height
          );
          resizeImages.push({
            label: size.label,
            image: thumbImage,
          });
        }
        croppedImage = resizeImages;
      }
      setCropping(false);
      done(croppedImage);
    } catch (e) {
      console.error("cropping error: ", e);
    }
  };

  useEffect(() => {
    getRatio(width, height);
  }, [width, height]);

  return (
    <>
      <label
        className={`${style.dndUpload} text-center`}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {cropping ? (
          <div>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {file ? (
              <>
                <div
                  style={{
                    height: 200,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Cropper
                    image={file}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape={cropShape}
                    aspect={ratio ?? 1}
                  />
                </div>
                <button
                  onClick={doneCropping}
                  className="flex items-center px-3 py-1 border border-gray-600 hover:bg-primary-600 rounded-md"
                >
                  <BiCheck style={{ marginRight: 4 }} /> Crop Image
                </button>
              </>
            ) : null}

            {image ? (
              <img
                src={
                  Array.isArray(image) ? image[image.length - 1].image : image
                }
                className={style.previewImage}
              />
            ) : null}
            <div>
              <strong>Click</strong> or <strong>Drag &amp; Drop</strong>
              <br />
              files here
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFile}
            />
          </>
        )}
      </label>
    </>
  );
};

export default ImagePicker;
