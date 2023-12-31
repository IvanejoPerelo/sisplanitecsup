import { Card, EditAfp, Frame } from "../../components";
import { read } from "../../services";
import { useState, useEffect } from "react";

export default function ModiAfp() {
  const afp = [
    { title: "Nombre", action: false },
    { title: "Aporte (%)", action: false },
    { title: "Seguros (%)", action: false },
    { title: "Comisión Var. (%)", action: false },
    { title: "Estado", action: true },   
    {title: "Accion", action: true}, 
  ];

  const [detailTable, setDetailTable] = useState([]);

  const getTablaAfp = async () => {
    const response = await read(true, "afp");
    setDetailTable(response);
  };

  useEffect(() => {
    getTablaAfp();
  }, []);

  return (
  <>
  <Frame>
        <Card className={"mb-4"}>
          <div className="mb-3">
            <div className="w-full  text-white p-1 mt-3">
              <h1 className="bg-red-700 font-semibold text-xl px-2">
                Listado de AFP
              </h1>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-left pb-4">
              <span className="pr-3" for="table-search">
                Búsqueda de AFP: 
              </span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="busqueda de AFP"
                />
              </div>
            </div>
             <EditAfp header={afp} valuesAfp={detailTable}/>
          </div>
        </Card>
      </Frame>
  </>
  );
}
