"use client";

import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";
import PageError from "@/components/pageError";
import { useGetProfile } from "@/features/profile-customer/hooks/useGetProfile";
import { useUpdateProfile } from "@/features/profile-customer/hooks/useUpadateProfile";
import { User, Mail, Phone, MapPin, Edit2, Camera } from "lucide-react";
import { useRef, useState } from "react";
import { FiLoader } from "react-icons/fi";
import BackLink from "@/components/backLink";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function CustomerProfile() {
  const router = useRouter()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { profile, isLoading, isError } = useGetProfile();

  const { formik, isUpdating, isEditMode, setIsEditMode } =
    useUpdateProfile(profile);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Pas tombol kamera diklik, dia bakal klik input file yang tersembunyi
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);

      // Bikin URL preview biar bisa dilihat di browser
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  if (isLoading) return <Loading />;

  if (isError) return <PageError />;

  return (
    <div className="flex flex-col justify-center items-center mx-auto bg-[#f4e7d6] ">
      <form
        onSubmit={formik.handleSubmit}
        className="relative max-w-2xl pt-28 pb-28"
      >
        <BackLink link="/" page="Home" />
        {/* Profile Header */}
        <div className="bg-white mt-5 rounded-2xl shadow-sm p-8 mb-4 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-[#FF6B4A] flex items-center justify-center text-white text-3xl font-bold">
              {previewUrl ? (
                // Munculin ini kalau user baru aja pilih foto dari galeri
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : profile?.profilePicture ? (
                // Munculin ini kalau user udah punya foto di database
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                // Kalau gak ada dua-duanya, baru tampilin inisial
                <>
                  {profile?.firstName?.[0]}
                  {profile?.lastName?.[0]}
                </>
              )}
            </div>
            {isEditMode ? (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border-2 border-[#E5DDD3] flex items-center justify-center hover:bg-[#FFF5F2] transition-all"
                >
                  <Camera className="w-4 h-4 text-[#FF6B4A]" />
                </button>
              </>
            ) : null}
          </div>
          <h2 className="text-2xl font-bold text-[#2C2826] mb-1">
            {profile?.firstName} {profile?.lastName}
          </h2>
          <p className="text-sm text-[#6B6662]">{profile?.email}</p>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#2C2826]">
              Profile Information
            </h3>
            {!isEditMode ? (
              <button
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFF5F2] text-[#FF6B4A] hover:bg-[#FFE5DD] transition-all"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditMode(false)}
                  className="px-4 py-2 rounded-lg border-2 border-[#E5DDD3] text-[#6B6662] hover:border-[#FF6B4A] transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#FF6B4A] text-white hover:bg-[#FF5533] transition-all text-sm"
                >
                  {isUpdating ? (
                    <>
                      <div className="flex items-center gap-2">
                        {" "}
                        <FiLoader className="w-4 h-4 animate-spin" />{" "}
                        <span>Updating...</span>
                      </div>
                    </>
                  ) : (
                    <span>save</span>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#6B6662] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  onChange={formik.handleChange}
                  defaultValue={profile?.firstName}
                  disabled={!isEditMode}
                  className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#FF6B4A] outline-none transition-colors disabled:bg-[#FAF6F1] disabled:text-[#6B6662]"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <ErrorMessage error={formik.errors.firstName} />
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B6662] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  disabled={!isEditMode}
                  className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#FF6B4A] outline-none transition-colors disabled:bg-[#FAF6F1] disabled:text-[#6B6662]"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <ErrorMessage error={formik.errors.lastName} />
                ) : null}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#6B6662] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                disabled={!isEditMode}
                className="text-black w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#FF6B4A] outline-none transition-colors disabled:bg-[#FAF6F1] disabled:text-[#6B6662]"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <ErrorMessage error={formik.errors.phoneNumber} />
              ) : null}
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-4">
          <h3 className="text-xl font-bold text-[#2C2826] mb-4">
            Account Settings
          </h3>
          <div className="space-y-3">
            <Link
            href="/profile/change-password" 
            className=" flex flex-col w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] text-left hover:border-[#FF6B4A] transition-all">
              <p className="font-medium text-[#2C2826]">Change Password</p>
              <p className="text-sm text-[#6B6662]">Update your password</p>
            </Link>
            <Link
              href="/profile/change-email"
              className="flex flex-col w-full px-4 py-3 rounded-xl border-2 border-[#E5DDD3] text-left hover:border-[#FF6B4A] transition-all"
            >
              <p className="font-medium text-[#2C2826]">Change Email</p>
              <p className="text-sm text-[#6B6662]">Update your email</p>
            </Link>
            <Link 
            href="/"
            className=" flex flex-col w-full px-4 py-3 rounded-xl border-2 border-red-200 text-left hover:border-red-400 transition-all">
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-[#6B6662]">
                Permanently delete your account
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
