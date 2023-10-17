CREATE SCHEMA IF NOT EXISTS `OrionDB` DEFAULT CHARACTER SET utf8 ;
USE `OrionDB` ;


CREATE TABLE IF NOT EXISTS `OrionDB`.`Conta` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` CHAR(38) NOT NULL,
  `Agencia` VARCHAR(4) NOT NULL,
  `Conta` VARCHAR(8) NOT NULL,
  `ContaDigito` VARCHAR(1) NOT NULL,
  `ContaPgto` VARCHAR(9) NOT NULL,
  `DocumentoFederal` VARCHAR(14) NOT NULL,
  `NomeCompleto` VARCHAR(200) NOT NULL,
  `Senha` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `DtNasc` DATE NOT NULL,
  `TelefoneCelular` VARCHAR(11) NOT NULL,
  `CEP` VARCHAR(8) NOT NULL,
  `Logradouro` VARCHAR(60) NOT NULL,
  `NumeroResidencial` INT NOT NULL,
  `DtInclusao` DATETIME NOT NULL,
  `Situacao` INT NOT NULL,
  `DtSituacao` DATETIME NOT NULL,
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  PRIMARY KEY (`Codigo`),
  UNIQUE INDEX `DocumentoFederal_UNIQUE` (`DocumentoFederal` ASC),
  UNIQUE INDEX `Conta_UNIQUE` (`Conta` ASC))
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `OrionDB`.`ChaveFavorita` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` CHAR(38) NOT NULL,
  `CodigoConta` CHAR(38) NOT NULL,
  `Chave` VARCHAR(14) NOT NULL,
  `TipoChave` INT NOT NULL,
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  PRIMARY KEY (`Codigo`),
  INDEX `fk_cad.ChaveFavorita_cad.Conta_idx` (`CodigoConta` ASC),
  CONSTRAINT `fk_cad.ChaveFavorita_cad.Conta`
    FOREIGN KEY (`CodigoConta`)
    REFERENCES `OrionDB`.`Conta` (`Codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `OrionDB`.`SolicitacaoAberturaConta` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` CHAR(38) NOT NULL,
  `MensagemSolicitacao` VARCHAR(9000) NOT NULL,
  `Situacao` INT NOT NULL,
  `DtSituacao` DATETIME NOT NULL,
  `DtInclusao` DATETIME NOT NULL,
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  PRIMARY KEY (`Codigo`))
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `OrionDB`.`ChavePix` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` CHAR(38) NOT NULL,
  `CodigoConta` CHAR(38) NOT NULL,
  `ChavePix` VARCHAR(200) NOT NULL,
  `TipoChave` INT NOT NULL,
  `Situacao` INT NOT NULL,
  `DtSituacao` DATETIME NOT NULL,
  `DtInclusao` DATETIME NOT NULL,
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  PRIMARY KEY (`Codigo`),
  UNIQUE INDEX `ChavePix_UNIQUE` (`ChavePix` ASC),
  INDEX `fk_cad.ChavePix_cad.Conta1_idx` (`CodigoConta` ASC),
  CONSTRAINT `fk_cad.ChavePix_cad.Conta1`
    FOREIGN KEY (`CodigoConta`)
    REFERENCES `OrionDB`.`Conta` (`Codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `OrionDB`.`Movimento` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` CHAR(38) NOT NULL,
  `CodigoContaOrigem` CHAR(38) NOT NULL,
  `CodigoContaDestino` CHAR(38) NOT NULL,
  `Valor` DECIMAL NOT NULL,
  `ChavePix` VARCHAR(100) NULL,
  `EMV` VARCHAR(8000) NULL,
  `InfoAdicional` VARCHAR(255) NULL,
  `DescMovimento` VARCHAR(10) NULL,
  `TipoTransacao` INT NOT NULL,
  `DtMovimento` DATETIME NOT NULL,
  INDEX `fk_mov.Movimento_cad.Conta1_idx` (`CodigoContaOrigem` ASC),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  PRIMARY KEY (`Codigo`),
  CONSTRAINT `fk_mov.Movimento_cad.Conta1`
    FOREIGN KEY (`CodigoContaOrigem`)
    REFERENCES `OrionDB`.`Conta` (`Codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `OrionDB`.`Saldo` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` CHAR(38) NOT NULL,
  `CodigoConta` CHAR(38) NOT NULL,
  `DtAtualizacao` DATETIME NOT NULL,
  `Saldo` DECIMAL NOT NULL,
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  PRIMARY KEY (`Codigo`),
  INDEX `fk_mov.Saldo_cad.Conta1_idx` (`CodigoConta` ASC),
  CONSTRAINT `fk_mov.Saldo_cad.Conta1`
    FOREIGN KEY (`CodigoConta`)
    REFERENCES `OrionDB`.`Conta` (`Codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `OrionDB`.`SaldoData` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` CHAR(38) NOT NULL,
  `CodigoConta` CHAR(38) NOT NULL,
  `SaldoInicial` DECIMAL NOT NULL,
  `SaldoFinal` DECIMAL NOT NULL,
  `DtInclusao` DATETIME NOT NULL,
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  INDEX `fk_mov.SaldoData_cad.Conta1_idx` (`CodigoConta` ASC),
  PRIMARY KEY (`Codigo`),
  CONSTRAINT `fk_mov.SaldoData_cad.Conta1`
    FOREIGN KEY (`CodigoConta`)
    REFERENCES `OrionDB`.`Conta` (`Codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `OrionDB`.`QrCode` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` CHAR(38) NOT NULL,
  `CodigoConta` CHAR(38) NOT NULL,
  `ChavePix` VARCHAR(100) NULL,
  `Valor` DECIMAL NOT NULL,
  `EMV` VARCHAR(8000) NULL,
  `DtInclusao` DATETIME NOT NULL,
  PRIMARY KEY (`Codigo`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  INDEX `fk_cad.QrCode_cad.Conta1_idx` (`CodigoConta` ASC),
  CONSTRAINT `fk_cad.QrCode_cad.Conta1`
    FOREIGN KEY (`CodigoConta`)
    REFERENCES `OrionDB`.`Conta` (`Codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
