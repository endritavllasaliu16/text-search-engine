import React, { useEffect, useRef, useState } from "react";
import "./DropDown.css";
import DownArrow from "../Layout/DownArrow";

type DropdownProps = {
	title: string;
	items: string[];
	onItemSelected?: (item: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
	title,
	items,
	onItemSelected,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className='dropdown' ref={dropdownRef}>
			<div className='dropdown-header' onClick={() => setIsOpen(!isOpen)}>
				{title}
				<DownArrow />
			</div>
			{isOpen && (
				<ul className='dropdown-list'>
					{items.map((item, index) => (
						<li
							key={index}
							onClick={() => {
								setIsOpen(false);
								onItemSelected && onItemSelected(item);
							}}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
