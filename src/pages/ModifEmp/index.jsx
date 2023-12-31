import { Card, Frame, ModalEmp } from "../../components";
import { read } from "../../services";
import { useState, useEffect } from "react";

export default function ModifEmp() {
  const header = [
    { title: "Foto", action: false },
    { title: "DNI", action: false },
    { title: "Apellidos y Nombres", action: false },
    { title: "Cargo", action: false },
    { title: "Estado", action: false },
    { title: "Accion", action: true },
  ];
  const urlNumber = false;
  const url = "empleados";
  const [detailTable, setDetailTable] = useState([]);
  const [textBusqueda, setTextBusqueda] = useState("");

  const handleInputChangeSearch = (e) => {
    setTextBusqueda(e.target.value);
  };

  const getEmp = async () => {
    const response = await read(urlNumber, url);
    setDetailTable(response);
  };

  const filterSearch = async () => {
    const response = await read(urlNumber, url);
    const filter = response.filter(
      (row) =>
        row.dni.toLowerCase().includes(textBusqueda.toLowerCase()) ||
        row.nombres.toLowerCase().includes(textBusqueda.toLowerCase()) ||
        row.apellido_p.toLowerCase().includes(textBusqueda.toLowerCase()) ||
        row.apellido_m.toLowerCase().includes(textBusqueda.toLowerCase())
    );

    setDetailTable(filter);
  };

  // useEffect(() => {
    
  // }, []);

  useEffect(() => {
    getEmp();
    filterSearch();
  }, [textBusqueda]);

  return (
    <>
      <Frame wmiddle={"w-[800px]"}>
        <Card className={"mb-4"} key="card-emp">
          <div className="mb-3">
            <div className="w-full  text-white p-1 mt-3">
              <h1 className="bg-gray-700 font-semibold text-xl px-2 text-center">
                Listado de Empleados
              </h1>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-left pb-4">
              <span className="pr-3" for="table-search">
                Búsqueda de Trabajadores:
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
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="busqueda"
                  value={textBusqueda}
                  onChange={handleInputChangeSearch}
                />
              </div>
            </div>
            <div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {header.map((head) => (
                      <th scope="col" className="px-4 py-3" key={head.title}>
                        {head.title}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {detailTable.map((value) => (
                    <tr
                      key={value.dni}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th scope="row" className="px-4 py-4">
                        {value.sexo === "M" ? (
                          <img src="./src/assets/hombre.png" className="w-10" />
                        ) : (
                          <img src="./src/assets/mujer.png" className="w-10" />
                        )}
                      </th>
                      <td className="px-4 py-4 font-medium text-gray-900  dark:text-gray-900 hover:text-white">
                        {" "}
                        {value.dni}
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-900  dark:text-gray-900">
                        {value.apellido_p} {value.apellido_m}, {value.nombres}
                      </td>
                      <td className="px-4 py-4">{value.cargo}</td>
                      <td
                        className={`${
                          value.estado === "A"
                            ? "text-blue-950 font-medium"
                            : "text-gray-500"
                        } px-4 py-4`}
                      >
                        {value.estado === "A" ? "Activo" : "Inactivo"}
                      </td>
                      <ModalEmp value={value} getEmp={getEmp} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </Frame>
    </>
  );
}
