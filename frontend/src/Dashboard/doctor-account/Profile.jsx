/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "./../../utils/uploadCloudinary";
import { BASE_URL, token } from "./../../config";
import { toast } from "react-toastify";

const Profile = ({ doctorsData }) => {
  const [formData, setFormData] = useState({
    name: doctorsData.name || "",
    email: doctorsData.email || "",
    phone: doctorsData.phone || "",
    gender: doctorsData.gender || "",
    specialization: doctorsData.specialization || "",
    ticketPrice: doctorsData.ticketPrice || 0,
    qualifications: doctorsData.qualifications || [],
    experiences: doctorsData.experiences || [],
    timeSlots: doctorsData.timeSlots || [],
    about: doctorsData.about || "",
    photo: doctorsData.photo || null,
  });

  useEffect(() => {
    setFormData({
      name: doctorsData?.name,
      email: doctorsData?.email,
      phone: doctorsData?.phone,
      gender: doctorsData?.gender,
      specialization: doctorsData?.specialization,
      ticketPrice: doctorsData?.ticketPrice,
      qualifications: doctorsData?.qualifications,
      experiences: doctorsData?.experiences,
      timeSlots: doctorsData?.timeSlots,
      about: doctorsData?.about,
      photo: doctorsData?.photo,
    });
  }, [doctorsData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorsData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...(prevFormData[key] || []), item], 
    }));
  };

  const handleReusableChangeFunc = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]]; 
      updateItems[index][name] = value; 
      return {
        ...prevFormData,
        [key]: updateItems, 
      };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addQualification = (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableChangeFunc("qualifications", index, event);
  };

  const handleDeleteQualification = (e, index) => {
    e.preventDefault();

    deleteItem("qualifications", index);
  };

  const addExperience = (e) => {
    e.preventDefault();

    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleReusableChangeFunc("experiences", index, event);
  };

  const handleDeleteExperience = (e, index) => {
    e.preventDefault();

    deleteItem("experiences", index);
  };

  const addTimeSlots = (e) => {
    e.preventDefault();

    addItem("timeSlots", { day: "", startingTime: "", endingTime: "" });
  };

  const handleTimeSlotsChange = (event, index) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateTimeSlots = [...prevFormData.timeSlots];
      updateTimeSlots[index][name] = value;

      return {
        ...prevFormData,
        timeSlots: updateTimeSlots,
      };
    });
  };

  const handleDeleteTimeSlots = (event, index) => {
    event.preventDefault();

    deleteItem("timeSlots", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
            readOnly
            aria-readonly="true"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form_label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <p className="form_label">Specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange} // Fixed formData.gender to formData.specialization
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>

            <div>
              <p className="form_label">Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                className="form__input"
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label">Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">University*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => handleDeleteQualification(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addQualification}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Qualification
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Hospital*</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => handleDeleteExperience(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addExperience}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Experience
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-col-4 mb-[30px] gap-5">
                  <div>
                    <p className="form__label">Day*</p>
                    <select
                      name="day"
                      value={item.day}
                      className="form__input py-3.5"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    >
                      <option value="select">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thusday">Thuday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form__label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="form__input"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="form__input"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => handleDeleteTimeSlots(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] mb-[30px] cursor-pointer mt-6"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addTimeSlots}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Time Slots
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form__input"
          ></textarea>
        </div>

        <div className="mb-5 flex item items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />

            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
