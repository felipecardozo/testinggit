// Almacenaje en local storage
class Storage{
    constructor(){
        this.nombre = document.getElementById('nombre').value;
        this.texto = document.getElementById('area').value;
        this.id = parseInt(document.getElementById('ID').value);
    }
    addLocalStorage(){
        if(!this.id || !this.texto || !this.nombre){

            alert("ingresar todos los elementos");

        } else{
             //asigandole los valores al objeto
            let mensaje = {id: this.id,nombre: this.nombre,texto: this.texto};
            let mensajes = this.getLocalStorage();
            //añadiendo objeto al arreglo
            mensajes.push(mensaje);
            //actualizando el local storage con el nuevo elemento
            localStorage.setItem('mensajes',JSON.stringify(mensajes));
        }
    }

    getLocalStorage(){

        if(localStorage.getItem('mensajes') == null){
            //crear arreglo
            let mensajes = [];
            return mensajes;
        } else {
            //obtener arreglo de objetos almacenados
            let mensajes = JSON.parse(localStorage.getItem('mensajes'));
            return mensajes;
        }
    }

    deleteLocalStorage(e){
        if (e.name === 'delete') {
            const elemento = e.parentElement.parentElement;
            const id = parseInt(elemento.children[0].children[1].innerText);
            const nombre = elemento.children[1].children[2].innerText;
            const mensajes = this.getLocalStorage();
            const findId = mensajes.findIndex(men => men.id == id);
            mensajes.splice(findId,1);
            localStorage.setItem('mensajes',JSON.stringify(mensajes));
        }
    }
}


//Vista
class UI{
    constructor(){
        this.division = document.getElementById('division');
    }
    render(storage){
            const nombre = storage.nombre;
            const texto = storage.texto;
            const id = storage.id;
            const crear = document.createElement('div');
            crear.innerHTML=`<div class="card mb-2">
                                <div class="row p-3">
                                <div class="col-2">
                                            <label>ID:</label>
                                            <span id="id">${storage.id}</span>
                                    </div>
                                    <div class="col-2">
                                            <label>Nombre:</label><br>
                                            <span id="temporalName">${nombre.toUpperCase()}</span>
                                    </div>
                                    <div class="col-6">
                                            <label>Mensaje:</label><br>
                                            <span id="temporalText">${texto}</span>
                                    </div>
                                    <div class="col-2 pt-2">
                                        <input name="delete" id="delete" class="btn btn-danger" type="button" value="borrar">
                                    </div>
                                </div>
                            </div>`;

        this.division.appendChild(crear);
    }

    deleteProduct(element){
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }
}


// <-    controlador de eventos       ->

//cargar todos los elementos almacenados al iniciar la pagina
document.addEventListener('DOMContentLoaded',()=>{
    const storage = new Storage();
    const ui = new UI();
    //obtener un arreglo con los elementos del local storage
    const load = storage.getLocalStorage();
    // imprimir cada uno de los elementos dentro del local storage
    for(let i = 0; i<load.length; i++){
        ui.render(load[i]);
    }
})

//añadir un elemento
document.getElementById('boton').addEventListener('click',()=>{
    const storage = new Storage();
    const ui = new UI();
    //añadir un elemento al local storage
    storage.addLocalStorage();
    //imprimir en pantalla el elemento
    ui.render(storage);
})

//Eliminar un elemento
document.getElementById('division').addEventListener('click',(e)=>{
        //seleccionar el element que oprimio borrar
        const ui = new UI();
        const storage = new Storage();
        //borrar el elemento del local storage
        storage.deleteLocalStorage(e.target);
        //eliminar elemento de la pantalla
        ui.deleteProduct(e.target);
        e.preventDefault();
})

//Eliminar los elementos almacenados
document.getElementById('boton-borrar').addEventListener('click',()=>{
    localStorage.clear();
})




