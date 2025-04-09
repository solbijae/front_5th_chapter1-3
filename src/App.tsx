import { Providers } from "./context/providers.tsx";
import { Header } from "./components/Header";
import { NotificationSystem } from "./components/NotificationSystem";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { ThemedBackground } from "./components/themedBackground";

// 메인 App 컴포넌트
const App = () => {
  return (
    <Providers>
      <ThemedBackground>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </ThemedBackground>
    </Providers>
  );
};

export default App;
