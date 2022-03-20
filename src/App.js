import ToastProvider from './Context/toast/Provider';
import UserProvider from './Context/user/Provider';
import ThemeProvider from './Context/theme/Provider';
import RouterApp from './RouterApp';

const App = () => {
    return (
        <ThemeProvider>
            <ToastProvider>
                <UserProvider>
                    <RouterApp />
                </UserProvider>
            </ToastProvider>
        </ThemeProvider>
    )
}

export default App;
