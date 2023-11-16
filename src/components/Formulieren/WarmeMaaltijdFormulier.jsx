import { Formik, Form } from "formik";
import { FormItem, SubmitButton } from "formik-antd";
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
import MySelect from "./Componenten/MySelect.jsx";

const formItemLayout = { labelCol: { span: 5 }, labelAlign: "left" };



const validation = Yup.object().shape({
  leverdatum: Yup.date().required("Leverdatum is verplicht"),
  leverplaats: Yup.string().required("Leverplaats is verplicht"),
});

export default function WarmeMaaltijdFormulier({
  saveMaaltijd,
  dienstnaam,
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
                    leverplaats: dienstnaam
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
                datacyWaarde="select_warmeMaaltijd_hoofdschotel"
                options={hoofdschotelOpties}
              />
              <MySelect
                label="Soep"
                name="soep"
                datacyWaarde="select_warmeMaaltijd_soep"
                options={soepOpties}
              />
              <MySelect
                label="Dessert"
                name="dessert"
                datacyWaarde="select_warmeMaaltijd_dessert"
                options={dessertOpties}
              />
              <FormItem
                name="leverdatum"
                label="Leverdatum"
               
                {...formItemLayout}
                className="formMargin"
              
              >
                {initialValues ? (
                  <Datepicker  datacyWaarde="select_warmeMaaltijd_leverdatum"
                    huidigeDatumBewerkMaaltijd={initialValues.leverdatum}
                  />
                ) : (
                  <Datepicker datacyWaarde="select_warmeMaaltijd_leverdatum"/>
                )}
              </FormItem>

              <MySelect
                label="Leverplaats"
                name="leverplaats"
                datacyWaarde="select_warmeMaaltijd_leverplaats"
                placeholder="Selecteer een dienst"
                options={diensten.map((dienst) => ({
                  value: dienst.naam,
                  label: dienst.naam,
                }))}
              />
              <SubmitButton
                disabled={false}
                data-cy="submit_warmeMaaltijd"
                className="blue"
              >
                Voeg toe
              </SubmitButton>
            </Form>
          </Formik>
        ) : null}
      </AsyncData>
    </div>
  );
}
