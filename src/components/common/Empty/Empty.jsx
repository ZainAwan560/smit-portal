export default function Empty({ text = "No records found" }) {
  return <div className="empty-box">{text}</div>;
}
