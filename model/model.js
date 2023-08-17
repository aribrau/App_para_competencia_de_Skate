import  {Sequelize} from 'sequelize'
import db from '../utils/db.js'
import bcrypt from 'bcrypt'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const realDir = path.resolve(__dirname, '..');

//Skater class
class Skater {

    constructor(id_skater, email, nombre, password, anos_experiencia, especialidad, foto, estado){
        this.id_skater = id_skater;
        this.email = email;
        this.nombre = nombre;
        this.anos_experiencia = anos_experiencia; 
        this.especialidad = especialidad;
        this.foto = foto;
        this.estado = estado;
        this.password = password;
    }
    //función para hashear el password del nuevo skater
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    //función que crea un nuevo skater
    createSkater = async () =>{
        const t = await db.transaction();
        try {
            await skaterModel.sync();
            this.hashPassword(); 
            const skater_created =  await skaterModel.create(this);
            if(skater_created) {
                await t.commit();
                return skater_created.dataValues;
            } else {
                await t.rollback();
                return false;
            }
        } catch (error) {
            console.log('Create skater error: ', error);
            await t.rollback();
        }
    };
    skaterLogin = async (email) =>{
        try {
            await skaterModel.sync();
            return await skaterModel.findOne({ where: {email: email}})
        } catch (error) {
            console.log('login error', error)
        }
    }
    getSkaterById = async (id_skater) => {
        try {
            await skaterModel.sync();
            return await skaterModel.findByPk(id_skater);
        } catch (error) {
            console.log('get skater error: ', error);
        }
    }
    //función que obtiene todos los skaters
    getAllSkaters = async () =>{
        try {
            await skaterModel.sync();
            return await skaterModel.findAll({
                attributes: ['id_skater', 'email', 'nombre', 'anos_experiencia', 'especialidad', 'foto','estado']
            });
        } catch (error) {
            console.log('Get all skater error: ', error)
        }
    }
    //función que actualiza los datos de un skater
    updateSkater = async () =>{
        const t = await db.transaction();
        try {
            await skaterModel.sync();
            this.hashPassword();
            const skater_updated =  await skaterModel.update(this,{where:{id_skater:this.id_skater}});
            if(skater_updated > 0) {
                await t.commit();
                return true;
            } else {
                await t.rollback();
                return false;
            }
        } catch (error) {
            await t.rollback();
            console.log('Update user error: ', error);
        }
    }
    //función que elimina un skater
    deleteSkater = async () =>{
            const t = await db.transaction();
            try {
                await skaterModel.sync();
                const skater_deleted = await skaterModel.destroy({where:{id_skater:this.id_skater}});
                if(skater_deleted > 0) {
                    await t.commit();
                    return true;
                } else {
                    await t.rollback();
                    return false;
                }
            } catch (error) {
                await t.rollback();
                console.log('Delete skater error: ', error);
            }
        };
    uploadSkaterImg = async (upload_img, _host) => {
        try {
            const upload_dir = '/public/assets/img/';
            const img_ext = path.extname(upload_img.name);
            const img_name = 'skater_img_' + Date.now() + img_ext;
            await upload_img.mv(realDir + upload_dir + img_name);
            const img_path = `${_host}${upload_dir}${img_name}`; 
            console.log('img_path', img_path)
            return img_path;
        } catch (error) {
            console.log('error al subir la img', error)
        }
    }
    changeStatus = async () =>{
        const t = await db.transaction();
        try {
            await skaterModel.sync();
            const skater_updated =  await skaterModel.update({estado: this.estado},{where:{id_skater:this.id_skater}});
            if(skater_updated > 0) {
                await t.commit();
                return true;
            } else {
                await t.rollback();
                return false;
            }
        } catch (error) {
            await t.rollback();
            console.log('Update user error: ', error);
        }
    }
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
        validate: {
            len: [1, 50], 
            },
    },
    nombre:{
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 25], 
            },
    },
    password: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 256], 
            },
    },
    anos_experiencia:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    especialidad:{
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 50], 
            },
    },
    foto:{
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 256], 
            },
    },
    estado:{
        type:Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    }    
});

export {Skater, skaterModel};