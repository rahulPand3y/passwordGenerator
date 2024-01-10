import { useEffect, useRef } from "react";
import { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "012345789";
    if (charAllow) str += "<>,.?/;:+_-[]{}@#$%^&*!";

    for (let index = 1; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

      setPassword(pass);
    }
  }, [length, numberAllow, charAllow, setPassword]);

  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charAllow, setPassword, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto h-auto shadow-md rounded-lg px-4 my-8 py-4 text-orange-500 bg-gray-700 ">
        <h1 className="text-2xl mx-3 py-3"> Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClip}
          >
            Copy
          </button>
        </div>
        <div className="flex item-center gap-x-2">
          <input
            type="range"
            defaultChecked={length}
            min={6}
            max={20}
            className="cursor-pointer"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="">length: {length}</label>
          <input
            type="checkbox"
            defaultChecked={numberAllow}
            id="numberInput"
            onChange={(e) => {
              setnumberAllow((prev) => !prev);
            }}
          />
          <label>number</label>
          <input
            type="checkbox"
            id="charInput"
            defaultChecked={charAllow}
            onChange={(e) => {
              setCharAllow((prev) => !prev);
            }}
          />
          <label htmlFor="">character</label>
        </div>
      </div>
    </>
  );
}

export default App;
