const users = [
  {
    username: "admin",
    email: "admin@admin.com",
    password: "admin",
    nombre: "Lucas",
    apellido: "Moretti",
    provincia: null,
    localidad: null,
    avatar: null,
    telefono: "ddd",
    domicilio: null,
    recpass: null,
    activo: true,
    roles: [{ id: 2, role: "ADMIN" }], // "ADMIN","USUARIO","EMPLEADO","INVITADO"
    modulos: [
      { id: 1, modulo: "PRODUCTOS_A" },
      { id: 5, modulo: "ESTADISTICAS_A" },
    ],
  },
  {
    username: "tester",
    email: "tester@tester.com",
    password: "tester",
    nombre: "Test",
    apellido: "User",
    provincia: null,
    localidad: null,
    avatar: null,
    telefono: "ddd",
    domicilio: null,
    recpass: null,
    activo: true,
    roles: [{ id: 2, role: "TESTER" }],
    modulos: [
      { id: 1, modulo: "PRODUCTOS_R" },
      { id: 5, modulo: "ESTADISTICAS_R" },
      { id: 5, modulo: "MOVIMIENTOS_R" },
    ],
  },
];
