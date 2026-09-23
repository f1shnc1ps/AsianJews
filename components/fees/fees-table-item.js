export default function FeesTableItem({ title, col1, col2, col3, col4 }) {
  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{col1}</td>
        <td>{col2}</td>
        <td>{col3}</td>
        <td>{col4}</td>
      </tr>
    </>
  );
}
