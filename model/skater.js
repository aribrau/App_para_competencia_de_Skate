import Sequelize from 'sequelize'
import db from '../utils/db.js'
import bcrypt from 'bcrypt'

//declaramos la clase Skater con su constructor y sus respectivas funciones o métodos
class Skater {

    constructor(id_skater, email, nombre, password, anos_experiencia, especialidad, foto, estado){
        this.id_skater = id_skater;
        this.email = email;
        this.nombre = nombre;
        this.anos_experiencia = anos_experiencia; 
        this.especialidad = especialidad;
        this.foto = foto;
        this.estado = estado;
        this.password = bcrypt.hashSync(password, 10);
    }
    //función que crea un nuevo skater
    createSkater = async () =>{
        try {
            await skaterModel.sync();
            const skater_created =  await skaterModel.create(this);
            if(skater_created) return skater_created.dataValues;
            else return false;
        } catch (error) {
            console.log('Create skater error: ', error);
        }
    };
    //función que obtiene todos los skaters
    getAllSkaters = async () =>{
        try {
            await skaterModel.sync();
            return await skaterModel.findAll();
        } catch (error) {
            console.log('Get all skater error: ', error)
        }
    }
    //función que actualiza los datos de un skater
    updateSkater = async () =>{
        try {
            await skaterModel.sync();
            
            const skater_updated =  await skaterModel.update(this,{where:{id:this.id}});
            if(skater_updated.length > 0) return true;
            else return false;
        } catch (error) {
            console.log('Update user error: ', error);
        }
    }
    //función que elimina un skater
    deleteSkater = async () =>{
            try {
                await skaterModel.sync();
                console.log('id',this);
                const skater_deleted = await skaterModel.destroy({where:{id:this.id}});
                if(skater_deleted > 0) return true;
                else return false;
            } catch (error) {
                console.log('Delete skater error: ', error);
            }
        };
};

//modelo User
const skaterModel = db.define('Skater', {
    id_skater:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    nombre:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    anos_experiencia:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    especialidad:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    foto:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    estado:{
        type:Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    }    
});

export {Skater, skaterModel};