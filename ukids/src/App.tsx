function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const num: number = 1234;

  return (
    <>
      <div className="text-3xl text-blue-500">
        <h1>Hello World!</h1>
      </div>
      <div>{API_KEY}</div>
      <div>{num}</div>
    </>
  );
}

export default App;
