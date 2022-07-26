import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import client from "../utils/client";
import { topics } from "../utils/constants";
import NoResults from "../components/NoResults";
const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setvideoAsset] = useState();
  const [photoAsset, setphotoAsset] = useState();
  const [wrongFileType, setwrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setsavingPost] = useState(false);
  const { userProfile } = useAuthStore();
  const router = useRouter();

  const handleDiscard = async () => {
    setCaption("");
    setvideoAsset("");
    setphotoAsset("");
  };
  const uploadVideo = (e) => {
    const selectedFile = e.target.files[0];

    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (fileTypes.includes(selectedFile.type)) {
      setIsLoading(true);
      setwrongFileType(false);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setvideoAsset(data);
          setIsLoading(false);
        });
    } else if (selectedFile.type === "image/jpeg") {
      setIsLoading(true);
      setwrongFileType(false);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setphotoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setwrongFileType(true);
    }
  };
  const handlePost = async () => {
    let document;
    if (caption && videoAsset?._id && category) {
      setsavingPost(true);
      document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "referene",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post("/api/post", document);
      router.push("/");
    } else if (caption && photoAsset?._id && category) {
      setsavingPost(true);
      document = {
        _type: "post",
        caption,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: photoAsset._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post("/api/post", document);
      router.push("/");
    }
  };
  return userProfile ? (
    <div className="flex w-full justify-center h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8]">
      <div className="bg-white w-[80%] rounded-lg xl:h-[80vh] flex gap-6 flex-col lg:flex-row justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video/Image</p>
            <p className="text-base text-gray-400 mt-1">
              Post video/image to your account
            </p>
          </div>
          <div
            className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10
      w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100"
          >
            {isLoading ? (
              <p>Uploading ...</p>
            ) : (
              <div>
                {videoAsset || photoAsset ? (
                  <div>
                    {videoAsset && (
                      <video
                        src={videoAsset.url}
                        loop
                        controls
                        className="rounded-xl h-[450px] mt-16 bg-black"
                      ></video>
                    )}
                    {photoAsset && (
                      <img
                        src={photoAsset.url}
                        className="rounded-xl h-[450px] object-cover mt-16 bg-black"
                      ></img>
                    )}
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">Upload</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg or JPEG
                        <br />
                        720x1280 or higher <br />
                        Upto 10min <br />
                        Less than 1GB
                      </p>
                      <p className="bg-[#F51997] text-center mt-10 rounded  text-white text-base font-medium p-2 w-52 outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={(e) => uploadVideo(e)}
                    />
                  </label>
                )}

                {wrongFileType && (
                  <p className="text-center to-red-400 font-semibold mt-4 w-[250px]">
                    Please select a video file
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-base font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            className="rounded outline-none text-base border-2 border-gray-200 p-2"
          />
          <label className="text-base font-medium">Choose a category</label>
          <select
            className="outline-none border-2 border-gray-200 text-base capitalize lg:p-4 p-2 rounded cursor-pointer"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                value={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-base p-2 hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={handleDiscard}
              type="button"
              className="border-gray-300 border-2 text-base font-medium p-2 lg:w-44 outline-none w-28 rounded"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className=" border-gray-300 bg-[#F51997] text-whiteborder-2 text-base font-medium p-2 lg:w-44 outline-none w-28 rounded"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NoResults text="Login First" />
  );
};

export default Upload;
