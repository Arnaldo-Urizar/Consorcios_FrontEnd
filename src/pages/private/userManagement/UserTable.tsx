import {useContext, useState } from 'react';
import Wave from "../../../components/wave/Wave";
import Navbar from "../../../components/navbar/Navbar";
import { Alert } from '../../../components/alert/Alert';
import './UserTable.css';
import UserData from '../../../models/UserData';
import UserCreate from '../../../models/UserCreate';
import UserUpdate from '../../../models/UserUpdate';
import UserActive from '../../../models/UserActive';
import { getUsers , updateUser, addUser, stateUser} from '../../../service/requests';
import { AuthContext } from '../../../service/AuthContext';

function UserTable() {

  const {userState} = useContext(AuthContext)
  const token = userState.token

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


  // Obtiene id de usuario a Editar
  const handleEdit = (userId : number) => {
    const user = users.find(user => user.id_user === userId);
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  //Mostrar facturas de usuario
  const handleInvoice = (userId: number) => {
    alert(`Facturas del usuario con ID: ${userId}`);
  };

  //------------------Modales-------------------------//
  // Cerrar modal de Error
  const handleClosedModal= ()=>{
    setShowMessageOK({message: "", isActive: false})
    setShowError({message: "", isActive: false})
  }
  // Cerrar modal de editar usuario
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentUser(defaultUserData);
  };
  // Abrir modal de agregar usuario
  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };
  // Cerrar modal de agregar usuario
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

 //-------------------CRUD----------------------------// 

  //Obtener usuarios
  const handleGetUsers = async()=>{
    try{
      const users = await getUsers(token)
      setUsers(users);
    }catch(e){
      setShowError({message: e.message , isActive: true})
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

    try{
      const userAdded= await addUser(token,createUser)
      setShowMessageOK({message: userAdded.message, isActive: true});
      setIsAddModalOpen(false);
    }catch(e){
      setShowError({message: e.message, isActive: true});
    }

  };
  // Editar usuario
  const handleSubmitEditUser = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedUser = Object.fromEntries(formData.entries()) as unknown as UserUpdate;

    updatedUser.dni = Number(updatedUser.dni);
    updatedUser.phone = Number(updatedUser.phone);

    try{
      const userUdated = await updateUser(token,currentUser.id_user,updatedUser)
      setShowMessageOK({message: userUdated.message, isActive: true})
      setIsEditModalOpen(false);
      setCurrentUser(defaultUserData); 
    }catch(e){
      setShowError({message: e.message, isActive: true}) 
    }    
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
    try{
      const stateUpdated = await stateUser(token,formData.id_user,formData.status)
      setShowMessageOK({message: stateUpdated.message, isActive: true})
    }catch(e){
      setShowError({message: e.message, isActive: true}) 
    }
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
