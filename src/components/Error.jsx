import { isAxiosError } from "axios";
import { Alert } from "antd";

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <Alert
        message="Oops, something went wrong"
        description={
          <p>
            {error.data?.message || error.message}
            {error.data?.details && (
              <>
                :
                <br />
                {JSON.stringify(error.data.details)}
              </>
            )}
          </p>
        }
        type="error"
        showIcon
      />
    );
  }

  if (error) {
    return (
      <Alert
        message="An unexpected error occured"
        type="error"
        description={error.message || JSON.stringify(error)}
        showIcon
      />
    );
  }
  return null;
}
