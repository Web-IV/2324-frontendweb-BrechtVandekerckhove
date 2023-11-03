import { Formik, Form, useField } from "formik";
import { Select, FormItem, SubmitButton } from "formik-antd";
import { message } from "antd";
import {
  hoofdschotelOpties,
  dessertOpties,
  soepOpties,
} from "../../data/opties_maaltijdformulieren.js";
import * as Yup from "yup";

import Datepicker from "./Componenten/Datepicker.jsx";
import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../AsyncData.jsx";

const formItemLayout = { labelCol: { span: 5 }, labelAlign: "left" };

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormItem
        name={label}
        label={label}
        {...formItemLayout}
        style={{ marginBottom: "10px" }}
        validateStatus={meta.touched && meta.error ? "error" : null}
        help={meta.touched && meta.error ? meta.error : null}
      >
        <Select {...field} {...props}></Select>
       
      </FormItem>
    </>
  );
};

const validation = Yup.object().shape({
  leverdatum: Yup.date().required("Leverdatum is verplicht"),
  leverplaats: Yup.string().required("Leverplaats is verplicht"),
});

export default function WarmeMaaltijdFormulier({
  saveMaaltijd,
  initialValues,
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const showConfirmation = () => {
    messageApi.open({
      type: "success",
      content: "Maaltijd toegevoegd aan winkelmandje",
      duration: 3,
    });
  };

  const { data: diensten = [], isLoading, error } = useSWR("diensten", getAll);

  return (
    <div className="maaltijdFormulier">
      {contextHolder}
      <AsyncData loading={isLoading} error={error}>
        {!error ? (
      <Formik
        initialValues={
          initialValues
            ? { ...initialValues }
            : {
                hoofdschotel: hoofdschotelOpties[0].value,
                soep: soepOpties[0].value,
                dessert: dessertOpties[0].value,
                leverdatum: "",
                leverplaats:"",
              }
        }
        validationSchema={validation}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          saveMaaltijd({
            type: "warmeMaaltijd",
            ...data,
          });
          resetForm();
          setSubmitting(false);
          showConfirmation();
        }}
      >
        <Form>
          <MySelect
            label="Hoofdschotel"
            name="hoofdschotel"
            options={hoofdschotelOpties}
          />
          <MySelect label="Soep" name="soep" options={soepOpties} />
          <MySelect label="Dessert" name="dessert" options={dessertOpties} />
          <FormItem
            name="leverdatum"
            label="Leverdatum"
            {...formItemLayout}
            style={{ marginBottom: "10px" }}
          >
            {initialValues ? (
              <Datepicker
                huidigeDatumBewerkMaaltijd={initialValues.leverdatum}
              />
            ) : (
              <Datepicker />
            )}
          </FormItem>

          <MySelect
            label="Leverplaats"
            name="leverplaats"
            placeholder="Selecteer een dienst"
            options={diensten.map((dienst) => ({
              value: dienst.naam,
              label: dienst.naam,
            }))}
          />
          <SubmitButton disabled={false} className="blue">
            Voeg toe
          </SubmitButton>
        </Form>
      </Formik>): null}</AsyncData>
    </div>
  );
}
