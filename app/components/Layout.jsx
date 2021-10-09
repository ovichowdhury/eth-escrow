import Link from 'next/link'

function Layout({ children }) {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img src="/logo.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                    &nbsp;
                    Naive Escrow
                </a>

                <div id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active p-2">
                            <Link className="nav-link" href="/">Depositor Portal</Link>
                        </li>
                        <li className="nav-item p-2">
                            <Link className="nav-link" href="/admin">Arbitror Portal</Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
            {children}

        </div>
    )
}

export default Layout;