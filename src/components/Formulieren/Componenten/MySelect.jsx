import { useField } from "formik";
import { Select, FormItem } from "formik-antd";

const formItemLayout = { labelCol: { span: 5 }, labelAlign: "left" };

export default function MySelect({ label, datacyWaarde, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <FormItem
        name={label}
        label={label}
        {...formItemLayout}
        className="formMargin"
        validateStatus={meta.touched && meta.error ? "error" : null}
        help={meta.touched && meta.error ? meta.error : null}
      >
        <Select
          {...field}
          {...props}
          data-cy={datacyWaarde}
          virtual={false}
        ></Select>
      </FormItem>
    </>
  );
}
