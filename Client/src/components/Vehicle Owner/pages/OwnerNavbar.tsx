import '../styles/OwnerNavbar.css';
// import styles from '../styles/Navbar.module.css';
import app_logo from '../../../assets/images/app_logo.jpg';
import default_user from '../../../assets/images/default_user.jpg';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Popover, Whisper } from 'rsuite';
import { useTranslation } from 'react-i18next';
// import NavDropdown from 'react-bootstrap/NavDropdown';

const OwnerNavbar = () => {
    const [t] = useTranslation('global');
    const speaker = (
        <Popover className="popover_custom">
            <div></div>
        </Popover>
    );

    return (
        <>
            <Navbar fixed="top" expand="lg" className="navbar_bg">
                {/* <Container> */}
                <Navbar.Brand href="/vehicle/dashboard">
                    <img src={app_logo} alt="logo" className="logo_img" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link> */}
                        <Nav.Link href="#">
                            {/* <div className="profile_box d-flex align-items-center">
                                <img
                                    src={default_user}
                                    alt="logo"
                                    className="profile_img"
                                />
                                <span className="profile_name">Admin</span>
                            </div> */}

                            <Whisper
                                placement="bottomEnd"
                                // trigger="active"
                                trigger="hover"
                                // controlId="control-id-active"
                                controlId="control-id-hover-enterable"
                                speaker={speaker}
                                enterable
                            >
                                <div className="profile_box">
                                    <img
                                        src={default_user}
                                        alt="user"
                                        className="profile_img"
                                    />
                                    {/* <span className="pro_name fw-semibold">
                                        {data?.name?.toLocaleUpperCase()}
                                    </span> */}
                                </div>
                            </Whisper>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {/* </Container> */}
            </Navbar>
        </>
    );
};

export default OwnerNavbar;
