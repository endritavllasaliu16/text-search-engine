import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useMemo,
} from "react";

type DocumentContextType = {
	documents: Document[];
	setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
	triggerReload: boolean;
	setTriggerReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const DocumentContext = createContext<DocumentContextType | undefined>(
	undefined,
);

export const useDocumentContext = () => {
	const context = useContext(DocumentContext);
	if (!context) {
		throw new Error(
			"useDocumentContext must be used within a DocumentProvider",
		);
	}
	return context;
};

type DocumentProviderProps = {
	children: ReactNode;
};

export const DocumentProvider: React.FC<DocumentProviderProps> = ({
	children,
}) => {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [triggerReload, setTriggerReload] = useState(false);

	const contextValue = useMemo(() => {
		return { documents, setDocuments, triggerReload, setTriggerReload };
	}, [documents, triggerReload]);

	return (
		<DocumentContext.Provider value={contextValue}>
			{children}
		</DocumentContext.Provider>
	);
};
