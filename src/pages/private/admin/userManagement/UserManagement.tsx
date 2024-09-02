import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../service/AuthContext';
//Modelo de datos
import UserData from '../../../../models/UserData';
import UserCreate from '../../../../models/UserCreate';
import UserUpdate from '../../../../models/UserUpdate';
import UserActive from '../../../../models/UserActive';
//Fetch
import { getUsers, updateUser, addUser, stateUser} from '../../../../service/requests';
// Modales y estilos
import { Alert } from '../../../../components/alert/Alert';
import { Warning } from '../../../../components/warning/Warning';
import { MdCleaningServices } from "react-icons/md";
import './userManagement.css';


function UserManagement() {
  const { userState } = useContext(AuthContext)
  const token = userState.token

  const defaultUserData: UserData = {
    id_user: 0, firstname: "", lastname: "", dni: 0, phone: 0, username: "", status: "INACTIVE"
  }

  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState(defaultUserData);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  //Modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showMessageOK, setShowMessageOK] = useState({ message: "", isActive: false });
  const [showError, setShowError] = useState({ message: "", isActive: false });
  const [showWarning, setShowWarning] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    handleGetUsers();
  }, [])

  // Obtiene id de usuario a Editar
  const handleEdit = (userId: number) => {
    const user = users.find(user => user.id_user === userId)
    if (user) {
      setCurrentUser(user);
      setIsEditModalOpen(true);
    } else {
      // Manejar el caso en que no se encuentra el usuario
      console.error("Usuario no encontrado");
    }
  };

  //Mostrar facturas de usuario
  const handleInvoice = (userId: number) => {
    alert(`Facturas del usuario con ID: ${userId}`);
  };

  //------------------Modales-------------------------//
  //Modal de Error
  const handleClosedModal = () => {
    setShowMessageOK({ message: "", isActive: false })
    setShowError({ message: "", isActive: false })
    setShowWarning(false)
  }
  // Modal editar usuario
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentUser(defaultUserData);
  };
  // Modal agregar usuario (Abrir)
  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };
  // Modal de agregar usuario (Cerrar)
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };
  // Estado de usuario (Habilitado/Deshabilitado)
  const handleDisableClick = (userId: number) => {
    setSelectedUser(userId);
    setShowWarning(true);
  }
  //-------------------CRUD---------------------------// 

  //Obtener usuarios
  const handleGetUsers = async () => {
    // Obtine usuarios desde Session Storage, Si no existen realiza solicitud al servidor
    try {
      const storedUsers = sessionStorage.getItem('users'); 
      if(!storedUsers){
        const users = await getUsers(token)
        setUsers(users);
        sessionStorage.setItem('users', JSON.stringify(users))
      }else{
        setUsers(JSON.parse(storedUsers));
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      setShowError({ message: errorMessage, isActive: true });      
    }
  }
  // Agregar usuario 
  const handleSubmitAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    //Convierte el formData en objeto clave-valor.
    const createUser = Object.fromEntries(formData.entries()) as unknown as UserCreate;
    createUser.dni = Number(createUser.dni);
    createUser.phone = Number(createUser.phone);

    try {
      const userAdded = await addUser(token, createUser)
      setShowMessageOK({ message: userAdded.message, isActive: true });
      setIsAddModalOpen(false);

      // Actualizar lista de usuarios
      const updatedUsers = await getUsers(token)
      setUsers(updatedUsers);
      // Actualiza session storage
      sessionStorage.setItem('users', JSON.stringify(updatedUsers));

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      setShowError({ message: errorMessage, isActive: true });  
    }finally{
      setLoading(false);
      handleCloseAddModal()
    }
  };
  // Editar usuario
  const handleSubmitEditUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const updatedUser = Object.fromEntries(formData.entries()) as unknown as UserUpdate;

    updatedUser.dni = Number(updatedUser.dni);
    updatedUser.phone = Number(updatedUser.phone);

    try {
      const userUdated = await updateUser(token, currentUser.id_user, updatedUser)
      setShowMessageOK({ message: userUdated.message, isActive: true })
      setIsEditModalOpen(false);
      setCurrentUser(defaultUserData);

      const updatedUsers = users.map(user => 
        user.id_user === currentUser.id_user ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers);
      
      // Actualiza session Storage
      sessionStorage.setItem('users', JSON.stringify(updatedUsers));

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      setShowError({ message: errorMessage, isActive: true });  
    }finally{
      setLoading(false);
      handleCloseEditModal()
    }
  };
  // Hbilitar/Inhabilitar usuario
  const handleAcceptStatus = async () => {
    setLoading(true);
    //identifica el usuario, guarda el nuevo estado en newStatus
    if (selectedUser !== null) {
      const newStatus = users.filter(user => user.id_user === selectedUser)
        .map(user => user.status == "ACTIVE" ? "INACTIVE" : "ACTIVE")[0];

      const formData: UserActive = {
        id_user: selectedUser,
        status: newStatus
      }
      try {
        const stateUpdated = await stateUser(token, formData.id_user, formData.status)
        setShowMessageOK({ message: stateUpdated.message, isActive: true })
        setIsConfirm(false)

      // Actualiza la lista de usuarios localmente
      const updatedUsers = users.map(user =>
        user.id_user === selectedUser ? { ...user, status: newStatus } : user
      );
      setUsers(updatedUsers);
      // Actualiza `Session Storage`
      sessionStorage.setItem('users', JSON.stringify(updatedUsers));

      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        setShowError({ message: errorMessage, isActive: true });  
      }
      finally {
        setIsConfirm(false);
        setLoading(false);
      }
    }
    setShowWarning(false);
  }
  // Busqueda de Usuarios
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataSearch: string | number = isNaN(Number(searchValue)) ? searchValue : Number(searchValue);

    if (!dataSearch || dataSearch.toString().trim() === '') { //trim -> elimina espacios en blanco principio y final del texto.
      // Restaurar la lista original de usuarios
      await handleGetUsers();
    } else {
      // Filtrar los usuarios locales
      const filteredUsers = users.filter((user) => {
        return (
          user.firstname.includes(dataSearch.toString()) ||
          user.lastname.includes(dataSearch.toString()) ||
          user.dni === dataSearch ||
          user.phone === dataSearch
        );
      });
    // Actualizar el estado con los usuarios filtrados
    setUsers(filteredUsers);
    }
  }

  const handleClearSearch = async() => {
    setSearchValue('');
    await handleGetUsers();
  };

  return (
    <>
      <section className="user-table-section">
        <div className="user-table-container">
          <div className='general_actions'>
            <form className="searchForm" onSubmit={handleSearch}>
              <input
                className="inputSearch"
                type='text' name="search"
                placeholder='Dni o Nombre'
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={(e) => e.key === 'Escape' && handleClearSearch()}
              ></input>
              <button type="submit" className='btn_search'>Buscar</button>
              <button className="clean-button" onClick={handleClearSearch}><MdCleaningServices/></button>
            </form>
            <button className="add-button" onClick={handleAddUser}>Agregar Usuario</button>
          </div>

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
                        onClick={() => handleDisableClick(user.id_user)}
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
                  <input type="email" name="username" required />
                </label>
                <button type="button" onClick={handleCloseAddModal}>Cerrar</button>
                <button type="submit" disabled={loading}>{loading ? "Cargando..." : "Agregar"}</button>
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
                <button type="submit" disabled={loading}>{loading ? "Cargando..." : "Guardar"}</button>
              </form>
            </div>
          </div>
        )}
      </section>
      {showError.isActive && (
        <Alert
          title="No se pudo completar la acción"
          description={showError.message}
          btn="Aceptar"
          show={showError.isActive}
          onClose={handleClosedModal}
        ></Alert>
      )}
      {showMessageOK.isActive && (
        <Alert
          title="Operación exitosa"
          description={showMessageOK.message}
          btn="Aceptar"
          show={showMessageOK.isActive}
          onClose={handleClosedModal}
        ></Alert>
      )}
      {showWarning && (
        <Warning
          description="¿Estas seguro de modificar el estado?"
          accept="Aceptar"
          cancel="Cancelar"
          show={showWarning}
          onClose={handleClosedModal}
          onOpen={handleAcceptStatus}
        ></Warning>
      )}
    </>
  );
}

export default UserManagement;
