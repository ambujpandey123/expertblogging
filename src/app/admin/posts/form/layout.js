import PostFormContentProvider from "./contexts/postFormContext";

export default function Layout({ children }) {
    return (
       <PostFormContentProvider> {children} </PostFormContentProvider>
    );
}