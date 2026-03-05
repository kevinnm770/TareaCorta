//Kevin Naranjo Mendoza, Tarea corta, Programación Web 2

class Libro {
    constructor(titulo, autor, genero, anio) {
        this.titulo=titulo;
        this.autor=autor;
        this.genero=genero;
        this.anio=anio;
        this.disponible=true;
    }

    info() {
        return `${this.titulo} de ${this.autor} (${this.anio}) - ${this.disponible ? "Disponible" : "Prestado"}`;
    }
}

class Biblioteca {
    constructor(nombre) {
        this.nombre=nombre;
        this.libros=[];
    }

    agregarLibro(libro){
        let existe=false;
        this.libros.forEach(libro_biblioteca => {
            if(libro.titulo.toLowerCase() === libro_biblioteca.titulo.toLowerCase() &&
            libro.autor.toLowerCase() === libro_biblioteca.autor.toLowerCase()){
                console.log('El libro ya existe en la biblioteca');
                existe=true;
            }
        });
        if(!existe){
            this.libros.push(libro);
        }
        
    }

    buscarPorGenero(genero){
        let librosDe_genero=[];
        this.libros.forEach(libro => {
            if(libro.genero.toLowerCase()===genero.toLowerCase()){
                librosDe_genero.push(libro);
            }
        });

        return librosDe_genero;
    }

    prestar(titulo){
        this.libros.forEach(libro => {
            if(libro.titulo.toLowerCase()===titulo.toLowerCase()){
                if(!libro.disponible){
                    console.log("El libro no está disponible");
                }else{
                    libro.disponible=false;
                    console.log("El libro se ha prestado correctamente");
                }
            }
        });
        throw new Error('Libro no encontrado');
    }

    estadisticas(){
        let libros_disponibles=0, total_libros=0;
        this.libros.forEach(libro => {
            console.log(libro);
            if(libro.disponible){
                libros_disponibles++;
            }
            total_libros++;
        });
        console.log("Total de libros: "+total_libros);
        console.log("Libros disponibles: "+libros_disponibles);
        console.log("Libros disponibles: "+(total_libros-libros_disponibles));
    }
}

const miBiblioteca = new Biblioteca("Mi Biblioteca");

// Agregar 5 libros
miBiblioteca.agregarLibro(
  new Libro("Cien años de soledad", "García Márquez", "Ficción", 1967),
);
miBiblioteca.agregarLibro(
  new Libro("El código Da Vinci", "Dan Brown", "Thriller", 2003),
);
miBiblioteca.agregarLibro(
  new Libro("Breve historia del tiempo", "Stephen Hawking", "Ciencia", 1988),
);
miBiblioteca.agregarLibro(
  new Libro("Odisea en el espacio", "Arthur Clare", "Ciencia ficción", 1968),
);
miBiblioteca.agregarLibro(
  new Libro("El Alquimista", "Paulo Coelho", "Aventura", 1988),
);

// Duplicado (debe mostrar error)
miBiblioteca.agregarLibro(
  new Libro("El código Da Vinci", "Dan Brown", "Thriller", 2003),
);

// Prestar un libro y volver a intentarlo
try {
  miBiblioteca.prestar("Cien años de soledad");
  miBiblioteca.prestar("Cien años de soledad"); // ya prestado
} catch (error) {
  console.error("Error:", error.message);
}

// Buscar por género
const ciencia = miBiblioteca.buscarPorGenero("ciencia");
console.log(
  "Libros de Ciencia:",
  ciencia.map((l) => l.info()),
);

// Estadísticas
miBiblioteca.estadisticas();