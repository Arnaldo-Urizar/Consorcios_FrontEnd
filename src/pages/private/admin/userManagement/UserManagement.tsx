import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../service/AuthContext';
//Modelo de datos
import { UserData,UserCreate,UserUpdate,UserActive } from '../../../../models/generals';
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
    idUser: 0, firstName: "", lastName: "", dni: 0, phone: 0, username: "", status: "INACTIVE"
  }
  // Estados de Usuario
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState(defaultUserData);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [allUsers, setAllUsers] = useState<UserData[]>([]); //Almacena usuarios sin filtrar 
  //Modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showMessageOK, setShowMessageOK] = useState({ message: "", isActive: false });
  const [showError, setShowError] = useState({ message: "", isActive: false });
  const [showWarning, setShowWarning] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8); //Cantidad de usuarios por página
  
  useEffect(() => {
    handleGetUsers();
  }, [])

  useEffect(() => {
    handleSearch(); // Realiza la búsqueda cuando cambia el valor del input
  }, [searchValue]); // Se ejecuta cada vez que cambia el valor de búsqueda


  // Obtiene id de usuario a Editar
  const handleEdit = (userId: number) => {
    const user = users.find(user => user.idUser === userId)
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
        const getAllUsers = await getUsers(token)
        setUsers(getAllUsers);
        setAllUsers(getAllUsers); // Almacena la lista completa de usuarios
        sessionStorage.setItem('users', JSON.stringify(users))
      }else{
        setUsers(JSON.parse(storedUsers));
        setAllUsers(JSON.parse(storedUsers)); // Almacena la lista completa de usuarios
      }
      setCurrentPage(1); // Reinicia la página a 1 cuando se cargan los usuarios
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
      const userUdated = await updateUser(token, currentUser.idUser, updatedUser)
      setShowMessageOK({ message: userUdated.message, isActive: true })
      setIsEditModalOpen(false);
      setCurrentUser(defaultUserData);

      const updatedUsers = users.map(user => 
        user.idUser === currentUser.idUser ? { ...user, ...updatedUser } : user
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
      const newStatus = users.filter(user => user.idUser === selectedUser)
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
        user.idUser === selectedUser ? { ...user, status: newStatus } : user
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
  const handleSearch = () => {
    const dataSearch: string | number = isNaN(Number(searchValue))
      ? searchValue
      : Number(searchValue);

    if (!dataSearch || dataSearch.toString().trim() === '') {
      setUsers(allUsers); // Restaurar la lista original de usuarios
    } else {
      // Filtrar los usuarios locales
      const filteredUsers = allUsers.filter((user) => {
        const userDni = user.dni.toString(); // Convertir DNI a cadena
        const searchTerm = dataSearch.toString(); // Convertir término de búsqueda a cadena

        return (
          user.firstName.toLowerCase().includes(dataSearch.toString().toLowerCase()) ||
          user.lastName.toLowerCase().includes(dataSearch.toString().toLowerCase()) ||
          userDni.includes(searchTerm) || // Comparar DNI como cadena
          user.phone.toString().includes(searchTerm) // Comparar teléfono como cadena
        );
      });
      setUsers(filteredUsers); // Actualiza el estado con los usuarios filtrados
    }
    setCurrentPage(1); // Reinicia la paginación al realizar una búsqueda
  };

  // Reinicia valores de busqueda
  const handleClearSearch = () => {
    setSearchValue(''); // Limpiar el campo de búsqueda
    setUsers(allUsers); // Restaura la lista original de usuarios
    setCurrentPage(1); // Reiniciar la paginación
  };

  // Calcula los usuarios actuales a mostrar según la página
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  console.log(users)
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Cambia de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <>
      <section className="user-table-section">
        <div className="user-table-container">          
          <div className="general_actions">
            <div className="search-clean">
              <button className="clean-button" onClick={handleClearSearch}><MdCleaningServices/></button>
              <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="inputSearch"
                  type="text"
                  name="search"
                  placeholder="Dni o Nombre"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="button" className="btn_search" onClick={handleSearch}>Buscar</button>
              </form>
            </div>
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
                  <th>Usuario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* {users.map(user => ( */}
                {currentUsers.map(user => (
                  <tr key={user.idUser}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.dni}</td>
                    <td>{user.phone}</td>
                    <td>{user.status === "ACTIVE" ? "Activo" : "Inactivo"}</td>
                    <td>{user.username}</td> {/* Mostrar el nombre de usuario */}
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(user.idUser)}>Editar</button>
                      <button
                        className={`disable-button ${user.status === "INACTIVE" ? 'enable-button' : ''}`}
                        onClick={() => handleDisableClick(user.idUser)}
                      >
                        {user.status === "ACTIVE" ? 'Inhabilitar' : 'Habilitar'}
                      </button>
                      <button className="invoice-button" onClick={() => handleInvoice(user.idUser)}>Facturas</button>
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>

          {/* Controles de paginación */}
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
              {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === Math.ceil(users.length / usersPerPage)}>Siguiente</button>
            </div>
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
                  <input type="text" name="firstName" defaultValue={currentUser.firstName} required />
                </label>
                <label>
                  Apellido:
                  <input type="text" name="lastName" defaultValue={currentUser.lastName} required />
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
                  Usuario:
                  <input type="text" name="username" defaultValue={currentUser.username} required />
                </label>
                {/* <label>
                  Estado:
                  <input type="text" name="status" defaultValue={currentUser.status} required />
                </label>                 */}
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
