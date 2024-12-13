import CategoryFormContentProvider from "./contexts/categoryFormContext";

export default function Layout({ children }) {
    return (
       <CategoryFormContentProvider> {children} </CategoryFormContentProvider>
    );
}