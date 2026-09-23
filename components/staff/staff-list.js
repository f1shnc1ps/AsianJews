export default function StaffList({ name, qualification }) {
  return (
    <> 
      <tr>
        {name ? <td> {name} </td> : null}
        {qualification ? <td> {qualification} </td> : null}
      </tr>
    </>
  );
}
