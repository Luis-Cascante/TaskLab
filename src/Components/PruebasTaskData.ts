export type task = {
  id: number;
  title: string;
  employer: string;
  description: string;
  location: string;
  category: string;
  agreement: string;
};

const tasks: task[] = [
  {
    id: 1,
    title: "Reparación de tuberías",
    employer: "Manuel Perez",
    description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum. Tristique ultricies dictum interdum malesuada urna placerat eros non. Risus aliquam ut tortor posuere massa elementum at.",
    location: "Limón, Costa Rica",
    category: "Mantenimiento",
    agreement: "Pago unico"
  },
  {
    id: 2,
    title: "Cambio de ceramica",
    employer: "Pepe Juan",
    description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum. Tristique ultricies dictum interdum malesuada urna placerat eros non. Risus aliquam ut tortor posuere massa elementum at.",
    location: "San José, Costa Rica",
    category: "Mantenimiento",
    agreement: "Pago unico"
  },
  {
    id: 3,
    title: "Limpieza de vivienda",
    employer: "Raquel Gomez",
    description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum. Tristique ultricies dictum interdum malesuada urna placerat eros non. Risus aliquam ut tortor posuere massa elementum at.",
    location: "Puntarenas, Costa Rica",
    category: "Hogar",
    agreement: "Contrato mensual"
  },
  {
    id: 4,
    title: "Construcción de muebles",
    employer: "Carlos Sanchez",
    description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum. Tristique ultricies dictum interdum malesuada urna placerat eros non. Risus aliquam ut tortor posuere massa elementum at.",
    location: "San José, Costa Rica",
    category: "Construcción",
    agreement: "Pago unico"
  },
  {
    id: 5,
    title: "Tutoria de matemáticas",
    employer: "Emilia Rodriguez",
    description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum. Tristique ultricies dictum interdum malesuada urna placerat eros non. Risus aliquam ut tortor posuere massa elementum at.",
    location: "Heredia, Costa Rica",
    category: "Tutoria",
    agreement: "Pago por hora"
  },
  {
    id: 6,
    title: "Clases de inglés",
    employer: "Javier Martinez",
    description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum. Tristique ultricies dictum interdum malesuada urna placerat eros non. Risus aliquam ut tortor posuere massa elementum at.",
    location: "Cartago, Costa Rica",
    category: "Tutoria",
    agreement: "Contrato mensual"
  }
];

export default tasks