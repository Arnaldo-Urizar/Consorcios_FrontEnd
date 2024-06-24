import {useState } from 'react';
import Wave from "../../../components/wave/Wave";
import Navbar from "../../../components/navbar/Navbar";
import { Alert } from '../../../components/alert/Alert';
import './UserTable.css';

import UserData from '../../../models/UserData';
import UserCreate from '../../../models/UserCreate';
import UserUpdate from '../../../models/UserUpdate';
import UserActive from '../../../models/UserActive';


function UserTable() {

  const defaultUserData: UserData = {
    id: 0, firstname: "", lastname: "",email: "",dni: 0, phone: 0,username: "", active: false
  }

  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState(defaultUserData); 

  //Modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showMessageOK, setShowMessageOK] = useState({message: "", isActive: false});
  const [showError, setShowError] = useState({message: "", isActive: false});

  //Obtener token de sesion storage
  const authToken = sessionStorage.getItem('token');

  //Fetch POST
  const genericDataFetch = async (method:string, formData: UserCreate | UserUpdate | UserActive, url: string)=>{
    try{
        const response = await fetch(url,{  
            method: method,
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(formData)
        });

        if(response.ok){
            const data = await response.json();
            setShowMessageOK({message: data.message, isActive: true})
            return data
        }
        throw new Error(`Error: ${response.status}`);  
        
    }catch(error){
      setShowError({message: error.message, isActive: true}) 
    } 
  }


  // Obtiene id de usuario a Editar
  const handleEdit = (userId : number) => {
    const user = users.find(user => user.id === userId);
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  // Función para manejar la acción de mostrar las facturas de un usuario
  const handleInvoice = (userId: number) => {
    alert(`Facturas del usuario con ID: ${userId}`);
  };

  //------------------Modales-------------------------//
  // Función para cerrar modal de Error
  const handleClosedModal= ()=>{
    setShowMessageOK({message: "", isActive: false})
    setShowError({message: "", isActive: false})
  }
  // Función para cerrar el modal de editar usuario
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentUser(defaultUserData);
  };
  // Función para abrir el modal de agregar usuario
  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };
  // Función para cerrar el modal de agregar usuario
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

 //-------------------CRUD----------------------------// 

  //Obtener usuarios
  const handleGetUsers = async()=>{
    try{
        const response = await fetch("http://localhost:8080/users/active",{  
            method: "GET",
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
        });
        if(response.ok){
            const data = await response.json();
            setUsers(data.users);
            return;
        }
        throw new Error(`Error: ${response.status}`);  
    }catch(error){  
      setShowError({message: error.message , isActive: true})
    }
  }
  // Agregar usuario 
  const handleSubmitAddUser = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    //Object.fromEntries: convierte el formData en objeto clave-valor.
    const createUser = Object.fromEntries(formData.entries()) as unknown as UserCreate;

    createUser.dni = Number(createUser.dni);
    createUser.phone = Number(createUser.phone);

    await genericDataFetch("POST", createUser, `http://localhost:8080/users/register`);
    setIsAddModalOpen(false);

  };
  // Editar usuario
  const handleSubmitEditUser = async(event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedUser = Object.fromEntries(formData.entries()) as unknown as UserUpdate;

    updatedUser.dni = Number(updatedUser.dni);
    updatedUser.phone = Number(updatedUser.phone);

    await genericDataFetch("PUT",updatedUser, `http://localhost:8080/users/${updatedUser.id}`);
    setIsEditModalOpen(false);
    setCurrentUser(defaultUserData); 
  };

  // Hbilitar/Inhabilitar usuario
  const handleDisable = async (userId: number) => {

    //identifica el usuario, guarda el nuevo estado en newStatus
    const newStatus = users.filter(user => user.id === userId)
    .map(user => !user.active)

    const formData : UserActive = {
      id: userId,
      active: newStatus[0]
    }
    await genericDataFetch("PUT",formData,`http://localhost:8080/users/desactive/${formData.id}`);
  };

  return (
    <>
      <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
      <Navbar />
      <section className="user-table-section">
        <div className="user-table-container">
        <button className="show-button" onClick={handleGetUsers}>Mostrar Usuarios</button>
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
                  <th>Nombre de Usuario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.dni}</td>
                    <td>{user.phone}</td>
                    <td>{user.active ? "Activo ": "Inactivo"}</td>
                    <td>{user.username}</td> {/* Mostrar el nombre de usuario */}
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(user.id)}>Editar</button>
                      <button
                        className={`disable-button ${user.active === false ? 'enable-button' : ''}`}
                        onClick={() => handleDisable(user.id)}
                      >
                      {user.active === true ? 'Inhabilitar' : 'Habilitar'}
                      </button>
                      <button className="invoice-button" onClick={() => handleInvoice(user.id)}>Facturas</button>
                    </td>
                  </tr>
                ))
              }
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
                  Nombre:
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
                  <input type="text" name="firstName" defaultValue={currentUser.firstname} required />
                </label>
                <label>
                  Apellido:
                  <input type="text" name="lastName" defaultValue={currentUser.lastname} required />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" defaultValue={currentUser.email} required />
                </label>
                <label>
                  DNI:
                  <input type="number" name="dni" defaultValue={currentUser.dni} required />
                </label>
                <label>
                  Celular:
                  <input type="number" name="phone" defaultValue={currentUser.phone} required />
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
      {showError.isActive &&(
          <Alert
          title="No se pudo completar la acción"
          description={showError.message }
          btn="Aceptar"
          show={showError.isActive}
          onClose={handleClosedModal}
          ></Alert>          
      )}
      {showMessageOK.isActive &&(
          <Alert
          title="Operación exitosa"
          description={showMessageOK.message }
          btn="Aceptar"
          show={showMessageOK.isActive}
          onClose={handleClosedModal}
          ></Alert>          
      )}        
    </>
  );
}

export default UserTable;
