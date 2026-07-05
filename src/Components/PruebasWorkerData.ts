export type worker = {
    id: number;
    name: string;
    profession: string;
    location: string;
    rating: number;
    description: string;
};

const workers: worker[] = [
    {
        id: 1,
        name: "Juan Pepe",
        profession: "Plomero",
        location: "San José, Costa Rica",
        rating: 4.5,
        description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum."
    },
    {
        id: 2,
        name: "María López",
        profession: "Enfermera",
        location: "Heredia, Costa Rica",
        rating: 4.8,
        description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum."
    },
    {
        id: 3,
        name: "Kevin Rodriguez",
        profession: "Electricista",
        location: "Guanacaste, Costa Rica",
        rating: 3.8,
        description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum."
    },
    {
        id: 4,
        name: "Ana Martínez",
        profession: "Profesora de Ingles",
        location: "Cartago, Costa Rica",
        rating: 4.2,
        description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum."
    },
    {
        id: 5,
        name: "Hugo Martinez",
        profession: "Carpintero",
        location: "Alajuela, Costa Rica",
        rating: 4.6,
        description: "Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum."
    },
];

export default workers