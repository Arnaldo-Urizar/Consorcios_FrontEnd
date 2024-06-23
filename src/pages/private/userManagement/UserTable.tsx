import {useState } from 'react';
import Wave from "../../../components/wave/Wave";
import './UserTable.css';
import Navbar from "../../../components/navbar/Navbar";
import { Alert } from '../../../components/alert/Alert';

import UserData from '../../../models/UserData';
import UserCreate from '../../../models/UserCreate';
import UserUpdate from '../../../models/UserUpdate';
import UserActive from '../../../models/UserActive';


function UserTable() {

  const defaultUserData: UserData = {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    dni: 0,
    phone: 0,
    username: "",
    active: false
  }


  const [users, setUsers] = useState<UserData[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(defaultUserData); 


  const [loading, setLoading] = useState(false);
  const [showMessageOK, setShowMessageOK] = useState({message: "", isActive: false});
  const [showError, setShowError] = useState({message: "", isActive: false});



  const handleClosedModal= ()=>{
    setShowMessageOK({message: "", isActive: false})
    setShowError({message: "", isActive: false})

  }

  //Obtener token de sesion storage
  const authToken = sessionStorage.getItem('token');

  const genericDataFetch = async (formData: UserCreate | UserUpdate | UserActive, url: string)=>{
    setLoading(true);
    try{
        const response = await fetch(url,{  
            method: "POST",
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
        throw new Error(`Error response fetch: ${response.status}`);  
        
    }catch(error){
      setShowError({message: error.message, isActive: true})
    } finally {
      setLoading(false);
    }    
  }

  //Obtener lista de usuarios
  const handleGetUsers = async()=>{
    setLoading(true);
    try{
        const response = await fetch("https://530a16d0-bac8-41f6-bdb2-8658632a0ab1.mock.pstmn.io/users",{  
            method: "GET",
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
        });

        if(response.ok){
            const data = await response.json();
            setShowMessageOK({message: data.message, isActive: true})
            setUsers(data.users);
            console.log(data.users)
            return 
        }
        throw new Error(`Error response fetch: ${response.status}`);  
        
    }catch(error){
      console.log(error)
      setShowError({message: error.message, isActive: true})
    } finally {
      setLoading(false);
    }   
  }
  
  // Función para manejar la edición de un usuario
  const handleEdit = (userId : number) => {
    const user = users.find(user => user.id === userId);
    setCurrentUser(user);
    setIsEditModalOpen(true);
    console.log("se obtuvo el usuario con id: " + userId)
  };

  // Función para cambiar el estado (Activo/Inactivo) de un usuario
  const handleDisable = async (userId: number) => {

    //identifica el usuario, guarda el nuevo estado en newStatus
    const newStatus = users.filter(user => user.id === userId)
    .map(user => !user.active)

    console.log("nuevo estado")
    console.log(newStatus)
    const formData : UserActive = {
      id: userId,
      active: newStatus[0]
    }
    console.log("formdata")
    console.log(formData)
    // await genericDataFetch(formData,"url");
  };

  // Función para manejar la acción de mostrar las facturas de un usuario
  const handleInvoice = (userId: number) => {
    alert(`Facturas del usuario con ID: ${userId}`);
  };



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

  // Función para manejar la lógica de agregar usuario (submit del formulario)
  const handleSubmitAddUser = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const createUser : UserCreate = {
      username: formData.get('username') as string,
      firstname: formData.get('firstName') as string,
      lastname: formData.get('lastName') as string,
      dni: Number(formData.get('dni')),
      phone: Number(formData.get('phone')),
      password: formData.get('password') as string
    };
    console.log(createUser)
    await genericDataFetch(createUser, "https://530a16d0-bac8-41f6-bdb2-8658632a0ab1.mock.pstmn.io/createuser");
    setIsAddModalOpen(false);
  };

  // Función para manejar la lógica de editar usuario (submit del formulario)
  const handleSubmitEditUser = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const updatedUser : UserUpdate = {
      id: currentUser.id,
      firstname: formData.get('firstName') as string,
      lastname: formData.get('lastName') as string,
      dni: Number( formData.get('dni')),
      phone: Number(formData.get('phone')),
      username: formData.get('username') as string
    };
    await genericDataFetch(updatedUser, "rutaaaa");
    setIsEditModalOpen(false);
    setCurrentUser(defaultUserData); 
  };

  return (
    <>
      <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
      <Navbar />
      <section className="user-table-section">
        <div className="user-table-container">
          <button className="add-button" onClick={handleAddUser}>Agregar Usuario</button>
          <button className="add-button" onClick={handleGetUsers}>Mostrar Usuarios</button>
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
      {showMessageOK.isActive &&(
          <Alert
          title=""
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
