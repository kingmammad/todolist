import { useState, useEffect } from "react";
function getLocalStorageData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading data from local storage: ", error);
    return null;
  }
}
export default function App() {
  let [todo, settodo] = useState(() => {
    let date = getLocalStorageData("todo");
    return date || [];
  });
  const [input, setinpute] = useState("");
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const handleinput = (e) => {
    setinpute(e.target.value);
  };
  const handletodo = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      const newtodo = {
        id: Date.now(),
        text: input,
        complete: false,
      };
      settodo([newtodo, ...todo]);

      setinpute("");
    }
  };

  const handlecomplete = (id) => {
    settodo((pre) =>
      pre.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );
    console.log(id);
  };
  const clickdelate = (id) => {
    settodo(todo.filter((todo) => todo.id !== id));
  };
  return (
    <div className="h-screen transition-all bg-slate-800 ">
      <header className="text-3xl font-bold ">
        <h1 className="header">Todo list Mohammad</h1>
      </header>
      <main className="main h-full flex flex-col justify-between items-center">
        <div className="box max-sm:w-9/12 max-md:w-7/12">
          <form onSubmit={handletodo}>
            <div className="flex mb-10">
              <input
                value={input}
                onChange={handleinput}
                placeholder="please write your task..."
                className="input"
              />
              <button type="submit" onClick={handletodo} className="button">
                Add
              </button>
            </div>
          </form>
          {
            todo.length===0? <h2 className=" text-center text-white font-['kalam']">!آدم تنبل هیچ لیستی نداری  همین الان اد کن و انجام بدی</h2>:''
          }
          <ul className="flex font-['kalam'] flex-col gap-3 p-4">
            {todo.length > 0
              ? todo.map((res) => (
                  <li
                    key={res.id}
                    className={`flex w-full items-center ml-4 rounded-md  ${
                      res.complete
                        ? ` bg-green-600 font-semibold`
                        : `bg-blue-950`
                    }  p-2 `}
                  >
                    <span
                      className={`flex-grow ${
                        res.complete
                          ? `text-slate-950 line-through`
                          : `text-white`
                      }`}
                    >
                      {res.text}
                    </span>
                    <button
                      onClick={() => handlecomplete(res.id)}
                      className="hover"
                    >
                      ✔️
                    </button>
                    <button
                      onClick={() => clickdelate(res.id)}
                      className="hover"
                    >
                      ❌
                    </button>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div className="text-center  opacity-70">
        <h3>
          ©All Right reseved{" "}
          <a
            className="  text-slate-600 hover:text-blue-500"
            href="https://github.com/kingmammad"
          >
            Mohammad Amiri
          </a>
        </h3>
      </div>
      </main>
    </div>
  );
}
