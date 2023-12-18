
class Curso {
    constructor(nombre, materias) {
      this.nombre = nombre;
      this.materias = materias;
    }
  }
  

  class Alumno {
    constructor(nombre, apellidos, edad, curso) {
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.edad = edad;
      this.curso = curso;
      this.materias = cursos.find(c => c.nombre === curso)?.materias || [];
      this.calificaciones = [];
    }
  }
  

  let cursos = JSON.parse(localStorage.getItem('cursos')) || [];
  let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
  

  function updateCursoTable() {
    const cursoTableBody = document.getElementById('curso-table-body');
    cursoTableBody.innerHTML = '';
  
    cursos.forEach((curso, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${curso.nombre}</td>
        <td>${curso.materias.join(', ')}</td>
      `;
      cursoTableBody.appendChild(row);
    });
  
    localStorage.setItem('cursos', JSON.stringify(cursos));
  }
  

  function fillCursoDropdown() {
    const cursoDropdown = document.getElementById('curso');
    cursoDropdown.innerHTML = '<option value="">Seleccionar Curso</option>';
  
    cursos.forEach(curso => {
      const option = document.createElement('option');
      option.value = curso.nombre;
      option.text = curso.nombre;
      cursoDropdown.appendChild(option);
    });
  }
  
  
  function updateTable() {
    const tableBody = document.getElementById('student-table-body');
    tableBody.innerHTML = '';
  
    alumnos.forEach((alumno, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${alumno.nombre}</td>
        <td>${alumno.apellidos}</td>
        <td>${alumno.edad}</td>
        <td>${alumno.curso}</td>
        <td>${alumno.materias.join(', ')}</td>
        <td>${alumno.calificaciones.join(', ')}</td>
        <td>
          <button onclick="addCalificacion(${index})">Añadir Calificación</button>
          <button onclick="editCalificaciones(${index})">Editar Calificaciones</button>
          <button onclick="obtenerPromedioAlumno(${index})">Promedio</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
  }
  
 
  document.getElementById('alta-curso-btn').addEventListener('click', () => {
    const nombreCurso = document.getElementById('nombre-curso').value;
    const materiasCurso = document.getElementById('materias-curso').value.split(',').map(m => m.trim());
    const curso = new Curso(nombreCurso, materiasCurso);
    cursos.push(curso);
    console.log('Curso dado de alta:', curso);
    updateCursoTable();
    fillCursoDropdown();
  });
  

  document.getElementById('alta-btn').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;
    const cursoSeleccionado = document.getElementById('curso');
    const curso = cursoSeleccionado.options[cursoSeleccionado.selectedIndex].value;
    const alumno = new Alumno(nombre, apellidos, edad, curso);
    alumnos.push(alumno);
    console.log('Estudiante dado de alta:', alumno);
    updateTable();
  });
  


function addCalificacion(index) {
    const calificacion = prompt("Ingrese la calificación:");
    if (calificacion !== null) {
      alumnos[index].calificaciones.push(calificacion);
      updateTable();
    }
  }
  
  function editCalificaciones(index) {
    const calificaciones = prompt("Ingrese las nuevas calificaciones separadas por comas:");
    if (calificaciones !== null) {
      const calificacionesArray = calificaciones.split(',').map(c => c.trim());
      alumnos[index].calificaciones = calificacionesArray;
      updateTable();
    }
  }
  
  function buscarPorNombre() {
    const nombreBuscado = prompt("Ingrese el nombre a buscar:");
    if (nombreBuscado !== null) {
      const resultados = alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(nombreBuscado.toLowerCase()));
      mostrarResultados(resultados);
    }
  }
  
  function buscarByApellido() {
    const apellidoBuscado = prompt("Ingrese el apellido a buscar:");
    if (apellidoBuscado !== null) {
      const resultados = alumnos.filter(alumno => alumno.apellidos.toLowerCase().includes(apellidoBuscado.toLowerCase()));
      mostrarResultados(resultados);
    }
  }
  
  function obtenerPromedioAlumno(index) {
    const calificaciones = alumnos[index].calificaciones.map(Number);
    if (calificaciones.length > 0) {
      const promedio = calificaciones.reduce((sum, calificacion) => sum + calificacion, 0) / calificaciones.length;
      alert(`El promedio del estudiante ${alumnos[index].nombre} ${alumnos[index].apellidos} es: ${promedio.toFixed(2)}`);
    } else {
      alert(`El estudiante ${alumnos[index].nombre} ${alumnos[index].apellidos} no tiene calificaciones.`);
    }
  }
  
  function obtenerPromedioGrupo() {
    const calificacionesTotales = alumnos.flatMap(alumno => alumno.calificaciones.map(Number));
    if (calificacionesTotales.length > 0) {
      const promedioGrupo = calificacionesTotales.reduce((sum, calificacion) => sum + calificacion, 0) / calificacionesTotales.length;
      alert(`El promedio del grupo es: ${promedioGrupo.toFixed(2)}`);
    } else {
      alert("No hay calificaciones en el grupo.");
    }
  }
  
  function obtenerListaAlumnosOrdenada(ascendente = true) {
    const copiaAlumnos = [...alumnos];
    copiaAlumnos.sort((a, b) => {
      const calificacionesA = a.calificaciones.length > 0 ? a.calificaciones.reduce((sum, calificacion) => sum + Number(calificacion), 0) / a.calificaciones.length : 0;
      const calificacionesB = b.calificaciones.length > 0 ? b.calificaciones.reduce((sum, calificacion) => sum + Number(calificacion), 0) / b.calificaciones.length : 0;
      return ascendente ? calificacionesA - calificacionesB : calificacionesB - calificacionesA;
    });
    mostrarResultados(copiaAlumnos);
  }
  
  function mostrarResultados(resultados) {
    if (resultados.length > 0) {
      const mensaje = resultados.map(alumno => `${alumno.nombre} ${alumno.apellidos}`).join('\n');
      alert(`Resultados:\n${mensaje}`);
    } else {
      alert("No se encontraron resultados.");
    }
  }
  
  function borrarLocalStorage() {
    localStorage.removeItem('alumnos');
    localStorage.removeItem('cursos');
    alert('Local Storage borrado.');
    location.reload(); 
  }
  

  fillCursoDropdown();
  updateTable();
  updateCursoTable();
  
  
  // Event Listeners para cambiar de sección
  document.getElementById('estudiantes-btn').addEventListener('click', () => mostrarSeccion('student-section'));
  document.getElementById('cursos-btn').addEventListener('click', () => mostrarSeccion('curso-section'));
  
  // Función para cambiar la visibilidad de las secciones
  function mostrarSeccion(seccion) {
    const seccionEstudiantes = document.getElementById('student-section');
    const seccionCursos = document.getElementById('curso-section');
  
    if (seccion === 'student-section') {
      seccionEstudiantes.style.display = 'block';
      seccionCursos.style.display = 'none';
    } else if (seccion === 'curso-section') {
      seccionEstudiantes.style.display = 'none';
      seccionCursos.style.display = 'block';
    }
  }
  
  // Llamadas a funciones para inicializar la página
  fillCursoDropdown();
  updateTable();
  updateCursoTable();
  