import axios from 'axios'
import { ref } from 'vue'

export const useGetData=()=>{
    const datos=ref(null); //Null xq no sabemos lo que vamos a recibir.
    const cargando = ref(true);
    const error = ref(false);


    const getData = async (url) => {
        try { //esperamos a obtener los resultados del API
            const resultado = await axios.get(url);
            datos.value = resultado.data; //Axios siempre devuelve .data
        }
        catch (err) { //si hay algun error lo muestro por consola
            console.log(err);
            error.value = true;
        } finally {
            cargando.value = false;
        }
    };
    return {
        getData, //Retornamos nuestra funcion
        datos, //Retornamos el resultado obtenido
        error,
        cargando
    }
};