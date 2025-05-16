// src/pages/ShipDetailPage.jsx
import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useShips } from "../../contexts/ShipsContext";
import ComponentList from "../Components/ComponentList";

const ShipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ships } = useShips();

  const ship = ships.find((s) => s.id === id);

  if (!ship) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Ship not found</h2>
        <button
          className="mt-2 text-blue-600 underline"
          onClick={() => navigate("/ships")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={() => navigate("/ships")}
        className="text-blue-600 underline"
      >
        ← Back to Ships
      </button>

      <div className="border p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-2">{ship.name}</h2>
        <p>
          <strong>IMO Number:</strong> {ship.imo}
        </p>
        <p>
          <strong>Flag:</strong> {ship.flag}
        </p>
        <p>
          <strong>Status:</strong> {ship.status}
        </p>
      </div>

      <ComponentList shipId={ship.id} />
    </div>
  );
};

export default ShipDetailPage;
