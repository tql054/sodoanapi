import config from '../config.js' 
import sql from 'mssql'

export const getAllCanbo = (req, res) => {
    sql.connect(config).then(pool => {
        return pool.request().query('Select * from canbo');
    })
    .then(result => {
        res.send(result.recordset);

    })
    .catch(err => {
        res.send('error: ', err);
    });
}

export const getCanboById = (req, res) => {
    const {id} = req.params
    sql.connect(config).then(pool => {
        return pool.request().query(`Select * from canbo where id = ${id}`);
    })
    .then(result => {
        res.send(result.recordset);
    })
    .catch(err => {
        res.send('error: ', err);
    });
}

export const update = (req, res)=> {
    const {id} = req.params
    const data = {
        hoten: req.body.hoten,
        email: req.body.email,
        sdt: req.body.sdt
    }

    sql.connect(config).then(pool => {
        pool.request().query(`update canbo set hoten = N'${data.hoten}',
                                                email = '${data.email}',
                                                sdt = '${data.sdt}'
                                    where id = ${id}`                                            
        )

        return pool.request().query(`Select * from canbo where id = ${id}`);
    })
    .then(result => {
        res.send(result.recordset);
    })
    .catch(err => {
        res.send('error: ', err);
    });
}

export const updatePassword = (req, res) =>{
    const {id} = req.params
    const data = {
        matkhau: req.body.matkhau
    }

    sql.connect(config).then(pool => {
        pool.request().query(`update canbo set matkhau = N'${data.matkhau}'
                                    where id = ${id}`                                            
        )

        return pool.request().query(`Select * from canbo where id = ${id}`);
    })
    .then(result => {
        res.send(result.recordset);
    })
    .catch(err => {
        res.send('error: ', err);
    });
}


