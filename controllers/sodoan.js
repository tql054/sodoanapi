import config from "../config.js"
import sql from "mssql"

// Lấy tất cả sổ đoàn
export const getAllSodoan = (req, res) => {
    sql.connect(config).then(pool => {
        return pool.request().query("Select * from sodoansinhvien");
    })
    .then(result => {
        res.send(result.recordset)
    })
    .catch(err => {
        res.send("ERROR: ", err)
    })
}

// Lấy sổ đoàn bằng mã sinh viên
export const getSodoanByMsv = (req, res) => {
    const {masodoan} = req.params
    sql.connect(config).then(pool => {
        return pool.request().query(`Select * from sodoansinhvien where masodoan = '${masodoan}'`);
    })
    .then(result => {
        res.send(result.recordset)
    })
    .catch(err => {
        res.send("ERROR: ", err)
    })
}

// Cập nhật trạng thái rút sổ đoàn
export const rutSo = (req, res) => {
    const {masodoan} = req.params
    sql.connect(config).then(pool=> {
        return pool.request().query(`update sodoansinhvien set tinhtrang = 0 where masodoan = '${masodoan}'`)
    }).then(result => {
        if(result.rowsAffected == 1) 
            res.send({"status": "Rút thành công"})
        else
            res.send({"status": "Rút không thành công"})
    }).catch(err=> {
        res.send("ERROR: ", err)
    })
}

// Cập nhật trạng thái nộp sổ đoàn
export const nopso = (req, res) => {
    const {masodoan} = req.params
    const data = {
        ngaynop: req.body.ngaynop
    }
    sql.connect(config).then(pool=> {
        return pool.request().query(`set dateformat dmy 
        update sodoansinhvien set tinhtrang = 1, ngaynop = '${data.ngaynop}' where masodoan = '${masodoan}'`)
    }).then(result => {
        if(result.rowsAffected == 1) 
            res.send({"status": `Nộp thành công`})
        else
            res.send({"status": "Nộp không thành công"})
    }).catch(err=> {
        res.send("ERROR: ", err)
    })
}

// Thên sổ đoàn mới
export const add = (req, res) => {
    const sodoan = {
        hoten: req.body.hoten,
        lop  : req.body.lop,
        email: req.body.email,
        sdt  : req.body.sdt,
        masv: req.body.masv,
        ngaynop: req.body.ngaynop,
    }

    sql.connect(config).then(pool => {
        return pool.request().query(`set dateformat dmy insert into sodoansinhvien 
                                values(dbo.fnAUTO_IDSD(), N'${sodoan.hoten}',
                                        '${sodoan.lop}', '${sodoan.email}', '${sodoan.sdt}',
                                        '${sodoan.masv}', '${sodoan.ngaynop}', 1);`
        )
    }
    ).then(result => {
            if(result.rowsAffected == 1) 
                res.send({"status": "Thêm sổ đoàn thành công"})
            else
                res.send({"status": "Thêm sổ đoàn thất bại"})
    }).catch(err=> {
            res.send("ERROR: ", err)
    })
}

// Cập nhật thông tin sổ đoàn
export const update = (req, res) => {
    const {masodoan} = req.params
    const sodoan = {
        masv : req.body.masv,
        hoten: req.body.hoten,
        lop  : req.body.lop,
        email: req.body.email,
        sdt  : req.body.sdt,
        ngaynop: req.body.ngaynop
    }

    sql.connect(config).then(pool=> {
        pool.request().query(`update sodoansinhvien 
                set hoten = N'${sodoan.hoten}',
                    lop ='20', 
                    email = '${sodoan.email}',
                    sdt = '${sodoan.sdt}',
                    masv = '${sodoan.masv}'
                where masodoan = '${masodoan}'`)
        return pool.request().query(`Select * from sodoansinhvien where masodoan = '${masodoan}'`);
        
    }).then(result => {
        res.send(result.recordset);
    }).catch(err => {
        res.send("Erorr: ", err)
    });
}

// Xóa sổ đoàn
export const deleted = (req, res) => {
    const masv = req.params.masv
    sql.connect(config).request().query(`delete from sodoansinhvien where masv = '${masv}'`)
    .then(result => {
        if(result.rowsAffected == 1) {
            res.send({
                "status": "Delete successfully"
            });
        } else {
            res.send({
                "status": "Delete failed"
            });
        }
        
    }).catch(err => {
        console.log(err);
    });
}