import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSurvey } from "../redux/surveySlice";

const CreateSurvey = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(createSurvey({ name, description }));

    if (createSurvey.fulfilled.match(resultAction)) {
      const surveyId = resultAction.payload.id; // Ensure this is valid
      navigate(`/edit-survey/${surveyId}`);
    } else {
      console.error("Failed to create survey: ", resultAction.payload);
      // Handle error state or display error message to user
    }
  };

  return (
    <div className="container">
      <div className="mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Create Survey</h2>
        <form onSubmit={handleSubmit} className="needs-validation">
          <div className="mb-3">
            <label htmlFor="surveyName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="surveyName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Please provide a survey name.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="surveyDescription" className="form-label">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="surveyDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;
