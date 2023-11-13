import { Formik, Form } from "formik";
import {  FormItem, SubmitButton } from "formik-antd";
import { message } from "antd";
import {
  hartigBelegOpties,
  sandwichesOpties,
  zoetBelegOpties,
  dessertOpties,
  vetstofOpties,
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

export default function BroodMaaltijdFormulier({
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
                    typeSandwiches: sandwichesOpties[0].value,
                    soep: soepOpties[0].value,
                    hartigBeleg: hartigBelegOpties[0].value,
                    zoetBeleg: zoetBelegOpties[0].value,
                    vetstof: vetstofOpties[0].value,
                    dessert: dessertOpties[0].value,
                    leverdatum: "",
                    leverplaats: "",
                  }
            }
            validationSchema={validation}
            onSubmit={(data, { resetForm, setSubmitting }) => {
              saveMaaltijd({
                type: "broodMaaltijd",
                ...data,
              });
              resetForm();
              setSubmitting(false);
              showConfirmation();
            }}
          >
            <Form>
              <MySelect
                label="Sandwiches"
                name="typeSandwiches"
                datacyWaarde="select_broodMaaltijd_sandwiches"
                options={sandwichesOpties}
              />
              <MySelect
                label="Soep"
                name="soep"
                datacyWaarde="select_broodMaaltijd_soep"
                options={soepOpties}
              />
              <MySelect
                label="Hartig beleg"
                name="hartigBeleg"
                datacyWaarde="select_broodMaaltijd_hartigBeleg"
                options={hartigBelegOpties}
              />
              <MySelect
                label="Zoet beleg"
                name="zoetBeleg"
                datacyWaarde="select_broodMaaltijd_zoetBeleg"
                options={zoetBelegOpties}
              />
              <MySelect
                label="Vetstof"
                name="vetstof"
                datacyWaarde="select_broodMaaltijd_vetstof"
                options={vetstofOpties}
              />
              <MySelect
                label="Dessert"
                name="dessert"
                datacyWaarde="select_broodMaaltijd_dessert"
                options={dessertOpties}
              />
              <FormItem
                name="leverdatum"
                label="Leverdatum"
                {...formItemLayout}
                className="formMargin"
              >
                {initialValues ? (
                  <Datepicker
                    datacyWaarde="select_broodMaaltijd_leverdatum"
                    huidigeDatumBewerkMaaltijd={initialValues.leverdatum}
                  />
                ) : (
                  <Datepicker datacyWaarde="select_broodMaaltijd_leverdatum" />
                )}
              </FormItem>
              <MySelect
                label="Leverplaats"
                name="leverplaats"
                datacyWaarde="select_broodMaaltijd_leverplaats"
                placeholder="Selecteer een dienst"
                options={diensten.map((dienst) => ({
                  value: dienst.naam,
                  label: dienst.naam,
                }))}
              />
              <SubmitButton
                disabled={false}
                className="blue"
                data-cy="submit_broodMaaltijd"
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
