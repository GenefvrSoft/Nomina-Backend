-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema nomina_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nomina_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci ;
USE `nomina_database` ;

-- -----------------------------------------------------
-- Table `nomina_database`.`Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`Usuario` (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(500) NOT NULL,
  `password` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;

-- -----------------------------------------------------
-- Table `nomina_database`.`Empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`Empresa` (
  `idEmpresa` INT(11) NOT NULL AUTO_INCREMENT,
  `razon_social` VARCHAR(100) NOT NULL,
  `d_fiscal` VARCHAR(500) NOT NULL,
  `codigo_postal` VARCHAR(500) NOT NULL,
  `telefono` VARCHAR(500) NOT NULL,
  `correo` VARCHAR(500) NOT NULL,
  `sitio_web` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idEmpresa`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;

-- -----------------------------------------------------
-- Table `nomina_database`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`Empleado` (
  `idEmpleado` INT(11) NOT NULL AUTO_INCREMENT,
  `cedula` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(500) NOT NULL,
  `apellido` VARCHAR(500) NOT NULL,
  `sexo` BOOLEAN(1) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `fecha_ingreso` DATE NOT NULL,
  `estatus` BOOLEAN(1) NOT NULL,
  `telefono` VARCHAR(100) NOT NULL,
  `codigo_cargo` INT(11) NOT NULL,
  `codigo_departamento` INT(11) NOT NULL,
  PRIMARY KEY (`idEmpleado`)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;

-- -----------------------------------------------------
-- Table `nomina_database`.`asignaciones`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `nomina_database`.`Asignacion` (
  `idAsignacion` INT NOT NULL AUTO_INCREMENT,
  `tipo_asignacion` VARCHAR(500) NOT NULL,
  `monto_asignacion` FLOAT NOT NULL,
  PRIMARY KEY (`idAsignacion`))
  CONSTRAINT `id_empleado`
    FOREIGN KEY (`idAsignacion`)
    REFERENCES `nomina_database`.`empleado` (`idempleado`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `nomina_database`.`Lista-asignaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`historialAsignacion` (
  `idAsignacion` INT(11) NOT NULL AUTO_INCREMENT,  
  'idEmpleado' VARCHAR(400) NOT NULL,
  `nombre_empleado` VARCHAR(400) NOT NULL,
  `monto_asignacion` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`idAsignacion`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;

-- -----------------------------------------------------
-- Table `nomina_database`.`deducciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`Deduccion` (
  `idDeduccion` INT NOT NULL AUTO_INCREMENT,
  `tipo_deduccion` VARCHAR(500) NOT NULL,
  `monto_deduccion` FLOAT NOT NULL,
  PRIMARY KEY (`idDeduccion`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;

-- -----------------------------------------------------
-- Table `nomina_database`.`deducciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`historialDeduccion` (
  `id_deduccion` INT(11) NOT NULL AUTO_INCREMENT,  
  'id_empleado' VARCHAR(400) NOT NULL,
  `nombre_empleado` VARCHAR(400) NOT NULL,
  `monto_deduccion` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_deduccion`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;

-- -----------------------------------------------------
-- Table `nomina_database`.`vacaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`Vacaciones` (
  `idVacaciones` INT(11) NOT NULL AUTO_INCREMENT,
  `idDepartamento` INT NOT NULL,
  `monto` VARCHAR,

  PRIMARY KEY (`id_vac`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;

-- -----------------------------------------------------
-- Table `mydb`.`respaldo_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`respaldo_pagos` (
  `id_pagos` INT NOT NULL AUTO_INCREMENT,
  `idEmpleado` INT NOT NULL,
  `cedula` VARCHAR(500) NOT NULL,
  `nombre` VARCHAR(500) NOT NULL,
  `departamento` VARCHAR(500) NOT NULL,
  `cargo` VARCHAR(500) NOT NULL,
  `cuenta` VARCHAR(500) NOT NULL,
  `correo` VARCHAR(500) NOT NULL,
  `dias` VARCHAR(500) NOT NULL,
  `fecha_ini` DATE NOT NULL,
  `fecha_cul` DATE NOT NULL,
  `horas_trabajadas` INT NOT NULL,
  `monto_base` FLOAT NOT NULL,
  `horas_extras` INT NOT NULL,
  `monto_extra` FLOAT NOT NULL,
  `monto_deduccion` FLOAT NOT NULL,
  `monto_bonificacion` FLOAT NOT NULL,
  `pagoTotal` FLOAT NOT NULL,
  `fecha_pago` DATE NOT NULL,
  PRIMARY KEY (`id_pagos`))
ENGINE = InnoDB;

USE `nomina_database` ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

