/*database.sql*/
CREATE DATABASE authtodo;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);


CREATE TABLE users(
  user_id serial primary key,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
  
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');

CREATE TABLE "tgrupo" (
	"id_grupo" SERIAL NOT NULL PRIMARY KEY,
	"nombre" text NOT NULL default ''
);

CREATE TABLE "tagente" (
	"id_agente" SERIAL NOT NULL PRIMARY KEY,
    "nombre" varchar(600) NOT NULL default '',
    "id_grupo" INTEGER NOT NULL default 0
);
CREATE INDEX "tagente_id_grupo_idx" ON "tagente"("id_grupo");

CREATE TABLE "tmodulo" (
  "id_modulo" SERIAL NOT NULL PRIMARY KEY,
    "nombre" varchar(600) NOT NULL default '',
    "id_grupo" INTEGER NOT NULL default 0
);
CREATE INDEX "tmodulo_id_grupo_idx" ON "tmodulo"("id_grupo");

CREATE TABLE "tcorrelacion" (
  "id_correlacion" SERIAL NOT NULL PRIMARY KEY,
    "nombre" varchar(600) NOT NULL default '',
    "id_grupo" INTEGER NOT NULL default 0
);
CREATE INDEX "tcorrelacion_id_grupo_idx" ON "tcorrelacion"("id_grupo");
/*CREATE TABLE "tevento" (
	"id_evento" BIGSERIAL NOT NULL PRIMARY KEY,
	"id_agente" INTEGER NOT NULL default 0,
  "id_grupo" INTEGER NOT NULL default 0,
	"estado" INTEGER NOT NULL default 0,
	"timestamp" TIMESTAMP without time zone default '1970-01-01 00:00:00',
	"evento" text NOT NULL default '',
	"utimestamp" BIGINT NOT NULL default 0,
	"criticity" INTEGER NOT NULL default 0,
	"user_comment" text NOT NULL
);
CREATE INDEX "tevento_id_1_idx" ON "tevento"("id_agente", "id_evento");
CREATE INDEX "tevento_id_2_idx" ON "tevento"("utimestamp", "id_evento");
*/
-- Dumping data for table "tgrupo"
--EXITOSO
BEGIN WORK;
LOCK TABLE "tgrupo";
INSERT INTO "tgrupo" ("id_grupo", "nombre")
VALUES 
(2,'FLEXENT');
COMMIT WORK;
SELECT setval('tgrupo_id_grupo_seq', (SELECT (SELECT MAX(id_grupo) FROM tgrupo)));

-- Dumping data for table "tagente"
--EXITOSO
BEGIN WORK;
LOCK TABLE "tagente";
INSERT INTO "tagente" ("id_agente", "nombre", "id_grupo") VALUES (1,'HUAWEI_GSM_BTS_275_ACARIGUA',1);
COMMIT WORK;
BEGIN WORK;
LOCK TABLE "tagente";
INSERT INTO "tagente" ("id_agente", "nombre", "id_grupo") VALUES (2,'HUAWEI_UMTS_BTS_30_MERIDA',4);
COMMIT WORK;
BEGIN WORK;
LOCK TABLE "tagente";
INSERT INTO "tagente" ("id_agente", "nombre", "id_grupo") VALUES (3,'FLEXENT_LC2_BASE_STATION_1',6);
COMMIT WORK;
BEGIN WORK;
LOCK TABLE "tmodulo";
INSERT INTO "tmodulo" ("id_modulo", "nombre", "id_grupo") VALUES (1,'ABIS_SIGNALING_LINK',1);
COMMIT WORK;
BEGIN WORK;
LOCK TABLE "tmodulo";
INSERT INTO "tmodulo" ("id_modulo", "nombre", "id_grupo") VALUES (2,'RESOURCE_GROUP',4);
COMMIT WORK;
BEGIN WORK;
LOCK TABLE "tmodulo";
INSERT INTO "tmodulo" ("id_modulo", "nombre", "id_grupo") VALUES (3,'FALLA DE FUERZA AC',6);
COMMIT WORK;
BEGIN WORK;
LOCK TABLE "tcorrelacion";
INSERT INTO "tcorrelacion" ("id_correlacion", "nombre", "id_grupo") VALUES (1,'OPERANDO CON BATERIAS',6);
COMMIT WORK;
-- Dumping data for table "tevento"
--EXITOSO
BEGIN WORK;
LOCK TABLE "tevento";
INSERT INTO "tevento" ( "id_evento", "id_agente", "id_grupo","estado", "timestamp", "evento","utimestamp", "criticity", "user_comment") VALUES (1,1,2,1,'2019-08-30 07:18:44','FALLA DE FUERZA AC',1567158529,4,'09/06/19_12:32:51@659952@Clear@1001@FLEXENT_LC2_BASE_STATION_1@');
COMMIT WORK;
/**/
CREATE TABLE "tevento" (
  "id_evento" BIGSERIAL NOT NULL PRIMARY KEY,
  "id_agente" INTEGER NOT NULL default 0,
  "id_grupo" INTEGER NOT NULL default 0,
  "id_modulo" INTEGER NOT NULL default 0,
  "estado" INTEGER NOT NULL default 0,
  "timestamp" TIMESTAMP without time zone default '1970-01-01 00:00:00',
  "utimestamp" BIGINT NOT NULL default 0,
  "criticity" INTEGER NOT NULL default 0,
  "user_comment" text NOT NULL
);
CREATE INDEX "tevento_id_1_idx" ON "tevento"("id_agente", "id_evento");
CREATE INDEX "tevento_id_2_idx" ON "tevento"("utimestamp", "id_evento");
CREATE INDEX "tevento_id_3_idx" ON "tevento"("id_grupo", "id_evento");
CREATE INDEX "tevento_id_4_idx" ON "tevento"("id_modulo", "id_evento");
BEGIN WORK;
LOCK TABLE "tevento";
INSERT INTO "tevento" ( "id_evento", "id_agente", "id_grupo","estado", "timestamp", "id_modulo","utimestamp", "criticity", "user_comment") VALUES (1,1,2,1,'2019-08-30 07:18:44',1,1567158529,4,'09/06/19_12:32:51@659952@Minor@1001@FLEXENT_LC2_BASE_STATION_1@');
COMMIT WORK;
/**/
/*usar este de referencia*/
BEGIN WORK;
LOCK TABLE "tevento";
INSERT INTO "tevento" ( "id_evento", "id_agente", "id_grupo", "id_modulo","estado", "timestamp","utimestamp", "criticity", "user_comment") VALUES (6,3,2,3,1,'2019-08-30 07:18:44',1567158529,4,'09/06/19_12:32:51@659952@Minor@1001@FLEXENT_LC2_BASE_STATION_1@');
COMMIT WORK;

/**/
CREATE TABLE "tevento" (
  "id_evento" SERIAL  PRIMARY KEY,
  "id_agente" INTEGER NOT NULL default 0,
  "id_grupo" INTEGER NOT NULL default 0,
  "id_modulo" INTEGER NOT NULL default 0,
  "estado" INTEGER NOT NULL default 0,
  "timestamp" TIMESTAMP without time zone default '1970-01-01 00:00:00',
  "utimestamp" BIGINT NOT NULL default 0,
  "criticity" INTEGER NOT NULL default 0,
  "user_comment" text NOT NULL
);
CREATE INDEX "tevento_id_1_idx" ON "tevento"("id_agente", "id_evento");
CREATE INDEX "tevento_id_2_idx" ON "tevento"("utimestamp", "id_evento");
CREATE INDEX "tevento_id_3_idx" ON "tevento"("id_grupo", "id_evento");
CREATE INDEX "tevento_id_4_idx" ON "tevento"("id_modulo", "id_evento");

