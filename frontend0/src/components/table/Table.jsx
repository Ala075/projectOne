import { useNavigate } from "react-router-dom";
import "./Table.css";

const Table = ({ headers, data, edit, deleteFn, userId }) => {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          {headers.map((header, index) => (
            <th key={index}>
              {header.charAt(0).toUpperCase() + header.slice(1)}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            {headers.map((header, index) =>
              header === "products" ? (
                <td key={index}>
                  {item.products.map((p) => (
                    <span style={{ display: "block" }} key={p._id}>{p.product}</span>
                  ))}
                </td>
              ) : (
                <td key={index}>{item[header]}</td>
              )
            )}
            {item._id === userId ? (
              <td>"You"</td>
            ) : (
              <td>
                <button className="edit" onClick={() => edit(item)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteFn(item._id)}>
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={headers.length + 2}>
            <button onClick={() => navigate("/")}>Back</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
