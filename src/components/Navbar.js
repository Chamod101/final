import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="navbar navbar-expand-lg  navbar-dark bg-dark">
            <div className="container-fluid">

                <div className="navbar-brand" href="#"><h2>Management System</h2></div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/department" className="nav-link active" aria-current="page">Department</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/employee" className="nav-link active" aria-current="page">Employee</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}