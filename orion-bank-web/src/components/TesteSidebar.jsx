import './TesteSidebar.css'
// adicionar import de icones

// https://www.youtube.com/watch?v=0lQtoOaBHIo 

function TopNav() {

  return (

    <div> 
    {/* class container ta dando ruin */}

        <nav className='nav'>
            <h2>OrionBank</h2>
            <ul>

                <li>Notificações</li>
                <li>Configurações</li>
            </ul>
        </nav>

        <div className='sidebar_content'>
            <div className='sidebar-container'>
                <div className='nav-option inicio'>
                    <i>Icone</i>
                    <h3>Inicio</h3>
                </div>
                <div className='nav-option extrato'>
                    <i>Icone</i>
                    <h3>Extrato</h3>
                </div>
                <div className='nav-option transf'>
                    <i>Icone</i>
                    <h3>Transferencias</h3>
                </div>
                <div className='nav-option pix'>
                    <i>Icone</i>
                    <h3>Area Pix</h3>
                </div>
                <div className='nav-option conta'>
                    <i>Icone</i>
                    <h3>Conta</h3>
                </div>
            </div>
        </div>

        
    </div>
    
  );
}

export default TopNav;