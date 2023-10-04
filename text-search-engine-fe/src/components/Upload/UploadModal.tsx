import React, { useRef } from "react";

import "./UploadModal.css";

interface Props {
	show: boolean;
	onClose: () => void;
	onFileSubmit: (files: FileList) => void;
}

const UploadModal: React.FC<Props> = ({ show, onClose, onFileSubmit }) => {
	const fileInput = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		if (fileInput.current?.files) {
			onFileSubmit(fileInput.current.files);
			onClose();
		}
	};

	if (!show) return null;

	return (
		<div className='modal-overlay'>
			<div className='modal'>
				<form className='modal-form'>
					<span className='modal-form-title'>
						Upload your pdf file
					</span>
					<p className='modal-form-paragraph'>
						File should be an text pdf
					</p>
					<label htmlFor='file-input' className='drop-container'>
						<span className='drop-title'>Drop files here</span>
						or
						<input
							type='file'
							ref={fileInput}
							accept='.pdf'
							multiple
							id='file-input'
						/>
					</label>
				</form>
				<div className='modal-actions'>
					<button onClick={onClose} className='modal-btn close-btn'>
						<span>CLOSE</span>
					</button>
					<button onClick={handleSubmit} className='modal-btn'>
						<span>SUBMIT</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default UploadModal;
