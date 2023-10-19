import { Formik, Form, useField } from "formik";
import { Select, FormItem, SubmitButton, DatePicker } from "formik-antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import {
  hoofdschotelOpties,
  dessertOpties,
  soepOpties,
} from "../../data/opties_maaltijdedformulieren.js";
import * as Yup from "yup";
import useSWRMutation from "swr/mutation";
import { save } from "../../api";
import Error from "../Error";

const formItemLayout = { labelCol:{span:5}, labelAlign: "left" };

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormItem name={label} label={label} {...formItemLayout} style={{ marginBottom: "10px" }}>
        <Select {...field} {...props}></Select>
      </FormItem>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const disabledDate = (current) => {
  const dagenInVerledenEnVandaag = current < dayjs().endOf("day");
  //hier dynamisch instellen
  const dagenReedsBestelling = [dayjs("2023-10-20"), dayjs("2023-10-24")];

  return (
    (current && dagenInVerledenEnVandaag) ||
    dagenReedsBestelling.some((date) => current.isSame(date, "day"))
  );
};

const validation = Yup.object().shape({
  leverdatum: Yup.date().required("Leverdatum is verplicht"),
});

export default function BroodMaaltijdFormulier() {
  const { trigger: saveBestelling, error: saveError } = useSWRMutation(
    "bestellingen",
    save
  );

  return (
    <div
     className="maaltijdFormulier"
    >
      <Error error={saveError} />
      <Formik
        initialValues={{
          hoofdschotel: hoofdschotelOpties[0].value,
          soep: soepOpties[0].value,
          dessert: dessertOpties[0].value,
          leverdatum: "",
        }}
        validationSchema={validation}
        //medewerker en id maaltijd is nu hardcoded, maar moeten dynamisch worden
        onSubmit={async (data, { setSubmitting }) => {
          await saveBestelling({
            medewerker: {
              id: "5",
              naam: "test",
              voornaam: "test2",
              dienst: "Labo",
            },
            maaltijden: [{ id: "99", type: "warmeMaaltijd", ...data }],
          });
          setSubmitting(false);
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
          <FormItem name="leverdatum" label="Leverdatum" {...formItemLayout} >
            <DatePicker
              name="leverdatum"
              format="DD-MM-YYYY"
              disabledDate={disabledDate}
              placeholder="Selecteer een datum"
              style={{ width: "100%" }}
            />
          </FormItem>
        
          <SubmitButton disabled={false} className="blue">Voeg toe</SubmitButton>
      
        </Form>
      </Formik>
    </div>
  );
}
