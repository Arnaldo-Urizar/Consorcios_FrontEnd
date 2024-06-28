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
    id_user: 0, firstname: "", lastname: "", dni: 0, phone: 0, username: "", status: "INACTIVE"
  }

  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState(defaultUserData); 

  //Modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showMessageOK, setShowMessageOK] = useState({message: "", isActive: false});
  const [showError, setShowError] = useState({message: "", isActive: false});

  //Obtener token de sesion storage
  let authToken = sessionStorage.getItem('token');
  if (authToken) {
    authToken = authToken.replace(/^"(.*)"$/, '$1');
  }

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
            return data;
        }
        throw new Error(`Error: ${response.status}`);  
        
    }catch(error){
      setShowError({message: error.message, isActive: true}) 
    } 
  }


  // Obtiene id de usuario a Editar
  const handleEdit = (userId : number) => {
    const user = users.find(user => user.id_user === userId);
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
        const response = await fetch("http://localhost:8080/users",{  
            method: "GET",
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
        });
        if(response.ok){
            const data = await response.json();
            setUsers(data);
            console.log(data)
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

    console.log(updatedUser);

    await genericDataFetch("PUT",updatedUser, `http://localhost:8080/users/update?id=${currentUser.id_user}`);
    setIsEditModalOpen(false);
    setCurrentUser(defaultUserData); 
  };

  // Hbilitar/Inhabilitar usuario
  const handleDisable = async (userId: number) => {

    //identifica el usuario, guarda el nuevo estado en newStatus
    const newStatus = users.filter(user => user.id_user === userId)
    .map(user => user.status == "ACTIVE" ? "INACTIVE" : "ACTIVE") [0];

    const formData : UserActive = {
      id_user: userId,
      status: newStatus
    }

    await genericDataFetch("PUT",formData,`http://localhost:8080/users/toggle-activation?id=${formData.id_user}&status=${formData.status}`);
  };

  return (
    <>
      <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
      <Navbar />
      <section className="user-table-section">
        <div className="user-table-container">
          <button className="show-button" onClick={handleGetUsers}>Mostrar Usuarios</button>
          <button className="add-button" onClick={handleAddUser}>Agregar Usuario</button>
          <input className="input" placeholder='Buscar usuario por nombre o dni'></input> {/* Mejorar buscador "localhost:8080/users/search?dni=212" "localhost:8080/users/search?name=arni" */}
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>DNI</th>
                  <th>Celular</th>
                  <th>Estado</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id_user}>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.dni}</td>
                    <td>{user.phone}</td>
                    <td>{user.status === "ACTIVE" ? "Activo" : "Inactivo"}</td>
                    <td>{user.username}</td> {/* Mostrar el nombre de usuario */}
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(user.id_user)}>Editar</button>
                      <button
                        className={`disable-button ${user.status === "INACTIVE" ? 'enable-button' : ''}`}
                        onClick={() => handleDisable(user.id_user)}
                      >
                      {user.status === "ACTIVE" ? 'Inhabilitar' : 'Habilitar'}
                      </button>
                      <button className="invoice-button" onClick={() => handleInvoice(user.id_user)}>Facturas</button>
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
                  <input type="text" name="firstname" required />
                </label>
                <label>
                  Apellido:
                  <input type="text" name="lastname" required />
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
                  Email:
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
                  <input type="text" name="firstname" defaultValue={currentUser.firstname} required />
                </label>
                <label>
                  Apellido:
                  <input type="text" name="lastname" defaultValue={currentUser.lastname} required />
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
                  Email:
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
