
DROP TABLE creditomovil.usuario_credenciales;
CREATE TABLE creditomovil.usuario_credenciales (account_no text PRIMARY KEY,client_id text,password text,usuario_id uuid) ;
DROP TABLE creditomovil.usuarios;
CREATE TABLE creditomovil.usuarios (account_no text PRIMARY KEY,apellido_materno text,apellido_paterno text,clave_ine text,client_id text,creado_el timestamp,curp text,email text,fecha_nacimiento date,nombre text,numero_movil text,password text,selfi text,serie_ine text,usuario_id uuid,verificado boolean);
DROP TABLE creditomovil.usuario_tokens;
CREATE TABLE creditomovil.usuario_tokens (account_no text,tokens text,creado_el timestamp,PRIMARY KEY (account_no, tokens));
DROP TABLE creditomovil.cliente_movs;
CREATE TABLE creditomovil.cliente_movs (account_no text,prestamo_id text,orden int,fecha_mov date,importe float,mensaje text,referencia text,tipo text,tipo_nom text,PRIMARY KEY (account_no, prestamo_id, orden));
DROP TABLE creditomovil.prestamos_cliente;
CREATE TABLE creditomovil.prestamos_cliente (account_no text,prestamo_id text,atrasado boolean,cuota float,monto_original float,nombre_producto text,plazo int,prestamo_account_no text,saldo_total float,saldo_vencido float,tipo_plazo text,estatus text,vencido_desde date,PRIMARY KEY (account_no, prestamo_id));
DROP TABLE creditomovil.prestamo_planpagos;
CREATE TABLE creditomovil.prestamo_planpagos (account_no text,prestamo_id text,periodo int,capital float,fecha date,importe float,interes float,iva float,pagado boolean,saldo_pendiente float,PRIMARY KEY (account_no, prestamo_id, periodo));
