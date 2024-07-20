import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSurvey, updateSurvey } from "../redux/surveySlice";

import { FormBuilder as FormBuilderIo, Formio } from "react-formio";
import { formIoData } from "./consts";
import "./styles.css";
import "react-form-builder2/dist/app.css";
import "formiojs/dist/formio.full.css";

export default function EditSurvey() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    dispatch(fetchSurvey(id));
  }, [dispatch, id]);

  const survey = useSelector((state) => state.survey.survey);
  const [formData, setFormData] = useState(formIoData);

  useEffect(() => {
    if (survey.components) {
      setFormData({
        ...formIoData,
        components: survey.components.map((c) => ({
          ...c.component_details,
          id: c.id,
        })),
      });
    }
  }, [survey]);

  const printResult = async () => {
    const components = formData.components.map(({ ...rest }) => rest);

    // Ensure that the components data is mutable
    Formio.createForm(document.getElementById("formio-result"), {
      components: components,
    }).then((form) => {
      form.on("submit", (data) => console.log("submit", data));

      dispatch(
        updateSurvey({
          id: survey.id,
          name: survey.name,
          description: survey.description,
          components_attributes: components,
        })
      ).then(() => {
        setSuccessMessage("Form saved successfully!"); // Set success message on save
        setTimeout(() => {
          setSuccessMessage(""); // Clear the success message after 3 seconds
        }, 3000);
      });
    });
  };

  return (
    <div className="App">
      <h2>Edit Design Page</h2>
      <div>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <FormBuilderIo
          form={formData}
          onSubmit={(data) => {
            console.log(data);
          }}
          saveForm={(data) => setFormData(data)}
          saveText="Save Form"
          onSubmitDone={(data) => console.log("Form saved", data)}
        />
        <div style={{ display: "none" }}>
          <div id="formio-result" />
        </div>
        <button className="btn btn-primary" onClick={printResult}>
          Save Custom Form
        </button>
      </div>
    </div>
  );
}
