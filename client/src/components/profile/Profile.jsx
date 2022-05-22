import React, { useState } from "react";
import Avatar from "../../assets/images/avatar.png";
import { RiUser2Line } from "react-icons/ri";
import LeftBarWrapper from "../LeftBarWrapper";
import {CgProfile} from "react-icons/cg";
import {IoMdAddCircle} from 'react-icons/io'
import { useSelector } from "react-redux";
import {useUploadSingleFileMutation} from '../../services/uploadFile'
import {useUpdateUserMutation} from '../../services/appApi'


function Profile() {

  const userProfile = useSelector(state=>state?.user?.user)

  const {imageURL, location, email, username} = userProfile


  const [uploadSingleFile, { isLoading, error }] = useUploadSingleFileMutation();
  const [updateUser, { isLoading:updateLoading, error:updateError }] = useUpdateUserMutation();

  const [image, setImage] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState("false");

  const validateImg =(e)=>{

    const file = e.target.files[0];
    if(file.size > 10000000){
      return 
    }
    else{
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const uploadImage =async(image)=>{
    const data = new FormData();
    data.append("file", image)


    const response = await uploadSingleFile(data)

    const url = response.data.url
    return url
  }


  const setImageHander = async(e)=>{
    e.preventDefault();
    if(!image) return
     
    const url = await uploadImage(image)
    await updateUser({imageURL:url})
    console.log(url);
  }

  console.log(imageURL);

  return (
    <LeftBarWrapper>
      <div className="flex flex-row items-center justify-between w-full">
        <span className="text-fontLightGrey py-6 text-xl font-bold text-center">
          Contacts
        </span>
        <CgProfile className="w-6 h-6 text-fontGrey cursor-pointer" />
      </div>
        <div className="flex flex-col items-center my-3 ">
          <img src={imageURL ? imageURL : Avatar} alt="" className=" object-cover w-20 h-20" />
          <div className="flex  items-center justify-center ">
            <form onSubmit={setImageHander} className="flex items-center flex-col">
            <label className="w-64 flex flex-col items-center px-2 py-2 ">
            <input type="file" id="profile"  hidden onChange={validateImg} />
              <IoMdAddCircle className=" w-6 h-6 cursor-pointer text-fontGrey  active-text md:h-8 text-green" />
            </label>
              <input type="submit" value="Upload" className="pointer bg-purple hover:bg-green text-primaryWhite  font-bold py-2 px-4 rounded inline-flex items-center" />
            </form>
        </div>
        {/* <h3 className="text-fontLightGrey text-lg my-3">{username}</h3> */}
        <div className="flex flex-row items-center space-x-2 my-3">
          <div className="w-3 h-3 rounded-2xl bg-green flex items-center justify-center">
            <div className="w-1 h-1 rounded-xl bg-black z-10	 "></div>
          </div>
          <span className="text-fontGrey">Active</span>
        </div>
      </div>
      <div className="flex flex-col justify-start mt-8 w-48  md:w-60 ">
        <div className="flex flex-row items-center space-x-2 bg-secondaryDarkLight p-2 text-fontLightGrey rounded-t-md">
          <RiUser2Line />
          <h2>About</h2>
        </div>
        <div className="bg-primaryDark space-y-2 p-2 rounded-b-md">
          <div className="test">
            <div className="text-fontGrey">Name</div>
            <div className="text-fontLightGrey text-sm">{username}</div>
          </div>
          <div className="test">
            <div className="text-fontGrey">Email</div>
            <div className="text-fontLightGrey text-sm">
              {email}
            </div>
          </div>
          <div className="test">
            <div className="text-fontGrey">Location</div>
            <div className="text-fontLightGrey text-sm">{location ? location : "Not Provided"}</div>
          </div>
        </div>
      </div>
    </LeftBarWrapper>
  );
}

export default Profile;
