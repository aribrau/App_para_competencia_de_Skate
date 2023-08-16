import {Skater} from '../model/skater.js';

//controller para crear un nuevo skater
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
        const model_result = await skater.createSkater();
        if(model_result != null) response.data = {
            nombre: model_result.nombre,
            email: model_result.email,
            anos_experiencia: model_result.anos_experiencia,
            especialidad: model_result.especialidad,
            foto: model_result.foto
        }
        else response.error = 'Error creating skater'
    } else {
        response.error = "Missing required parameters";
    }
    res.status(200).send(response);
};
//controller para obtener a todos los skaters de la base de datos
export const getAllSkaters = async (req, res) => {
    let response = {
        msg:'skater get all',
        error: null,
        data: null
    };
    try {
        const skater = new Skater();
        const model_result = await skater.getAllSkaters();
        if(model_result != null){
            if(model_result.length == 0){
                response.error = 'There is no skaters in database'
            }
            response.data = model_result;
        }
        else{
            response.error = 'Error trying to get the skaters'
        }
        res.status(200).send(response);
    } catch (error){
        response.error = 'Server Internal Error';
        res.status(500).send(response)
    }
};
//update skater controller
export const updateSkater = async (req, res) => {
    let response = {
        msg:'skater update',
        error: null,
        data: null
    };
    try {
        const id_skater = req.params.id;
        const {email, nombre, password, anos_experiencia, especialidad} = req.body;
        if (id_skater && email && nombre && password && anos_experiencia && especialidad){
        const skater = new Skater();

        skater.id_skater = id_skater;
        skater.email = email;
        skater.nombre = nombre;
        skater.password = password;
        skater.anos_experiencia = anos_experiencia;
        skater.especialidad = especialidad;

        const model_result = await skater.updateSkater(skater);
        if(model_result != null) response.data = model_result;
        else response.error = 'Error updating skater'
    } else {
        responser.error = 'Missing required parameters';
    };
    res.status(200).send(response);
    } catch (error) {
        response.error = 'Server Internal Error';
        res.status(500).send(response)
    }    
};   
//delete skater controller
export const deleteSkater = async (req, res) =>{
    let response = {
        msg:'skater delete',
        error: null,
        data: null
    };
    const id_skater = req.params.id;
    console.log('id', id_skater)
    if(id_skater){
        const skater = new Skater();
        skater.id_skater = id_skater;

        const model_result = await skater.deleteSkater(skater);
        console.log('model', model_result)
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to delete the skater'
    }else{
        response.error = "Missing required parameters";
    }
    res.status(200).send(response);
};

