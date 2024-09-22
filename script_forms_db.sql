USE [master]
GO
/****** Object:  Database [Forms_DB]    Script Date: 22/9/2024 16:47:01 ******/
CREATE DATABASE [Forms_DB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Forms_DB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Forms_DB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Forms_DB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Forms_DB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Forms_DB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Forms_DB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Forms_DB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Forms_DB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Forms_DB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Forms_DB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Forms_DB] SET ARITHABORT OFF 
GO
ALTER DATABASE [Forms_DB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Forms_DB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Forms_DB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Forms_DB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Forms_DB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Forms_DB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Forms_DB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Forms_DB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Forms_DB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Forms_DB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Forms_DB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Forms_DB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Forms_DB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Forms_DB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Forms_DB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Forms_DB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Forms_DB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Forms_DB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Forms_DB] SET  MULTI_USER 
GO
ALTER DATABASE [Forms_DB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Forms_DB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Forms_DB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Forms_DB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Forms_DB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Forms_DB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Forms_DB] SET QUERY_STORE = ON
GO
ALTER DATABASE [Forms_DB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Forms_DB]
GO
/****** Object:  Table [dbo].[Campos]    Script Date: 22/9/2024 16:47:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Campos](
	[id_campo] [int] IDENTITY(1,1) NOT NULL,
	[tipo_campo] [varchar](50) NOT NULL,
	[nombre_campo] [varchar](100) NOT NULL,
	[id_formulario] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_campo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Formularios]    Script Date: 22/9/2024 16:47:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Formularios](
	[id_formulario] [int] IDENTITY(1,1) NOT NULL,
	[nombre_formulario] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_formulario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Campos] ADD  DEFAULT ('string') FOR [tipo_campo]
GO
ALTER TABLE [dbo].[Campos]  WITH CHECK ADD FOREIGN KEY([id_formulario])
REFERENCES [dbo].[Formularios] ([id_formulario])
ON DELETE CASCADE
GO
USE [master]
GO
ALTER DATABASE [Forms_DB] SET  READ_WRITE 
GO
