interface NotificationProps {
  message: string | null;
  type: string | null;
}

const Notification = ({ message, type }: NotificationProps) => {
  if (message == null || message === "") {
    return null;
  }

  if (type === "notification") {
    return <div className="my-4 bg-slate-200 text-green-600 ">{message}</div>;
  } else if (type === "error") {
    return <div className="my-4 bg-slate-300 text-red-600">{message}</div>;
  }

  return null;
};

export default Notification;
