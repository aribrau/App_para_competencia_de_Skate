import {Skater} from '../model/skater.js';

//controller para crear un Usuario
export const createSkater = async (req, res) =>{
    let response = {
        msg:'skater creation',
        error: null,
        data: null
    };
    const email = req.body.email;
    const nombre = req.body.nombre;
    const password = req.body.password; 
    const anos_experiencia = req.body.anos_experiencia;
    const especialidad = req.body.especialidad;
    const foto = req.body.foto;
    if(email && nombre && password && anos_experiencia && especialidad && foto){
        const skater = new Skater(null, email, nombre, password, anos_experiencia, especialidad, foto)
        console.log('skater: ', skater)
        const model_result = await skater.createSkater();
        console.log(model_result)
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create skater'
    } else {
        response.error = "Missing required parameters";
    }
    res.send(response);
};