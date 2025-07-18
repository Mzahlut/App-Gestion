import NavBar from '../Components/NavBar.jsx';
import ClientsGrid from '../Components/ClientsGrid.jsx';

export const ClientsPage = () => {


    
  return (
    <>
      <NavBar headerName = "Clients" type = "clients"/>
      <ClientsGrid />
    </>
  )
}
