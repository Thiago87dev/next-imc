"use client";

import { useEffect, useState } from "react";

const Imc = () => {
  const [peso, setPeso] = useState<number | string>("");
  const [altura, setAltura] = useState<number | string>("");
  const [resultadoImc, setResultadoImc] = useState<number | null>(null);
  const [classificacao, setClassificacao] = useState<string | null>(null);

  useEffect(() => {
    if (resultadoImc !== null) {
      setClassificacao(classificarImc(resultadoImc));
    }
  }, [resultadoImc]);

  const classificarImc = (imc: number) => {
    if (imc > 39.9) {
      return "Obesidade grave";
    } else if (imc > 30) {
      return "Obesidade";
    } else if (imc > 25) {
      return "Sobrepeso";
    } else if (imc > 18.5) {
      return "normal";
    } else {
      return "magreza";
    }
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();

    const pesoN = Number(peso);
    const alturaN = Number(altura);

    if (isNaN(pesoN) || isNaN(alturaN) || pesoN === 0 || alturaN === 0) {
      setResultadoImc(null);
      setClassificacao(null);
      return;
    }

    const imc = (pesoN / (alturaN * alturaN)).toFixed(2);
    setResultadoImc(Number(imc));
  };

  const resetar = (e: React.FormEvent) => {
    e.preventDefault();

    setResultadoImc(null);
    setClassificacao(null);
    setPeso("");
    setAltura("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl mb-6 text-center text-white">Calculadora de IMC</h1>
      <form className="border-solid border-2 border-rosa h-[35rem] p-6 rounded-md">
        <div className="flex justify-around"></div>
        <div className="flex flex-col h-2/4 justify-around">
          <div className="flex flex-col">
            <label className="text-dourado" htmlFor="input_peso">
              Peso
            </label>
            <input
              id="input_peso"
              value={peso}
              className="rounded-sm h-12 p-4 text-rosa text-xl border-solid border-4 border-transparent focus:outline-none focus:border-dourado focus:border-4"
              type="number"
              placeholder="Peso (KG)"
              autoComplete="off"
              onChange={(e) => {
                setPeso(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-dourado" htmlFor="input_altura">
              Altura
            </label>
            <input
              id="input_altura"
              value={altura}
              className="rounded-sm h-12 p-4  text-rosa text-xl border-solid border-4 border-transparent focus:outline-none focus:border-dourado focus:border-4"
              type="number"
              placeholder="altura (m)"
              autoComplete="off"
              onChange={(e) => {
                setAltura(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-around">
          <button
            onClick={calculate}
            className="border-solid text-white border-2 border-rosa rounded-md p-1 mt-4  w-24"
          >
            Calcular
          </button>
          <button
            onClick={resetar}
            className="border-solid text-white border-2 border-dourado rounded-md w-24 p-1 mt-4"
          >
            Resetar
          </button>
        </div>
        {resultadoImc && (
          <div className="mt-6 flex justify-center items-center text-white h-20 text-3xl">
            Seu imc é: {resultadoImc}
          </div>
        )}
        {classificacao && (
          <div className="flex justify-center h-1/4 text-white text-3xl">
            {classificacao}
          </div>
        )}
      </form>
    </main>
  );
};

export default Imc;
