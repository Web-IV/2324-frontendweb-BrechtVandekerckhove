import Loader from "./Loader";
import Error from "./Error";

export default function AsyncData({ loading, message, error, children }) {
  if (loading) {
    return <Loader message={message} />;
  }

  return (
    <>
      <Error error={error} />
      {children}
    </>
  );
}
