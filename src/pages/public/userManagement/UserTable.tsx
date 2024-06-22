import React, { useState } from 'react';
import Wave from "../../../components/wave/Wave";
import './UserTable.css';
import Navbar from "../../../components/navbar/Navbar";

const initialUsers = [
  { id: 1, firstName: 'Juan Carlos', lastName: 'Pérez', email: 'juan.perez@gmail.com', status: 'Activo', password: '123123', username: 'Carlos.ema23', dni: '12345678', phone: '555-1234' },
  { id: 2, firstName: 'Ana Maria', lastName: 'Gómez', email: 'ana.gomez@gmail.com', status: 'Activo', password: '121321323', username: 'Maria.ana89', dni: '87654321', phone: '555-5678' },
];

function UserTable() {
  const [users, setUsers] = useState(initialUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Función para manejar la edición de un usuario
  const handleEdit = (userId) => {
    const user = users.find(user => user.id === userId);
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  // Función para cambiar el estado (Activo/Inactivo) de un usuario
  const handleDisable = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: user.status === 'Activo' ? 'Inactivo' : 'Activo' } : user
    ));
  };

  // Función para manejar la acción de mostrar las facturas de un usuario
  const handleInvoice = (userId) => {
    alert(`Facturas del usuario con ID: ${userId}`);
  };

  // Función para abrir el modal de agregar usuario
  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };

  // Función para cerrar el modal de agregar usuario
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Función para cerrar el modal de editar usuario
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentUser(null);
  };

  // Función para manejar la lógica de agregar usuario (submit del formulario)
  const handleSubmitAddUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUser = {
      id: users.length + 1,
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      dni: formData.get('dni'),
      phone: formData.get('phone'),
      status: formData.get('status'),
      username: formData.get('username')
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
  };

  // Función para manejar la lógica de editar usuario (submit del formulario)
  const handleSubmitEditUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = {
      id: currentUser.id,
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      dni: formData.get('dni'),
      phone: formData.get('phone'),
      status: formData.get('status'),
      username: formData.get('username')
    };
    setUsers(users.map(user =>
      user.id === currentUser.id ? updatedUser : user
    ));
    setIsEditModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <>
      <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
      <Navbar />
      <section className="user-table-section">
        <div className="user-table-container">
          <button className="add-button" onClick={handleAddUser}>Agregar Usuario</button>
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>DNI</th>
                  <th>Celular</th>
                  <th>Estado</th>
                  <th>Contraseña</th>
                  <th>Nombre de Usuario</th> {/* Nueva columna */}
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.dni}</td>
                    <td>{user.phone}</td>
                    <td>{user.status}</td>
                    <td>{user.password}</td>
                    <td>{user.username}</td> {/* Mostrar el nombre de usuario */}
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

        {/* Modal para agregar usuario */}
        {isAddModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Agregar Usuario</h2>
              <form onSubmit={handleSubmitAddUser}>
                <label>
                  Primer Nombre:
                  <input type="text" name="firstName" required />
                </label>
                <label>
                  Apellido:
                  <input type="text" name="lastName" required />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" required />
                </label>
                <label>
                  Contraseña:
                  <input type="password" name="password" required />
                </label>
                <label>
                  DNI:
                  <input type="text" name="dni" required />
                </label>
                <label>
                  Celular:
                  <input type="text" name="phone" required />
                </label>
                <label>
                  Estado:
                  <select name="status" required>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </label>
                <label>
                  Nombre de Usuario:
                  <input type="text" name="username" required />
                </label>
                <button type="button" onClick={handleCloseAddModal}>Cerrar</button>
                <button type="submit">Agregar</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal para editar usuario */}
        {isEditModalOpen && currentUser && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Editar Usuario</h2>
              <form onSubmit={handleSubmitEditUser}>
                <label>
                  Nombre:
                  <input type="text" name="firstName" defaultValue={currentUser.firstName} required />
                </label>
                <label>
                  Apellido:
                  <input type="text" name="lastName" defaultValue={currentUser.lastName} required />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" defaultValue={currentUser.email} required />
                </label>
                <label>
                  Contraseña:
                  <input type="text" name="password" defaultValue={currentUser.password} required />
                </label>
                <label>
                  DNI:
                  <input type="text" name="dni" defaultValue={currentUser.dni} required />
                </label>
                <label>
                  Celular:
                  <input type="text" name="phone" defaultValue={currentUser.phone} required />
                </label>
                <label>
                  Estado:
                  <select name="status" defaultValue={currentUser.status} required>
                    <option value="Inactivo">Activo</option>
                    <option value="Activo">Inactivo</option>
                  </select>
                </label>
                <label>
                  Nombre de Usuario:
                  <input type="text" name="username" defaultValue={currentUser.username} required />
                </label>
                <button type="button" onClick={handleCloseEditModal}>Cerrar</button>
                <button type="submit">Guardar</button>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default UserTable;
