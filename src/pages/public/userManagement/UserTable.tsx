import React, { useState } from 'react';
import Wave from "../../../components/wave/Wave";
import './UserTable.css';
import Navbar from "../../../components/navbar/Navbar";

const initialUsers = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', status: 'Activo' },
  { id: 2, name: 'Ana Gómez', email: 'ana.gomez@example.com', status: 'Activo' },
];

function UserTable() {
  const [users, setUsers] = useState(initialUsers);

  const handleEdit = (userId) => {
    // Lógica para editar usuario
    alert(`Editar usuario con ID: ${userId}`);
  };

  const handleDisable = (userId) => {
    // Lógica para inhabilitar usuario
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: user.status === 'Activo' ? 'Inactivo' : 'Activo' } : user
    ));
  };

  const handleInvoice = (userId) => {
    // Lógica para manejar facturas del usuario
    alert(`Facturas del usuario con ID: ${userId}`);
  };

  return (
    <>
      <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
      <Navbar />
      <section className="user-table-section">
        <div className="user-table-container">
          <button className="add-button">Agregar Usuario</button>
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(user.id)}>Editar</button>
                      <button
                        className={`disable-button ${user.status === 'Inactivo' ? 'enable-button' : ''}`}
                        onClick={() => handleDisable(user.id)}
                      >
                        {user.status === 'Activo' ? 'Inhabilitar' : 'Habilitar'}
                      </button>
                      <button className="invoice-button" onClick={() => handleInvoice(user.id)}>Facturas</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserTable;
