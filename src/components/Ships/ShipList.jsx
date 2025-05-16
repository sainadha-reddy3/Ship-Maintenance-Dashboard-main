import React, { useContext } from "react";
import { useShips } from "../../contexts/ShipsContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ShipList = () => {
  const { ships, deleteShip } = useShips();
  const navigate = useNavigate();
  const { checkPermission } = useAuth();

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-bold">Ships</h2>
      {/* {checkPermission("canManageShips") && (
        <button className="mb-4">Add Ship</button>
      )} */}
      <table className="table-auto w-full mt-4 border">
        <thead>
          <tr>
            <th>Name</th>
            <th>IMO</th>
            <th>Flag</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ships.map((ship) => (
            <tr className="text-center" key={ship.id}>
              <td className="text-center">{ship.name}</td>
              <td className="text-center">{ship.imo}</td>
              <td className="text-center">{ship.flag}</td>
              <td className="text-center">{ship.status}</td>
              <td>
                <button
                  className="mr-2 cursor-pointer mt-2"
                  onClick={() => navigate(`/ships/${ship.id}`)}
                >
                  View{" "}
                </button>

                {checkPermission("canManageShips") && (
                  <>
                    <button
                      className="mr-2 cursor-pointer mt-2"
                      onClick={() => navigate(`/ships/edit/${ship.id}`)}
                    >
                      Edit{" "}
                    </button>
                    <button
                      className="mr-2 cursor-pointer mt-2"
                      onClick={() => deleteShip(ship.id)}
                    >
                      Delete{" "}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipList;
