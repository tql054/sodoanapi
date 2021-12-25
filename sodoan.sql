Create database quanlysodoan
go
use quanlysodoan
go

create table sodoansinhvien
(
	 
	masodoan varchar(5) primary key,
	hoten nvarchar(50),
	lop varchar(4),
	email varchar(250),
	sdt varchar(11),
	masv varchar(13),
	ngaynop date,
	tinhtrang int
);

go
create table canbo
(
	id int identity(1,1) primary key,
	hoten nvarchar(250),
	email varchar(250),
	sdt varchar(11),
	matkhau varchar(50)
);
go

CREATE FUNCTION fnAUTO_IDSD()
RETURNS CHAR(5)
AS
BEGIN
	DECLARE @ID VARCHAR(3)
	DECLARE @num int
	IF (SELECT COUNT(masodoan) FROM sodoansinhvien) = 0
		RETURN 'SD001'
	ELSE
		SELECT @num = convert(int, MAX(RIGHT(masodoan, 3))) + 1 FROM sodoansinhvien
		SET @ID = CONVERT(CHAR, @num)
		RETURN concat('SD', REPLICATE('0', 3 - LEN(@ID)), @ID)
END
go


set dateformat dmy 
insert into sodoansinhvien
values	(dbo.fnAUTO_IDSD(), N'Lê Quốc Tuấn', '19T1', 'lequoctuan@gmail.com', '0785956235', '1911505310158', '12/10/2021', 1);
insert into sodoansinhvien
values	(dbo.fnAUTO_IDSD(), N'Lê Lương Minh Hiếu', '19T1', 'lehieu@gmail.com', '0785459256', '1911505310121', '12/10/2021', 1);
insert into sodoansinhvien
values	(dbo.fnAUTO_IDSD(), N'Lê Ngọc Việt', '19T1', 'leviet@gmail.com', '0785152625', '1911505310161', '12-10-2021', 1);
insert into sodoansinhvien
values	(dbo.fnAUTO_IDSD(), N'Phạm Văn Sang', '19T1', 'phamsang@gmail.com', '0785415265', '1911505310162', '12-10-2021', 1);
insert into sodoansinhvien
values	(dbo.fnAUTO_IDSD(), N'Trần Nguyễn Thu Sương', '19T2', 'suong@gmail.com', '0784521510', '181152658452', '12-10-2021', 1);
insert into sodoansinhvien
values	(dbo.fnAUTO_IDSD(), N'Nguyễn Viết Đoàn', '19T2', 'vdoan@gmail.com', '0785415265', '191152562514', '12-10-2021', 1);
insert into sodoansinhvien
values	(dbo.fnAUTO_IDSD(), N'Lương Văn Nghĩ', '19T2', 'phamsang@gmail.com', '0789556815', '1911525652351', '12-10-2021', 1);

go
insert into canbo
values	(N'Trần Minh Châu', 'minchau@gmail.com', '0785965125', 'abc123');