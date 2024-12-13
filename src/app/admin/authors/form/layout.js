import AuthorFormContentProvider from "./contexts/authorFormContext";

export default function Layout({ children }) {
    return (
       <AuthorFormContentProvider> {children} </AuthorFormContentProvider>
    );
}