import { Formik, Form, useField } from "formik";
import { Select, SubmitButton } from "formik-antd";
import {
  soep,
  hartigBeleg,
  sandwiches,
  zoetBeleg,
  dessert,
  vetstof,
} from "../../data/data_keuze_formulieren.js";

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
      </div>
      <div>
        <Select {...field} {...props}      style={{ width: 155 }}></Select>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};
export default function BroodMaaltijdFormulier() {
  return (
    <>
      <Formik
        initialValues={{
          soep: "soep",
          sandwiches: sandwiches[0].value,
          hartigBeleg: hartigBeleg[0].value,
          zoetBeleg: zoetBeleg[0].value,
          vetstof: "vetstof",
          dessert: dessert[0].value,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MySelect
        
            label="Soep: "
            name="soep"
            options={soep}
          />
          <MySelect
      
            label="Sandwiches: "
            name="sandwiches"
            options={sandwiches}
          />
          <MySelect
       
            label="Hartig beleg: "
            name="hartigBeleg"
            options={hartigBeleg}
          />
          <MySelect
   
            label="Zoet beleg: "
            name="zoetBeleg"
            options={zoetBeleg}
          />
          <MySelect
    
            label="Vetstof: "
            name="vetstof"
            options={vetstof}
          />
          <MySelect
     
            label="Dessert: "
            name="dessert"
            options={dessert}
          />

          <SubmitButton>Bestellen</SubmitButton>
        </Form>
      </Formik>
    </>
  );
}
