//dashboard.js
const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
var async = require('asyncawait/async');
var await = require('asyncawait/await');
/////
var moment = require('moment');
/////
router.post("/", authorize, async ((req, res) => {
  try {
    const user = await (pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user.id] 
    )); 
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
router.get("/grupos", authorize, async ((req, res) => {
  try {
    const grupos = await (pool.query(
      "SELECT * FROM tgrupo"
    )); 
    res.json(grupos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
router.post("/grupos", authorize, async ((req, res) => {
  try {

    const body = req.body;
    console.log('router.post grupos 01 body:',body);
    const description = req.body.description;
    console.log('router.post grupos 02 nombre:',nombre);
     const nombre = description;
    console.log('router.post grupos 02.5 nombre:',nombre);
    const newGrupo = await (pool.query(
      "INSERT INTO tgrupo (nombre) VALUES($1) RETURNING *",
      [nombre]
    ));
    console.log('router.post grupos 03 newGrupo.rows[0]:',newGrupo.rows[0]);
    res.json(newGrupo.rows[0]);
  } catch (err) {
    console.log('router.post grupos 04 err:',err);
    console.error(err.message);
  }
}));
router.delete("/grupos", authorize, async ((req, res) => {
  try {

    const body = req.body;
    console.log('router.delete grupos 01 body:',body);
    const description = req.body.description;
    console.log('router.delete grupos 02 nombre:',nombre);
     const nombre = description;
    console.log('router.delete grupos 02.5 nombre:',nombre);
    const deleteGrupo = await (pool.query( "DELETE FROM tgrupo WHERE nombre = $1", [
      nombre
    ]));

   // console.log('router.delete grupos 03 res:',res);
    res.json("Grupo was deleted!" );
  } catch (err) {
    console.log('router.delete grupos 04 err:',err);
    console.error(err.message);
  }
}));
//////////////
router.get("/agentes", authorize, async ((req, res) => {
  try {
    const agentes = await (pool.query(
      "SELECT tagente.id_agente as id, tagente.nombre as nombre_agente,tgrupo.nombre as nombre_grupo FROM tagente INNER JOIN tgrupo ON tagente.id_grupo= tgrupo.id_grupo;"
    )); 
    res.json(agentes.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
router.post("/agentes", authorize, async ((req, res) => {
  try {

    const body = req.body;
    console.log('router.post agentes 01 body:',body);
    const description = req.body.description;
    const grupoSeleccionado = req.body.grupoSeleccionado;
    console.log('router.post agentes 02 description:',description);
    console.log('router.post agentes 03 grupoSeleccionado:',grupoSeleccionado);
    const idGrupoSeleccionado = await (pool.query(
   `SELECT id_grupo FROM tgrupo WHERE nombre='${grupoSeleccionado}';`
    )); 
    console.log('router.post agentes 03.1 idGrupoSeleccionado.rows:',idGrupoSeleccionado.rows);
    console.log('router.post agentes 03.2 idGrupoSeleccionado.rows[0]:',idGrupoSeleccionado.rows[0]);
    console.log('router.post agentes 03.3 idGrupoSeleccionado.rows[0].id_grupo:',idGrupoSeleccionado.rows[0].id_grupo);
    //res.json(idGrupoSeleccionado.rows[0]);
    //////////    
    const indexGrupo = idGrupoSeleccionado.rows[0].id_grupo;
    console.log('router.post agentes 03.33 indexGrupo:',indexGrupo);
    const nombre = description;
    console.log('router.post agentes 03.4 nombre:',nombre);
    const newGrupo = await (pool.query(
     `INSERT INTO tagente ("nombre", "id_grupo") VALUES ('${nombre}','${indexGrupo}');`
    ));
    
    res.json("Agente was inserted!" );
  } catch (err) {
    console.log('router.post agentes 04 err:',err);
    console.error(err.message);
  }
}));

router.delete("/agentes", authorize, async ((req, res) => {
  try {

    const body = req.body;
    console.log('router.post agentes 01 body:',body);
    const description = req.body.description;
    const grupoSeleccionado = req.body.grupoSeleccionado;
    console.log('router.post agentes 02 description:',description);
    console.log('router.post agentes 03 grupoSeleccionado:',grupoSeleccionado);
    const idGrupoSeleccionado = await (pool.query(
   `SELECT id_grupo FROM tgrupo WHERE nombre='${grupoSeleccionado}';`
    )); 
    console.log('router.post agentes 03.1 idGrupoSeleccionado.rows:',idGrupoSeleccionado.rows);
    console.log('router.post agentes 03.2 idGrupoSeleccionado.rows[0]:',idGrupoSeleccionado.rows[0]);
    console.log('router.post agentes 03.3 idGrupoSeleccionado.rows[0].id_grupo:',idGrupoSeleccionado.rows[0].id_grupo);
    //res.json(idGrupoSeleccionado.rows[0]);
    //////////    
    const indexGrupo = idGrupoSeleccionado.rows[0].id_grupo;
    console.log('router.post agentes 03.33 indexGrupo:',indexGrupo);
    const nombre = description;
    console.log('router.post agentes 03.4 nombre:',nombre);
  
    const deleteGrupo = await (pool.query(
     "DELETE FROM tagente WHERE nombre = $1 AND id_grupo=$2", [
      nombre,indexGrupo]));


    res.json("Agente was deleted!" );
  } catch (err) {
    console.log('router.post agentes 04 err:',err);
    console.error(err.message);
  }
}));
//////////////
//////////////
router.get("/modulos", authorize, async ((req, res) => {
  try {
    const modulos = await (pool.query(
      "SELECT tmodulo.id_modulo as id, tmodulo.nombre as nombre_modulo,tgrupo.nombre as nombre_grupo FROM tmodulo INNER JOIN tgrupo ON tmodulo.id_grupo= tgrupo.id_grupo;"
    )); 
    res.json(modulos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
router.post("/modulos", authorize, async ((req, res) => {
  try {

    const body = req.body;
    console.log('router.post modulos 01 body:',body);
    const description = req.body.description;
    const grupoSeleccionado = req.body.grupoSeleccionado;
    console.log('router.post modulos 02 description:',description);
    console.log('router.post modulos 03 grupoSeleccionado:',grupoSeleccionado);
    const idGrupoSeleccionado = await (pool.query(
   `SELECT id_grupo FROM tgrupo WHERE nombre='${grupoSeleccionado}';`
    )); 
    console.log('router.post modulos 03.1 idGrupoSeleccionado.rows:',idGrupoSeleccionado.rows);
    console.log('router.post modulos 03.2 idGrupoSeleccionado.rows[0]:',idGrupoSeleccionado.rows[0]);
    console.log('router.post modulos 03.3 idGrupoSeleccionado.rows[0].id_grupo:',idGrupoSeleccionado.rows[0].id_grupo);
    //res.json(idGrupoSeleccionado.rows[0]);
    //////////    
    const indexGrupo = idGrupoSeleccionado.rows[0].id_grupo;
    console.log('router.post modulos 03.33 indexGrupo:',indexGrupo);
    const nombre = description;
    console.log('router.post modulos 03.4 nombre:',nombre);
    const newGrupo = await (pool.query(
     `INSERT INTO tmodulo ("nombre", "id_grupo") VALUES ('${nombre}','${indexGrupo}');`
    ));
    
    res.json("Modulo was inserted!" );
  } catch (err) {
    console.log('router.post modulos 04 err:',err);
    console.error(err.message);
  }
}));

router.delete("/modulos", authorize, async ((req, res) => {
  try {

    const body = req.body;
    console.log('router.post modulos 01 body:',body);
    const description = req.body.description;
    const grupoSeleccionado = req.body.grupoSeleccionado;
    console.log('router.post modulos 02 description:',description);
    console.log('router.post modulos 03 grupoSeleccionado:',grupoSeleccionado);
    const idGrupoSeleccionado = await (pool.query(
   `SELECT id_grupo FROM tgrupo WHERE nombre='${grupoSeleccionado}';`
    )); 
    console.log('router.post modulos 03.1 idGrupoSeleccionado.rows:',idGrupoSeleccionado.rows);
    console.log('router.post modulos 03.2 idGrupoSeleccionado.rows[0]:',idGrupoSeleccionado.rows[0]);
    console.log('router.post modulos 03.3 idGrupoSeleccionado.rows[0].id_grupo:',idGrupoSeleccionado.rows[0].id_grupo);
    //res.json(idGrupoSeleccionado.rows[0]);
    //////////    
    const indexGrupo = idGrupoSeleccionado.rows[0].id_grupo;
    console.log('router.post modulos 03.33 indexGrupo:',indexGrupo);
    const nombre = description;
    console.log('router.post modulos 03.4 nombre:',nombre);
  
    const deleteGrupo = await (pool.query(
     "DELETE FROM tmodulo WHERE nombre = $1 AND id_grupo=$2", [
      nombre,indexGrupo]));


    res.json("Modulo was deleted!" );
  } catch (err) {
    console.log('router.post modulos 04 err:',err);
    console.error(err.message);
  }
}));
//////////////
//////////////
router.get("/correlaciones", authorize, async ((req, res) => {
  try {
    const correlaciones = await (pool.query(
      "SELECT tcorrelacion.id_correlacion as id, tcorrelacion.nombre as nombre_correlacion,tgrupo.nombre as nombre_grupo FROM tcorrelacion INNER JOIN tgrupo ON tcorrelacion.id_grupo= tgrupo.id_grupo;"
    )); 
    res.json(correlaciones.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
router.post("/correlaciones", authorize, async ((req, res) => {
  try {

    const body = req.body;
    console.log('router.post correlaciones 01 body:',body);
    const description = req.body.description;
    const grupoSeleccionado = req.body.grupoSeleccionado;
    console.log('router.post correlaciones 02 description:',description);
    console.log('router.post correlaciones 03 grupoSeleccionado:',grupoSeleccionado);
    const idGrupoSeleccionado = await (pool.query(
   `SELECT id_grupo FROM tgrupo WHERE nombre='${grupoSeleccionado}';`
    )); 
    console.log('router.post correlaciones 03.1 idGrupoSeleccionado.rows:',idGrupoSeleccionado.rows);
    console.log('router.post correlaciones 03.2 idGrupoSeleccionado.rows[0]:',idGrupoSeleccionado.rows[0]);
    console.log('router.post correlaciones 03.3 idGrupoSeleccionado.rows[0].id_grupo:',idGrupoSeleccionado.rows[0].id_grupo);
    //res.json(idGrupoSeleccionado.rows[0]);
    //////////    
    const indexGrupo = idGrupoSeleccionado.rows[0].id_grupo;
    console.log('router.post correlaciones 03.33 indexGrupo:',indexGrupo);
    const nombre = description;
    console.log('router.post correlaciones 03.4 nombre:',nombre);
    const newGrupo = await (pool.query(
     `INSERT INTO tcorrelacion ("nombre", "id_grupo") VALUES ('${nombre}','${indexGrupo}');`
    ));
    
    res.json("Correlacion was inserted!" );
  } catch (err) {
    console.log('router.post correlaciones 04 err:',err);
    console.error(err.message);
  }
}));

router.delete("/correlaciones", authorize, async ((req, res) => {
  try {

    const body = req.body;
    console.log('router.post correlaciones 01 body:',body);
    const description = req.body.description;
    const grupoSeleccionado = req.body.grupoSeleccionado;
    console.log('router.post correlaciones 02 description:',description);
    console.log('router.post correlaciones 03 grupoSeleccionado:',grupoSeleccionado);
    const idGrupoSeleccionado = await (pool.query(
   `SELECT id_grupo FROM tgrupo WHERE nombre='${grupoSeleccionado}';`
    )); 
    console.log('router.post correlaciones 03.1 idGrupoSeleccionado.rows:',idGrupoSeleccionado.rows);
    console.log('router.post correlaciones 03.2 idGrupoSeleccionado.rows[0]:',idGrupoSeleccionado.rows[0]);
    console.log('router.post correlaciones 03.3 idGrupoSeleccionado.rows[0].id_grupo:',idGrupoSeleccionado.rows[0].id_grupo);
    //res.json(idGrupoSeleccionado.rows[0]);
    //////////    
    const indexGrupo = idGrupoSeleccionado.rows[0].id_grupo;
    console.log('router.post correlaciones 03.33 indexGrupo:',indexGrupo);
    const nombre = description;
    console.log('router.post correlaciones 03.4 nombre:',nombre);
  
    const deleteGrupo = await (pool.query(
     "DELETE FROM tcorrelacion WHERE nombre = $1 AND id_grupo=$2", [
      nombre,indexGrupo]));


    res.json("Correlacion was deleted!" );
  } catch (err) {
    console.log('router.post correlaciones 04 err:',err);
    console.error(err.message);
  }
}));
//////////////
//////////////
router.get("/eventos", authorize, async ((req, res) => {
  try {

    const eventos = await (pool.query(
      "SELECT tevento.id_evento, tagente.nombre as nombreag,tgrupo.nombre as nombregr,tmodulo.nombre as nombremo ,tevento.timestamp,tevento.utimestamp,tevento.criticity FROM tevento INNER JOIN tagente ON  tevento.id_agente= tagente.id_agente INNER JOIN tgrupo ON tevento.id_grupo= tgrupo.id_grupo INNER JOIN tmodulo ON tevento.id_modulo= tmodulo.id_modulo;"
    ));
  // console.log('router.get /eventos 01 eventos:',eventos);  
   console.log('router.get /eventos 02 eventos.rows:',eventos.rows); 
   console.log('router.get /eventos 03 eventos.rows[0]:',eventos.rows[0]); 
    return res.json(eventos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
/////////////
router.post("/eventos", authorize, async ((req, res) => {
  try {
    console.log('recibido req.body:',req.body);
    const grupo = req.body.tecnologiasSeleccionado;
    const agente = req.body.agentesSeleccionado;
    const modulo = req.body.modulosSeleccionado;
    const criticity = req.body.criticitySeleccionado;
    const estado = req.body.estadoSeleccionado;
    const timestamp = req.body.timestamp;
    const utimestamp= req.body.utimestamp;
    const user_comment = req.body.usercomment;
    console.log('recibido grupo:',grupo);
    console.log('recibido agente:',agente);
    console.log('recibido modulo:',modulo);
    
    const idgrupo0 = await (pool.query(
     `SELECT id_grupo FROM tgrupo WHERE nombre='${grupo}';`
     ));
    const idagente0 = await (pool.query(
    `SELECT id_agente FROM tagente WHERE nombre='${agente}';`
    ));
    const idmodulo0 = await (pool.query(
    `SELECT id_modulo FROM tmodulo WHERE nombre='${modulo}';`
    ));
    const idgrupo = await (idgrupo0.rows[0].id_grupo);
    const idagente = await (idagente0.rows[0].id_agente);
    const idmodulo = await (idmodulo0.rows[0].id_modulo);
    console.log('router.post /eventos 01 idgrupo0.rows[0]:',idgrupo0.rows[0].id_grupo);  
    console.log('router.post /eventos 01 idagente0.rows[0]:',idagente0.rows[0].id_agente);  
    console.log('router.post /eventos 01 idmodulo0.rows[0]:',idmodulo0.rows[0].id_modulo);  
    console.log('router.post /eventos 01 criticity:',criticity);
    console.log('router.post /eventos 01 estado:',estado);
    console.log('router.post /eventos 01 timestamp:',timestamp);
    console.log('router.post /eventos 01 utimestamp:',utimestamp);
    console.log('router.post /eventos 01 user_comment:',user_comment);

     const eventos = await (pool.query(
     `INSERT INTO "tevento" ("id_grupo", "id_agente", "id_modulo", "criticity", "estado", "timestamp","utimestamp","user_comment") VALUES ('${idgrupo}','${idagente}','${idmodulo}','${criticity}','${estado}','${timestamp}','${utimestamp}','${user_comment}');`
     ));
   
    return res.json(eventos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
/////////////
router.get('/eventos/:fila', authorize, async ((req, res) => {
  try {
    const fila = req.params.fila;
     console.log('router.get eventos/:fila 02 fila:',fila);
    const eventos = await (pool.query(
   `SELECT tevento.id_evento, tagente.nombre as nombreag,tgrupo.nombre as nombregr,tmodulo.nombre as nombremo ,tevento.timestamp,tevento.utimestamp,tevento.criticity FROM tevento INNER JOIN tagente ON  tevento.id_agente= tagente.id_agente INNER JOIN tgrupo ON tevento.id_grupo= tgrupo.id_grupo INNER JOIN tmodulo ON tevento.id_modulo= tmodulo.id_modulo WHERE tevento.id_evento = ${fila};`
      ));
    
  // console.log('router.get /eventos 01 eventos/:fila:',eventos);  
   console.log('router.get /eventos 02 eventos/:fila.rows:',eventos.rows); 
   console.log('router.get /eventos 03 eventos/:fila.rows[0]:',eventos.rows[0]); 
    return res.json(eventos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
/////////////
router.delete("/eventos", authorize, async ((req, res) => {
  try {

    const body = req.body;
    //console.log('router.delete grupos 01 body:',body);
    const description = req.body.description;
    const id = parseInt(description);
    console.log('router.delete grupos 02 id:',id);
    
    console.log('router.delete grupos 02.5 id:',id);
    const deleteEvento = await (pool.query( "DELETE FROM tevento WHERE id_evento = $1", [
      id
    ]));

   // console.log('router.delete grupos 03 res:',res);
    res.json("Evento was deleted!" );
  } catch (err) {
    console.log('router.delete eventos 04 err:',err);
    console.error(err.message);
  }
}));
/////////////
router.get("/dependenciasagentes", authorize, async ((req, res) => {
  try {

    const dependenciasagentes = await (pool.query(
      "SELECT * FROM tagente;"
    ));
    
   //console.log('router.get /dependencias 01 dependencias:',dependencias);  
   console.log('router.get /dependenciasagentes 02 dependenciasagentes.rows:',dependenciasagentes.rows); 
   console.log('router.get /dependenciasagentes 03 dependenciasgentes.rows[0]:',dependenciasagentes.rows[0]); 
    return res.json(dependenciasagentes.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
/////////////
router.get("/dependenciasmodulos", authorize, async ((req, res) => {
  try {

    const dependenciasmodulos = await (pool.query(
      "SELECT  * FROM tmodulo;"
    ));
    
   //console.log('router.get /dependencias 01 dependencias:',dependencias);  
   console.log('router.get /dependenciasmodulos 02 dependenciasmodulos.rows:',dependenciasmodulos.rows); 
   console.log('router.get /dependenciasmodulos 03 dependenciasmodulos.rows[0]:',dependenciasmodulos.rows[0]); 
    return res.json(dependenciasmodulos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}));
/////////////
router.get("/estadisticas", authorize, async ((req, res) => {
  try {
    var idgrupohuagsm = 1;
    console.log('router.get estadisticas 03 idgrupohuagsm:',idgrupohuagsm);
    const estahuagsm = await (pool.query( "SELECT COUNT (*) FROM tevento WHERE id_grupo = $1", [
      idgrupohuagsm
    ]));
    console.log('router.get estadisticas  04 estahuagsm.rows[0].count:',estahuagsm.rows[0].count);  
    

    var idgrupohuaumts = 4;
    console.log('router.get estadisticas 05 idgrupohuaumts:',idgrupohuaumts);
    const estahuaumts = await (pool.query( "SELECT COUNT (*) FROM tevento WHERE id_grupo = $1", [
      idgrupohuaumts
    ]));
    console.log('router.get estadisticas  06 estahuaumts.rows[0].count:',estahuaumts.rows[0].count);  
    const idgrupoflexent = 6;
    console.log('router.get estadisticas 07 idgrupoflexent:',idgrupoflexent);
    const estaflexent = await (pool.query( "SELECT COUNT (*) FROM tevento WHERE id_grupo = $1", [
      idgrupoflexent
    ]));
    console.log('router.get estadisticas  08 estaflexent.rows[0].count:',estaflexent.rows[0].count);  
     const estadisticas=[{huagsm:estahuagsm.rows[0].count},{huaumts:estahuaumts.rows[0].count},{flexent:estaflexent.rows[0].count}];
      console.log('router.get estadisticas  09 estadisticas:',estadisticas);
    //console.log('router.get estadisticas  10 estadisticas.rows:',estadisticas.rows.estahuagsm);
    
    return res.json(estadisticas);
     
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
  }));
///////////// 
//router.post("/bitacoras", authorize, async ((req, res) => {
router.post("/bitacoras",  async ((req, res) => {  
  try {
    //startDate,endDate,filtro1,filtro2,filtro3,valorfiltro1,valorfiltro2,valorfiltro3
    console.log('recibido req.body:',req.body);
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const filtro1 = req.body.filtro1;
    const filtro2 = req.body.filtro2;
    const filtro3 = req.body.filtro3;
    const valorfiltro1 = req.body.valorfiltro1;
    const valorfiltro2= req.body.valorfiltro2;
    const valorfiltro3 = req.body.valorfiltro3;
    console.log('recibido startDate:',startDate);
    console.log('recibido endDate:',endDate);
    console.log('recibido filtro1:',filtro1);
    console.log('recibido filtro2:',filtro2);
    console.log('recibido filtro3:',filtro3);
    console.log('recibido valorfiltro1:',valorfiltro1);
    console.log('recibido valorfiltro2:',valorfiltro2);
    console.log('recibido valorfiltro3:',valorfiltro3);
    var formatStartDate = moment(startDate).format('YYYY-MM-DD');
    console.log('formateada formatStartDate:',formatStartDate);
    var timeStartDate = moment(formatStartDate).valueOf()/1000;
    console.log('formateada timeStartDate:',timeStartDate);
     var formatEndDate = moment(endDate).format('YYYY-MM-DD');
    console.log('formateada formatEndDate:',formatEndDate);
    var timeEndDate = moment(formatEndDate).valueOf()/1000;
    console.log('formateada timeEndDate:',timeEndDate);
    
     const eventos = await (pool.query(
      "SELECT tevento.id_evento, tagente.nombre as nombreag,tgrupo.nombre as nombregr,tmodulo.nombre as nombremo ,tevento.timestamp,tevento.utimestamp,tevento.criticity FROM tevento INNER JOIN tagente ON  tevento.id_agente= tagente.id_agente INNER JOIN tgrupo ON tevento.id_grupo= tgrupo.id_grupo INNER JOIN tmodulo ON tevento.id_modulo= tmodulo.id_modulo;"
    ));

     const eventosfiltrados = await (pool.query(
       `SELECT tevento.id_evento, tagente.nombre as nombreag,tgrupo.nombre as nombregr,tmodulo.nombre as nombremo ,tevento.timestamp,tevento.utimestamp,tevento.criticity FROM tevento INNER JOIN tagente ON  tevento.id_agente= tagente.id_agente INNER JOIN tgrupo ON tevento.id_grupo= tgrupo.id_grupo INNER JOIN tmodulo ON tevento.id_modulo= tmodulo.id_modulo WHERE tevento.utimestamp > ${timeStartDate} AND tevento.utimestamp< ${timeEndDate};`
   
     ));
  console.log('----------------------------------------------------------------');    
  // console.log('router.get /eventos 01 eventos:',eventos);  
   //console.log('router.post /bitacoras 02 eventos.rows:',eventos.rows); 
   console.log('----------------------------------------------------------------'); 
   //console.log('router.post /bitacoras 04 eventosfiltrados.rows:',eventosfiltrados.rows);  
    //return res.json(eventos.rows);

    const eventosfiltradosEND = await (pool.query(
           `SELECT tevento.id_evento, tagente.nombre as nombreag,tgrupo.nombre as nombregr,tmodulo.nombre as nombremo ,tevento.timestamp,tevento.utimestamp,tevento.criticity as estado,tevento.user_comment FROM tevento INNER JOIN tagente ON  tevento.id_agente= tagente.id_agente INNER JOIN tgrupo ON tevento.id_grupo= tgrupo.id_grupo INNER JOIN tmodulo ON tevento.id_modulo= tmodulo.id_modulo WHERE tevento.utimestamp > ${timeStartDate} AND tevento.utimestamp< ${timeEndDate}  AND t${filtro1}.nombre like '%${valorfiltro1}%' AND t${filtro2}.nombre like '%${valorfiltro2}%' AND t${filtro3}.nombre like '%${valorfiltro3}%';`
             ));
   console.log('----------------------------------------------------------------'); 
   //console.log('router.post /bitacoras 06 eventosfiltradosEND.rows:',eventosfiltradosEND.rows); 
   console.log('----------------------------------------------------------------'); 
         
   return res.json(eventosfiltradosEND.rows);
 
   } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
  }));
    
/////////////       
module.exports = router;
