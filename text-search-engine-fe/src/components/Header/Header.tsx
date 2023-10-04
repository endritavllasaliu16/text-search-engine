import { Link } from "react-router-dom";

import Container from "../Container/Container";
import Dropdown from "../DropDown/Dropdown";

import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { API_BASE_URL } from "../../config/api";
import UploadModal from "../Upload/UploadModal";
import { useDocumentContext } from "../../context/DocumentContext";

type HeaderProps = {
	onTitleClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({ onTitleClick }) => {
	const { logout } = useAuth();
	const [showModal, setShowModal] = useState(false);
	const { setTriggerReload } = useDocumentContext();

	const handleItemSelection = (item: string) => {
		if (item === "Log out") {
			logout();
		}
	};

	const uploadFiles = async (files: FileList) => {
		try {
			const token = localStorage.getItem("authToken");
			if (!token) {
				throw new Error("No authentication token found");
			}

			const formData = new FormData();
			for (let i = 0; i < files.length; i++) {
				formData.append("pdfFiles", files[i], files[i].name);
			}

			const response = await fetch(`${API_BASE_URL}/upload`, {
				method: "POST",
				headers: new Headers({ Authorization: `Bearer ${token}` }),
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Upload failed");
			}
			setTriggerReload(true);
		} catch (error) {
			console.error("Upload error:", error);
		}
	};

	return (
		<>
			<header>
				<Container>
					<div className='header-content'>
						<Link
							to='/dashboard'
							className='logo'
							onClick={onTitleClick}
						>
							TSE
						</Link>
						<nav className='nav'>
							<Link to='/dashboard' onClick={onTitleClick}>
								Documents
							</Link>
							<button onClick={() => setShowModal(true)}>
								Upload
							</button>
							<Dropdown
								title='User Profile'
								items={["Log out"]}
								onItemSelected={handleItemSelection}
							/>
						</nav>
					</div>
				</Container>
			</header>
			<UploadModal
				show={showModal}
				onClose={() => setShowModal(false)}
				onFileSubmit={uploadFiles}
			/>
		</>
	);
};

export default Header;
