// Definición de la clase Curso
class Curso {
    constructor(nombre, materias) {
      this.nombre = nombre;
      this.materias = materias;
    }
  }
  
  // Definición de la clase Alumno
  class Alumno {
    constructor(nombre, apellidos, edad, curso) {
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.edad = edad;
      this.curso = curso;
      this.materias = [];
      this.calificaciones = [];
    }
  }
  