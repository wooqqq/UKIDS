import Footer from "./components/Footer";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const num: number = 1234;

  return (
    <>
      <div className="text-3xl text-blue-500">
        <h1>Hello World!</h1>
      </div>
      <div>{API_KEY}</div>
      <div>{num}</div>

      <Footer />
    </>
  );
}

export default App;
